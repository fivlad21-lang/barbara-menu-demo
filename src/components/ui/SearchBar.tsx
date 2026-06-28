/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useApp } from "../../context/AppContext";
import { Search, X } from "lucide-react";

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery, translations } = useApp();

  return (
    <div className="px-5 mt-4 max-w-md mx-auto">
      <div className="relative flex items-center w-full">
        {/* Search Icon */}
        <Search className="absolute left-4 w-4 h-4 text-brand-olive-medium pointer-events-none" />

        {/* Input Field */}
        <input
          id="menu-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={translations.searchPlaceholder}
          className="w-full pl-11 pr-10 py-3.5 bg-white border border-brand-olive-dark/10 focus:border-brand-gold focus:outline-none rounded-full text-sm text-brand-charcoal font-medium placeholder-brand-olive-medium/60 transition-all duration-200 shadow-sm"
          aria-label={translations.searchPlaceholder}
        />

        {/* Clear Search Button */}
        {searchQuery && (
          <button
            id="clear-search-btn"
            onClick={() => setSearchQuery("")}
            className="absolute right-3.5 p-1 rounded-full text-brand-olive-medium hover:text-brand-olive-dark hover:bg-brand-stone-light transition-colors"
            aria-label="Clear search query"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
