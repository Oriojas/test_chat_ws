// Message List, Message Input, and Typing Indicator components
// Complete chat components for Broken Robot Chat UI

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Message List Component
const MessageList = ({ messages, currentStreamingMessage }) => {
  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  const getMessageIcon = (message) => {
    if (message.type === 'user') return '👤';
    if (message.type === 'system') return '🔧';
    if (message.isSadRobot) return '🤖';
    return '🤖';
  };

  const getMessageClasses = (message) => {
    const baseClasses = 'message-base animate-fade-in-up';

    if (message.type === 'user') {
      return `${baseClasses} message-user`;
    }

    if (message.type === 'system') {
      return `${baseClasses} bg-gradient-to-r from-br-gold/10 to-br-gold/5 border border-br-gold/20 mx-4`;
    }

    return `${baseClasses} message-bot`;
  };

  return (
    <div className="space-y-1 px-2">
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={getMessageClasses(message)}
            layout
          >
            <div className="flex items-start space-x-3">
              {/* Avatar */}
              <motion.div
                className={`flex-shrink-0 ${
                  message.type === 'user' ? 'avatar-user' : 'avatar-robot'
                } ${message.isSadRobot ? 'glitch' : ''}`}
                whileHover={{ scale: 1.1 }}
              >
                {getMessageIcon(message)}
              </motion.div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                {/* Message Header */}
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`text-sm font-semibold ${
                    message.type === 'user' ? 'text-br-magenta' :
                    message.type === 'system' ? 'text-br-gold' :
                    'text-br-cyan'
                  }`}>
                    {message.type === 'user' ? 'Tú' :
                     message.type === 'system' ? 'Sistema' :
                     'Sad Robot'}
                  </span>

                  <span className="text-xs text-text-secondary opacity-60">
                    {new Date(message.timestamp).toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                {/* Message Text */}
                <div className={`text-sm leading-relaxed ${
                  message.type === 'system' ? 'text-br-gold/80' : 'text-text-primary'
                }`}>
                  {message.text.split('\n').map((line, index) => (
                    <p key={index} className={index > 0 ? 'mt-2' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Current Streaming Message */}
      <AnimatePresence>
        {currentStreamingMessage && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={messageVariants}
            className="message-base message-bot message-streaming"
          >
            <div className="flex items-start space-x-3">
              <motion.div
                className="avatar-robot flex-shrink-0"
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(0, 212, 255, 0.3)',
                    '0 0 20px rgba(0, 212, 255, 0.6)',
                    '0 0 10px rgba(0, 212, 255, 0.3)'
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🤖
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-semibold text-br-cyan">
                    Sad Robot
                  </span>
                  <motion.div
                    className="flex items-center space-x-1"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="w-1 h-1 bg-br-cyan rounded-full"></div>
                    <div className="w-1 h-1 bg-br-cyan rounded-full"></div>
                    <div className="w-1 h-1 bg-br-cyan rounded-full"></div>
                  </motion.div>
                </div>

                <div className="text-sm leading-relaxed text-text-primary">
                  {currentStreamingMessage.split('\n').map((line, index) => (
                    <p key={index} className={index > 0 ? 'mt-2' : ''}>
                      {line}
                      {index === currentStreamingMessage.split('\n').length - 1 && (
                        <motion.span
                          className="inline-block ml-1 w-2 h-4 bg-br-cyan"
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Message Input Component
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

// Typing Indicator Component
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

// Export all components
export default MessageList;
export { MessageInput, TypingIndicator };
