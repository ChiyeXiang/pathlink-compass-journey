import React from "react";
import { cn } from "@/lib/utils";

interface ShineBorderProps {
  children?: React.ReactNode;
  className?: string;
  shineColor?: string;
  duration?: number;
}

export function ShineBorder({
  children,
  className,
  shineColor = "#15B078",
  duration = 2000,
}: ShineBorderProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-10"
        style={{
          background: `linear-gradient(90deg, transparent, ${shineColor}20, ${shineColor}60, ${shineColor}, ${shineColor}60, ${shineColor}20, transparent)`,
          backgroundSize: "200% 100%",
          animation: `shine ${duration}ms linear infinite`,
          borderRadius: "inherit",
        }}
      />
      <div className="relative z-20 bg-white rounded-xl" style={{ margin: "2px" }}>
        {children}
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shine {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `
      }} />
    </div>
  );
} 