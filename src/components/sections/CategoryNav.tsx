/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import { useApp } from "../../context/AppContext";
import { Coffee, Utensils, Cake, GlassWater, Wine } from "lucide-react";

// Helper map to dynamically display high-end Lucide icons
const iconMap: Record<string, React.ComponentType<any>> = {
  Coffee: Coffee,
  Utensils: Utensils,
  Cake: Cake,
  GlassWater: GlassWater,
  Wine: Wine,
};

export const CategoryNav: React.FC = () => {
  const { menuData, activeCategory, setActiveCategory } = useApp();
  const navRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  // Dynamic sticky shadow
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const top = navRef.current.getBoundingClientRect().top;
        setIsSticky(top <= 65); // Just below the header
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Center active tab inside horizontal scrolling containers
  useEffect(() => {
    if (activeTabRef.current && navRef.current) {
      const container = navRef.current;
      const tab = activeTabRef.current;
      
      const containerScrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.clientWidth;

      // Calculate perfect scroll destination to center the tab
      const scrollTarget = tabLeft - containerWidth / 2 + tabWidth / 2;
      container.scrollTo({
        left: scrollTarget,
        behavior: "smooth",
      });
    }
  }, [activeCategory]);

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    
    // Smooth scroll to the target category with sticky header offset
    const el = document.getElementById(`category-section-${catId}`);
    if (el) {
      const yOffset = -135; // Account for sticky header and tab navigation heights
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (menuData.categories.length === 0) return null;

  return (
    <div
      ref={navRef}
      className={`sticky top-[64px] z-30 w-full transition-all duration-300 ${
        isSticky
          ? "bg-brand-stone-light/95 backdrop-blur-md border-b border-brand-olive-dark/10 shadow-sm"
          : "bg-transparent py-2 border-b border-brand-olive-dark/5"
      }`}
    >
      <div
        className="max-w-md mx-auto px-4 overflow-x-auto no-scrollbar flex items-center gap-2 py-2 select-none scroll-smooth"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {menuData.categories.map((cat) => {
          const IconComponent = iconMap[cat.icon || "Coffee"] || Coffee;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              ref={isActive ? activeTabRef : null}
              id={`cat-chip-${cat.id}`}
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer flex-shrink-0 whitespace-nowrap active:scale-95 ${
                isActive
                  ? "bg-brand-olive-dark text-brand-stone-light shadow-md shadow-brand-olive-dark/15 scale-102"
                  : "bg-white text-brand-olive-medium border border-brand-olive-dark/10 hover:border-brand-olive-dark/20"
              }`}
            >
              <IconComponent className={`w-3.5 h-3.5 ${isActive ? "text-brand-gold" : "text-brand-olive-medium"}`} />
              <span>{cat.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
