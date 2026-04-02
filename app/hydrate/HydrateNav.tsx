"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Specs", href: "#specs" },
  { label: "Story", href: "#story" },
];

export default function HydrateNav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ── Scroll-aware background ──────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Entry animation ──────────────────────────────────
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  // ── Mobile menu: lock body scroll ───────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        id="hydrate-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 clamp(1.25rem, 5vw, 3.5rem)",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
          background: scrolled
            ? "rgba(5, 5, 5, 0.75)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          borderBottom: scrolled
            ? "1px solid rgba(0,243,255,0.08)"
            : "1px solid transparent",
          opacity: 0, // GSAP will animate this in
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* ── Logo ─────────────────────────────────── */}
        <a
          href="/hydrate"
          id="hydrate-nav-logo"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
          }}
        >
          {/* Droplet icon */}
          <svg width="22" height="28" viewBox="0 0 22 28" fill="none" aria-hidden="true">
            <path
              d="M11 0 C11 0 0 12 0 18 C0 24.627 4.925 28 11 28 C17.075 28 22 24.627 22 18 C22 12 11 0 11 0Z"
              fill="url(#dropGrad)"
            />
            <defs>
              <linearGradient id="dropGrad" x1="11" y1="0" x2="11" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0084ff" stopOpacity="0.7" />
              </linearGradient>
            </defs>
          </svg>
          <span style={{
            fontFamily: "var(--font-geist-sans), sans-serif",
            fontWeight: 900,
            fontSize: "1.05rem",
            letterSpacing: "0.15em",
            color: "#fff",
            textTransform: "uppercase",
          }}>
            Hydrate
          </span>
        </a>

        {/* ── Desktop Links ─────────────────────────── */}
        <ul
          style={{
            display: "flex",
            gap: "2.5rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="hydrate-nav-links"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                style={{
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  transition: "color 0.25s ease",
                  position: "relative",
                  paddingBottom: "2px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#00f3ff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)";
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ──────────────────────────── */}
        <a
          href="#buy"
          id="hydrate-nav-cta"
          className="hydrate-nav-cta"
          style={{
            padding: "0.5rem 1.4rem",
            borderRadius: "2rem",
            border: "1px solid rgba(0,243,255,0.5)",
            background: "rgba(0,243,255,0.06)",
            color: "#00f3ff",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            textDecoration: "none",
            backdropFilter: "blur(8px)",
            transition: "all 0.3s ease",
            fontFamily: "var(--font-geist-sans), sans-serif",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,243,255,0.15)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(0,243,255,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,243,255,0.06)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
          }}
        >
          Order Now
        </a>

        {/* ── Hamburger (mobile only) ───────────────── */}
        <button
          id="hydrate-nav-menu-btn"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="hydrate-hamburger"
          style={{
            display: "none",
            flexDirection: "column",
            gap: "5px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          <span style={{
            display: "block",
            width: "22px",
            height: "2px",
            background: menuOpen ? "#00f3ff" : "rgba(255,255,255,0.8)",
            borderRadius: "2px",
            transition: "transform 0.3s ease, opacity 0.3s ease, background 0.3s ease",
            transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
          }} />
          <span style={{
            display: "block",
            width: "22px",
            height: "2px",
            background: menuOpen ? "#00f3ff" : "rgba(255,255,255,0.8)",
            borderRadius: "2px",
            transition: "opacity 0.3s ease",
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: "block",
            width: "22px",
            height: "2px",
            background: menuOpen ? "#00f3ff" : "rgba(255,255,255,0.8)",
            borderRadius: "2px",
            transition: "transform 0.3s ease, background 0.3s ease",
            transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
          }} />
        </button>
      </nav>

      {/* ── Mobile Drawer ──────────────────────────────── */}
      <div
        id="hydrate-mobile-menu"
        aria-hidden={!menuOpen}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          background: "rgba(5,5,5,0.96)",
          backdropFilter: "blur(24px)",
          transition: "opacity 0.35s ease, visibility 0.35s ease",
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={() => setMenuOpen(false)}
            style={{
              color: menuOpen ? "rgba(255,255,255,0.75)" : "transparent",
              textDecoration: "none",
              fontSize: "clamp(1.6rem, 7vw, 2.2rem)",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "var(--font-geist-sans), sans-serif",
              transition: "color 0.25s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#00f3ff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.75)"; }}
          >
            {label}
          </a>
        ))}
        <a
          href="#buy"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: "1rem",
            padding: "0.8rem 2.5rem",
            borderRadius: "2rem",
            border: "1px solid rgba(0,243,255,0.5)",
            background: "rgba(0,243,255,0.08)",
            color: "#00f3ff",
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
            fontFamily: "var(--font-geist-sans), sans-serif",
          }}
        >
          Order Now
        </a>
      </div>

      {/* ── Responsive styles ───────────────────────────── */}
      <style>{`
        @media (max-width: 680px) {
          .hydrate-nav-links,
          .hydrate-nav-cta {
            display: none !important;
          }
          .hydrate-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
