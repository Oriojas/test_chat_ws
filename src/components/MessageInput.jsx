// Message Input component for Broken Robot Chat UI
// Handles user input with cyberpunk styling and animations

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const MessageInput = ({
  value,
  onChange,
  onSend,
  isConnected,
  isSending,
  disabled
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSend(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  const inputVariants = {
    focused: {
      scale: 1.02,
      boxShadow: '0 0 25px rgba(0, 212, 255, 0.4)',
      transition: { duration: 0.2 }
    },
    unfocused: {
      scale: 1,
      boxShadow: '0 0 10px rgba(0, 212, 255, 0.1)',
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    sending: {
      rotate: 360,
      transition: { duration: 1, repeat: Infinity, ease: 'linear' }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-end space-x-3">
        {/* Text Input */}
        <motion.div
          className="flex-1 relative"
          variants={inputVariants}
          animate={isFocused ? 'focused' : 'unfocused'}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={
              isConnected
                ? "Escribe tu mensaje a Sad Robot..."
                : "Conectando..."
            }
            disabled={disabled}
            className="chat-input min-h-[50px] max-h-[120px]"
            data-chat-input
            rows={1}
          />

          {/* Character counter */}
          {value.length > 0 && (
            <div className="absolute bottom-2 right-3 text-xs text-text-secondary opacity-60">
              {value.length}
            </div>
          )}
        </motion.div>

        {/* Send Button */}
        <motion.button
          type="submit"
          disabled={!value.trim() || disabled}
          className={`p-3 rounded-xl transition-all duration-300 ${
            !value.trim() || disabled
              ? 'bg-br-gray/20 text-text-secondary cursor-not-allowed'
              : 'btn-primary'
          }`}
          variants={buttonVariants}
          initial="idle"
          whileHover={!disabled && value.trim() ? "hover" : "idle"}
          whileTap={!disabled && value.trim() ? "tap" : "idle"}
          animate={isSending ? "sending" : "idle"}
        >
          {isSending ? '⏳' : '🚀'}
        </motion.button>
      </div>

      {/* Input hints */}
      <div className="flex justify-between items-center mt-2 text-xs text-text-secondary opacity-70">
        <div>
          <kbd className="bg-br-gray/20 px-1 py-0.5 rounded text-xs">Enter</kbd> para enviar,{' '}
          <kbd className="bg-br-gray/20 px-1 py-0.5 rounded text-xs">Shift+Enter</kbd> nueva línea
        </div>

        {!isConnected && (
          <div className="text-red-400 text-xs">
            ⚠️ Sin conexión
          </div>
        )}
      </div>
    </form>
  );
};

export default MessageInput;
