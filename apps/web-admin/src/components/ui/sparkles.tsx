import React, { useId, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

export interface SparklesCoreProps {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
}

export const SparklesCore: React.FC<SparklesCoreProps> = ({
  id,
  className,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1.2,
  speed = 0.8,
  particleColor = "#FFFFFF",
  particleDensity = 120,
}) => {
  const generatedId = useId();
  const canvasId = id || generatedId;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
      color: string;
    }

    let particles: Particle[] = [];

    const count = Math.floor((width * height) / (10000 / (particleDensity / 10)));
    const particleCount = Math.min(Math.max(count, 30), 200);

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * (maxSize - minSize) + minSize,
          speedX: (Math.random() - 0.5) * speed * 0.5,
          speedY: (Math.random() - 0.5) * speed * 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          fadeSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
          color: particleColor,
        });
      }
    };

    initParticles();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.opacity += p.fadeSpeed;
        if (p.opacity > 1 || p.opacity < 0.15) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));
        ctx.shadowBlur = p.size > 1 ? 6 : 0;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [maxSize, minSize, particleColor, particleDensity, speed]);

  return (
    <canvas
      ref={canvasRef}
      id={canvasId}
      className={cn("pointer-events-none block", className)}
      style={{
        background: background,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export const SparklesPreview: React.FC<{
  title?: string;
  subtitle?: string;
  particleColor?: string;
  glowColor?: string;
}> = ({
  title = "NEXT-GEN 4K CINEMA",
  subtitle = "Ultra-Low Latency Broadcast Platform",
  particleColor = "#fda4af",
  glowColor = "#e11d48",
}) => {
  return (
    <div className="relative w-full overflow-hidden flex flex-col items-center justify-center py-10">
      <div className="relative z-20 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm md:text-base font-semibold text-zinc-400 mt-2">
            {subtitle}
          </p>
        )}
      </div>

      <div className="w-[32rem] md:w-[48rem] h-28 relative mt-4">
        {/* Gradients tailored to velvet burgundy & white */}
        <div
          className="absolute inset-x-20 top-0 h-[2px] w-3/4 blur-sm"
          style={{ background: `linear-gradient(to right, transparent, ${glowColor}, transparent)` }}
        />
        <div
          className="absolute inset-x-20 top-0 h-px w-3/4"
          style={{ background: `linear-gradient(to right, transparent, ${glowColor}, transparent)` }}
        />
        <div
          className="absolute inset-x-44 top-0 h-[4px] w-1/3 blur-sm"
          style={{ background: `linear-gradient(to right, transparent, #ffffff, transparent)` }}
        />
        <div
          className="absolute inset-x-44 top-0 h-px w-1/3"
          style={{ background: `linear-gradient(to right, transparent, #ffffff, transparent)` }}
        />

        {/* Core sparkles */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.4}
          particleDensity={140}
          className="w-full h-full"
          particleColor={particleColor}
        />

        {/* Radial mask to blend edges */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 350px 140px at 50% 0%, transparent 20%, #050507 90%)",
          }}
        />
      </div>
    </div>
  );
};
