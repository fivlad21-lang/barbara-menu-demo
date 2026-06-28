/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useApp } from "../../context/AppContext";
import { Leaf, Award, Sparkles, ShieldCheck, GlassWater } from "lucide-react";

export const FilterChips: React.FC = () => {
  const { filters, toggleFilter, translations } = useApp();

  const filterConfigs = [
    {
      key: "vegetarian" as const,
      label: translations.filterVegetarian,
      icon: Leaf,
      activeColor: "bg-green-50 text-green-800 border-green-200",
    },
    {
      key: "vegan" as const,
      label: translations.filterVegan,
      icon: Leaf,
      activeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    },
    {
      key: "glutenFree" as const,
      label: translations.filterGlutenFree,
      icon: ShieldCheck,
      activeColor: "bg-amber-50 text-amber-800 border-amber-200",
    },
    {
      key: "alcoholFree" as const,
      label: translations.filterAlcoholFree,
      icon: GlassWater,
      activeColor: "bg-blue-50 text-blue-800 border-blue-200",
    },
    {
      key: "popular" as const,
      label: translations.filterPopular,
      icon: Award,
      activeColor: "bg-yellow-50 text-yellow-800 border-yellow-200",
    },
    {
      key: "new" as const,
      label: translations.filterNew,
      icon: Sparkles,
      activeColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
    },
  ];

  return (
    <div className="px-5 mt-3 max-w-md mx-auto">
      <div className="flex gap-2 py-1 overflow-x-auto no-scrollbar" style={{ WebkitOverflowScrolling: "touch" }}>
        {filterConfigs.map((cfg) => {
          const isActive = filters[cfg.key];
          const IconComponent = cfg.icon;

          return (
            <button
              key={cfg.key}
              id={`filter-chip-${cfg.key}`}
              onClick={() => toggleFilter(cfg.key)}
              className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap ${
                isActive
                  ? `${cfg.activeColor} shadow-sm font-bold scale-102`
                  : "bg-white border-brand-olive-dark/10 text-brand-olive-medium hover:border-brand-olive-dark/20"
              }`}
            >
              <IconComponent className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{cfg.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
