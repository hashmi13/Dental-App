import { useEffect, useRef, useState } from "react";
import { Carousel } from "react-bootstrap";
import { gsap } from "gsap";

// Minimal carousel styles
const carouselStyles = `
  .carousel {
    position: relative;
  }
  
  .carousel-inner {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 1rem;
  }
  
  .carousel-item {
    position: relative;
    display: none;
    width: 100%;
    backface-visibility: hidden;
    transition: transform 0.6s ease-in-out;
    float: none; /* remove float to prevent floating */
    margin-right: 0;
  }
  
  .carousel-item.active {
    display: block;
  }
  
  .carousel-fade .carousel-item {
    opacity: 0;
    transition-property: opacity;
    transform: none;
  }
  
  .carousel-fade .carousel-item.active {
    opacity: 1;
  }
  
  .d-block {
    display: block !important;
  }
  
  .w-100 {
    width: 100% !important;
  }
`;

// Inject styles once
if (typeof document !== "undefined" && !document.head.querySelector('style[data-carousel-styles]')) {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = carouselStyles;
  styleSheet.setAttribute('data-carousel-styles', 'true');
  document.head.appendChild(styleSheet);
}

function CarouselHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const imageRefs = useRef([]);
  const containerRef = useRef(null);

  const images = [
    { src: "/wmremove-transformed.webp", alt: "Smiling woman 1" },
    { src: "/crousel-img-1.webp", alt: "Smiling woman 2" },
    { src: "/crousel-img-2.webp", alt: "Smiling woman 3" },
  ];

  const addToImageRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container entrance animation
      gsap.fromTo(containerRef.current,
        { scale: 0.8, opacity: 0, rotationY: 30, transformOrigin: "center center" },
        { scale: 1, opacity: 1, rotationY: 0, duration: 1.2, ease: "back.out(1.4)", delay: 0.8 }
      );
      // Animate first slide
      if (imageRefs.current[0]) {
        gsap.fromTo(imageRefs.current[0], { scale: 1.1, opacity: 0.8 }, { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSlideChange = (selectedIndex) => {
    setCurrentSlide(selectedIndex);
    const activeImage = imageRefs.current[selectedIndex];
    if (activeImage) {
      gsap.fromTo(activeImage, { scale: 1.1, opacity: 0.8 }, { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" });
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-xl sm:max-w-md lg:max-w-md xl:max-w-lg 2xl:max-w-xl">
      <Carousel
        ref={carouselRef}
        fade
        interval={3000}
        controls={false}
        indicators={false}
        className="rounded-2xl overflow-hidden"
        activeIndex={currentSlide}
        onSelect={handleSlideChange}
      >
        {images.map((img, i) => (
          <Carousel.Item key={i}>
            <img
              ref={addToImageRefs}
              src={img.src}
              alt={img.alt}
              className="d-block w-100 rounded-2xl"
              loading="lazy"
            />
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Custom subtle indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-gray-400 scale-125' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default CarouselHero;
