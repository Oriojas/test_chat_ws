// Custom hook for translations in Broken Robot Chat UI
// Provides easy access to translation functions and current language

import { useContext } from "react";
import LanguageContext from "../i18n/LanguageContext.jsx";

/**
 * Custom hook to use translations in components
 * @returns {Object} Translation utilities and current language info
 */
export const useTranslation = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }

  // Destructure what we need from context
  const {
    language,
    translations,
    setLanguage,
    toggleLanguage,
    t,
    tReplace,
    formatTime,
    formatDate,
    getRelativeTime,
    isSpanish,
    isEnglish,
  } = context;

  // Additional helper functions specific to translations

  /**
   * Get a nested translation value safely
   * @param {string} key - Dot notation key (e.g., 'chat.messages.you')
   * @param {*} defaultValue - Default value if translation not found
   * @returns {*} Translation value or default
   */
  const getTranslation = (key, defaultValue = "") => {
    return t(key, defaultValue);
  };

  /**
   * Check if a translation key exists
   * @param {string} key - Translation key to check
   * @returns {boolean} True if the key exists
   */
  const hasTranslation = (key) => {
    try {
      const keys = key.split(".");
      let value = translations;

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          return false;
        }
      }
      return true;
    } catch {
      return false;
    }
  };

  /**
   * Get multiple translations at once
   * @param {Array<string>} keys - Array of translation keys
   * @returns {Object} Object with translations
   */
  const getMultiple = (keys) => {
    const result = {};
    keys.forEach((key) => {
      result[key] = t(key);
    });
    return result;
  };

  /**
   * Format a number based on current locale
   * @param {number} num - Number to format
   * @param {Object} options - Intl.NumberFormat options
   * @returns {string} Formatted number
   */
  const formatNumber = (num, options = {}) => {
    const locale = language === "es" ? "es-ES" : "en-US";
    return new Intl.NumberFormat(locale, options).format(num);
  };

  /**
   * Pluralize a translation key based on count
   * @param {string} key - Base translation key
   * @param {number} count - Count for pluralization
   * @returns {string} Appropriate translation
   */
  const pluralize = (key, count) => {
    if (count === 1) {
      return t(key, t(`${key}_singular`, ""));
    }
    return t(`${key}_plural`, t(key, ""));
  };

  /**
   * Get language-specific className for text direction
   * @returns {string} CSS class for text direction
   */
  const getTextDirection = () => {
    // Both Spanish and English are LTR, but this is extensible
    return "ltr";
  };

  /**
   * Get the opposite language code
   * @returns {string} Opposite language code
   */
  const getOppositeLanguage = () => {
    return language === "es" ? "en" : "es";
  };

  /**
   * Get language display name
   * @param {string} lang - Language code (optional, defaults to current)
   * @returns {string} Display name of the language
   */
  const getLanguageName = (lang = language) => {
    const names = {
      es: language === "es" ? "Español" : "Spanish",
      en: language === "es" ? "Inglés" : "English",
    };
    return names[lang] || lang;
  };

  /**
   * Format a message with dynamic content
   * @param {string} key - Translation key
   * @param {Object} params - Parameters to replace in the message
   * @returns {string} Formatted message
   */
  const formatMessage = (key, params = {}) => {
    return tReplace(key, params);
  };

  /**
   * Get current locale string
   * @returns {string} Locale string (e.g., 'es-ES', 'en-US')
   */
  const getLocale = () => {
    return language === "es" ? "es-ES" : "en-US";
  };

  /**
   * Check if we should use formal or informal language
   * @returns {boolean} True if formal language should be used
   */
  const useFormalLanguage = () => {
    // For Sad Robot, we use informal language for better connection
    return false;
  };

  // Return all utilities
  return {
    // Core functions
    t: getTranslation,
    translate: getTranslation,
    tReplace: formatMessage,

    // Language state
    language,
    currentLanguage: language,
    locale: getLocale(),
    isSpanish,
    isEnglish,

    // Language control
    setLanguage,
    changeLanguage: setLanguage,
    toggleLanguage,
    switchLanguage: toggleLanguage,

    // Formatting
    formatTime,
    formatDate,
    formatNumber,
    getRelativeTime,
    pluralize,

    // Utilities
    hasTranslation,
    getMultiple,
    getTextDirection,
    getOppositeLanguage,
    getLanguageName,
    useFormalLanguage,

    // Direct access to all translations
    translations,
    allTranslations: translations,
  };
};

// Shorthand hook for just getting the translation function
export const useT = () => {
  const { t } = useTranslation();
  return t;
};

// Hook for language switching functionality
export const useLanguageSwitch = () => {
  const {
    language,
    setLanguage,
    toggleLanguage,
    getLanguageName,
    getOppositeLanguage,
  } = useTranslation();

  return {
    currentLanguage: language,
    currentLanguageName: getLanguageName(),
    nextLanguage: getOppositeLanguage(),
    nextLanguageName: getLanguageName(getOppositeLanguage()),
    setLanguage,
    toggle: toggleLanguage,
  };
};

export default useTranslation;
