"use client";

import React, { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import Navbar from "./nav-bar";
import Footer from "./footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlineShoppingBag } from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger);

const Page: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Responsive Hooks
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ maxWidth: 1024 });

  const imageCount = 201;
  const images = useRef<HTMLImageElement[]>([]);
  const imageState = { frame: 0 };

  const getImagePath = (index: number) => {
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

    images.current[0].onload = render;

    // --- GSAP Responsive MatchMedia ---
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: `(min-width: 1025px)`,
        isMobile: `(max-width: 1024px)`,
      },
      (context) => {
        const { isMobile } = context.conditions;

        // Initial State adjustment
        gsap.set(canvas, {
          rotateZ: isMobile ? 15 : 25,
          scale: isMobile ? 1.1 : 1.5,
          transformOrigin: "center center",
        });

        gsap.set("#hero-text-1-line, #hero-text-2-line", { width: 0 });
        gsap.set("#hero-text-2, #hero-text-1", { y: -100 });
        gsap.set("#hero-bt", { y: 100, opacity: 0 });
        gsap.set(".des-txt-anim", { y: 200, opacity: 0 });
        gsap.set(".exp-anim-1", { x: -200, opacity: 0 });
        gsap.set(".exp-anim-2", { opacity: 0, y: 300 });
        gsap.set(".exit-anim-1", { opacity: 0, x: 1000 });
        gsap.set(".exit-anim-2", { opacity: 0, x: -1000 });

        const bounce = gsap.to(canvas, {
          y: isMobile ? 15 : 30,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          paused: true,
        });

        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom 70%",
            onEnter: () => bounce.play(),
            onLeave: () => bounce.pause(),
            onEnterBack: () => bounce.play(),
            onLeaveBack: () => bounce.pause(),
          },
        });

        heroTl.to("#hero-text-1-line, #hero-text-2-line", {
          width: "100%",
          duration: 1.5,
        });

        heroTl.to("#hero-text-1, #hero-text-2", {
          opacity: 100,
          y: 0,
          duration: 1,
        });

        heroTl.to("#hero-bt", {
          opacity: 1,
          y: 0,
          delay: 1,
          duration: 2,
        });

        // Design Section Animation
        const designTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#design-section",
            start: "top 40%",
            end: "top top",
            scrub: 2,
          },
        });

        designTl.to(canvas, {
          rotateZ: 0,
          scale: isMobile ? 0.8 : 1,
          x: isMobile ? "0%" : "-40%", // Don't shift left on mobile to avoid hitting text
          duration: 2,
        });

        designTl.to(
          ".des-txt-anim",
          {
            stagger: 1,
            duration: 0.7,
            opacity: 1,
            y: 0,
          },
          0.5,
        );

        // Experience Section Animation
        const expTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#experience-section",
            start: "top 50%",
            end: "top top",
            scrub: 2,
          },
        });

        expTl
          .to(canvas, {
            rotateZ: 90,
            scale: isMobile ? 1.2 : 1.5,
            x: "0",
            duration: 2,
          })
          .to(
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

        expTl.to(
          ".exp-anim-1",
          {
            stagger: 1,
            duration: 0.7,
            opacity: 1,
            x: 0,
          },
          0.5,
        );

        expTl.to(
          ".exp-anim-2",
          {
            duration: 0.7,
            opacity: 1,
            y: 0,
          },
          //0.5,
        );

        // Exit Section Animation
        const exitTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#exit-section",
            start: "top 50%",
            end: "top top",
            scrub: 2,
          },
        });

        exitTl.to(canvas, {
          rotateZ: isMobile ? -10 : -20,
          scale: isMobile ? 1.1 : 1.5,
          duration: 2,
        });

        exitTl.to(
          ".exit-anim-1, .exit-anim-2",
          {
            stagger: 3,
            duration: 0.7,
            opacity: 1,
            x: 0,
          },
          0.7,
        );
      },
    );

    return () => {
      mm.revert(); // Clean up everything
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="w-full text-white relative">
      <Navbar />

      {/* Responsive Canvas Container */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <canvas
          ref={canvasRef}
          width={700}
          height={394}
          className="w-[90%] md:w-full max-w-[700px] aspect-[700/394] h-auto object-contain"
        />
      </div>

      <div className="relative text-slate-50">
        {/* Hero Section */}
        <div
          ref={heroRef}
          className=" relative w-full h-screen overflow-hidden"
        >
          <div
            className={`absolute left-[5%] right-[5%] overflow-hidden ${isMobile ? "top-[15%] text-left" : "top-[30%] text-left"}`}
          >
            <div
              id="hero-text-1-line"
              className={`h-0.5 bg-slate-100 w-0 max-w-[20rem]  ${isMobile ? "mr-auto" : "mr-auto"}`}
            ></div>
            <h1
              id="hero-text-1"
              className={`opacity-0 uppercase mt-4 font-bold ${isMobile ? "text-2xl" : "text-4xl max-w-[20rem]"}`}
            >
              Ever wonder what it is like to walk on Air
            </h1>
          </div>

          <div
            className={`absolute left-[5%] right-[5%] overflow-hidden ${isMobile ? "bottom-[20%] text-right" : "bottom-[10%] text-right"}`}
          >
            <div
              id="hero-text-2-line"
              className={`h-0.5 bg-slate-100 w-0 max-w-[20rem] ${isMobile ? "ml-auto" : "ml-auto"}`}
            ></div>
            <h1
              id="hero-text-2"
              className={`opacity-0 uppercase mt-4 font-bold ${isMobile ? "text-2xl" : "text-4xl ml-auto max-w-[20rem]"}`}
            >
              Skywalker Bragado! Gives you that feeling
            </h1>
          </div>

          <button
            id="hero-bt"
            className="opcaity-0 px-6 py-3 flex items-center gap-x-3 border border-slate-100 rounded-full absolute bottom-8 left-1/2 -translate-x-1/2 text-sm md:text-lg bg-black/20 backdrop-blur-sm"
          >
            Get The Feel <HiOutlineShoppingBag size={20} />
          </button>
        </div>

        {/* Design Section */}
        <div
          id="design-section"
          className={`  grid w-full h-screen px-6 overflow-hidden ${
            isMobile ? "grid-cols-1" : "grid-cols-4 md:px-0"
          }`}
        >
          {/* Only render the spacer if not on mobile to keep the grid consistent */}
          {!isMobile && <div className="col-span-2"></div>}

          <div
            className={`flex flex-col  gap-y-10 relative md:gap-y-20 ${
              isMobile
                ? "col-span-1 justify-start items-center text-center gap-y-12  mt-24" // Shifted down for mobile shoe space
                : "justify-center col-start-3 col-span-2 items-start text-left"
            }`}
          >
            <h3
              className={`des-txt-anim ${isMobile ? "text-4xl" : "text-6xl"} font-bold uppercase`}
            >
              Movement Should feel Natural
            </h3>

            <p
              className={`des-txt-anim ${isMobile ? "text-xs" : "text-lg"} opacity-80 uppercase tracking-widest leading-relaxed`}
            >
              SKY WALKER adapts to your stride, absorbing impact and returning
              energy.
            </p>

            <div
              className={`flex gap-x-4 w-full ${isMobile ? "justify-center absolute bottom-20 right-2 left-2" : "justify-start"}`}
            >
              {["RUN", "LEAP", "FLY"].map((tag) => (
                <div
                  key={tag}
                  className={` overflow-hidden border-b border-slate-100 px-2 ${isMobile ? "text-xs" : "text-lg"}`}
                >
                  <div className="des-txt-anim">{tag}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div id="experience-section" className=" relative w-full h-screen">
          <div
            className={`absolute overflow-hidden border-l-2 border-slate-200 pl-4 ${isMobile ? "top-[15%] left-[4%]" : "top-[30%] left-[8%]"}`}
          >
            <h3 className="exp-anim-1 text-xl md:text-3xl font-bold uppercase">
              Light on your feet.
            </h3>
            <p className="exp-anim-1 text-lg md:text-xl opacity-60 pl-10">
              Heavy on innovation.
            </p>
          </div>
          <div
            className={`exp-anim-2 absolute ${isMobile ? "bottom-[15%] left-1/2 -translate-x-1/2 text-center" : "right-[10%] bottom-[10%] text-right"} text-sm md:text-lg max-w-[15rem] uppercase tracking-tighter`}
          >
            SKY WALKER transforms everyday movement into something
            extraordinary.
          </div>
        </div>

        {/* Exit Section */}
        <div
          id="exit-section"
          className=" relative w-full h-screen font-bold flex flex-col items-center justify-center"
        >
          <div
            className={`absolute border-r-2 pr-4 ${isMobile ? "top-[20%]" : "top-[20%] left-[20%] border-r-2 pr-4 text-lg"} uppercase`}
          >
            <span className="exit-anim-1 "> The future might ahead.</span>
          </div>
          <div
            className={`absolute border-l-2 pl-4 ${isMobile ? "bottom-[20%]" : "bottom-[10%] right-[10%] border-l-2 pl-4 text-lg"} uppercase`}
          >
            <span className="exit-anim-2 relative">
              With SKY-WALKER... You walk on it.
            </span>
          </div>
          {/* Background circle */}
          {/* <div className="w-[60%] md:w-[30%] aspect-square rounded-full bg-zinc-900/50 blur-3xl -z-10"></div> */}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Page;
