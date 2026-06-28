/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LanguageCode, MenuData } from "../types";
import menuBg from "../data/menu.bg.json";
import menuEn from "../data/menu.en.json";
import menuUa from "../data/menu.ua.json";
import menuRu from "../data/menu.ru.json";

class MenuService {
  private menus: Record<LanguageCode, MenuData> = {
    bg: menuBg as MenuData,
    en: menuEn as MenuData,
    ua: menuUa as MenuData,
    ru: menuRu as MenuData,
  };

  /**
   * Returns the menu structure for a given language.
   * Items are pre-sorted by their "order" field.
   */
  public getMenu(lang: LanguageCode): MenuData {
    const menu = this.menus[lang] || this.menus.bg;
    
    // Defensive copy and sort to ensure strict architectural compliance with "order"
    const sortedCategories = [...menu.categories]
      .filter((cat) => cat.visible)
      .map((category) => {
        const sortedItems = [...category.items]
          .filter((item) => item.visible)
          .sort((a, b) => a.order - b.order);
        
        return {
          ...category,
          items: sortedItems,
        };
      })
      .sort((a, b) => a.order - b.order);

    return {
      categories: sortedCategories,
    };
  }

  /**
   * Search and filter items dynamically.
   */
  public searchAndFilter(
    lang: LanguageCode,
    searchQuery: string,
    filters: {
      vegetarian?: boolean;
      vegan?: boolean;
      glutenFree?: boolean;
      alcoholFree?: boolean;
      popular?: boolean;
      new?: boolean;
    }
  ) {
    const menu = this.getMenu(lang);
    const query = searchQuery.trim().toLowerCase();

    return menu.categories.map((category) => {
      const filteredItems = category.items.filter((item) => {
        // 1. Search Query Filter
        if (query) {
          const matchesName = item.name.toLowerCase().includes(query);
          const matchesDesc = item.description.toLowerCase().includes(query);
          const matchesCategory = category.title.toLowerCase().includes(query);
          const matchesTags = item.tags.some((t) => t.toLowerCase().includes(query));
          
          if (!matchesName && !matchesDesc && !matchesCategory && !matchesTags) {
            return false;
          }
        }

        // 2. Active Dietary/Tag Filters
        if (filters.vegetarian && !item.icons.vegetarian) return false;
        if (filters.vegan && !item.icons.vegan) return false;
        if (filters.glutenFree && !item.icons.glutenFree) return false;
        if (filters.alcoholFree && item.icons.containsAlcohol) return false;
        
        // Product tag badges
        if (filters.popular && !item.tags.some(tag => ["Popular", "Bestseller", "Любимо", "Популярно", "Бестселър"].includes(tag))) {
          return false;
        }
        if (filters.new && !item.new) return false;

        return true;
      });

      return {
        ...category,
        items: filteredItems,
      };
    }).filter((category) => category.items.length > 0);
  }
}

export const menuService = new MenuService();
