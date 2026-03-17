"use client";

import React, { useEffect, useRef } from "react";
import Navbar from "./nav-bar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlineShoppingBag } from "react-icons/hi2";

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

const Page: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const imageCount = 201;
  const images = useRef<HTMLImageElement[]>([]);
  const imageState = { frame: 0 }; // Start at index 0

  const getImagePath = (index: number) => {
    // Adding 1 because your files likely start at 0001
    const paddedIndex = (index + 1).toString().padStart(4, "0");
    return `/sky-walker/output/frame_${paddedIndex}.webp`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    // 1. Preload Images
    for (let i = 0; i < imageCount; i++) {
      const img = new Image();
      img.src = getImagePath(i);
      images.current.push(img);
    }

    const render = () => {
      const frameIndex = Math.min(
        images.current.length - 1,
        Math.round(imageState.frame),
      );

      const img = images.current[frameIndex];
      if (!img) return;

      if (!img.complete) {
        img.onload = render;
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // Ensure the first frame renders immediately once loaded
    images.current[0].onload = render;

    // Set initial rotation (makes the canvas "flat" or edge-on)
    gsap.set(canvasRef.current, {
      rotateZ: 25,
      scale: "1.5",
      transformOrigin: "center center", // Recommended for predictable rotation
    });

    // 1. Create the floating animation but don't play it immediately
    const bounce = gsap.to(canvasRef.current, {
      y: 30,
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      paused: true, // Start paused
    });

    // 2. Use ScrollTrigger to play/pause the bounce based on visibility
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top bottom", // Starts when the top of hero enters the bottom of the screen
      end: "bottom 70%", // Stops when the bottom of hero leaves the top of the screen
      onEnter: () => bounce.play(),
      onLeave: () => bounce.pause(),
      onEnterBack: () => bounce.play(),
      onLeaveBack: () => bounce.pause(),
    });

    // animation for design section
    const designTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#design-section",
        start: "top 20%",
        end: "top top",
        toggleActions: "play none none reverse",
        // scrub: 1.5, // Slightly higher for a smoother, premium feel
        pin: false,
        //  markers: true,
      },
    });

    designTl.to(canvasRef.current, {
      rotateZ: 0,
      scale: "1",
      x: "-50%",
      transformOrigin: "center center", // Recommended for predictable rotation
      duration: 2,
    });

    // animation for design section
    const expriencTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#experience-section",
        start: "top 50%",
        end: "top top",
        toggleActions: "play none none reverse",
        // scrub: 1.5, // Slightly higher for a smoother, premium feel
        pin: false,
        markers: true,
      },
    });

    expriencTl.to(canvasRef.current, {
      rotateZ: 90,
      scale: "1.5",
      x: "0",
      transformOrigin: "center center", // Recommended for predictable rotation
      duration: 2,
    });

    expriencTl.to(
      imageState,
      {
        frame: 100,
        snap: "frame",
        ease: "none",
        onUpdate: render,
        duration: 2,
      },
      0,
    );
  }, []);

  return (
    // Changed bg-white to bg-black for that futuristic look
    <div className="w-full min-h-screen bg-black text-white relative">
      <Navbar />

      {/* Container for the Canvas */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <canvas
          ref={canvasRef}
          width={700}
          height={394}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] aspect-[700/394] h-auto object-contain"
        >
          Your browser does not support the canvas element.
        </canvas>
      </div>

      <div className="relative h-screen text-slate-50">
        {/* hero Section (The Scroll Trigger) */}
        <div
          ref={heroRef}
          className="hero-section overflow-hidden relative w-full h-full text-4xl"
        >
          <div className="hero-text-1 absolute top-[30%] left-[5%]">
            <div className="h-0.5 bg-slate-100"></div>
            <div className=" w-2 h-2 rounded-full absolute top-[-4px] left-0 bg-slate-100"></div>
            <h1 className="uppercase max-w-[20rem] mt-4 pl-5">
              Ever wonder what it is like to walk on Air
            </h1>
          </div>
          <div className="hero-text-2 absolute bottom-[10%] right-[5%]">
            <div className="h-0.5 bg-slate-100"></div>
            <div className="w-2 h-2 rounded-full absolute top-[-4px]  left-0 bg-slate-100"></div>
            <h1 className="uppercase max-w-[20rem] text-left mt-4 pl-5">
              Skywalker Bragado! Gives you that feeling
            </h1>
          </div>
          <button className="px-6 py-4 flex items-center gap-x-3 border border-slate-100 rounded-full absolute bottom-2 left-1/2 -translate-x-1/2 text-lg">
            Get The Feel
            <HiOutlineShoppingBag size={20} />
          </button>
        </div>

        {/*  Design section */}
        <div
          id="design-section"
          className="design-section grid grid-cols-4 overflow-hidden relative w-full h-full"
        >
          <div className="col-span-2"></div>
          <div className="col-start-3 col-span-2 flex flex-col items-start justify-center gap-y-20">
            <h3 className="text-6xl">Movement Should feel Natural</h3>
            <p className="text-lg">
              SKY WALKER adapts to your stride, absorbing impact and returning
              energy with every step
            </p>
            <div className="flex items-end justify-start gap-x-4 w-full text-lg">
              <div className="mb-2 px-2 border-b border-slate-100">
                <span>RUN</span>
              </div>
              <div className="mb-2 px-2 border-b border-slate-100">
                <span>RUN</span>
              </div>
              <div className="mb-2 px-2 border-b border-slate-100">
                <span>RUN</span>
              </div>
            </div>
          </div>
        </div>

        {/*  Experienc section */}
        <div
          id="experience-section"
          className="design-section grid grid-cols-4 overflow-hidden relative w-full h-full"
        >
          <div className="absolute top-[30%] left-[10%]">
            <h3 className="border-l border-l-slate-200 py-2 pl-1 text-xl font-bold uppercase">
              <span>Light on your feet.</span>
            </h3>
            <p className="text-xl ml-6">Heavy on innovation.</p>
          </div>

          <div className="absolute right-[10%] bottom-[10%] text-lg max-w-[10rem]">
            SKY WALKER transforms everyday movement into something
            extraordinary.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
