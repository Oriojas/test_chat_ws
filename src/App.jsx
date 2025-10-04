// Main App component for Broken Robot Chat UI
// Integrates all chat components with the Broken Robot theme

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChatContainer from './components/ChatContainer.jsx';
import Header from './components/Header.jsx';
import ConnectionStatus from './components/ConnectionStatus.jsx';
import CircuitBackground from './components/CircuitBackground.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import useChat from './hooks/useChat.js';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const {
    messages,
    currentStreamingMessage,
    isConnected,
    connectionState,
    isTyping,
    error,
    reconnectAttempts,
    isReconnecting,
    sendMessage,
    reconnect,
    clearMessages,
    clearError,
    getConnectionStatus
  } = useChat();

  // App initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + K to clear messages
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        clearMessages();
      }

      // Ctrl/Cmd + R to reconnect
      if ((e.ctrlKey || e.metaKey) && e.key === 'r' && !isConnected) {
        e.preventDefault();
        reconnect();
      }

      // F12 to toggle stats (dev mode)
      if (e.key === 'F12') {
        e.preventDefault();
        setShowStats(!showStats);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isConnected, showStats, clearMessages, reconnect]);

  // App animations
  const appVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const mainContainerVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-bg-primary text-text-primary overflow-hidden relative">
        {/* Circuit Background */}
        <CircuitBackground />

        {/* Main App Container */}
        <motion.div
          className="relative z-10 flex flex-col min-h-screen"
          variants={appVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Header */}
          <Header
            isConnected={isConnected}
            connectionState={connectionState}
            reconnectAttempts={reconnectAttempts}
            onReconnect={reconnect}
            onClearMessages={clearMessages}
            onToggleStats={() => setShowStats(!showStats)}
          />

          {/* Connection Status Bar */}
          <ConnectionStatus
            isConnected={isConnected}
            connectionState={connectionState}
            error={error}
            onClearError={clearError}
            onReconnect={reconnect}
            isReconnecting={isReconnecting}
            reconnectAttempts={reconnectAttempts}
          />

          {/* Main Chat Area */}
          <motion.main
            className="flex-1 flex flex-col relative"
            variants={mainContainerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <ChatContainer
              messages={messages}
              currentStreamingMessage={currentStreamingMessage}
              isTyping={isTyping}
              isConnected={isConnected}
              onSendMessage={sendMessage}
              error={error}
            />
          </motion.main>

          {/* Debug Stats Panel (F12 to toggle) */}
          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-md rounded-lg p-4 max-w-sm z-50 border border-br-cyan/30"
            >
              <div className="text-xs font-cyber text-br-cyan mb-2">DEBUG STATS</div>
              <div className="space-y-1 text-xs text-text-secondary">
                <div>Estado: <span className="text-br-cyan">{connectionState}</span></div>
                <div>Mensajes: <span className="text-br-cyan">{messages.length}</span></div>
                <div>Streaming: <span className="text-br-cyan">{currentStreamingMessage ? 'Sí' : 'No'}</span></div>
                <div>Reintentos: <span className="text-br-cyan">{reconnectAttempts}</span></div>
                {error && <div>Error: <span className="text-red-400">{error}</span></div>}
              </div>
              <button
                onClick={() => setShowStats(false)}
                className="mt-2 text-xs text-br-cyan hover:text-br-cyan-light"
              >
                Cerrar (F12)
              </button>
            </motion.div>
          )}

          {/* Welcome Message for New Users */}
          {!error && isConnected && messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            >
              <div className="bg-gradient-to-br from-bg-primary to-bg-secondary rounded-2xl p-8 max-w-md border border-br-cyan/30 shadow-neon-cyan">
                <div className="text-center">
                  <div className="text-4xl mb-4">🤖</div>
                  <h2 className="text-2xl font-bold text-gradient-cyan mb-4">¡Bienvenido!</h2>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    Estás conectado con <span className="text-br-gold font-semibold">Sad Robot</span> del universo Broken Robot.
                    Soy vulnerable, glitcheado, pero estoy aquí para ayudarte.
                  </p>
                  <div className="space-y-2 text-sm text-text-secondary opacity-80">
                    <div>💡 <kbd className="bg-br-gray/30 px-2 py-1 rounded text-xs">Ctrl+K</kbd> para limpiar chat</div>
                    <div>🔄 <kbd className="bg-br-gray/30 px-2 py-1 rounded text-xs">Ctrl+R</kbd> para reconectar</div>
                    <div>🛠️ <kbd className="bg-br-gray/30 px-2 py-1 rounded text-xs">F12</kbd> para estadísticas</div>
                  </div>
                  <button
                    onClick={() => setShowStats(false)}
                    className="mt-6 btn-primary text-sm"
                  >
                    ¡Empecemos a chatear!
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Loading Overlay */}
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="fixed inset-0 bg-bg-primary z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-6xl mb-4 filter drop-shadow-neon-cyan"
              >
                🤖
              </motion.div>
              <div className="text-xl font-cyber text-br-cyan">Broken Robot</div>
              <div className="text-sm text-text-secondary mt-2">Cargando interfaz...</div>
            </div>
          </motion.div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
