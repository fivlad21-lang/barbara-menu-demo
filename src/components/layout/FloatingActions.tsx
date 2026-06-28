/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { ArrowUp, Calendar, BellRing } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const FloatingActions: React.FC = () => {
  const { translations, setIsReservationOpen, setIsCallWaiterOpen } = useApp();
  const [isVisible, setIsVisible] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide scroll to top button
      setShowScrollTop(currentScrollY > 300);

      // Hide floating actions when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true);  // Scrolling up or near top
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-5 flex flex-col items-center gap-3 pointer-events-none">
      {/* Scroll to Top Arrow Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="scroll-to-top-btn"
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            onClick={scrollToTop}
            className="pointer-events-auto w-10 h-10 rounded-full bg-white hover:bg-brand-stone-light text-brand-olive-dark shadow-lg flex items-center justify-center border border-brand-olive-dark/5 transition-colors self-end"
            aria-label={translations.scrolledToTop}
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Bottom CTAs (Reserve and Call Waiter) */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            id="floating-cta-bar"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="pointer-events-auto w-full grid grid-cols-2 gap-3 bg-brand-olive-dark/95 backdrop-blur-md p-2 rounded-full shadow-2xl border border-white/5"
          >
            {/* Call Waiter */}
            <button
              id="floating-call-waiter-btn"
              onClick={() => setIsCallWaiterOpen(true)}
              className="flex items-center justify-center gap-2 text-brand-stone-light hover:text-brand-gold text-xs font-semibold py-3 px-4 rounded-full transition-all active:scale-95 select-none"
            >
              <BellRing className="w-4 h-4 text-brand-gold animate-pulse" />
              <span>{translations.callWaiterBtn}</span>
            </button>

            {/* Reserve Table */}
            <button
              id="floating-reserve-table-btn"
              onClick={() => setIsReservationOpen(true)}
              className="flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-olive-dark text-xs font-bold py-3 px-4 rounded-full transition-all active:scale-95 select-none shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>{translations.reserveTableBtn}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
