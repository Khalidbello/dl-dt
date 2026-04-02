"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";

const ProductDetailing: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const floatingTextRef = useRef<HTMLDivElement>(null);

  const moveTextToCanvas = () => {
    if (canvasRef.current && floatingTextRef.current) {
      // 1. Get the current position of the canvas on the screen
      const canvasRect = canvasRef.current.getBoundingClientRect();

      // 2. Animate the text to those exact coordinates
      // We use x and y from the rect which are relative to the viewport
      gsap.to(floatingTextRef.current, {
        duration: 1,
        x: canvasRect.left,
        y: canvasRect.top,
        ease: "power3.out",
        delay: 3,
      });

      gsap.to(canvasRef.current, {
        duration: 1,
        rotateZ: 40,
        ease: "power3.out",
      });
    }
  };

  return (
    <div className="relative min-h-[300vh] bg-slate-900">
      {/* Fixed Container */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Absolute Canvas inside Fixed Parent */}
        <canvas
          ref={canvasRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-lg shadow-2xl"
        />
      </div>

      {/* Triggering Content */}
      <div className="relative z-10 flex flex-col items-center pt-20">
        <div
          ref={floatingTextRef}
          className="fixed top-10 left-10 p-4 bg-white text-black font-bold rounded"
        >
          Product Specs
        </div>

        <button
          onClick={moveTextToCanvas}
          className="mt-[80vh] px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
        >
          Snap Text to Canvas
        </button>
      </div>
    </div>
  );
};

export default ProductDetailing;
