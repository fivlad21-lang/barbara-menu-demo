/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Reservation } from "../types";

class ReservationService {
  private STORAGE_KEY = "barbara_qr_reservations";

  /**
   * Retrieves all submitted reservations from localStorage.
   */
  public getReservations(): Reservation[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to load reservations from localStorage", e);
      return [];
    }
  }

  /**
   * Adds a new reservation and saves it locally.
   */
  public createReservation(data: Omit<Reservation, "id" | "createdAt" | "status">): Reservation {
    const reservations = this.getReservations();
    
    const newReservation: Reservation = {
      ...data,
      id: "res_" + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: "pending"
    };

    reservations.unshift(newReservation);
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reservations));
    } catch (e) {
      console.error("Failed to save reservation to localStorage", e);
    }

    // In a real application, we would make an API call to a webhook / Supabase here
    console.log("Reservation Submitted successfully:", newReservation);
    return newReservation;
  }

  /**
   * Mock submitting a "Call Waiter" alert.
   */
  public callWaiter(tableNumber: string): void {
    const alertData = {
      id: "call_" + Math.random().toString(36).substr(2, 9),
      tableNumber,
      timestamp: new Date().toISOString(),
    };
    
    // In a real application, this sends a WebSocket / PubSub notification to staff dashboard
    console.log(`[WAITER CALL] Table ${tableNumber} has requested service!`, alertData);
  }
}

export const reservationService = new ReservationService();
