/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { AppProvider } from "./context/AppContext";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { FloatingActions } from "./components/layout/FloatingActions";
import { Hero } from "./components/sections/Hero";
import { CategoryNav } from "./components/sections/CategoryNav";
import { MenuLayout } from "./components/sections/MenuLayout";
import { ContactSection } from "./components/sections/ContactSection";
import { SearchBar } from "./components/ui/SearchBar";
import { FilterChips } from "./components/ui/FilterChips";
import { BottomSheet } from "./components/ui/BottomSheet";
import { ReservationModal } from "./components/ui/ReservationModal";
import { CallWaiterModal } from "./components/ui/CallWaiterModal";
import { NotificationBanner } from "./components/ui/NotificationBanner";

export default function App() {
  return (
    <AppProvider>
      {/* 1. Global Alert Toast Streamer */}
      <NotificationBanner />

      {/* 2. Page Sticky Navigation Header */}
      <Header />

      {/* 3. Primary Content Stream */}
      <main className="bg-brand-stone-light min-h-screen flex flex-col">
        {/* Welcome Section */}
        <Hero />

        {/* Live Filter & Search Modules */}
        <SearchBar />
        <FilterChips />

        {/* Dynamic Nav Chips */}
        <CategoryNav />

        {/* Food Item Grid List */}
        <MenuLayout />

        {/* Secondary Contact block */}
        <ContactSection />
      </main>

      {/* 4. Elegant Brand Footer */}
      <Footer />

      {/* 5. Persistent Thumb-Reachable Action Drawer */}
      <FloatingActions />

      {/* 6. Dynamic Bottom Sheets & Dialog Modals */}
      <BottomSheet />
      <ReservationModal />
      <CallWaiterModal />
    </AppProvider>
  );
}
