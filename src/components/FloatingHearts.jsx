import React, { useMemo } from "react";
import { motion } from "framer-motion";

const FloatingHearts = () => {
  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        id: index,
        x: Math.random() * 100,
        duration: 10 + Math.random() * 9,
        delay: Math.random() * 9,
        size: 12 + Math.random() * 20,
        drift: -20 + Math.random() * 40,
        rotation: -12 + Math.random() * 24,
        opacity: 0.08 + Math.random() * 0.12,
      })),
    []
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-[#ff4d6d]"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            filter: "drop-shadow(0 4px 8px rgba(255, 77, 109, 0.06))",
          }}
          initial={{
            y: "110vh",
            x: 0,
            scale: 0.7,
            rotate: heart.rotation,
            opacity: 0,
          }}
          animate={{
            y: "-15vh",
            x: [0, heart.drift, 0],
            scale: [0.7, 1, 0.85],
            rotate: [
              heart.rotation,
              heart.rotation + 8,
              heart.rotation - 5,
              heart.rotation,
            ],
            opacity: [
              0,
              heart.opacity,
              heart.opacity * 0.85,
              0,
            ],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.15, 0.8, 1],
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;