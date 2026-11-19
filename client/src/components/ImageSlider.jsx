import React, { useState, useEffect } from "react";

const slides = [
    { url: "./images/slide-1.webp", alt: "Summer Collection" },
    { url: "./images/slide-2.webp", alt: "Winter Collection" }
];

const ImageSlider = ({ autoPlay = true, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Handle Next Slide
    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
        );
    };

    // Handle Previous Slide
    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
        );
    };

    // Jump to specific slide via dots
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Auto-play functionality
    useEffect(() => {
        if (!autoPlay) return;

        const slideInterval = setInterval(nextSlide, interval);
        return () => clearInterval(slideInterval); // Cleanup interval on unmount
    }, [currentIndex, autoPlay, interval]);

    if (!slides || slides.length === 0) {
        return null;
    }

    return (
        <div className="relative w-full max-w-7cxl mx-auto h-80 sm:h-96 overflow-hidden shadow-lg group">
            {/* Slides Container */}
            <div
                className="w-full h-full flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <img
                        key={index}
                        src={slide.url}
                        alt={slide.alt || `Slide ${index + 1}`}
                        className="w-full h-full object-cover shrink-0"
                    />
                ))}
            </div>

            {/* Left Arrow */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none"
                aria-label="Previous Slide"
            >
                ❮
            </button>

            {/* Right Arrow */}
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none"
                aria-label="Next Slide"
            >
                ❯
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index
                            ? "bg-white scale-110"
                            : "bg-white/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
