import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import mongoose from "mongoose";
import connectDB from "./db.js";
import Appointment from "./models/Appointment.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Initialize Stripe client
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
const stripe = new Stripe(stripeSecretKey);

app.use(cors());

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.warn("⚠️ Database connection failed in middleware, continuing request handling...", err.message);
  }
  next();
});

// Helper function to send email via Brevo REST API v3
async function sendBrevoTransactionalEmail({ toEmail, toName, templateId, params, subject, htmlContent }) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey || apiKey.includes("your_brevo_api_key")) {
    console.warn("⚠️ BREVO_API_KEY is missing or invalid in .env file.");
    throw new Error("BREVO_API_KEY is not configured in .env file.");
  }

  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = "Bright Smile Dental";

  let payload = {
    to: [{ email: toEmail, name: toName || toEmail }],
  };

  if (senderEmail) {
    payload.sender = { name: senderName, email: senderEmail };
  }

  const tId = templateId || process.env.BREVO_TEMPLATE_ID;
  
  if (tId && !isNaN(Number(tId))) {
    payload.templateId = Number(tId);
    payload.params = params || {};
  } else {
    const patientName = params?.NAME || toName || "Patient";
    const service = params?.SERVICE || "Dental Appointment";
    const date = params?.DATE || "N/A";
    const time = params?.TIME || "N/A";
    const phone = params?.PHONE || "N/A";
    const address = params?.ADDRESS || "N/A";
    const amount = params?.AMOUNT || "N/A";
    const message = params?.MESSAGE || "";
    const paymentStatus = params?.PAYMENT_STATUS || "Booked";

    payload.subject = subject || `Booking Confirmation - ${service}`;
    payload.htmlContent = htmlContent || `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background: #ffffff;">
        <h2 style="color: #0891b2; text-align: center;">🦷 Bright Smile Dental Clinic</h2>
        <h3 style="color: #1e293b;">Appointment Confirmation</h3>
        <p>Dear <strong>${patientName}</strong>,</p>
        <p>Thank you for booking your appointment with us! Here are your details:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Service:</td><td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${service}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Amount:</td><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; color: #0891b2; font-weight: bold;">${amount}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Date:</td><td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${date}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Time:</td><td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${time}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${phone}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Address:</td><td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${address}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Status:</td><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; color: #16a34a; font-weight: bold;">${paymentStatus}</td></tr>
          ${message ? `<tr><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Notes:</td><td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${message}</td></tr>` : ""}
        </table>
        <p style="color: #64748b; font-size: 14px;">If you have any questions, reply to this email or call us.</p>
      </div>
    `;
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    console.error("Brevo API Error Details:", data);
    throw new Error(data.message || "Failed to send Brevo transactional email.");
  }
  return data;
}

// Stripe Webhook endpoint
app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      if (!webhookSecret) {
        throw new Error("STRIPE_WEBHOOK_SECRET environment variable is missing.");
      }
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error(`⚠️ Webhook signature verification failed:`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("✅ Stripe Payment Succeeded for Session:", session.id);

      const paidAmountInDollars = session.amount_total ? session.amount_total / 100 : Number(session.metadata?.amount) || 0;

      // Update appointment status and amount in MongoDB
      try {
        await connectDB();
        let appointment = await Appointment.findOne({ stripeSessionId: session.id });
        if (!appointment && session.customer_email) {
          appointment = await Appointment.findOne({ email: session.customer_email }).sort({ createdAt: -1 });
        }
        if (appointment) {
          appointment.paymentStatus = "PAID via Stripe";
          appointment.amount = paidAmountInDollars;
          if (session.metadata?.patient_address) {
            appointment.address = session.metadata.patient_address;
          }
          await appointment.save();
          console.log(`🍃 MongoDB Appointment updated to PAID via Stripe! Amount: $${paidAmountInDollars}`);
        }
      } catch (dbErr) {
        console.error("MongoDB update error on webhook:", dbErr.message);
      }

      // Send Brevo confirmation email automatically on Stripe payment success!
      if (session.customer_email || session.metadata?.patient_email) {
        try {
          await sendBrevoTransactionalEmail({
            toEmail: session.customer_email || session.metadata.patient_email,
            toName: session.metadata?.patient_name || "Patient",
            templateId: process.env.BREVO_TEMPLATE_ID,
            params: {
              NAME: session.metadata?.patient_name || "Patient",
              EMAIL: session.customer_email || session.metadata?.patient_email,
              PHONE: session.metadata?.patient_phone || "",
              ADDRESS: session.metadata?.patient_address || "",
              SERVICE: session.metadata?.service_name || "Dental Service",
              DATE: session.metadata?.appointment_date || "",
              TIME: session.metadata?.appointment_time || "",
              MESSAGE: session.metadata?.message || "",
              AMOUNT: `$${paidAmountInDollars}`,
              PAYMENT_STATUS: "PAID via Stripe",
            },
          });
          console.log("✉️ Sent Brevo confirmation email for successful payment!");
        } catch (emailError) {
          console.error("Failed to send Brevo email after Stripe payment:", emailError.message);
        }
      }
    }

    res.json({ received: true });
  }
);

// Standard JSON body parser for normal API endpoints
app.use(express.json());

// GET /api/appointments - Fetch all appointments from MongoDB
app.get("/api/appointments", async (req, res) => {
  try {
    await connectDB();
    const appointments = await Appointment.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    console.error("Error fetching appointments from MongoDB:", error.message);
    res.status(500).json({ error: error.message || "Failed to fetch appointments" });
  }
});

// POST /api/appointments - Save new appointment to MongoDB
app.post("/api/appointments", async (req, res) => {
  try {
    const { name, email, phone, address, service, date, time, message, amount, paymentStatus, stripeSessionId } = req.body;

    if (!name || !email || !phone || !service || !date || !time) {
      return res.status(400).json({ error: "Missing required appointment fields (name, email, phone, service, date, time)." });
    }

    await connectDB();

    const appointment = new Appointment({
      name,
      email,
      phone,
      address: address || "",
      service,
      date,
      time,
      message: message || "",
      amount: Number(amount) || 0,
      paymentStatus: paymentStatus || "Pay at Clinic",
      stripeSessionId: stripeSessionId || null,
    });

    const savedAppointment = await appointment.save();
    console.log("🍃 Appointment saved to MongoDB:", savedAppointment._id, "Amount:", savedAppointment.amount);

    res.status(201).json({ success: true, appointment: savedAppointment });
  } catch (error) {
    console.error("Error saving appointment to MongoDB:", error.message);
    res.status(500).json({ error: error.message || "Failed to save appointment" });
  }
});

// Send Brevo Email Endpoint
app.post("/api/send-brevo-email", async (req, res) => {
  try {
    const { toEmail, toName, templateId, params } = req.body;

    if (!toEmail) {
      return res.status(400).json({ error: "Recipient email (toEmail) is required." });
    }

    const result = await sendBrevoTransactionalEmail({
      toEmail,
      toName,
      templateId,
      params,
    });

    console.log("✉️ Brevo email successfully sent to:", toEmail);
    res.json({ success: true, result });
  } catch (error) {
    console.error("Brevo Email API Error:", error.message);
    res.status(500).json({ error: error.message || "Failed to send email via Brevo" });
  }
});

// Create Stripe Checkout Session Endpoint
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { name, email, phone, address, service, date, time, priceInCents, message } = req.body;

    if (!service || !email) {
      return res.status(400).json({ error: "Service and Email are required." });
    }

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const amountInDollars = (priceInCents || 9900) / 100;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Dental Service: ${service}`,
              description: `Appointment for ${name || "Patient"} on ${date || "N/A"} at ${time || "N/A"}`,
            },
            unit_amount: priceInCents || 9900,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,
      metadata: {
        patient_name: name || "",
        patient_email: email || "",
        patient_phone: phone || "",
        patient_address: address || "",
        service_name: service || "",
        appointment_date: date || "",
        appointment_time: time || "",
        message: message || "",
        amount: String(amountInDollars),
      },
      success_url: `${frontendUrl}/thank-you?status=success&session_id={CHECKOUT_SESSION_ID}&name=${encodeURIComponent(name || "")}&service=${encodeURIComponent(service || "")}&date=${encodeURIComponent(date || "")}&time=${encodeURIComponent(time || "")}`,
      cancel_url: `${frontendUrl}/booking?status=cancelled`,
    });

    // Save pending appointment to MongoDB with address and amount
    try {
      await connectDB();
      await Appointment.create({
        name: name || "Patient",
        email,
        phone: phone || "",
        address: address || "",
        service,
        date: date || "",
        time: time || "",
        message: message || "",
        amount: amountInDollars,
        paymentStatus: "Pending Stripe Payment",
        stripeSessionId: session.id,
      });
      console.log(`🍃 Pending appointment recorded in MongoDB with Stripe session ID ${session.id} ($${amountInDollars})`);
    } catch (dbErr) {
      console.error("Error creating pending appointment record in MongoDB:", dbErr.message);
    }

    res.json({ url: session.url, id: session.id });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    res.status(500).json({ error: error.message || "Failed to create checkout session" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };
  res.json({
    status: "ok",
    message: "Stripe, Brevo & MongoDB Backend Server is running!",
    database: states[dbState] || "unknown",
  });
});

app.listen(port, () => {
  console.log(`🚀 Server listening on http://localhost:${port}`);
});
