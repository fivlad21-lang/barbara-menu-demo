/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { LanguageCode, MenuData, MenuItem } from "../types";
import { UITranslations } from "../translations/ui";
import { menuService } from "../services/menuService";
import { translationService } from "../services/translationService";
import { analyticsService } from "../services/analyticsService";

interface FilterState {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  alcoholFree: boolean;
  popular: boolean;
  new: boolean;
}

interface Toast {
  id: string;
  message: string;
  type: "success" | "info" | "error";
}

interface AppContextType {
  language: LanguageCode;
  translations: UITranslations;
  setLanguage: (lang: LanguageCode) => void;
  
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  filters: FilterState;
  toggleFilter: (key: keyof FilterState) => void;
  clearFilters: () => void;
  
  menuData: MenuData;
  activeCategory: string;
  setActiveCategory: (catId: string) => void;
  
  selectedProduct: MenuItem | null;
  setSelectedProduct: (product: MenuItem | null) => void;
  
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  
  isCallWaiterOpen: boolean;
  setIsCallWaiterOpen: (open: boolean) => void;
  
  toasts: Toast[];
  showToast: (message: string, type?: "success" | "info" | "error") => void;
  removeToast: (id: string) => void;
  
  tableNumber: string;
  setTableNumber: (num: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language state (Bulgarian default)
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem("barbara_qr_lang");
    return (saved === "en" || saved === "bg" || saved === "ua" || saved === "ru" ? saved : "bg") as LanguageCode;
  });

  const [translations, setTranslations] = useState<UITranslations>(() =>
    translationService.getTranslations(language)
  );

  // 2. Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    alcoholFree: false,
    popular: false,
    new: false,
  });

  // 3. Menu Data State
  const [menuData, setMenuData] = useState<MenuData>(() =>
    menuService.getMenu(language)
  );
  const [activeCategory, setActiveCategory] = useState("coffee");

  // 4. Interactive Dialog States
  const [selectedProduct, setSelectedProductState] = useState<MenuItem | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isCallWaiterOpen, setIsCallWaiterOpen] = useState(false);
  const [tableNumber, setTableNumberState] = useState(() => {
    return localStorage.getItem("barbara_qr_table") || "";
  });

  // 5. Toast System
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: "success" | "info" | "error" = "success") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Language side-effects
  const setLanguage = (lang: LanguageCode) => {
    analyticsService.trackLanguageSwitch(language, lang);
    setLanguageState(lang);
    localStorage.setItem("barbara_qr_lang", lang);
  };

  const setTableNumber = (num: string) => {
    setTableNumberState(num);
    localStorage.setItem("barbara_qr_table", num);
  };

  const setSelectedProduct = (product: MenuItem | null) => {
    if (product) {
      analyticsService.trackProductDetails(product.id, product.name);
    }
    setSelectedProductState(product);
  };

  // Update menu and translations when language changes
  useEffect(() => {
    setTranslations(translationService.getTranslations(language));
    setMenuData(menuService.getMenu(language));
  }, [language]);

  // Recalculate filtered menu data live when search or filters change
  useEffect(() => {
    const updatedCategories = menuService.searchAndFilter(language, searchQuery, filters);
    setMenuData({ categories: updatedCategories });
    
    // Automatically set active category to the first available category if active category is filtered out
    if (updatedCategories.length > 0) {
      const hasActive = updatedCategories.some((cat) => cat.id === activeCategory);
      if (!hasActive) {
        setActiveCategory(updatedCategories[0].id);
      }
    }
  }, [searchQuery, filters, language]);

  // Custom filter toggles
  const toggleFilter = (key: keyof FilterState) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      analyticsService.trackInteractiveClick(`toggle_filter_${key}_${next[key]}`);
      return next;
    });
  };

  const clearFilters = () => {
    analyticsService.trackInteractiveClick("clear_filters");
    setSearchQuery("");
    setFilters({
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      alcoholFree: false,
      popular: false,
      new: false,
    });
  };

  // Analytics on initial mount
  useEffect(() => {
    analyticsService.trackPageView("home");
  }, []);

  return (
    <AppContext.Provider
      value={{
        language,
        translations,
        setLanguage,
        searchQuery,
        setSearchQuery,
        filters,
        toggleFilter,
        clearFilters,
        menuData,
        activeCategory,
        setActiveCategory,
        selectedProduct,
        setSelectedProduct,
        isReservationOpen,
        setIsReservationOpen,
        isCallWaiterOpen,
        setIsCallWaiterOpen,
        toasts,
        showToast,
        removeToast,
        tableNumber,
        setTableNumber,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
