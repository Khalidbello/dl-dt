function FeatureCard({
  className,
  side,
  eyebrow,
  title,
  icon,
  stat,
  statLabel,
}: {
  className: string;
  side: "left" | "right";
  eyebrow: string;
  title: string;
  icon: string;
  stat: string;
  statLabel: string;
}) {
  return (
    <div
      className={`${className} opacity-0 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 transition-all duration-300 ${side === "right" ? "border-l-[3px] border-l-[#00f3ff] shadow-[-5px_0_20px_rgba(0,243,255,0.15)]" : "border-r-[3px] border-r-[#00f3ff] shadow-[5px_0_20px_rgba(0,243,255,0.15)]"}`}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xl">{icon}</span>
        <span className="text-[0.6rem] font-mono font-bold tracking-[0.3em] text-cyber-blue uppercase">
          {eyebrow}
        </span>
      </div>
      <p className="text-[0.82rem] text-white/65 leading-relaxed mb-4">
        {title}
      </p>
      <div className="flex items-baseline gap-2">
        <span className="text-[1.6rem] font-black text-cyber-blue font-mono [text-shadow:0_0_12px_#00f3ff]">
          {stat}
        </span>
        <span className="text-[0.65rem] text-white/35 uppercase tracking-wider">
          {statLabel}
        </span>
      </div>
    </div>
  );
}

export default FeatureCard;
