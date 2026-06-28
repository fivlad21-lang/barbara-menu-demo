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
   * Adds a new reservation, saves it locally, and posts to the Telegram backend.
   */
  public async createReservation(data: Omit<Reservation, "id" | "createdAt" | "status">): Promise<Reservation> {
    const response = await fetch("/api/reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to submit reservation notification.");
    }

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

    console.log("Reservation Submitted successfully:", newReservation);
    return newReservation;
  }

  /**
   * Submits a "Call Waiter" alert.
   */
  public async callWaiter(tableNumber: string): Promise<void> {
    const alertData = {
      id: "call_" + Math.random().toString(36).substr(2, 9),
      tableNumber,
      timestamp: new Date().toISOString(),
    };
    
    try {
      const response = await fetch("/api/call-waiter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tableNumber }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        console.warn("[callWaiter] Server returned failure:", errData.error || response.statusText);
      }
    } catch (e) {
      console.error("[callWaiter] Failed to notify backend of waiter call", e);
    }

    console.log(`[WAITER CALL] Table ${tableNumber} has requested service!`, alertData);
  }
}

export const reservationService = new ReservationService();
