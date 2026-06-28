/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Barbara Brand Theme Configuration
export const brandTheme = {
  name: "Barbara",
  tagline: "Coffee • Brunch • Cocktails",
  location: "Sarafovo",
  phone: "087 784 0262",
  instagram: "barbara_sarafovo",
  instagramUrl: "https://www.instagram.com/barbara_sarafovo",
  googleMapsUrl: "https://www.google.com/maps/place/Barbara+Sarafovo/@42.5616631,27.5250894,16z/data=!4m10!1m2!2m1!1sBarbara+Coffee+Brunch+Cocktails+Sarafovo!3m6!1s0x40a6970de9a91ab5:0xfbcb7930bc222dbf!8m2!3d42.5616631!4d27.5346166!15sCihCYXJiYXJhIENvZmZlZSBCcnVuY2ggQ29ja3RhaWxzIFNhcmFmb3ZvWioiKGJhcmJhcmEgY29mZmVlIGJydW5jaCBjb2NrdGFpbHMgcanyYXZvdm-SAQZiaXN0cm-aAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMnBTTTFZeFJYcFpVekV4VFRGYWRsSlliRXBrUlhnMlpEQTFkMk5XUlJBQuABAPoBBAgjEDg!16s%2Fg%2F11njzjmf9x?hl=uk&entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D",
  address: "Albatros Street 8, Sarafovo, Burgas 8016, Bulgaria",
  openingHours: {
    weekdays: "08:00 - 22:00",
    weekends: "08:00 - 22:00",
  },
  
  // Custom theme constants
  colors: {
    olive: {
      dark: "#2C362A",   // Primary brand dark
      medium: "#3D4A3A", // Hover / secondary accent
      light: "#E6ECE4",  // Soft backgrounds
    },
    beige: {
      light: "#F5EFEB",  // Warm, soft cream background
      medium: "#EBE1D8", // Divider or slightly darker beige
    },
    gold: {
      primary: "#C5A059", // Accent gold
      dark: "#B28E46",
    },
    charcoal: "#1C221E", // Body text
    stone: {
      light: "#FAF8F5",  // Overall page background
      medium: "#F0EDE9", // Secondary layout containers
    }
  },
  
  // Visual properties
  radius: {
    card: "rounded-2xl",
    button: "rounded-full",
    badge: "rounded-md",
  },
  
  typography: {
    fontDisplay: "font-serif", // Editorial headings
    fontBody: "font-sans",     // Highly readable UI text
    fontMono: "font-mono",     // High precision, pricing
  }
};
