// Connection Status component for Broken Robot Chat UI
// Shows connection state, errors, and provides reconnection controls

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const ConnectionStatus = ({
  isConnected,
  connectionState,
  error,
  onClearError,
  onReconnect,
  isReconnecting,
  reconnectAttempts,
}) => {
  const { t } = useLanguage();
  // Don't show anything if connected and no errors
  if (isConnected && !error) {
    return null;
  }

  const getStatusConfig = () => {
    if (error) {
      return {
        type: "error",
        icon: "⚠️",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        textColor: "text-red-400",
        glowColor: "shadow-red-500/20",
      };
    }

    if (isReconnecting) {
      return {
        type: "reconnecting",
        icon: "🔄",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/30",
        textColor: "text-yellow-400",
        glowColor: "shadow-yellow-500/20",
      };
    }

    if (connectionState === "connecting") {
      return {
        type: "connecting",
        icon: "🔗",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
        textColor: "text-blue-400",
        glowColor: "shadow-blue-500/20",
      };
    }

    return {
      type: "disconnected",
      icon: "❌",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      textColor: "text-red-400",
      glowColor: "shadow-red-500/20",
    };
  };

  const config = getStatusConfig();

  const getMessage = () => {
    if (error) {
      return `${t("connectionStatus.error")}: ${error}`;
    }

    if (isReconnecting) {
      return `${t("connectionStatus.reconnecting")} (${reconnectAttempts}/5)`;
    }

    if (connectionState === "connecting") {
      return t("connectionStatus.connecting");
    }

    return t("connectionStatus.disconnected");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const iconVariants = {
    connecting: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      },
    },
    reconnecting: {
      rotate: [0, 360],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
    error: {
      x: [-2, 2, -2, 2, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 2,
      },
    },
    default: {},
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`relative z-10 ${config.bgColor} ${config.borderColor} border-b backdrop-blur-sm`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Status Message */}
            <div className="flex items-center space-x-3">
              <motion.div
                className={`text-xl ${config.textColor}`}
                variants={iconVariants}
                animate={
                  config.type === "connecting"
                    ? "connecting"
                    : config.type === "reconnecting"
                      ? "reconnecting"
                      : config.type === "error"
                        ? "error"
                        : "default"
                }
              >
                {config.icon}
              </motion.div>

              <div>
                <motion.p
                  className={`font-medium ${config.textColor}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {getMessage()}
                </motion.p>

                {/* Additional info for different states */}
                {connectionState === "connecting" && (
                  <motion.p
                    className="text-xs text-text-secondary mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {t("header.menu.websocket")}
                  </motion.p>
                )}

                {error && (
                  <motion.p
                    className="text-xs text-text-secondary mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {t("connectionStatus.verifyServer")}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Progress indicator for reconnecting */}
              {isReconnecting && (
                <motion.div
                  className="flex items-center space-x-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-1 bg-br-gray/30 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-br-cyan to-br-blue rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${(reconnectAttempts / 5) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="text-xs text-text-secondary">
                    {reconnectAttempts}/5
                  </span>
                </motion.div>
              )}

              {/* Clear Error Button */}
              {error && (
                <motion.button
                  onClick={onClearError}
                  className="px-3 py-1 text-xs bg-br-gray/20 border border-br-cyan/30 rounded-md hover:bg-br-cyan/10 hover:border-br-cyan text-br-cyan transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("connectionStatus.clearError")}
                </motion.button>
              )}

              {/* Reconnect Button */}
              {!isConnected && !isReconnecting && (
                <motion.button
                  onClick={onReconnect}
                  className="px-4 py-1 text-xs bg-gradient-to-r from-br-cyan to-br-blue text-white rounded-md hover:shadow-glow-soft transition-all duration-300 transform hover:scale-105"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("connectionStatus.reconnect")}
                </motion.button>
              )}

              {/* Cancel Reconnection (during reconnection attempts) */}
              {isReconnecting && (
                <motion.button
                  onClick={() => window.location.reload()}
                  className="px-3 py-1 text-xs bg-br-gray/20 border border-red-500/30 rounded-md hover:bg-red-500/10 text-red-400 transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("connectionStatus.cancel")}
                </motion.button>
              )}
            </div>
          </div>

          {/* Loading dots for connecting state */}
          {(connectionState === "connecting" || isReconnecting) && (
            <motion.div
              className="flex justify-center mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center space-x-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-1 h-1 rounded-full ${config.textColor.replace("text-", "bg-")}`}
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Subtle glow effect */}
        <motion.div
          className={`absolute inset-0 ${config.glowColor} -z-10 blur-sm`}
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ConnectionStatus;
