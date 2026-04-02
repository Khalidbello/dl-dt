"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HydrateNav from "./HydrateNav";
import HydrateFooter from "./HydrateFooter";
import { useMediaQuery } from "react-responsive";
import FeatureCard from "./featur-card";

gsap.registerPlugin(ScrollTrigger);

export default function HydratePage() {
  const [animationPercentage, setAnimationPercentage] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const getViewportCenter = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  useEffect(() => {
    // get all important coordinates for transition

    const heroTargetCenter = getViewportCenter(
      document.getElementById("hero-target"),
    );
    const canvasCenter = getViewportCenter(document.getElementById("canvas"));
    const canvasParentCenter = getViewportCenter(
      document.getElementById("canvas-parent"),
    );

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const img = new Image();
    img.src = "/hydrated/output/hydrate2.webp";

    const render = () => {
      if (!img) return;
      if (!img.complete) {
        img.onload = render;
        return;
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    img.onload = render;

    const ctx = gsap.context(() => {
      // const bounce = gsap.to(canvasRef.current, {
      //   y: isMobile ? 0 : ,
      //   duration: 2,
      //   ease: "sine.inOut",
      //   repeat: -1,
      //   yoyo: true,
      //   paused: false,
      // });

      // ─── HERO Animations ───
      gsap.fromTo(
        ".hero-letter",
        { opacity: 0, y: 60, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.06,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.3,
        },
      );

      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1 },
      );

      gsap.fromTo(
        ".hero-scroll-hint",
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.8 },
      );

      gsap.fromTo(
        ".hero-bottle-wrap",
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.6,
        },
      );

      // ─── SCROLL MASTER TIMELINE ───
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 3,
          pin: true,
          // markers: true,
          onUpdate: (self) => {
            const progress = Math.round(self.progress * 100);
            setAnimationPercentage(progress);
          },
          // onEnter: () => bounce.play(),
          // onLeave: () => bounce.pause(),
          // onEnterBack: () => bounce.play(),
          // onLeaveBack: () => bounce.play(),
        },
      });

      tl.fromTo(
        canvasRef.current,
        {
          x: `${heroTargetCenter.x - canvasCenter.x}`,
          y: `${heroTargetCenter.y - canvasCenter.y}`,
          duration: 1,
          scale: 0.8,
        },
        {
          scale: 1.1,
          y: `${canvasCenter.y - canvasParentCenter.y}`,
          x: `${canvasCenter.x - canvasParentCenter.x}`,
          rotateZ: 40,
          duration: 0.1,
          ease: "power2.out",
        },
        0,
      );

      tl.to(
        canvasRef.current,
        {
          scale: 0.9,
          rotateZ: 0,
          duration: 0.1,
          ease: "power2.out",
        },
        0.1,
      );

      tl.to(
        canvasRef.current,
        {
          x: isMobile ? "-50vw" : "-15vw",
          rotateY: 12,
          ease: "power1.inOut",
          duration: 0.3,
        },
        0.25,
      );

      tl.fromTo(
        ".card-smart",
        { opacity: 0, x: 80, filter: "blur(2px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.2 },
        0.3,
      );

      tl.fromTo(
        ".card-titanium",
        { opacity: 0, x: 80, filter: "blur(2px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.2 },
        0.38,
      );

      tl.to(
        canvasRef.current,
        {
          x: isMobile ? "50vw" : "15vw",
          rotateY: -12,
          ease: "power1.inOut",
          duration: 0.3,
        },
        0.55,
      );
      tl.to(".card-smart", { opacity: 0, x: -60, duration: 0.15 }, 0.55);
      tl.to(".card-titanium", { opacity: 0, x: -60, duration: 0.15 }, 0.58);

      tl.fromTo(
        ".card-clean",
        { opacity: 0, x: -80, filter: "blur(2px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.2 },
        0.6,
      );
      tl.fromTo(
        ".card-hydro",
        { opacity: 0, x: -80, filter: "blur(2px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.2 },
        0.68,
      );

      tl.to(
        canvasRef.current,
        { x: 0, rotateY: 0, scale: 1.08, ease: "power2.inOut", duration: 0.2 },
        0.8,
      );
      tl.to(".card-clean", { opacity: 0, x: 60, duration: 0.15 }, 0.8);
      tl.to(".card-hydro", { opacity: 0, x: 60, duration: 0.15 }, 0.83);

      tl.fromTo(
        ".cta-block",
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, ease: "back.out(1.4)", duration: 0.2 },
        0.85,
      );

      tl.to(canvasRef.current, { opacity: 0, duration: 0.1 }, 0.98);
    });

    return () => ctx.revert();
  }, []);

  const heroLetters = "HYDRATE".split("");

  return (
    <main className="bg-[#050505] min-h-[500vh] overflow-x-hidden text-white">
      <div className="fixed  hidden top-30 l-10 w-10 h-10 flex items-center justify-center rounded-xl bg-white text-blue-500">
        {animationPercentage}
      </div>
      {/* canva image display */}
      <div
        id="canvas-parent"
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-50 bg-transparent"
      >
        <canvas
          id="canvas"
          ref={canvasRef}
          width={1000}
          height={1000}
          className="w-[90%] md:w-full max-w-[700px] aspect-[700/700] h-auto object-contain"
        />
      </div>

      <HydrateNav />

      {/* ── LANDING INTRO ── */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-start md:items-center justify-center overflow-hidden px-[clamp(1.5rem,6vw,5rem)]"
      >
        {/* Radial ambient glow */}
        <div className="absolute w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,243,255,0.07)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        {/* Animated grid lines */}
        <div className="fixed inset-0 bg-[linear-gradient(rgba(0,243,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.04)_1px,transparent_1px)] bg-[length:60px_60px] pointer-events-none" />

        <div className="relative z-10 max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* LEFT: Text column */}
          <div className="flex flex-col gap-y-0 mt-18 md:mt-0  min-h-[screen/3]">
            <span className="hero-sub opacity-0 font-mono text-[0.68rem] tracking-[0.5em] text-[#00f3ff] uppercase mb-6 mt-4">
              Premium Hydration Technology
            </span>

            <h1 className="flex flex-wrap gap-[0.05em] mb-7">
              {heroLetters.map((letter, i) => (
                <span
                  key={i}
                  className="hero-letter opacity-0 font-sans text-[clamp(3rem,7vw,6rem)] font-extrabold leading-[0.95] tracking-tighter"
                >
                  {letter}
                </span>
              ))}
            </h1>

            <p className="hero-sub opacity-0 text-[clamp(0.85rem,1.3vw,1rem)] text-white/40 max-w-[380px] mt-2 mb-10 leading-relaxed tracking-wide">
              Engineered for those who demand more from every drop. Futuristic.
              Pure. Unstoppable.
            </p>

            <div className="hero-sub opacity-0 flex flex-wrap gap-4">
              <a
                href="#buy"
                className="px-8 py-3 rounded-full border border-[#00f3ff] bg-[#00f3ff]/10 text-[#00f3ff] text-[0.78rem] font-bold tracking-widest uppercase backdrop-blur-md shadow-[0_0_20px_rgba(0,243,255,0.15)] transition-all duration-300 hover:bg-[#00f3ff]/20 hover:shadow-[0_0_32px_rgba(0,243,255,0.35)]"
              >
                Order Now — $129
              </a>
              <a
                href="#features"
                className="px-8 py-3 rounded-full border border-white/10 bg-transparent text-white/50 text-[0.78rem] font-semibold tracking-widest uppercase transition-all duration-300 hover:text-white hover:border-white/30"
              >
                Explore Features
              </a>
            </div>
          </div>

          {/* RIGHT: Bottle image */}
          <div
            id="hero-target"
            className="hero-bottle-wrap relative h-[clamp(380px,60vh,680px)] flex items-center justify-center opacity-0"
          >
            <div className="absolute w-[280px] h-[280px] rounded-full border border-[#00f3ff]/15 animate-[ping_3s_linear_infinite] pointer-events-none" />
            <div className="absolute w-[200px] h-[200px] rounded-full border border-[#00f3ff]/10 animate-[ping_3s_linear_infinite_1s] pointer-events-none" />
            <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[55%] h-[80px] bg-[radial-gradient(ellipse,rgba(0,243,255,0.3)_0%,transparent_70%)] blur-[18px] pointer-events-none" />
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint absolute -bottom-2 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
          <span className="text-[0.4rem] md:text-[0.6rem] tracking-[0.4em] text-cyber-blue/50 uppercase font-mono">
            Scroll to explore
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-[#00f3ff] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── SCROLL SCENE ── */}
      <section
        ref={containerRef}
        className="relative h-screen flex items-center justify-center overflow-hidden bg-transparent"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,243,255,0.05)_0%,transparent_70%)] pointer-events-none" />

        {/* LEFT CARDS */}
        <div className="absolute left-[clamp(1rem,5vw,8rem)] top-1/2 -translate-y-1/2 flex flex-col gap-5 z-10 max-w-[280px]">
          <FeatureCard
            className="card-clean"
            side="left"
            eyebrow="UV Self-Cleaning"
            title="Kill 99.9% of bacteria in 60 seconds."
            icon="⚡"
            stat="60s"
            statLabel="Sanitization"
          />
          <FeatureCard
            className="card-hydro"
            side="left"
            eyebrow="HydroTrack AI"
            title="Tracks your intake and reminds you to stay ahead."
            icon="🤖"
            stat="100%"
            statLabel="Goal tracking"
          />
        </div>

        {/* BOTTLE */}
        <div
          ref={bottleRef}
          className="relative z-20 w-[clamp(200px,22vw,320px)] h-[clamp(400px,55vh,640px)] flex items-center justify-center opacity-0 [perspective:800px] [transform-style:preserve-3d]"
        >
          <div className="absolute w-full h-[60%] rounded-full bg-[radial-gradient(circle,rgba(0,243,255,0.25)_0%,transparent_70%)] bottom-0 blur-3xl z-0" />

          <div className="cta-block absolute -bottom-24 opacity-0 flex flex-col items-center gap-3 z-30 w-full">
            <p className="text-[0.65rem] tracking-[0.4em] text-cyber-blue/60 uppercase font-mono">
              Limited Edition Drop
            </p>
            <button className="px-10 py-3.5 rounded-full border border-cyber-blue bg-cyber-blue/10 text-cyber-blue text-sm font-bold tracking-widest uppercase backdrop-blur-xl shadow-[0_0_20px_rgba(0,243,255,0.2)] hover:bg-[#00f3ff]/20 hover:shadow-[0_0_40px_rgba(0,243,255,0.4)] transition-all duration-300">
              Buy Now — $129
            </button>
          </div>
        </div>

        {/* RIGHT CARDS */}
        <div className="absolute right-[clamp(1rem,5vw,8rem)] top-1/2 -translate-y-1/2 flex flex-col gap-5 z-10 max-w-[280px]">
          <FeatureCard
            className="card-smart"
            side="right"
            eyebrow="Smart Temp™"
            title="Keeps drinks ice-cold for 36h or steaming hot for 18h."
            icon="🌡"
            stat="36h"
            statLabel="Cold retention"
          />
          <FeatureCard
            className="card-titanium"
            side="right"
            eyebrow="Titanium Mesh Filter"
            title="Military-grade filtration. Zero compromise on taste."
            icon="🔬"
            stat="0.2μm"
            statLabel="Filter precision"
          />
        </div>

        {/* Aesthetic Overlay */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.08)_2px,rgba(0,0,0,0.08)_4px)] pointer-events-none z-[1]" />
      </section>

      <HydrateFooter />
    </main>
  );
}
