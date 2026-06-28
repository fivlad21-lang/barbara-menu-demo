/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useApp } from "../../context/AppContext";
import { brandTheme } from "../../theme";
import { Clock, Compass, Instagram, Phone } from "lucide-react";
import { BrandArtwork } from "../ui/BrandArtwork";

export const Hero: React.FC = () => {
  const { translations } = useApp();

  return (
    <section id="hero-welcome-section" className="pt-24 pb-4 px-5 max-w-md mx-auto">
      <div className="bg-white rounded-[2rem] border border-brand-olive-dark/5 shadow-sm p-0 overflow-hidden flex flex-col items-center text-center relative">
        {/* Main Cover Image */}
        <div className="relative w-full aspect-[16/10] bg-brand-stone-medium/40 overflow-hidden">
          <BrandArtwork className="w-full h-full" />
          {/* Subtle decorative top brand line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-olive-dark via-brand-gold to-brand-olive-medium" />
        </div>
        
        <div className="p-6 pt-5 w-full flex flex-col items-center">
          {/* Brand visual header */}
          <div className="mt-1 mb-3">
            <div className="w-10 h-10 rounded-full bg-brand-olive-light flex items-center justify-center mb-1">
              <Compass className="w-4.5 h-4.5 text-brand-olive-dark animate-spin-slow" />
            </div>
          </div>

          {/* Wordmark */}
          <h2 className="font-serif italic text-4xl tracking-tighter text-brand-olive-dark">
            Barbara
          </h2>
        <p className="font-sans text-[10px] tracking-widest text-brand-gold uppercase font-bold mt-1.5">
          {brandTheme.tagline}
        </p>

        {/* Slogan */}
        <p className="font-serif italic text-sm text-brand-charcoal/70 mt-3 max-w-xs leading-relaxed">
          "{translations.heroSlogan}"
        </p>

        {/* Prominent Opening Hours Display */}
        <div className="mt-4 py-2 px-5 rounded-full bg-brand-stone-medium/60 border border-brand-gold/30 flex items-center gap-2.5 text-brand-olive-dark select-none shadow-xs">
          <Clock className="w-4 h-4 text-brand-gold shrink-0" />
          <span className="text-xs font-mono font-bold tracking-wide">08:00 – 22:00</span>
          <span className="text-[10px] font-sans text-brand-olive-medium font-bold uppercase tracking-wider border-l border-brand-olive-dark/15 pl-2.5">
            {translations.everyDay}
          </span>
        </div>

        {/* Info badges */}
        <div className="w-full grid grid-cols-2 gap-2 mt-6 pt-5 border-t border-brand-stone-medium">
          {/* Sarafovo location */}
          <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-brand-stone-light border border-brand-olive-dark/[0.03]">
            <span className="text-[9px] uppercase tracking-wider text-brand-olive-medium font-semibold">
              Location
            </span>
            <span className="text-xs text-brand-olive-dark font-bold mt-0.5">
              {brandTheme.location}
            </span>
          </div>

          {/* Quick status (Open now based on hours) */}
          <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-brand-stone-light border border-brand-olive-dark/[0.03]">
            <span className="text-[9px] uppercase tracking-wider text-brand-olive-medium font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Status
            </span>
            <span className="text-xs text-brand-olive-dark font-bold mt-0.5">
              Open Daily
            </span>
          </div>
        </div>

        {/* Quick actions for instagram / telephone */}
        <div className="flex gap-4 mt-4 w-full justify-center">
          <a
            id="hero-instagram-link"
            href={brandTheme.instagramUrl}
            target="_blank"
            referrerPolicy="no-referrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-brand-olive-dark hover:text-brand-gold transition-colors py-1.5 px-3 rounded-full bg-brand-stone-medium/40"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Instagram</span>
          </a>
          <a
            id="hero-call-link"
            href={`tel:${brandTheme.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-1.5 text-xs font-semibold text-brand-olive-dark hover:text-brand-gold transition-colors py-1.5 px-3 rounded-full bg-brand-stone-medium/40"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{brandTheme.phone}</span>
          </a>
        </div>
        </div>
      </div>
    </section>
  );
};
