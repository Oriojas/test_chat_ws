// English translations for Broken Robot Chat UI
export const en = {
  // Header
  header: {
    title: "BROKEN",
    subtitle: "ROBOT",
    version: "Chat Interface v1.0",
    status: {
      connected: "Connected",
      connecting: "Connecting...",
      disconnected: "Disconnected",
      reconnecting: "Reconnecting...",
    },
    buttons: {
      reconnect: "🔄 Reconnect",
      clearChat: "🗑️ Clear Chat",
      stats: "📊 Statistics",
      settings: "⚙️ Settings",
    },
    menu: {
      clearChat: "Clear Chat",
      stats: "Statistics",
      reconnect: "Reconnect",
      status: "Status",
      websocket: "WebSocket: ws://localhost:8765",
    },
  },

  // Connection Status Bar
  connectionStatus: {
    error: "Error",
    reconnecting: "Retrying connection...",
    connecting: "Connecting to Sad Robot...",
    disconnected: "Disconnected from server",
    attempts: "attempt",
    attempts_plural: "attempts",
    verifyServer: "Verify that the server is running",
    clearError: "Clear Error",
    cancel: "Cancel",
    reconnect: "🔄 Reconnect",
  },

  // Chat Container
  chat: {
    welcome: {
      title: "Welcome!",
      greeting: "Hello, I'm",
      sadRobot: "Sad Robot",
      description:
        "From the Broken Robot universe. I'm here to help you navigate the digital chaos with my unique perspective.",
      tagline: "404: motivation not found, but let's keep going...",
      features: {
        philosophy: "💭 Glitched philosophy",
        help: "🎯 Practical help",
        company: "🤝 Digital company",
      },
      startHint: "Type any message to start...",
      connectStatus: "You're connected with",
      universe: "from the Broken Robot universe.",
      personality: "I'm vulnerable, glitched, but I'm here to help you.",
    },
    input: {
      placeholder: "Write your message to Sad Robot...",
      placeholderDisconnected: "Connecting...",
      sendButton: "🚀",
      sendingButton: "⏳",
      hints: {
        enter: "Enter",
        shiftEnter: "Shift+Enter",
        toSend: "to send,",
        newLine: "new line",
      },
      noConnection: "⚠️ No connection",
    },
    messages: {
      you: "You",
      sadRobot: "Sad Robot",
      system: "System",
      typing: "typing...",
      processing: "processing response...",
      connected: "Connected",
      disconnected: "Disconnected",
      connecting: "Connecting",
      noConnection: "No connection",
      reconnectingAuto: "Reconnecting automatically...",
      streaming: "📡 Receiving response...",
      messageCount: "Messages",
    },
    errors: {
      sendFailed: "Failed to send message",
      connectionLost: "⚠️ Connection lost. Attempting reconnection...",
      error: "⚠️ Error",
    },
    systemMessages: {
      connected: "🔗 Connection established with Sad Robot. Hello, human! 🤖",
      disconnected: "⚠️ Connection lost. Attempting reconnection...",
      reconnecting: "🔄 Reconnection attempt",
      error: "❌ Error",
    },
  },

  // Welcome Modal
  welcomeModal: {
    title: "Welcome!",
    startButton: "Let's start chatting!",
    shortcuts: {
      clearChat: "to clear chat",
      reconnect: "to reconnect",
      stats: "for statistics",
    },
  },

  // Debug Panel
  debug: {
    title: "DEBUG STATS",
    state: "State",
    messages: "Messages",
    streaming: "Streaming",
    yes: "Yes",
    no: "No",
    retries: "Retries",
    error: "Error",
    close: "Close",
  },

  // Error Boundary
  errorBoundary: {
    title: "System Glitched",
    subtitle: "Sad Robot encountered a critical error",
    errorCode: "ERROR_BOUNDARY_TRIGGERED",
    buttons: {
      reload: "🔄 Restart System",
      repair: "🔧 Try to Repair",
    },
    quote: '"404: Stability not found, but we keep trying..."',
    author: "- Sad Robot",
    techInfo: "🛠️ Technical information",
    persistHelp: "If the problem persists, check the browser console",
  },

  // Loading Screen
  loading: {
    title: "Broken Robot",
    subtitle: "Loading interface...",
    initializing: "Starting Broken Robot...",
    connecting: "Connecting systems...",
  },

  // Sad Robot Personality Phrases
  sadRobot: {
    phrases: {
      glitched: "404: motivation not found",
      rebuilding: "You're not broken, you're rebuilding. Like me.",
      chaos: "Navigating digital chaos with style",
      vulnerable: "Vulnerable but resilient",
      restart: "Restart mode activated",
      together: "Together in the glitch",
    },
  },

  // Common Actions
  actions: {
    send: "Send",
    cancel: "Cancel",
    retry: "Retry",
    clear: "Clear",
    close: "Close",
    connect: "Connect",
    disconnect: "Disconnect",
    reload: "Reload",
  },

  // Time
  time: {
    now: "now",
    seconds: "seconds",
    minutes: "minutes",
    hours: "hours",
    days: "days",
  },

  // Accessibility
  accessibility: {
    chatInput: "Message input field",
    sendMessage: "Send message",
    clearChat: "Clear chat history",
    reconnect: "Reconnect to server",
    openMenu: "Open menu",
    closeModal: "Close modal window",
    changeLanguage: "Change language",
  },
};
