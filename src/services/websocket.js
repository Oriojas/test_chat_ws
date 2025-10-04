// WebSocket service for Broken Robot Chat
// Handles connection to the Python WebSocket server at ws://localhost:8765

class WebSocketService {
  constructor() {
    this.ws = null;
    this.isConnecting = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.messageQueue = [];
    this.listeners = new Map();
    this.connectionState = 'disconnected'; // 'disconnected', 'connecting', 'connected'
  }

  // Event system
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in WebSocket event listener for ${event}:`, error);
        }
      });
    }
  }

  // Connection management
  connect(url = 'ws://localhost:8765') {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      console.log('WebSocket already connected or connecting');
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      try {
        this.isConnecting = true;
        this.connectionState = 'connecting';
        this.emit('stateChange', this.connectionState);

        console.log(`Attempting to connect to ${url}...`);
        this.ws = new WebSocket(url);

        // Set timeouts
        const connectionTimeout = setTimeout(() => {
          if (this.ws.readyState === WebSocket.CONNECTING) {
            this.ws.close();
            this.handleConnectionError(new Error('Connection timeout'));
            reject(new Error('Connection timeout'));
          }
        }, 10000);

        this.ws.onopen = (event) => {
          clearTimeout(connectionTimeout);
          this.isConnecting = false;
          this.reconnectAttempts = 0;
          this.connectionState = 'connected';

          console.log('✅ WebSocket connected successfully');
          this.emit('connected', event);
          this.emit('stateChange', this.connectionState);

          // Send queued messages
          this.flushMessageQueue();
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message = event.data;

            // Handle stream end marker
            if (message === '[STREAM_END]') {
              this.emit('streamEnd');
              return;
            }

            // Handle regular messages
            this.emit('message', {
              text: message,
              timestamp: Date.now(),
              type: 'bot'
            });

          } catch (error) {
            console.error('Error processing WebSocket message:', error);
            this.emit('error', error);
          }
        };

        this.ws.onclose = (event) => {
          clearTimeout(connectionTimeout);
          this.isConnecting = false;
          const wasConnected = this.connectionState === 'connected';
          this.connectionState = 'disconnected';

          console.log('WebSocket connection closed:', {
            code: event.code,
            reason: event.reason,
            wasClean: event.wasClean
          });

          this.emit('disconnected', event);
          this.emit('stateChange', this.connectionState);

          // Attempt reconnection if it was an unexpected disconnection
          if (!event.wasClean && wasConnected) {
            this.attemptReconnection();
          }
        };

        this.ws.onerror = (error) => {
          clearTimeout(connectionTimeout);
          console.error('WebSocket error:', error);
          this.handleConnectionError(error);

          if (this.isConnecting) {
            reject(error);
          }
        };

      } catch (error) {
        this.isConnecting = false;
        this.connectionState = 'disconnected';
        this.emit('stateChange', this.connectionState);
        console.error('Failed to create WebSocket connection:', error);
        reject(error);
      }
    });
  }

  disconnect() {
    if (this.ws) {
      console.log('Disconnecting WebSocket...');
      this.ws.close(1000, 'User initiated disconnect');
      this.ws = null;
    }
    this.reconnectAttempts = 0;
    this.messageQueue = [];
    this.connectionState = 'disconnected';
    this.emit('stateChange', this.connectionState);
  }

  // Message handling
  sendMessage(message) {
    if (!message || typeof message !== 'string') {
      console.error('Invalid message format');
      return false;
    }

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(message);
        console.log('📤 Message sent:', message.substring(0, 100) + (message.length > 100 ? '...' : ''));

        // Emit user message event for UI
        this.emit('message', {
          text: message,
          timestamp: Date.now(),
          type: 'user'
        });

        return true;
      } catch (error) {
        console.error('Error sending message:', error);
        this.emit('error', error);
        return false;
      }
    } else {
      // Queue message for later if not connected
      console.log('WebSocket not connected, queueing message...');
      this.messageQueue.push(message);

      // Attempt to reconnect if not already trying
      if (this.connectionState === 'disconnected') {
        this.connect().catch(error => {
          console.error('Failed to reconnect for message sending:', error);
        });
      }

      return false;
    }
  }

  flushMessageQueue() {
    while (this.messageQueue.length > 0 && this.ws && this.ws.readyState === WebSocket.OPEN) {
      const message = this.messageQueue.shift();
      this.sendMessage(message);
    }
  }

  // Connection state helpers
  isConnected() {
    return this.ws && this.ws.readyState === WebSocket.OPEN;
  }

  getConnectionState() {
    return this.connectionState;
  }

  // Error handling and reconnection
  handleConnectionError(error) {
    this.emit('error', error);

    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.attemptReconnection();
    } else {
      console.error('Max reconnection attempts reached');
      this.emit('maxReconnectAttemptsReached');
    }
  }

  attemptReconnection() {
    if (this.isConnecting || this.reconnectAttempts >= this.maxReconnectAttempts) {
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1); // Exponential backoff

    console.log(`Attempting reconnection ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms...`);
    this.emit('reconnecting', { attempt: this.reconnectAttempts, delay });

    setTimeout(() => {
      if (this.connectionState === 'disconnected') {
        this.connect().catch(error => {
          console.error(`Reconnection attempt ${this.reconnectAttempts} failed:`, error);
        });
      }
    }, delay);
  }

  // Health check
  ping() {
    if (this.isConnected()) {
      try {
        // Send a ping message (you might need to adjust based on your server implementation)
        this.ws.send(JSON.stringify({ type: 'ping' }));
        return true;
      } catch (error) {
        console.error('Ping failed:', error);
        return false;
      }
    }
    return false;
  }

  // Statistics
  getStats() {
    return {
      connectionState: this.connectionState,
      reconnectAttempts: this.reconnectAttempts,
      maxReconnectAttempts: this.maxReconnectAttempts,
      queuedMessages: this.messageQueue.length,
      isConnected: this.isConnected(),
      readyState: this.ws ? this.ws.readyState : null
    };
  }

  // Cleanup
  destroy() {
    this.disconnect();
    this.listeners.clear();
    this.messageQueue = [];
  }
}

// Create singleton instance
const websocketService = new WebSocketService();

// Export both the class and the singleton
export { WebSocketService, websocketService as default };

// Additional helper functions
export const createWebSocketConnection = (url) => {
  const service = new WebSocketService();
  return service.connect(url).then(() => service);
};

export const getConnectionStateText = (state) => {
  const stateTexts = {
    'disconnected': '❌ Desconectado',
    'connecting': '🔄 Conectando...',
    'connected': '✅ Conectado'
  };
  return stateTexts[state] || '❓ Estado desconocido';
};

export const getReadyStateText = (readyState) => {
  const stateTexts = {
    [WebSocket.CONNECTING]: 'Conectando',
    [WebSocket.OPEN]: 'Abierto',
    [WebSocket.CLOSING]: 'Cerrando',
    [WebSocket.CLOSED]: 'Cerrado'
  };
  return stateTexts[readyState] || 'Desconocido';
};
