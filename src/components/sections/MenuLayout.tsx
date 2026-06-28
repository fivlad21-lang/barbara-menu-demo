/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext";
import { MenuCard } from "../ui/MenuCard";
import { Sparkles, RefreshCw, Layers } from "lucide-react";

export const MenuLayout: React.FC = () => {
  const { menuData, activeCategory, setActiveCategory, clearFilters, translations, searchQuery, filters } = useApp();
  const scrollListenerRef = useRef<boolean>(false);

  // Monitor scroll height to set the active navigation category chip dynamically
  useEffect(() => {
    const handleScroll = () => {
      // If we are actively scrolling from a click event, don't trigger state updates to prevent twitching
      if (scrollListenerRef.current) return;

      const categories = menuData.categories;
      const scrollPosition = window.scrollY + 160; // Offset focal point below the header line

      for (const cat of categories) {
        const el = document.getElementById(`category-section-${cat.id}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveCategory(cat.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuData.categories, setActiveCategory]);

  const hasFiltersApplied = searchQuery.trim() !== "" || Object.values(filters).some(Boolean);

  return (
    <section id="menu-layout-section" className="px-3.5 sm:px-5 mt-6 max-w-md mx-auto flex-grow">
      {/* 1. Empty State Fallback */}
      {menuData.categories.length === 0 ? (
        <div id="menu-empty-state" className="flex flex-col items-center text-center py-16 px-4 bg-white rounded-[2.5rem] border border-brand-olive-dark/5 shadow-sm mt-4">
          <div className="w-12 h-12 rounded-full bg-brand-stone-medium/40 flex items-center justify-center mb-4 text-brand-olive-medium">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-brand-olive-dark">
            {translations.noResultsTitle}
          </h3>
          <p className="font-sans text-xs text-brand-charcoal/60 mt-2 max-w-xs leading-relaxed font-medium">
            {translations.noResultsDesc}
          </p>
          {hasFiltersApplied && (
            <button
              id="empty-state-reset-btn"
              onClick={clearFilters}
              className="mt-6 flex items-center gap-2 bg-brand-olive-dark hover:bg-brand-olive-medium text-brand-stone-light text-xs font-bold py-3 px-6 rounded-full transition-all active:scale-95 shadow-md cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{translations.clearFilters}</span>
            </button>
          )}
        </div>
      ) : (
        /* 2. Menu Stream Categories & Cards Grid */
        <div className="space-y-10 mt-2">
          {menuData.categories.map((category) => (
            <div
              key={category.id}
              id={`category-section-${category.id}`}
              className="scroll-mt-36"
            >
              {/* Category Header Title */}
              <div className="flex flex-col mb-4 select-none">
                <h3 className="font-serif font-bold text-xl text-brand-olive-dark flex items-center gap-2">
                  {category.title}
                  {category.featured && (
                    <span className="p-1 bg-brand-gold/10 text-brand-gold rounded-full" title="Chef Selected">
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    </span>
                  )}
                </h3>
                {category.description && (
                  <p className="font-sans text-xs text-brand-olive-medium/80 mt-1 italic font-medium">
                    {category.description}
                  </p>
                )}
                <div className="w-12 h-[2px] bg-brand-gold/45 mt-3 rounded-full" />
              </div>

              {/* Products Grid Stack */}
              <div className="grid grid-cols-1 gap-4">
                {category.items.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
