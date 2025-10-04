// Language Selector Component for Broken Robot Chat UI
// Provides a stylish language switcher that matches the cyberpunk aesthetic

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const LanguageSelector = ({
  position = "header", // 'header', 'modal', 'dropdown'
  showLabel = true,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    language,
    setLanguage,
    toggleLanguage,
    getLanguageName,
    getOppositeLanguage,
    t,
  } = useLanguage();

  // Animation variants
  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  };

  const languageOptions = [
    { code: "es", flag: "🇪🇸", name: "Español", shortName: "ES" },
    { code: "en", flag: "🇬🇧", name: "English", shortName: "EN" },
  ];

  // Simple toggle button (default)
  if (position === "header") {
    return (
      <button
        onClick={() => {
          console.log("Language button clicked! Current:", language);
          toggleLanguage();
        }}
        className={`
          flex items-center space-x-2 px-3 py-1.5
          bg-gradient-to-r from-br-cyan/10 to-br-blue/10
          border border-br-cyan/30 rounded-lg
          hover:border-br-cyan hover:shadow-glow-soft
          transition-all duration-300
          ${className}
        `}
        aria-label="Switch language"
      >
        <span className="text-lg">{language === "en" ? "🇬🇧" : "🇪🇸"}</span>

        <span className="text-br-cyan text-xs">→</span>

        <span className="text-lg opacity-60">
          {language === "en" ? "🇪🇸" : "🇬🇧"}
        </span>

        {showLabel && (
          <span className="text-sm font-medium text-br-cyan">
            {language === "en" ? "ES" : "EN"}
          </span>
        )}
      </button>
    );
  }

  // Dropdown version for more control
  if (position === "dropdown") {
    return (
      <div className={`relative ${className}`}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="
            flex items-center space-x-2 px-4 py-2
            bg-gradient-to-r from-br-gray/30 to-br-gray/20
            border border-br-cyan/30 rounded-xl
            hover:border-br-cyan hover:shadow-neon-cyan
            transition-all duration-300
          "
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
        >
          <span className="text-xl">{currentLang.flag}</span>
          <span className="text-sm font-semibold text-br-cyan">
            {currentLang.name}
          </span>
          <motion.span
            className="text-br-cyan ml-1"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▼
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Click outside to close */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />

              {/* Dropdown Menu */}
              <motion.div
                className="
                  absolute top-full mt-2 right-0 z-20
                  bg-gradient-to-br from-bg-primary to-bg-secondary
                  border border-br-cyan/30 rounded-xl
                  shadow-neon-cyan backdrop-blur-md
                  overflow-hidden min-w-[180px]
                "
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {languageOptions.map((lang) => (
                  <motion.button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full px-4 py-3 flex items-center space-x-3
                      hover:bg-br-cyan/10 transition-colors
                      ${language === lang.code ? "bg-br-cyan/20" : ""}
                    `}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span
                      className={`
                      text-sm font-medium
                      ${language === lang.code ? "text-br-cyan" : "text-text-secondary"}
                    `}
                    >
                      {lang.name}
                    </span>
                    {language === lang.code && (
                      <motion.span
                        className="ml-auto text-br-cyan"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.button>
                ))}

                {/* Decorative bottom border */}
                <div className="h-px bg-gradient-to-r from-transparent via-br-cyan/50 to-transparent" />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Modal version for settings
  if (position === "modal") {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="text-sm font-semibold text-text-secondary mb-2">
          {language === "es" ? "Idioma / Language" : "Language / Idioma"}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {languageOptions.map((lang) => (
            <motion.button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-300
                ${
                  language === lang.code
                    ? "bg-gradient-to-br from-br-cyan/20 to-br-blue/20 border-br-cyan shadow-neon-cyan"
                    : "bg-br-gray/10 border-br-gray/30 hover:border-br-cyan/50 hover:bg-br-gray/20"
                }
              `}
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
            >
              {/* Selected indicator */}
              {language === lang.code && (
                <motion.div
                  className="absolute top-2 right-2"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="w-5 h-5 bg-gradient-to-r from-br-cyan to-br-blue rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </motion.div>
              )}

              <div className="flex flex-col items-center space-y-2">
                <span className="text-3xl">{lang.flag}</span>
                <span
                  className={`
                  text-sm font-semibold
                  ${language === lang.code ? "text-br-cyan" : "text-text-secondary"}
                `}
                >
                  {lang.name}
                </span>
                <span
                  className={`
                  text-xs opacity-60
                  ${language === lang.code ? "text-br-cyan" : "text-text-secondary"}
                `}
                >
                  {lang.shortName}
                </span>
              </div>

              {/* Glow effect for selected */}
              {language === lang.code && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-br-cyan/10 blur-md -z-10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Language info */}
        <div className="mt-4 p-3 bg-br-gray/10 rounded-lg border border-br-cyan/20">
          <p className="text-xs text-text-secondary">
            {language === "es"
              ? "💡 El idioma se guarda automáticamente para tu próxima visita."
              : "💡 Language preference is automatically saved for your next visit."}
          </p>
        </div>
      </div>
    );
  }

  // Fallback to simple button
  return (
    <motion.button
      onClick={toggleLanguage}
      className={`
        px-3 py-1 rounded-lg
        bg-br-gray/20 border border-br-cyan/30
        hover:bg-br-cyan/10 hover:border-br-cyan
        transition-all duration-300
        ${className}
      `}
      variants={buttonVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
    >
      <span className="flex items-center space-x-2">
        <span>{currentLang.flag}</span>
        <span className="text-sm">↔</span>
        <span>{nextLang.flag}</span>
      </span>
    </motion.button>
  );
};

export default LanguageSelector;
