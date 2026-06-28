/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { motion, AnimatePresence } from "motion/react";
import { X, Clock, AlertTriangle, Apple, Compass, Sparkles, ChefHat } from "lucide-react";

export const BottomSheet: React.FC = () => {
  const { selectedProduct, setSelectedProduct, translations } = useApp();

  // Disable body scroll when the bottom sheet is active
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const item = selectedProduct;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        {/* Backdrop glassmorphic dark overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProduct(null)}
          className="absolute inset-0 bg-brand-olive-dark/45 backdrop-blur-sm"
        />

        {/* Bottom Sheet Modal Panel */}
        <motion.div
          id="product-bottom-sheet"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative w-full max-w-md bg-brand-stone-light rounded-t-[2.5rem] shadow-2xl border-t border-brand-olive-dark/10 overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Visual Pull Bar */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-brand-olive-dark/15 rounded-full z-25" />

          {/* Close Button */}
          <button
            id="close-bottom-sheet"
            onClick={() => setSelectedProduct(null)}
            className="absolute top-5 right-5 z-30 p-2 rounded-full bg-white/90 text-brand-olive-dark shadow hover:bg-white transition-colors border border-brand-olive-dark/5"
            aria-label={translations.closeBtn}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Scrollable Sheet Content */}
          <div className="overflow-y-auto no-scrollbar pb-12">
            {/* Main Image Banner */}
            {item.image ? (
              <div className="relative aspect-[16/10] bg-brand-stone-medium">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            ) : (
              /* High-End Minimalist Header if no Image exists */
              <div className="h-28 bg-brand-olive-dark flex items-center justify-center relative">
                <Compass className="w-8 h-8 text-brand-gold animate-spin-slow" />
              </div>
            )}

            {/* Product Body Details */}
            <div className="p-6">
              {/* Product Badge Labels */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase bg-brand-gold text-brand-olive-dark rounded-md border border-brand-gold-dark/10"
                  >
                    {tag}
                  </span>
                ))}
                {item.seasonal && (
                  <span className="px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100">
                    Seasonal
                  </span>
                )}
                {item.new && (
                  <span className="px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-700 rounded-md border border-emerald-100">
                    New
                  </span>
                )}
              </div>

              {/* Product Name & Weight */}
              <div className="flex justify-between items-baseline gap-4 mb-2">
                <h3 className="font-serif font-bold text-2xl text-brand-olive-dark">
                  {item.name}
                </h3>
                {item.weight && (
                  <span className="font-mono text-xs text-brand-olive-medium font-semibold tracking-wide bg-brand-stone-medium/50 px-2.5 py-1 rounded-lg border border-brand-olive-dark/5 shrink-0">
                    {item.weight}
                  </span>
                )}
              </div>

              {/* Long Description */}
              <p className="font-sans text-sm text-brand-charcoal/80 leading-relaxed mb-6 font-normal">
                {item.description}
              </p>

              {/* Details Specifications Grid */}
              <div className="space-y-4">
                {/* Ingredients */}
                {item.ingredients.length > 0 && (
                  <div className="p-4 rounded-2xl bg-white border border-brand-olive-dark/[0.04]">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-brand-olive-medium flex items-center gap-1.5 mb-2">
                      <Apple className="w-3.5 h-3.5 text-brand-gold" />
                      {translations.ingredientsLabel}
                    </span>
                    <p className="text-xs text-brand-charcoal/85 leading-relaxed font-medium">
                      {item.ingredients.join(", ")}
                    </p>
                  </div>
                )}

                {/* Allergens warning */}
                {item.allergens.length > 0 && (
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/50">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 flex items-center gap-1.5 mb-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      {translations.allergensLabel}
                    </span>
                    <p className="text-xs text-amber-900 leading-relaxed font-semibold">
                      {item.allergens.join(", ")}
                    </p>
                  </div>
                )}

                {/* Prep time & Info */}
                {item.preparationTime && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-brand-stone-medium/40 border border-brand-olive-dark/[0.02]">
                    <Clock className="w-4 h-4 text-brand-gold" />
                    <span className="text-xs text-brand-charcoal font-medium">
                      {translations.prepTimeLabel}: <strong className="font-semibold text-brand-olive-dark">{item.preparationTime}</strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Sticky Action / Price Display */}
              <div className="mt-8 pt-5 border-t border-brand-stone-medium flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-olive-medium mb-1">
                    {translations.priceLabel}
                  </span>
                  <div className="flex flex-col font-mono text-left">
                    <span className="text-xl font-bold text-brand-charcoal leading-none">
                      {item.priceBGN.toFixed(2)} лв
                    </span>
                    <span className="text-sm font-semibold text-brand-gold/90 mt-1 leading-none">
                      €{item.priceEUR.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Back button */}
                <button
                  id="bottom-sheet-back-btn"
                  onClick={() => setSelectedProduct(null)}
                  className="bg-brand-olive-dark hover:bg-brand-olive-medium text-brand-stone-light text-xs font-bold py-3 px-6 rounded-full transition-colors active:scale-95 shadow-md flex items-center gap-2"
                >
                  <ChefHat className="w-4 h-4 text-brand-gold" />
                  <span>{translations.backToMenu}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
