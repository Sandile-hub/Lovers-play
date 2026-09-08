import React from 'react';
import { motion } from 'framer-motion';

const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    duration: 8 + Math.random() * 10,
    delay: Math.random() * 10,
    size: 16 + Math.random() * 24,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-pink/20"
          style={{ left: `${h.x}%`, fontSize: h.size }}
          initial={{ y: '100vh', opacity: 0.7 }}
          animate={{ y: '-10vh', opacity: 0 }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Inner div handles continuous rotation to avoid snapping */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 10, // Professional, slow, elegant speed
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            ❤️
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;