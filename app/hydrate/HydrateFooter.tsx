"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FOOTER_LINKS = {
  Product: ["Features", "Specs", "Comparison", "Reviews"],
  Company: ["About", "Careers", "Press", "Contact"],
  Legal: ["Privacy Policy", "Terms of Use", "Cookie Policy"],
};

const SOCIALS = [
  {
    label: "X",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
  },
];

function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{time}</span>;
}

export default function HydrateFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-col",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
      gsap.fromTo(
        ".footer-bottom-row",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="hydrate-footer"
      style={{
        position: "relative",
        background: "#050505",
        borderTop: "1px solid rgba(0,243,255,0.08)",
        overflow: "hidden",
        padding: "5rem clamp(1.5rem, 6vw, 5rem) 0",
      }}
    >
      {/* ── Ambient grid background ──────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,243,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      {/* ── Top glow line ────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(0,243,255,0.5), transparent)",
          filter: "blur(1px)",
        }}
      />

      {/* ── Radial glow ─────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(0,243,255,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Main content ─────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Brand + tagline */}
        <div className="footer-col" style={{ marginBottom: "3.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
            <svg width="20" height="25" viewBox="0 0 22 28" fill="none" aria-hidden="true">
              <path
                d="M11 0 C11 0 0 12 0 18 C0 24.627 4.925 28 11 28 C17.075 28 22 24.627 22 18 C22 12 11 0 11 0Z"
                fill="url(#footerDropGrad)"
              />
              <defs>
                <linearGradient id="footerDropGrad" x1="11" y1="0" x2="11" y2="28" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0084ff" stopOpacity="0.7" />
                </linearGradient>
              </defs>
            </svg>
            <span style={{
              fontFamily: "var(--font-geist-sans), sans-serif",
              fontWeight: 900,
              fontSize: "1rem",
              letterSpacing: "0.2em",
              color: "#fff",
              textTransform: "uppercase",
            }}>
              Hydrate
            </span>
          </div>
          <p style={{
            margin: 0,
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.35)",
            maxWidth: "240px",
            lineHeight: 1.8,
            letterSpacing: "0.02em",
          }}>
            The future of hydration.<br />Engineered for the next generation.
          </p>
        </div>

        {/* Links grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "3rem 2rem",
          marginBottom: "4rem",
        }}>
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="footer-col">
              <h4 style={{
                margin: "0 0 1.25rem",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#00f3ff",
                fontFamily: "var(--font-geist-mono), monospace",
              }}>
                {category}
              </h4>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        textDecoration: "none",
                        fontSize: "0.8rem",
                        letterSpacing: "0.03em",
                        transition: "color 0.2s ease",
                        fontFamily: "var(--font-geist-sans), sans-serif",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)"; }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="footer-col" style={{ gridColumn: "span 1" }}>
            <h4 style={{
              margin: "0 0 1.25rem",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#00f3ff",
              fontFamily: "var(--font-geist-mono), monospace",
            }}>
              Stay Updated
            </h4>
            <p style={{
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.35)",
              marginBottom: "1rem",
              lineHeight: 1.7,
            }}>
              Get early access and drop alerts.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <input
                id="hydrate-footer-email"
                type="email"
                placeholder="your@email.com"
                aria-label="Email for newsletter"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(0,243,255,0.2)",
                  borderRadius: "0.5rem",
                  padding: "0.65rem 1rem",
                  color: "#fff",
                  fontSize: "0.78rem",
                  outline: "none",
                  fontFamily: "var(--font-geist-mono), monospace",
                  transition: "border-color 0.25s ease",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = "#00f3ff"; }}
                onBlur={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(0,243,255,0.2)"; }}
              />
              <button
                id="hydrate-footer-subscribe"
                style={{
                  padding: "0.65rem 1rem",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(0,243,255,0.4)",
                  background: "rgba(0,243,255,0.07)",
                  color: "#00f3ff",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  fontFamily: "var(--font-geist-sans), sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,243,255,0.15)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 16px rgba(0,243,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,243,255,0.07)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* ── Divider ──────────────────────────────────── */}
        <div style={{
          width: "100%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(0,243,255,0.12), transparent)",
          marginBottom: "1.75rem",
        }} />

        {/* ── Bottom row ───────────────────────────────── */}
        <div
          className="footer-bottom-row"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.25rem",
            paddingBottom: "2.5rem",
          }}
        >
          {/* Copyright */}
          <span style={{
            fontSize: "0.68rem",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.05em",
            fontFamily: "var(--font-geist-mono), monospace",
          }}>
            © {new Date().getFullYear()} HYDRATE™ — All rights reserved.
          </span>

          {/* Live system time */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.65rem",
            color: "rgba(0,243,255,0.4)",
            fontFamily: "var(--font-geist-mono), monospace",
            letterSpacing: "0.12em",
          }}>
            <span style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#00f3ff",
              boxShadow: "0 0 6px #00f3ff",
              animation: "hfPulse 2s ease-in-out infinite",
              display: "inline-block",
            }} />
            SYS · <LiveClock />
          </div>

          {/* Social links */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {SOCIALS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.4)",
                  transition: "all 0.25s ease",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "#00f3ff";
                  el.style.borderColor = "rgba(0,243,255,0.4)";
                  el.style.boxShadow = "0 0 14px rgba(0,243,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "rgba(255,255,255,0.4)";
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.boxShadow = "none";
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Large background wordmark ─────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "clamp(4rem, 14vw, 10rem)",
            fontWeight: 900,
            color: "transparent",
            WebkitTextStroke: "1px rgba(0,243,255,0.04)",
            letterSpacing: "-0.04em",
            userSelect: "none",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-geist-sans), sans-serif",
            pointerEvents: "none",
          }}
        >
          HYDRATE
        </div>
      </div>

      <style>{`
        @keyframes hfPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </footer>
  );
}
