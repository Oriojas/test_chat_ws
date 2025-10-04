// Custom React hook for managing chat state and WebSocket communication
// Integrates with the Broken Robot WebSocket service

import { useState, useEffect, useCallback, useRef } from 'react';
import websocketService from '../services/websocket.js';

const useChat = () => {
  // Chat state
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionState, setConnectionState] = useState('disconnected');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState('');
  const [error, setError] = useState(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  // Refs for managing state
  const streamingMessageRef = useRef('');
  const isStreamingRef = useRef(false);
  const typingTimeoutRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  // Initialize WebSocket connection and event listeners
  useEffect(() => {
    const initializeWebSocket = async () => {
      try {
        // Set up event listeners
        websocketService.on('connected', handleConnected);
        websocketService.on('disconnected', handleDisconnected);
        websocketService.on('message', handleMessage);
        websocketService.on('streamEnd', handleStreamEnd);
        websocketService.on('error', handleError);
        websocketService.on('stateChange', handleStateChange);
        websocketService.on('reconnecting', handleReconnecting);

        // Attempt initial connection
        await websocketService.connect();
      } catch (error) {
        console.error('Failed to initialize WebSocket:', error);
        setError(error.message);
      }
    };

    initializeWebSocket();

    // Cleanup on unmount
    return () => {
      websocketService.off('connected', handleConnected);
      websocketService.off('disconnected', handleDisconnected);
      websocketService.off('message', handleMessage);
      websocketService.off('streamEnd', handleStreamEnd);
      websocketService.off('error', handleError);
      websocketService.off('stateChange', handleStateChange);
      websocketService.off('reconnecting', handleReconnecting);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  // Event handlers
  const handleConnected = useCallback(() => {
    console.log('🤖 Chat connected to Broken Robot');
    setIsConnected(true);
    setError(null);
    setReconnectAttempts(0);

    // Add system message for successful connection
    const systemMessage = {
      id: `system-${Date.now()}`,
      text: "🔗 Conexión establecida con Sad Robot. ¡Hola, humano! 🤖",
      type: 'system',
      timestamp: Date.now(),
      isNew: true
    };

    setMessages(prev => [...prev, systemMessage]);
  }, []);

  const handleDisconnected = useCallback((event) => {
    console.log('🔌 Chat disconnected from Broken Robot');
    setIsConnected(false);
    setIsTyping(false);
    setCurrentStreamingMessage('');
    isStreamingRef.current = false;

    if (!event.wasClean) {
      const systemMessage = {
        id: `system-${Date.now()}`,
        text: "⚠️ Conexión perdida. Reintentando reconexión...",
        type: 'system',
        timestamp: Date.now(),
        isNew: true
      };

      setMessages(prev => [...prev, systemMessage]);
    }
  }, []);

  const handleMessage = useCallback((messageData) => {
    const { text, type, timestamp } = messageData;

    if (type === 'user') {
      // Handle user messages (sent from this client)
      const userMessage = {
        id: `user-${timestamp}`,
        text,
        type: 'user',
        timestamp,
        isNew: true
      };

      setMessages(prev => [...prev, userMessage]);

      // Start typing indicator for bot response
      setIsTyping(true);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

    } else if (type === 'bot') {
      // Handle bot messages (streaming)
      if (!isStreamingRef.current) {
        // Start new streaming message
        isStreamingRef.current = true;
        streamingMessageRef.current = text;
        setCurrentStreamingMessage(text);
        setIsTyping(false);
      } else {
        // Append to existing streaming message
        streamingMessageRef.current += text;
        setCurrentStreamingMessage(streamingMessageRef.current);
      }
    }
  }, []);

  const handleStreamEnd = useCallback(() => {
    if (isStreamingRef.current && streamingMessageRef.current) {
      // Finalize the streaming message
      const botMessage = {
        id: `bot-${Date.now()}`,
        text: streamingMessageRef.current,
        type: 'bot',
        timestamp: Date.now(),
        isNew: true,
        isSadRobot: true // Special flag for Sad Robot styling
      };

      setMessages(prev => [...prev, botMessage]);

      // Reset streaming state
      isStreamingRef.current = false;
      streamingMessageRef.current = '';
      setCurrentStreamingMessage('');
      setIsTyping(false);
    }
  }, []);

  const handleError = useCallback((error) => {
    console.error('WebSocket error:', error);
    setError(error.message || 'Error de conexión');

    const errorMessage = {
      id: `error-${Date.now()}`,
      text: `❌ Error: ${error.message || 'Conexión fallida'}`,
      type: 'system',
      timestamp: Date.now(),
      isNew: true
    };

    setMessages(prev => [...prev, errorMessage]);
  }, []);

  const handleStateChange = useCallback((state) => {
    setConnectionState(state);
    setIsConnected(state === 'connected');
  }, []);

  const handleReconnecting = useCallback((data) => {
    setReconnectAttempts(data.attempt);

    const reconnectMessage = {
      id: `reconnect-${Date.now()}`,
      text: `🔄 Reintento de conexión ${data.attempt}/5...`,
      type: 'system',
      timestamp: Date.now(),
      isNew: true
    };

    setMessages(prev => [...prev, reconnectMessage]);
  }, []);

  // Public methods
  const sendMessage = useCallback(async (text) => {
    if (!text || !text.trim()) {
      return false;
    }

    const trimmedText = text.trim();

    try {
      // Clear any existing errors
      setError(null);

      // Send message through WebSocket
      const success = websocketService.sendMessage(trimmedText);

      if (!success && !isConnected) {
        // Try to reconnect if not connected
        await websocketService.connect();
        return websocketService.sendMessage(trimmedText);
      }

      return success;
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Error al enviar mensaje');
      return false;
    }
  }, [isConnected]);

  const reconnect = useCallback(async () => {
    try {
      setError(null);
      await websocketService.connect();
    } catch (error) {
      console.error('Manual reconnection failed:', error);
      setError('Error al reconectar');
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setCurrentStreamingMessage('');
    streamingMessageRef.current = '';
    isStreamingRef.current = false;
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Connection utilities
  const getConnectionStatus = useCallback(() => {
    const stats = websocketService.getStats();
    return {
      ...stats,
      reconnectAttempts,
      hasError: !!error
    };
  }, [reconnectAttempts, error]);

  const disconnect = useCallback(() => {
    websocketService.disconnect();
  }, []);

  // Computed values
  const hasMessages = messages.length > 0;
  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
  const isReconnecting = connectionState === 'connecting' && reconnectAttempts > 0;

  // Return the hook API
  return {
    // State
    messages,
    currentStreamingMessage,
    isConnected,
    connectionState,
    isTyping,
    error,
    reconnectAttempts,
    isReconnecting,
    hasMessages,
    lastMessage,

    // Actions
    sendMessage,
    reconnect,
    disconnect,
    clearMessages,
    clearError,
    getConnectionStatus,

    // Utilities
    isStreaming: isStreamingRef.current
  };
};

export default useChat;

// Export additional utility hooks
export const useChatStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(websocketService.getStats());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};

export const useConnectionStatus = () => {
  const [status, setStatus] = useState('disconnected');

  useEffect(() => {
    const handleStateChange = (newState) => {
      setStatus(newState);
    };

    websocketService.on('stateChange', handleStateChange);
    setStatus(websocketService.getConnectionState());

    return () => {
      websocketService.off('stateChange', handleStateChange);
    };
  }, []);

  return status;
};
