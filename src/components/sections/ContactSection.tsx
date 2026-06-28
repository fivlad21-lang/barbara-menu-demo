/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useApp } from "../../context/AppContext";
import { brandTheme } from "../../theme";
import { Instagram, MapPin, Phone, Compass, ArrowUpRight, MessageSquare } from "lucide-react";

// Localized translations helper for the location section
const localLocationTranslations = {
  bg: {
    locationTitle: "Къде да ни намерите",
    addressTitle: "Адрес",
    phoneTitle: "Телефон",
    directionsBtn: "Виж упътвания",
    socialsTitle: "Последвайте ни",
    connectTitle: "Връзка с нас",
  },
  en: {
    locationTitle: "Where to Find Us",
    addressTitle: "Address",
    phoneTitle: "Phone",
    directionsBtn: "Get Directions",
    socialsTitle: "Follow Us",
    connectTitle: "Connect & Visit",
  },
  ua: {
    locationTitle: "Де нас знайти",
    addressTitle: "Адреса",
    phoneTitle: "Телефон",
    directionsBtn: "Отримати маршрут",
    socialsTitle: "Приєднуйтесь до нас",
    connectTitle: "Зв'язатися з нами",
  },
  ru: {
    locationTitle: "Где нас найти",
    addressTitle: "Адрес",
    phoneTitle: "Телефон",
    directionsBtn: "Проложить маршрут",
    socialsTitle: "Присоединяйтесь",
    connectTitle: "Связаться с нами",
  }
};

export const ContactSection: React.FC = () => {
  const { language, translations, setIsReservationOpen } = useApp();
  
  // Safeguard language index
  const activeLang = localLocationTranslations[language] || localLocationTranslations.bg;

  // Directions link optimized to trigger native apps (Google Maps/Apple Maps) on mobile and browser on desktop
  const directionsUrl = brandTheme.googleMapsUrl;

  // Google Maps embed URL targeting the exact place and coordinates of Barbara Sarafovo
  const embedMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2936.561331252086!2d27.5320417!3d42.5616631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a6970de9a91ab5%3A0xfbcb7930bc222dbf!2sBarbara%20Sarafovo!5e0!3m2!1sen!2sbg!4v1719560000000!5m2!1sen!2sbg";

  return (
    <section id="contact-info-section" className="px-5 mt-16 pb-12 max-w-md mx-auto space-y-6">
      {/* 1. Location Section with Embedded Map */}
      <div className="bg-white rounded-[2rem] border border-brand-olive-dark/5 shadow-sm p-6 space-y-5">
        <div className="text-center select-none">
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">
            Location
          </span>
          <h3 className="font-serif font-bold text-xl text-brand-olive-dark mt-1">
            {activeLang.locationTitle}
          </h3>
          <div className="w-8 h-[1px] bg-brand-gold/40 mx-auto mt-2.5" />
        </div>

        {/* Embedded Map Frame with Beautiful Glass Frame Styling */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-brand-stone-medium/40 border border-brand-stone-medium shadow-inner">
          <iframe
            title="Barbara Sarafovo Map Location"
            src={embedMapUrl}
            className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Address and Directions Block */}
        <div className="space-y-4">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-brand-stone-light border border-brand-stone-medium/30">
            <div className="w-8 h-8 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase tracking-wider text-brand-olive-medium font-bold">
                {activeLang.addressTitle}
              </span>
              <span className="text-xs text-brand-charcoal font-semibold mt-1 leading-relaxed whitespace-pre-line">
                Albatros Street 8{"\n"}Sarafovo, Burgas 8016, Bulgaria
              </span>
            </div>
          </div>

          {/* Prominent Get Directions Button */}
          <a
            id="get-directions-btn"
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-brand-gold hover:bg-brand-gold/90 text-brand-olive-dark text-xs font-bold rounded-2xl transition-all shadow-sm uppercase tracking-wider flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Compass className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>{activeLang.directionsBtn}</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>
      </div>

      {/* 2. Connect & Social Section */}
      <div className="bg-white rounded-[2rem] border border-brand-olive-dark/5 shadow-sm p-6 space-y-6">
        <div className="text-center select-none">
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">
            Social & Booking
          </span>
          <h3 className="font-serif font-bold text-xl text-brand-olive-dark mt-1">
            {activeLang.connectTitle}
          </h3>
          <div className="w-8 h-[1px] bg-brand-gold/40 mx-auto mt-2.5" />
        </div>

        {/* Direct Link Grid */}
        <div className="grid grid-cols-1 gap-3 text-xs font-semibold text-brand-charcoal">
          {/* Social Instagram link */}
          <a
            id="contact-instagram-link"
            href={brandTheme.instagramUrl}
            target="_blank"
            referrerPolicy="no-referrer"
            className="flex items-center gap-4 p-3.5 rounded-2xl bg-brand-stone-light/50 border border-brand-stone-medium/40 hover:border-brand-gold/35 transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Instagram className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-wider text-brand-olive-medium font-bold">{activeLang.socialsTitle}</span>
              <span className="text-brand-charcoal mt-0.5">@{brandTheme.instagram}</span>
            </div>
          </a>

          {/* Direct call action */}
          <a
            id="contact-phone-link"
            href={`tel:${brandTheme.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-4 p-3.5 rounded-2xl bg-brand-stone-light/50 border border-brand-stone-medium/40 hover:border-brand-gold/35 transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Phone className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-wider text-brand-olive-medium font-bold">{activeLang.phoneTitle}</span>
              <span className="text-brand-charcoal mt-0.5">{brandTheme.phone}</span>
            </div>
          </a>
        </div>

        {/* Big secondary Reserve CTA inside card */}
        <button
          id="contact-reserve-btn"
          onClick={() => setIsReservationOpen(true)}
          className="w-full py-3.5 bg-brand-olive-dark hover:bg-brand-olive-medium text-brand-stone-light text-xs font-bold rounded-2xl transition-all cursor-pointer shadow-sm uppercase tracking-wider flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4 text-brand-gold" />
          <span>{translations.reserveTitle}</span>
        </button>
      </div>
    </section>
  );
};
