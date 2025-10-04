// Header component for Broken Robot Chat UI
// Contains branding, connection status, and action buttons

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Header = ({
  isConnected,
  connectionState,
  reconnectAttempts,
  onReconnect,
  onClearMessages,
  onToggleStats
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const logoVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.05,
      rotate: [0, -2, 2, 0],
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  const getConnectionColor = () => {
    switch (connectionState) {
      case 'connected':
        return 'text-green-400';
      case 'connecting':
        return 'text-yellow-400';
      default:
        return 'text-red-400';
    }
  };

  const getConnectionIcon = () => {
    switch (connectionState) {
      case 'connected':
        return '✅';
      case 'connecting':
        return '🔄';
      default:
        return '❌';
    }
  };

  return (
    <motion.header
      className="relative z-20 bg-gradient-to-r from-bg-primary/90 to-bg-secondary/90 backdrop-blur-md border-b border-br-cyan/20"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Branding */}
          <motion.div
            className="flex items-center space-x-4"
            variants={logoVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            {/* Robot Avatar with Glitch Effect */}
            <div className="relative">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-br-gray to-br-gray-light rounded-full flex items-center justify-center border-2 border-br-cyan/50 shadow-glow-soft"
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(0, 212, 255, 0.3)',
                    '0 0 20px rgba(0, 212, 255, 0.5)',
                    '0 0 10px rgba(0, 212, 255, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Robot Face */}
                <div className="text-2xl relative">
                  <span className="absolute inset-0 text-br-gold">×</span>
                  <span className="text-br-cyan relative">○</span>
                </div>
              </motion.div>

              {/* Glitch effect overlay */}
              {!isConnected && (
                <motion.div
                  className="absolute inset-0 bg-red-500/20 rounded-full"
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </div>

            {/* Brand Text */}
            <div>
              <motion.h1
                className="text-2xl font-bold"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-gradient-cyan">BROKEN</span>
                <span className="text-gradient-gold ml-2">ROBOT</span>
              </motion.h1>
              <motion.p
                className="text-xs text-text-secondary font-cyber"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Chat Interface v1.0
              </motion.p>
            </div>
          </motion.div>

          {/* Connection Status and Actions */}
          <div className="flex items-center space-x-4">
            {/* Connection Status */}
            <motion.div
              className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-black/20 border border-br-cyan/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-sm">{getConnectionIcon()}</span>
              <span className={`text-sm font-cyber ${getConnectionColor()}`}>
                {connectionState === 'connected' && 'Conectado'}
                {connectionState === 'connecting' && 'Conectando...'}
                {connectionState === 'disconnected' && 'Desconectado'}
              </span>
              {reconnectAttempts > 0 && (
                <span className="text-xs text-text-secondary">
                  ({reconnectAttempts}/5)
                </span>
              )}
            </motion.div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Reconnect Button */}
              {!isConnected && (
                <motion.button
                  onClick={onReconnect}
                  className="btn-ghost text-sm px-3 py-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🔄 Reconectar
                </motion.button>
              )}

              {/* Menu Toggle */}
              <motion.button
                onClick={() => setShowMenu(!showMenu)}
                className="relative w-8 h-8 rounded-lg bg-br-gray/30 border border-br-cyan/30 flex items-center justify-center hover:bg-br-gray/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: showMenu ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ⚙️
                </motion.div>
              </motion.button>

              {/* Dropdown Menu */}
              {showMenu && (
                <motion.div
                  className="absolute top-full right-0 mt-2 w-48 bg-bg-secondary/95 backdrop-blur-md rounded-lg border border-br-cyan/30 shadow-neon-cyan p-2 z-30"
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                >
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        onClearMessages();
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-br-cyan/10 text-text-secondary hover:text-br-cyan transition-colors flex items-center space-x-2"
                    >
                      <span>🗑️</span>
                      <span>Limpiar Chat</span>
                      <span className="ml-auto text-xs opacity-60">Ctrl+K</span>
                    </button>

                    <button
                      onClick={() => {
                        onToggleStats();
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-br-cyan/10 text-text-secondary hover:text-br-cyan transition-colors flex items-center space-x-2"
                    >
                      <span>📊</span>
                      <span>Estadísticas</span>
                      <span className="ml-auto text-xs opacity-60">F12</span>
                    </button>

                    {!isConnected && (
                      <button
                        onClick={() => {
                          onReconnect();
                          setShowMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-br-cyan/10 text-text-secondary hover:text-br-cyan transition-colors flex items-center space-x-2"
                      >
                        <span>🔄</span>
                        <span>Reconectar</span>
                        <span className="ml-auto text-xs opacity-60">Ctrl+R</span>
                      </button>
                    )}

                    <div className="border-t border-br-cyan/20 mt-2 pt-2">
                      <div className="px-3 py-1 text-xs text-text-secondary">
                        <div>Estado: <span className={`font-cyber ${getConnectionColor()}`}>
                          {connectionState}
                        </span></div>
                        <div>WebSocket: ws://localhost:8765</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setShowMenu(false)}
        />
      )}

      {/* Decorative Circuit Lines */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-br-cyan/50 to-transparent" />

      {/* Animated glow effect */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-px bg-br-cyan/30"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.8, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transformOrigin: 'left' }}
      />
    </motion.header>
  );
};

export default Header;
