/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useApp } from "../../context/AppContext";
import { brandTheme } from "../../theme";
import { Instagram, Phone, MapPin, Clock } from "lucide-react";

export const Footer: React.FC = () => {
  const { translations } = useApp();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-brand-olive-dark text-brand-stone-light pt-12 pb-24 border-t border-white/5 mt-16">
      <div className="max-w-md mx-auto px-6 flex flex-col items-center text-center">
        {/* Logo Icon / Wordmark */}
        <h2 className="font-serif font-bold text-2xl tracking-widest text-brand-stone-light mb-1">
          BARBARA
        </h2>
        <div className="w-8 h-[1px] bg-brand-gold/40 mb-6" />

        {/* Brand Description */}
        <p className="font-serif italic text-sm text-brand-stone-light/75 max-w-xs mb-8">
          "{translations.heroSlogan}"
        </p>

        {/* Quick Contact Grid */}
        <div className="w-full space-y-4 mb-10 text-xs font-medium tracking-wide">
          {/* Opening Hours */}
          <div className="flex flex-col items-center gap-1.5 p-4 rounded-2xl bg-white/5 border border-white/5">
            <span className="flex items-center gap-1.5 text-brand-gold font-semibold uppercase tracking-wider text-[10px]">
              <Clock className="w-3.5 h-3.5 animate-pulse" />
              {translations.openingHours}
            </span>
            <span className="text-brand-stone-light font-mono text-sm font-bold tracking-wide mt-1">
              08:00 - 22:00
            </span>
            <span className="text-brand-stone-light/60 text-[9px] uppercase font-bold tracking-wider">
              {translations.everyDay}
            </span>
          </div>

          {/* Location Address */}
          <a
            href={brandTheme.googleMapsUrl}
            target="_blank"
            referrerPolicy="no-referrer"
            className="flex items-center gap-2.5 justify-center py-1.5 px-3 text-brand-stone-light/80 hover:text-brand-gold transition-colors"
          >
            <MapPin className="w-4 h-4 text-brand-gold/80 flex-shrink-0" />
            <span>{brandTheme.address}</span>
          </a>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-2 pt-2 border-t border-white/5">
            <a
              href={`tel:${brandTheme.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 py-1.5 text-brand-stone-light/80 hover:text-brand-gold transition-colors"
            >
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>{brandTheme.phone}</span>
            </a>
            <a
              href={brandTheme.instagramUrl}
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center gap-1.5 py-1.5 text-brand-stone-light/80 hover:text-brand-gold transition-colors"
            >
              <Instagram className="w-4 h-4 text-brand-gold" />
              <span>@{brandTheme.instagram}</span>
            </a>
          </div>
        </div>

        {/* Legal / Copyright */}
        <div className="text-[10px] text-brand-stone-light/40 tracking-wider">
          <p>© {currentYear} {brandTheme.name} Platform.</p>
          <p className="mt-1">All rights reserved. Sarafovo Beach Chic.</p>
        </div>
      </div>
    </footer>
  );
};
