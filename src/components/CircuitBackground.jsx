// Circuit Background component for Broken Robot Chat UI
// Animated cyberpunk-style circuit board background

import React from 'react';
import { motion } from 'framer-motion';

const CircuitBackground = () => {
  // Circuit line data for different patterns
  const horizontalLines = Array.from({ length: 8 }, (_, i) => ({
    id: `h-${i}`,
    top: `${15 + i * 12}%`,
    width: `${40 + Math.random() * 40}%`,
    left: `${Math.random() * 30}%`,
    delay: i * 0.5
  }));

  const verticalLines = Array.from({ length: 6 }, (_, i) => ({
    id: `v-${i}`,
    left: `${20 + i * 15}%`,
    height: `${30 + Math.random() * 30}%`,
    top: `${Math.random() * 40}%`,
    delay: i * 0.7
  }));

  const dots = Array.from({ length: 20 }, (_, i) => ({
    id: `dot-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 3
  }));

  const complexPaths = [
    // L-shaped path
    {
      id: 'path-1',
      d: 'M10,20 L60,20 L60,70',
      delay: 0
    },
    // Step pattern
    {
      id: 'path-2',
      d: 'M80,30 L90,30 L90,45 L95,45 L95,60',
      delay: 1
    },
    // Zigzag
    {
      id: 'path-3',
      d: 'M15,80 L25,70 L35,80 L45,70 L55,80',
      delay: 2
    }
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Animated grid drift */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          x: [0, 50, 0],
          y: [0, 50, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 0, 255, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Horizontal circuit lines */}
      {horizontalLines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute h-px bg-gradient-to-r from-transparent via-br-cyan to-transparent"
          style={{
            top: line.top,
            left: line.left,
            width: line.width
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: [0, 1, 1, 0],
            opacity: [0, 0.6, 0.6, 0]
          }}
          transition={{
            duration: 4,
            delay: line.delay,
            repeat: Infinity,
            repeatDelay: 3
          }}
        />
      ))}

      {/* Vertical circuit lines */}
      {verticalLines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute w-px bg-gradient-to-b from-transparent via-br-magenta to-transparent"
          style={{
            left: line.left,
            top: line.top,
            height: line.height
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{
            scaleY: [0, 1, 1, 0],
            opacity: [0, 0.4, 0.4, 0]
          }}
          transition={{
            duration: 5,
            delay: line.delay,
            repeat: Infinity,
            repeatDelay: 4
          }}
        />
      ))}

      {/* Circuit dots/nodes */}
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-br-cyan"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
            boxShadow: [
              '0 0 0px rgba(0, 212, 255, 0)',
              '0 0 10px rgba(0, 212, 255, 0.8)',
              '0 0 0px rgba(0, 212, 255, 0)'
            ]
          }}
          transition={{
            duration: 3,
            delay: dot.delay,
            repeat: Infinity,
            repeatDelay: 5
          }}
        />
      ))}

      {/* Complex SVG paths for circuit patterns */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {complexPaths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            fill="none"
            stroke="url(#circuitGradient)"
            strokeWidth="0.3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              opacity: [0, 0.6, 0.6, 0]
            }}
            transition={{
              duration: 6,
              delay: path.delay,
              repeat: Infinity,
              repeatDelay: 8
            }}
          />
        ))}

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF00FF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Flowing particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-br-cyan rounded-full"
            initial={{
              x: -10,
              y: Math.random() * window.innerHeight
            }}
            animate={{
              x: window.innerWidth + 10,
              y: Math.random() * window.innerHeight
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              delay: i * 2,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              filter: 'drop-shadow(0 0 4px #00D4FF)'
            }}
          />
        ))}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-20 h-20">
        <motion.div
          className="w-full h-px bg-gradient-to-r from-br-cyan to-transparent absolute top-4"
          animate={{ scaleX: [0, 1] }}
          transition={{ duration: 2, delay: 1 }}
        />
        <motion.div
          className="h-full w-px bg-gradient-to-b from-br-cyan to-transparent absolute left-4"
          animate={{ scaleY: [0, 1] }}
          transition={{ duration: 2, delay: 1.5 }}
        />
      </div>

      <div className="absolute top-0 right-0 w-20 h-20">
        <motion.div
          className="w-full h-px bg-gradient-to-l from-br-magenta to-transparent absolute top-4"
          animate={{ scaleX: [0, 1] }}
          transition={{ duration: 2, delay: 2 }}
        />
        <motion.div
          className="h-full w-px bg-gradient-to-b from-br-magenta to-transparent absolute right-4"
          animate={{ scaleY: [0, 1] }}
          transition={{ duration: 2, delay: 2.5 }}
        />
      </div>

      {/* Subtle radial gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 50%,
            rgba(0, 212, 255, 0.1) 0%,
            rgba(10, 14, 27, 0.8) 70%,
            rgba(10, 14, 27, 1) 100%)`
        }}
      />

      {/* Glitch effect overlay (subtle) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0, 0.05, 0],
          x: [0, 2, -2, 0]
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: Math.random() * 10 + 5
        }}
        style={{
          background: `linear-gradient(90deg,
            rgba(255, 0, 255, 0.1) 0%,
            transparent 50%,
            rgba(0, 212, 255, 0.1) 100%)`
        }}
      />
    </div>
  );
};

export default CircuitBackground;
