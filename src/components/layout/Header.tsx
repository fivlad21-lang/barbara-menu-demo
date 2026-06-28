/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { LanguageCode } from "../../types";
import { Globe, Menu, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const Header: React.FC = () => {
  const { language, setLanguage, translations, setIsReservationOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Monitor scroll state to apply beautiful dynamic glassmorphism and size reduction
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const languages: { code: LanguageCode; label: string; flag: string }[] = [
    { code: "bg", label: "Български", flag: "BG" },
    { code: "en", label: "English", flag: "EN" },
    { code: "ua", label: "Українська", flag: "UA" },
    { code: "ru", label: "Русский", flag: "RU" },
  ];

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "py-3 glassmorphism shadow-sm"
          : "py-5 bg-brand-stone-light border-b border-brand-olive-dark/5"
      }`}
    >
      <div className="max-w-md mx-auto px-5 flex items-center justify-between">
        {/* Logo / Title */}
        <div className="flex flex-col items-start select-none">
          <h1 className="font-serif italic text-3xl tracking-tighter text-brand-olive-dark">
            Barbara
          </h1>
          <p className="font-sans text-[8px] tracking-widest text-brand-gold uppercase font-bold mt-0.5">
            {translations.heroTagline}
          </p>
        </div>

        {/* Header CTA & Language Switcher */}
        <div className="flex items-center gap-3">
          {/* Quick Reserve CTA for top of screen */}
          <button
            id="header-reserve-btn"
            onClick={() => setIsReservationOpen(true)}
            className="hidden sm:flex items-center gap-1.5 bg-brand-olive-dark hover:bg-brand-olive-medium text-brand-stone-light text-xs font-semibold py-2 px-4 rounded-full transition-colors uppercase tracking-wide"
          >
            <Sparkles className="w-3 h-3 text-brand-gold" />
            <span>{translations.reserveTableBtn}</span>
          </button>

          {/* Elegant Circular Language Buttons */}
          <div className="flex gap-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                id={`lang-select-${lang.code}`}
                onClick={() => setLanguage(lang.code)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-[9px] font-bold flex items-center justify-center border transition-all duration-200 select-none ${
                  language === lang.code
                    ? "bg-brand-olive-dark border-brand-olive-dark text-brand-stone-light shadow-sm"
                    : "bg-white border-brand-stone-medium text-brand-olive-medium hover:border-brand-olive-medium/30"
                }`}
              >
                {lang.flag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
