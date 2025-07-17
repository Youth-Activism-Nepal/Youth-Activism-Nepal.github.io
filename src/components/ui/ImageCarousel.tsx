'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Props {
  images: string[];
}

export default function ImageCarousel({ images }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const total = images.length;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance every 7 seconds
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      goNext();
    }, 7000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % total);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  return (
    <div
      className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg"
      style={{ height: "50vh" }}
    >
      <div className="relative h-full">
        {images.map((src, index) => {
          // Determine position relative to current slide
          let translateX = 100; // default offscreen right
          let zIndex = 10;
          let opacity = 0;

          if (index === current) {
            translateX = 0;
            zIndex = 20;
            opacity = 1;
          } else if (
            (direction === 1 && index === (current - 1 + total) % total) || // prev slide when moving next
            (direction === -1 && index === (current + 1) % total) // next slide when moving prev
          ) {
            translateX = direction * -100; // slide out opposite side
            zIndex = 15;
            opacity = 1;
          }

          return (
            <div
              key={index}
              className="absolute top-0 left-0 w-full h-full transition-transform duration-[1200ms] ease-in-out"
              style={{
                transform: `translateX(${translateX}%)`,
                zIndex,
                opacity,
                transitionProperty: "transform, opacity",
              }}
            >
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                style={{ objectFit: "contain" }}
                priority={index === current}
              />
            </div>
          );
        })}
      </div>

      {/* Buttons container */}
      <div className="absolute inset-0 flex justify-between items-center px-4 z-30 pointer-events-none">
        <button
          onClick={goPrev}
          aria-label="Previous Slide"
          className="bg-white bg-opacity-70 p-3 rounded-full shadow pointer-events-auto select-none"
        >
          ⬅
        </button>
        <button
          onClick={goNext}
          aria-label="Next Slide"
          className="bg-white bg-opacity-70 p-3 rounded-full shadow pointer-events-auto select-none"
        >
          ➡
        </button>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white bg-opacity-70 rounded-full px-3 py-1 text-xs z-30 select-none">
        {current + 1} / {total}
      </div>
    </div>
  );
}