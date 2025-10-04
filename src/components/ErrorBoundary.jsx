// Error Boundary component for Broken Robot Chat UI
// Catches and handles React errors gracefully with Broken Robot theme

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('React Error Boundary caught an error:', error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            {/* Error Robot Animation */}
            <div className="text-center mb-8">
              <div className="text-8xl mb-4 animate-glitch">🤖💥</div>
              <div className="text-2xl font-bold text-gradient-gold mb-2">
                Sistema Glitcheado
              </div>
              <div className="text-text-secondary">
                Sad Robot encontró un error crítico
              </div>
            </div>

            {/* Error Card */}
            <div className="bg-gradient-to-br from-bg-secondary to-bg-primary border border-red-500/30 rounded-2xl p-6 shadow-neon-magenta">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="text-red-400 font-cyber font-semibold">
                  ERROR_BOUNDARY_TRIGGERED
                </div>
              </div>

              <div className="text-sm text-text-secondary mb-6 font-cyber">
                {this.state.error && this.state.error.toString()}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={this.handleReload}
                  className="w-full btn-primary"
                >
                  🔄 Reiniciar Sistema
                </button>

                <button
                  onClick={this.handleReset}
                  className="w-full btn-ghost"
                >
                  🔧 Intentar Reparar
                </button>
              </div>

              {/* Sad Robot Quote */}
              <div className="mt-6 p-4 bg-black/20 rounded-lg border border-br-cyan/20">
                <div className="text-sm text-br-cyan italic text-center">
                  "404: Estabilidad no encontrada, pero seguimos intentando..."
                </div>
                <div className="text-xs text-text-secondary text-center mt-1">
                  - Sad Robot
                </div>
              </div>

              {/* Debug Info (Development) */}
              {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                <details className="mt-4">
                  <summary className="text-xs text-text-secondary cursor-pointer hover:text-br-cyan">
                    🛠️ Información técnica
                  </summary>
                  <pre className="text-xs text-text-secondary mt-2 p-2 bg-black/30 rounded overflow-auto max-h-40">
                    {this.state.error && this.state.error.stack}
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>

            {/* Help Text */}
            <div className="text-center mt-6 text-xs text-text-secondary">
              Si el problema persiste, verifica la consola del navegador
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
