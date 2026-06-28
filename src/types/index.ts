/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DietaryIcons {
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  spicy?: boolean;
  containsAlcohol?: boolean;
  lactoseFree?: boolean;
}

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceBGN: number;
  priceEUR: number;
  weight: string; // e.g., "300 g", "50 ml"
  image?: string;
  gallery?: string[];
  available: boolean;
  visible: boolean;
  featured: boolean;
  seasonal: boolean;
  new: boolean;
  order: number;
  tags: string[]; // e.g., ["Popular", "Chef's Choice", "Limited"]
  icons: DietaryIcons;
  allergens: string[]; // e.g., ["Milk", "Nuts", "Gluten"]
  ingredients: string[];
  preparationTime: string | null;
}

export interface MenuCategory {
  id: string;
  title: string;
  description?: string;
  icon?: string; // name of lucide icon
  order: number;
  visible: boolean;
  featured?: boolean;
  backgroundImage?: string;
  items: MenuItem[];
}

export interface MenuData {
  categories: MenuCategory[];
}

export type LanguageCode = "bg" | "en" | "ua" | "ru";

export interface Reservation {
  id: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
  comment?: string;
  tableNumber?: string;
  createdAt: string;
  status: "pending" | "confirmed" | "cancelled";
}

export interface UITheme {
  colors: {
    primary: string; // Dark Olive
    secondary: string; // Warm Beige
    background: string; // Warm White / Light Stone
    surface: string; // Pure white or soft tint
    accent: string; // Soft Gold
    textDark: string; // Charcoal
    textLight: string; // Soft gray
    border: string;
  };
  typography: {
    fontDisplay: string;
    fontBody: string;
    fontMono: string;
  };
  radius: {
    card: string;
    button: string;
    badge: string;
  };
}
