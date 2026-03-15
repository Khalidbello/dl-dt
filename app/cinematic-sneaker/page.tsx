"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlineChevronDoubleDown } from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger);

const ShowDisplay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  const imageCount = 26;
  const images = useRef<HTMLImageElement[]>([]);
  const imageState = { frame: 0 };

  const getImagePath = (index: number) => {
    const paddedIndex = index.toString().padStart(3, "0");
    return `/show_show/frame_${paddedIndex}.jpg`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    for (let i = 1; i <= imageCount; i++) {
      const img = new Image();
      img.src = getImagePath(i);
      images.current.push(img);
    }

    const render = () => {
      // Logic: Ensure we never exceed the array length
      const frameIndex = Math.min(Math.round(imageState.frame), imageCount - 1);
      const img = images.current[frameIndex];

      if (img && img.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    images.current[0].onload = render;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 0%",
        end: "+=400%",
        scrub: 3, // Slightly higher for a smoother, premium feel
        pin: true,
        onUpdate: (self) => setScrollPercent(Math.floor(self.progress * 100)),
      },
    });

    // 1. Image Sequence Animation
    tl.to(
      imageState,
      {
        frame: imageCount - 1,
        snap: "frame",
        ease: "none",
        onUpdate: render,
      },
      0,
    );

    // 2. Stylish Text Transitions (Spaced out for readability)
    // 2. Sequenced Text Transitions (Zero Overlap)

    // Section 1: 5% to 20%
    tl.fromTo(
      ".text-0",
      { opacity: 0, y: 100, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.06 },
      0.01,
    ).to(
      ".text-0",
      { opacity: 0, y: -100, filter: "blur(10px)", duration: 0.06 },
      0.1,
    );

    // Section 2: 30% to 45%
    tl.fromTo(
      ".text-1",
      { opacity: 0, x: 60, filter: "blur(10px)" },
      { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.06 },
      0.15,
    ).to(
      ".text-1",
      { opacity: 0, x: -60, filter: "blur(10px)", duration: 0.06 },
      0.3,
    );

    // Section 3: 55% to 70%
    tl.fromTo(
      ".text-2",
      { opacity: 0, scale: 0.9, filter: "blur(10px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.06 },
      0.35,
    ).to(
      ".text-2",
      { opacity: 0, scale: 1.1, filter: "blur(10px)", duration: 0.06 },
      0.5,
    );

    // Section 4: 80% to 95%
    tl.fromTo(
      ".text-3",
      { opacity: 0, y: 300 },
      { opacity: 1, y: 0, duration: 0.3 },
      0.6,
    ); //.to(".text-3", { opacity: 0, x: -30, duration: 1 }, 0.95);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <div className="relative flex h-screen items-center justify-center bg-gray-800">
        {/* The Title */}
        <p className="relative z-10 text-center font-mono text-5xl text-gray-300">
          Cinematic Sneaker Display
        </p>

        {/* Bouncy Scroll Icon */}
        <div className="pointer-events-none text-center absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-gray-400">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">
            Scroll down to experience
          </span>

          <div className="animate-bounce">
            <HiOutlineChevronDoubleDown size={32} strokeWidth={1} />
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-screen overflow-hidden bg-white"
      >
        {/* Percentage Indicator */}
        <div className="fixed top-5 right-5 z-50 font-mono text-red-500 text-2xl">
          {scrollPercent}%
        </div>

        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />

        <div className="text-overlay pointer-events-none absolute inset-0">
          {/* Text 0 */}
          <div className="text-0 absolute opacity-0 inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-orange-400">
              Introduction
            </span>
            <h2 className="max-w-4xl text-6xl font-black tracking-tighter text-black md:text-8xl">
              The Show <span className="text-orange-400">Begins.</span>
            </h2>
          </div>

          {/* Text 1 */}
          <div className="text-1 absolute opacity-0 inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-orange-400">
              Innovation
            </span>
            <h2 className="max-w-4xl text-6xl font-black tracking-tighter text-black md:text-8xl">
              Unmatched <span className="text-orange-400">Design.</span>
            </h2>
          </div>

          {/* Text 2 */}
          <div className="text-2 absolute opacity-0 inset-0 flex flex-col items-center justify-center text-center px-4">
            <h2 className="max-w-4xl text-6xl font-black tracking-tighter text-black md:text-8xl">
              Built for <span className="italic">Speed.</span>
            </h2>
          </div>

          {/* Text 3 */}
          <div className="text-3 absolute opacity-0 inset-0 flex flex-col items-center justify-center text-center px-4">
            <h2 className="max-w-4xl text-6xl font-black tracking-tighter text-black md:text-8xl">
              Elevate Your{" "}
              <span className="bg-orange-700 text-white inline-block mt-6 rounded-full py-4 px-8">
                Game.
              </span>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowDisplay;
