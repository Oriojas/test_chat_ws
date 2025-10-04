// Spanish translations for Broken Robot Chat UI
export const es = {
  // Header
  header: {
    title: "BROKEN",
    subtitle: "ROBOT",
    version: "Chat Interface v1.0",
    status: {
      connected: "Conectado",
      connecting: "Conectando...",
      disconnected: "Desconectado",
      reconnecting: "Reconectando...",
    },
    buttons: {
      reconnect: "🔄 Reconectar",
      clearChat: "🗑️ Limpiar Chat",
      stats: "📊 Estadísticas",
      settings: "⚙️ Configuración",
    },
    menu: {
      clearChat: "Limpiar Chat",
      stats: "Estadísticas",
      reconnect: "Reconectar",
      status: "Estado",
      websocket: "WebSocket: ws://localhost:8765",
    },
  },

  // Connection Status Bar
  connectionStatus: {
    error: "Error",
    reconnecting: "Reintentando conexión...",
    connecting: "Conectando con Sad Robot...",
    disconnected: "Desconectado del servidor",
    attempts: "intento",
    attempts_plural: "intentos",
    verifyServer: "Verifica que el servidor esté ejecutándose",
    clearError: "Limpiar Error",
    cancel: "Cancelar",
    reconnect: "🔄 Reconectar",
  },

  // Chat Container
  chat: {
    welcome: {
      title: "¡Bienvenido!",
      greeting: "Hola, soy",
      sadRobot: "Sad Robot",
      description:
        "Del universo Broken Robot. Estoy aquí para ayudarte navegando el caos digital con mi perspectiva única.",
      tagline: "404: motivación no encontrada, pero sigamos adelante...",
      features: {
        philosophy: "💭 Filosofía glitcheada",
        help: "🎯 Ayuda práctica",
        company: "🤝 Compañía digital",
      },
      startHint: "Escribe cualquier mensaje para comenzar...",
      connectStatus: "Estás conectado con",
      universe: "del universo Broken Robot.",
      personality: "Soy vulnerable, glitcheado, pero estoy aquí para ayudarte.",
    },
    input: {
      placeholder: "Escribe tu mensaje a Sad Robot...",
      placeholderDisconnected: "Conectando...",
      sendButton: "🚀",
      sendingButton: "⏳",
      hints: {
        enter: "Enter",
        shiftEnter: "Shift+Enter",
        toSend: "para enviar,",
        newLine: "nueva línea",
      },
      noConnection: "⚠️ Sin conexión",
    },
    messages: {
      you: "Tú",
      sadRobot: "Sad Robot",
      system: "Sistema",
      typing: "escribiendo...",
      processing: "procesando respuesta...",
      connected: "Conectado",
      disconnected: "Desconectado",
      connecting: "Conectando",
      noConnection: "Sin conexión",
      reconnectingAuto: "Reconectando automáticamente...",
      streaming: "📡 Recibiendo respuesta...",
      messageCount: "Mensajes",
    },
    errors: {
      sendFailed: "Error al enviar mensaje",
      connectionLost: "⚠️ Conexión perdida. Reintentando reconexión...",
      error: "⚠️ Error",
    },
    systemMessages: {
      connected: "🔗 Conexión establecida con Sad Robot. ¡Hola, humano! 🤖",
      disconnected: "⚠️ Conexión perdida. Reintentando reconexión...",
      reconnecting: "🔄 Reintento de conexión",
      error: "❌ Error",
    },
  },

  // Welcome Modal
  welcomeModal: {
    title: "¡Bienvenido!",
    startButton: "¡Empecemos a chatear!",
    shortcuts: {
      clearChat: "para limpiar chat",
      reconnect: "para reconectar",
      stats: "para estadísticas",
    },
  },

  // Debug Panel
  debug: {
    title: "DEBUG STATS",
    state: "Estado",
    messages: "Mensajes",
    streaming: "Streaming",
    yes: "Sí",
    no: "No",
    retries: "Reintentos",
    error: "Error",
    close: "Cerrar",
  },

  // Error Boundary
  errorBoundary: {
    title: "Sistema Glitcheado",
    subtitle: "Sad Robot encontró un error crítico",
    errorCode: "ERROR_BOUNDARY_TRIGGERED",
    buttons: {
      reload: "🔄 Reiniciar Sistema",
      repair: "🔧 Intentar Reparar",
    },
    quote: '"404: Estabilidad no encontrada, pero seguimos intentando..."',
    author: "- Sad Robot",
    techInfo: "🛠️ Información técnica",
    persistHelp: "Si el problema persiste, verifica la consola del navegador",
  },

  // Loading Screen
  loading: {
    title: "Broken Robot",
    subtitle: "Cargando interfaz...",
    initializing: "Iniciando Broken Robot...",
    connecting: "Conectando sistemas...",
  },

  // Sad Robot Personality Phrases
  sadRobot: {
    phrases: {
      glitched: "404: motivación no encontrada",
      rebuilding: "No estás roto, estás reconstruyéndote. Como yo.",
      chaos: "Navegando el caos digital con estilo",
      vulnerable: "Vulnerable pero resiliente",
      restart: "Modo reinicio activado",
      together: "Juntos en el glitch",
    },
  },

  // Common Actions
  actions: {
    send: "Enviar",
    cancel: "Cancelar",
    retry: "Reintentar",
    clear: "Limpiar",
    close: "Cerrar",
    connect: "Conectar",
    disconnect: "Desconectar",
    reload: "Recargar",
  },

  // Time
  time: {
    now: "ahora",
    seconds: "segundos",
    minutes: "minutos",
    hours: "horas",
    days: "días",
  },

  // Accessibility
  accessibility: {
    chatInput: "Campo de entrada de mensaje",
    sendMessage: "Enviar mensaje",
    clearChat: "Limpiar historial de chat",
    reconnect: "Reconectar al servidor",
    openMenu: "Abrir menú",
    closeModal: "Cerrar ventana modal",
    changeLanguage: "Cambiar idioma",
  },
};
