// Typing Indicator component for Broken Robot Chat UI
// Shows animated indicator when Sad Robot is typing/thinking

import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const dotVariants = {
    animate: {
      y: [0, -8, 0],
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="message-base message-bot opacity-80"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex items-start space-x-3">
        <motion.div
          className="avatar-robot flex-shrink-0"
          animate={{
            boxShadow: [
              '0 0 5px rgba(0, 212, 255, 0.2)',
              '0 0 15px rgba(0, 212, 255, 0.4)',
              '0 0 5px rgba(0, 212, 255, 0.2)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🤖
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-semibold text-br-cyan">
              Sad Robot
            </span>
            <span className="text-xs text-text-secondary opacity-60">
              escribiendo...
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <span className="text-sm text-text-secondary mr-2">
              💭
            </span>

            {/* Animated dots */}
            <div className="flex items-center space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-br-cyan rounded-full"
                  variants={dotVariants}
                  animate="animate"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>

            {/* Thinking text animation */}
            <motion.span
              className="text-xs text-br-cyan/70 ml-3"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              procesando respuesta...
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
