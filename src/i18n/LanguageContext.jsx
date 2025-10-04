// Language Context for Broken Robot Chat UI
// Manages global language state and provides translations

import React, { createContext, useContext, useState, useEffect } from "react";
import { es } from "./translations.es.js";
import { en } from "./translations.en.js";

// Create the context
const LanguageContext = createContext({
  language: "en",
  translations: en,
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: () => "",
});

// Translation objects
const translations = {
  es: es,
  en: en,
};

// Language Provider Component
export const LanguageProvider = ({ children }) => {
  // Get initial language from localStorage or default to Spanish
  const getInitialLanguage = () => {
    const savedLanguage = localStorage.getItem("brokenRobotLanguage");
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      return savedLanguage;
    }

    // Try to detect browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("es")) {
      return "es";
    } else if (browserLang.startsWith("en")) {
      return "en";
    }

    // Default to English
    return "en";
  };

  const initialLanguage = getInitialLanguage();
  const [language, setLanguageState] = useState(initialLanguage);
  const [currentTranslations, setCurrentTranslations] = useState(
    translations[initialLanguage],
  );

  // Save language preference to localStorage when it changes
  useEffect(() => {
    console.log("Language changed to:", language);
    console.log("Current translations:", translations[language]);
    localStorage.setItem("brokenRobotLanguage", language);
    setCurrentTranslations(translations[language]);

    // Update document language attribute for accessibility
    document.documentElement.lang = language;

    // Update document title based on language
    if (language === "es") {
      document.title = "Broken Robot Chat - Interfaz";
    } else {
      document.title = "Broken Robot Chat - Interface";
    }
  }, [language]);

  // Set language function
  const setLanguage = (newLanguage) => {
    console.log("Setting language to:", newLanguage);
    if (newLanguage === "es" || newLanguage === "en") {
      setLanguageState(newLanguage);
    }
  };

  // Toggle between languages
  const toggleLanguage = () => {
    console.log("Toggling language from:", language);
    const newLang = language === "es" ? "en" : "es";
    console.log("Toggling language to:", newLang);
    setLanguageState(newLang);
  };

  // Translation function with nested key support
  const t = (key, fallback = "") => {
    try {
      const keys = key.split(".");
      // Use the current translations state
      let value = currentTranslations;

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          console.warn(
            `Translation key not found: ${key} in language: ${language}`,
          );
          return fallback || key;
        }
      }

      return value || fallback || key;
    } catch (error) {
      console.error("Translation error:", error);
      return fallback || key;
    }
  };

  // Helper function to get translation with replacements
  const tReplace = (key, replacements = {}, fallback = "") => {
    let text = t(key, fallback);

    Object.keys(replacements).forEach((placeholder) => {
      text = text.replace(
        new RegExp(`{{${placeholder}}}`, "g"),
        replacements[placeholder],
      );
    });

    return text;
  };

  // Helper function to format time based on language
  const formatTime = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    return date.toLocaleTimeString(language === "es" ? "es-ES" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper function to format date based on language
  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    return date.toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper to get relative time
  const getRelativeTime = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return t("time.now");
    } else if (minutes < 60) {
      return `${minutes} ${t("time.minutes")}`;
    } else if (hours < 24) {
      return `${hours} ${t("time.hours")}`;
    } else {
      return `${days} ${t("time.days")}`;
    }
  };

  // Get opposite language code
  const getOppositeLanguage = () => {
    return language === "es" ? "en" : "es";
  };

  // Get language display name
  const getLanguageName = (lang = language) => {
    const names = {
      es: language === "es" ? "Español" : "Spanish",
      en: language === "es" ? "Inglés" : "English",
    };
    return names[lang] || lang;
  };

  const contextValue = {
    language,
    translations: currentTranslations,
    setLanguage,
    toggleLanguage,
    t,
    tReplace,
    formatTime,
    formatDate,
    getRelativeTime,
    getOppositeLanguage,
    getLanguageName,
    isSpanish: language === "es",
    isEnglish: language === "en",
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};

// Export the context for direct access if needed
export default LanguageContext;

// Language switcher component
export const LanguageSwitcher = ({ className = "", showLabel = true }) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`language-switcher ${className}`}
      aria-label={t("accessibility.changeLanguage", "Change language")}
    >
      <span className="flex items-center space-x-2">
        <span className="text-lg">{language === "es" ? "🇪🇸" : "🇬🇧"}</span>
        {showLabel && (
          <span className="text-sm font-medium">
            {language === "es" ? "EN" : "ES"}
          </span>
        )}
      </span>
    </button>
  );
};
