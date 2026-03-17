"use client";

import React, { useState, useRef } from "react";
import { HiMenuAlt3, HiOutlineX, HiOutlineShoppingBag } from "react-icons/hi";
import { gsap } from "gsap";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    if (!isOpen) {
      setIsOpen(true);
      // GSAP: Slide menu in and stagger link appearance
      gsap.to(menuRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
      gsap.fromTo(
        linksRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, delay: 0.2 },
      );
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => setIsOpen(false),
      });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LEFT: Desktop Links */}
        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-light">
          <a href="#" className="hover:text-gray-400 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            About
          </a>
        </div>

        {/* CENTER: Brand Name */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <h1 className="text-xl font-bold tracking-[0.2em]">SKY WALKER</h1>
        </div>

        {/* RIGHT: Shop & CTA */}
        <div className="hidden md:flex items-center space-x-6">
          <button className="flex items-center space-x-2 hover:opacity-70 transition-opacity">
            <HiOutlineShoppingBag size={20} />
            <span className="text-xs uppercase tracking-tighter">Buy Now</span>
          </button>
        </div>

        {/* MOBILE: Hamburger Button */}
        <div className="md:hidden ml-auto">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <HiOutlineX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        ref={menuRef}
        className={`fixed inset-0 bg-black flex flex-col items-center justify-center translate-x-full md:hidden`}
        style={{ height: "100vh" }}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-6 right-6 text-white"
        >
          <HiOutlineX size={32} />
        </button>

        <div
          ref={linksRef}
          className="flex flex-col items-center space-y-8 text-2xl uppercase tracking-[0.3em]"
        >
          <a href="#" onClick={toggleMenu} className="hover:text-gray-500">
            About Us
          </a>
          <a href="#" onClick={toggleMenu} className="hover:text-gray-500">
            Contact Us
          </a>
          <button
            onClick={toggleMenu}
            className="mt-4 px-8 py-3 border border-white hover:bg-white hover:text-black transition-all text-sm"
          >
            Buy Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// const { removeBackground } = require("@imgly/background-removal-node");
// const fs = require("fs");
// const path = require("path");

// const inputDir = path.join(__dirname, "public/sky-walker/frames");
// const outputDir = path.join(__dirname, "public/sky-walker/output");

// if (!fs.existsSync(outputDir)) {
//   fs.mkdirSync(outputDir, { recursive: true });
// }

// async function processFrames() {
//     try {
//         const files = fs.readdirSync(inputDir).filter(file => file.toLowerCase().endsWith('.png'));
//         console.log(`🚀 Found ${files.length} PNGs. Starting removal...`);

//         for (const file of files) {
//             const inputPath = path.join(inputDir, file);
//             const outputName = file.replace(/\.png$/i, '.webp');
//             const outputPath = path.join(outputDir, outputName);

//             console.log(`⏳ Processing: ${file}`);

//             try {
//                 // 1. Read file into a standard Buffer
//                 const fileBuffer = fs.readFileSync(inputPath);

//                 // 2. Wrap the Buffer in a Blob and explicitly define it as a PNG
//                 // This is the "magic" step that clears the "Unsupported format" error
//                 const imageBlob = new Blob([fileBuffer], { type: 'image/png' });

//                 // 3. Process
//                 const resultBlob = await removeBackground(imageBlob, {
//                     output: {
//                         format: 'image/webp',
//                         quality: 0.8
//                     }
//                 });

//                 // 4. Save result
//                 const resultBuffer = Buffer.from(await resultBlob.arrayBuffer());
//                 fs.writeFileSync(outputPath, resultBuffer);

//                 console.log(`✅ Saved: ${outputName}`);
//             } catch (err) {
//                 console.error(`❌ Failed ${file}:`, err.message);
//             }
//         }
//         console.log('✨ All frames complete!');
//     } catch (error) {
//         console.error('❌ Fatal Error:', error);
//     }
// }

// processFrames();
