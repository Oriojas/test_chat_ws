// Chat Container component for Broken Robot Chat UI
// Main container for chat messages, input, and streaming interface

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import MessageList, { MessageInput, TypingIndicator } from "./MessageList.jsx";

const ChatContainer = ({
  messages,
  currentStreamingMessage,
  isTyping,
  isConnected,
  onSendMessage,
  error,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const { t } = useLanguage();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, currentStreamingMessage]);

  // Scroll to bottom smoothly
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  // Handle message sending
  const handleSendMessage = async (message) => {
    if (!message.trim() || !isConnected || isSending) {
      return;
    }

    setIsSending(true);

    try {
      const success = await onSendMessage(message.trim());

      if (success) {
        setInputValue("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  // Container animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const welcomeMessageVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Welcome message for empty chat
  const WelcomeMessage = () => (
    <motion.div
      className="flex-1 flex items-center justify-center p-8"
      variants={welcomeMessageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center max-w-md">
        <motion.div
          className="text-6xl mb-6"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🤖
        </motion.div>

        <motion.h2
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-gradient-cyan">
            {t("chat.welcome.greeting")}{" "}
          </span>
          <span className="text-gradient-gold">
            {t("chat.welcome.sadRobot")}
          </span>
        </motion.h2>

        <motion.p
          className="text-text-secondary leading-relaxed mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {t("chat.welcome.universe")}{" "}
          <span className="text-br-gold font-semibold">Broken Robot</span>.{" "}
          {t("chat.welcome.description")}
          <br />
          <span className="text-sm opacity-75 mt-2 block">
            {t("chat.welcome.tagline")}
          </span>
        </motion.p>

        <motion.div
          className="flex justify-center space-x-4 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-br-cyan/10 border border-br-cyan/30 rounded-lg px-3 py-2 text-sm">
            {t("chat.welcome.features.philosophy")}
          </div>
          <div className="bg-br-magenta/10 border border-br-magenta/30 rounded-lg px-3 py-2 text-sm">
            {t("chat.welcome.features.help")}
          </div>
          <div className="bg-br-gold/10 border border-br-gold/30 rounded-lg px-3 py-2 text-sm">
            {t("chat.welcome.features.company")}
          </div>
        </motion.div>

        <motion.div
          className="text-xs text-text-secondary opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {t("chat.welcome.startHint")}
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col h-full max-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Messages Area */}
      <div className="flex-1 overflow-hidden relative">
        {messages.length === 0 && !currentStreamingMessage ? (
          <WelcomeMessage />
        ) : (
          <div className="h-full overflow-y-auto pb-4">
            <div className="min-h-full flex flex-col justify-end">
              {/* Message List */}
              <MessageList
                messages={messages}
                currentStreamingMessage={currentStreamingMessage}
              />

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && !currentStreamingMessage && <TypingIndicator />}
              </AnimatePresence>

              {/* Scroll anchor */}
              <div ref={messagesEndRef} className="h-1" />
            </div>
          </div>
        )}

        {/* Connection overlay when disconnected */}
        <AnimatePresence>
          {!isConnected && (
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center">
                <div className="text-4xl mb-4 opacity-50">🔌</div>
                <div className="text-lg font-semibold text-red-400 mb-2">
                  {t("chat.messages.noConnection")}
                </div>
                <div className="text-sm text-text-secondary">
                  {t("chat.messages.reconnectingAuto")}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="border-t border-br-cyan/20 bg-gradient-to-r from-bg-primary/80 to-bg-secondary/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto p-4">
          <MessageInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
            isConnected={isConnected}
            isSending={isSending}
            disabled={!isConnected || isSending}
          />

          {/* Status indicators */}
          <div className="flex justify-between items-center mt-2 text-xs text-text-secondary">
            <div className="flex items-center space-x-4">
              <span
                className={`flex items-center space-x-1 ${
                  isConnected ? "text-green-400" : "text-red-400"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isConnected ? "bg-green-400" : "bg-red-400"
                  }`}
                />
                <span>
                  {isConnected
                    ? t("chat.messages.connected")
                    : t("chat.messages.disconnected")}
                </span>
              </span>

              {currentStreamingMessage && (
                <motion.span
                  className="text-br-cyan flex items-center space-x-1"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span>📡</span>
                  <span>{t("chat.messages.streaming")}</span>
                </motion.span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <span>
                {t("chat.messages.messageCount")}: {messages.length}
              </span>
              {error && (
                <span className="text-red-400">{t("chat.errors.error")}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatContainer;
