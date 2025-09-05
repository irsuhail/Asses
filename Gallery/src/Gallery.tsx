import React, { useState } from "react";

const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=600&auto=format&fit=crop&q=80", alt: "City Skyline" },
  { id: 2, src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80", alt: "Coffee and Laptop" },
  { id: 3, src: "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d3?w=600&auto=format&fit=crop&q=80", alt: "Delicious Burger" },
  { id: 4, src: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=600&auto=format&fit=crop&q=80", alt: "Modern Architecture" },
  { id: 5, src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80", alt: "Technology Chips" },
  { id: 6, src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80", alt: "Coding on Laptop" },
  { id: 7, src: "https://images.unsplash.com/photo-1485217988980-11786ced9454?w=600&auto=format&fit=crop&q=80", alt: "Books on Shelf" },
  { id: 8, src: "https://images.unsplash.com/photo-1473181488821-2d23949a045a?w=600&auto=format&fit=crop&q=80", alt: "Travel Map" },
  { id: 9, src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80", alt: "Smiling Dog" },
  { id: 10, src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600&auto=format&fit=crop&q=80", alt: "Hot Air Balloons" },
];

export default function Gallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openModal = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="gallery-grid">
        {images.map((img, index) => (
          <img
            key={img.id}
            src={img.src}
            alt={img.alt}
            className="gallery-img"
            onClick={() => openModal(index)}
          />
        ))}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              className="modal-main-img"
              onClick={closeModal}
            />

            <div className="thumbnails">
              {images.map((img, index) => (
                <img
                  key={img.id}
                  src={img.src}
                  alt={img.alt}
                  className={`thumbnail ${index === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
