/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MenuItem } from "../../types";
import { useApp } from "../../context/AppContext";
import { Leaf, Award, Sparkles, Flame, Shield, Info, Wine } from "lucide-react";

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const { setSelectedProduct, translations } = useApp();

  // Pick suitable color classes for tag badges
  const getTagStyle = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes("new") || t.includes("ново")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    }
    if (t.includes("popular") || t.includes("любимо") || t.includes("бестселър") || t.includes("bestseller")) {
      return "bg-orange-50 text-orange-700 border-orange-100";
    }
    if (t.includes("chef") || t.includes("шефа")) {
      return "bg-brand-stone-medium text-brand-olive-dark border-brand-olive-dark/10 font-bold italic";
    }
    return "bg-brand-stone-medium/50 text-brand-charcoal/80 border-brand-stone-medium/20";
  };

  return (
    <div
      id={`menu-card-${item.id}`}
      onClick={() => setSelectedProduct(item)}
      className="bg-white p-3 sm:p-5 rounded-3xl border border-transparent hover:border-brand-stone-medium/60 flex gap-3 sm:gap-4 shadow-sm hover:shadow transition-all duration-300 cursor-pointer group active:scale-98 select-none"
    >
      {/* Card Image */}
      {item.image ? (
        <div className="w-20 h-20 sm:w-28 sm:h-28 bg-brand-stone-medium rounded-2xl shrink-0 overflow-hidden relative">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="w-20 h-20 sm:w-28 sm:h-28 bg-brand-stone-medium/40 rounded-2xl shrink-0 flex items-center justify-center">
          <div className="w-10 h-0.5 bg-brand-stone-medium/80" />
        </div>
      )}

      {/* Card Content Body */}
      <div className="flex flex-col justify-between flex-1 py-0.5 min-w-0">
        <div>
          {/* Header Row: Name & Price */}
          <div className="flex justify-between items-start gap-2 w-full">
            <h4 className="font-serif font-bold text-sm sm:text-base text-brand-olive-dark group-hover:text-brand-gold transition-colors duration-200 leading-snug flex-1 min-w-0 break-words text-left">
              {item.name}
            </h4>
            <div className="flex flex-col items-end shrink-0 pl-1 font-mono text-right select-none">
              <span className="text-xs sm:text-sm font-bold text-brand-charcoal whitespace-nowrap">
                {item.priceBGN.toFixed(2)} лв
              </span>
              <span className="text-[10px] sm:text-xs text-brand-olive-medium font-semibold mt-0.5 whitespace-nowrap">
                €{item.priceEUR.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Item Description */}
          <p className="font-sans text-[11px] sm:text-xs text-brand-charcoal/65 mt-1.5 line-clamp-2 leading-relaxed font-normal">
            {item.description}
          </p>
        </div>

        {/* Footer Row: Tags, Dietary Icons, Weight */}
        <div className="mt-2.5 pt-2 border-t border-brand-stone-medium/40 flex items-center justify-between gap-2">
          {/* Dietary Icons & Tags */}
          <div className="flex items-center gap-1.5 overflow-hidden">
            {item.tags.length > 0 && (
              <span className={`px-2 py-0.5 text-[8px] font-bold tracking-wider uppercase rounded ${getTagStyle(item.tags[0])} border`}>
                {item.tags[0]}
              </span>
            )}
            
            {/* Dietary Mini-Icons */}
            {item.icons.vegetarian && (
              <span className="p-1 rounded-full bg-green-50 text-green-700" title={translations.dietVegetarian}>
                <Leaf className="w-2.5 h-2.5" />
              </span>
            )}
            {item.icons.vegan && (
              <span className="p-1 rounded-full bg-emerald-50 text-emerald-700" title={translations.dietVegan}>
                <Leaf className="w-2.5 h-2.5" />
              </span>
            )}
            {item.icons.glutenFree && (
              <span className="p-1 rounded-full bg-amber-50 text-amber-700" title={translations.dietGlutenFree}>
                <Shield className="w-2.5 h-2.5" />
              </span>
            )}
            {item.icons.containsAlcohol && (
              <span className="p-1 rounded-full bg-blue-50 text-blue-700" title={translations.dietContainsAlcohol}>
                <Wine className="w-2.5 h-2.5" />
              </span>
            )}
            {item.icons.spicy && (
              <span className="p-1 rounded-full bg-red-50 text-red-700" title={translations.dietSpicy}>
                <Flame className="w-2.5 h-2.5" />
              </span>
            )}
          </div>

          {item.weight && (
            <span className="font-mono text-[9px] text-brand-olive-medium font-semibold tracking-wide bg-brand-stone-light px-2 py-0.5 rounded border border-brand-olive-dark/[0.03] shrink-0">
              {item.weight}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
