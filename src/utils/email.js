/**
 * Utility to send transactional emails via Brevo (formerly Sendinblue)
 */

export const sendEmail = async (formData) => {
  const recipientEmail = formData.email || formData.user_email || formData.to_email;
  const recipientName = formData.user_name || formData.name || formData.to_name || "Patient";

  if (!recipientEmail) {
    throw new Error("Recipient email address is required.");
  }

  const response = await fetch("/api/send-brevo-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      toEmail: recipientEmail,
      toName: recipientName,
      templateId: import.meta.env.VITE_BREVO_TEMPLATE_ID || 1,
      params: {
        // Upper-case params (Standard Brevo template tag format: {{ params.NAME }})
        NAME: recipientName,
        EMAIL: recipientEmail,
        PHONE: formData.phone || formData.user_phone || "N/A",
        SERVICE: formData.service_name || formData.service || "General Care",
        DATE: formData.appointment_date || formData.date || "N/A",
        TIME: formData.appointment_time || formData.time || "N/A",
        MESSAGE: formData.message || "",
        PAYMENT_STATUS: formData.payment_status || "Pay at Clinic",

        // Lower-case / snake-case fallback aliases for template flexibility
        user_name: recipientName,
        user_email: recipientEmail,
        user_phone: formData.phone || formData.user_phone || "N/A",
        service_name: formData.service_name || formData.service || "General Care",
        appointment_date: formData.appointment_date || formData.date || "N/A",
        appointment_time: formData.appointment_time || formData.time || "N/A",
        message: formData.message || "",
        payment_status: formData.payment_status || "Pay at Clinic",
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to send confirmation email via Brevo.");
  }

  return data;
};

export const sendContactEmail = async (formData) => {
  const recipientEmail = formData.user_email || formData.email;
  const recipientName = formData.user_name || formData.name || formData.from_name || "Visitor";

  if (!recipientEmail) {
    throw new Error("Email address is required.");
  }

  const response = await fetch("/api/send-brevo-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      toEmail: recipientEmail,
      toName: recipientName,
      templateId: import.meta.env.VITE_BREVO_CONTACT_TEMPLATE_ID || import.meta.env.VITE_BREVO_TEMPLATE_ID || 1,
      params: {
        NAME: recipientName,
        EMAIL: recipientEmail,
        SUBJECT: formData.subject || "Contact Inquiry",
        MESSAGE: formData.message || "",

        user_name: recipientName,
        user_email: recipientEmail,
        subject: formData.subject || "Contact Inquiry",
        message: formData.message || "",
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to send contact email via Brevo.");
  }

  return data;
};
