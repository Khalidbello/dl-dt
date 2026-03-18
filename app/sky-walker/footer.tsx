import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-slate-900 relative overflow-hidden">
      {/* subtle gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 grid gap-10 md:grid-cols-3">
        {/* Brand */}
        <div className="space-y-4">
          <h2 className="font-exo font-semibold text-slate-200 tracking-[0.35em] uppercase text-xs md:text-sm">
            Sky Walker // 2026
          </h2>

          <p className="font-geometric text-slate-500 text-[10px] md:text-xs max-w-xs leading-relaxed uppercase tracking-widest">
            Engineered for the transition between earth and atmosphere.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col md:items-center gap-4 text-[10px] md:text-xs font-geometric uppercase tracking-[0.25em] text-slate-500">
          {["Instagram", "X (Twitter)", "Technical Specs", "Legal"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="relative w-fit group transition-colors duration-300"
              >
                <span className="group-hover:text-slate-200 transition-colors">
                  {item}
                </span>

                {/* futuristic underline */}
                <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-sky-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ),
          )}
        </div>

        {/* Right Side / Meta */}
        <div className="flex flex-col md:items-end justify-between gap-6">
          <div className="text-[9px] md:text-[10px] font-mono text-slate-600 uppercase tracking-wider">
            Built by Khalid Bello
          </div>

          <div className="text-[9px] md:text-[10px] font-mono text-slate-600 uppercase tracking-wider">
            © {new Date().getFullYear()} All Rights Reserved
          </div>
        </div>
      </div>

      {/* bottom line glow */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
    </footer>
  );
};

export default Footer;
