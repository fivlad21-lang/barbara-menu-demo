/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { reservationService } from "../../services/reservationService";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, CheckCircle2, Calendar, Users, Clock, User, Phone } from "lucide-react";

export const ReservationModal: React.FC = () => {
  const { isReservationOpen, setIsReservationOpen, translations, showToast } = useApp();

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [comment, setComment] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Disable body scroll when open
  useEffect(() => {
    if (isReservationOpen) {
      document.body.style.overflow = "hidden";
      // Auto-set default date to today
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
      setTime("19:00");
    } else {
      document.body.style.overflow = "";
      // Reset state on close
      if (success) {
        setName("");
        setPhone("");
        setComment("");
        setGuests(2);
        setSuccess(false);
        setSubmittedData(null);
      }
      setError("");
    }
  }, [isReservationOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple validations
    if (!name.trim()) {
      setError(translations.reserveValidationErr);
      return;
    }
    if (!phone.trim() || phone.trim().length < 6) {
      setError(translations.reserveValidationErr);
      return;
    }
    if (!date || !time) {
      setError(translations.reserveValidationErr);
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit via service
      const reservation = await reservationService.createReservation({
        name,
        phone,
        date,
        time,
        guests,
        comment,
      });

      setSubmittedData(reservation);
      setSuccess(true);
      showToast(translations.notificationReserveSuccess, "success");
    } catch (err: any) {
      setError(err.message || "Failed to submit reservation. Please try again.");
      showToast(err.message || "Failed to submit reservation.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isReservationOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        {/* Dark backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsReservationOpen(false)}
          className="absolute inset-0 bg-brand-olive-dark/45 backdrop-blur-sm"
        />

        {/* Modal container */}
        <motion.div
          id="reservation-modal-container"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative w-full max-w-md bg-brand-stone-light sm:rounded-[2.5rem] rounded-t-[2.5rem] shadow-2xl border-t border-brand-olive-dark/10 overflow-hidden z-10 flex flex-col max-h-[90vh] sm:max-h-[85vh]"
        >
          {/* Top visual handlebar for mobile pull drawers */}
          <div className="block sm:hidden absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-brand-olive-dark/15 rounded-full z-20" />

          {/* Close trigger */}
          <button
            id="close-reservation-modal"
            onClick={() => setIsReservationOpen(false)}
            className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/90 text-brand-olive-dark shadow hover:bg-white transition-colors border border-brand-olive-dark/5"
            aria-label={translations.closeBtn}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="px-6 pt-8 pb-4 border-b border-brand-stone-medium flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-brand-olive-light flex items-center justify-center mb-2.5">
              <Calendar className="w-5 h-5 text-brand-olive-dark" />
            </div>
            <h3 className="font-serif font-bold text-xl text-brand-olive-dark">
              {translations.reserveTitle}
            </h3>
            <p className="font-sans text-[11px] text-brand-olive-medium font-medium uppercase tracking-wider mt-1">
              Barbara Beach-Side Chic
            </p>
          </div>

          {/* Scrollable Form Workspace */}
          <div className="overflow-y-auto no-scrollbar p-6">
            <AnimatePresence mode="wait">
              {!success ? (
                /* FORM VIEW */
                <motion.form
                  key="form"
                  id="reservation-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  {/* Date & Time Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-bold text-brand-olive-medium block mb-1.5">
                        {translations.reserveDate} *
                      </label>
                      <input
                        id="reserve-date-input"
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-3 bg-white border border-brand-olive-dark/10 rounded-xl text-xs text-brand-charcoal font-medium focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-bold text-brand-olive-medium block mb-1.5">
                        {translations.reserveTime} *
                      </label>
                      <input
                        id="reserve-time-input"
                        type="time"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full p-3 bg-white border border-brand-olive-dark/10 rounded-xl text-xs text-brand-charcoal font-medium focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                  </div>

                  {/* Guests Selector */}
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-brand-olive-medium block mb-1.5">
                      {translations.reserveGuests} *
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex bg-white border border-brand-olive-dark/10 rounded-xl overflow-hidden divide-x divide-brand-olive-dark/5 p-1 w-32 justify-between">
                        <button
                          type="button"
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          className="px-3 py-1.5 text-xs font-bold text-brand-olive-medium hover:text-brand-olive-dark active:scale-95 transition-all"
                        >
                          -
                        </button>
                        <span className="px-4 py-1.5 text-xs font-bold text-brand-charcoal flex items-center">
                          {guests}
                        </span>
                        <button
                          type="button"
                          onClick={() => setGuests(Math.min(12, guests + 1))}
                          className="px-3 py-1.5 text-xs font-bold text-brand-olive-medium hover:text-brand-olive-dark active:scale-95 transition-all"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[10px] text-brand-olive-medium font-semibold italic flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        Max 12 guests
                      </span>
                    </div>
                  </div>

                  {/* Your Name */}
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-brand-olive-medium block mb-1.5">
                      {translations.reserveName} *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-3.5 h-3.5 text-brand-olive-medium/60" />
                      <input
                        id="reserve-name-input"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 bg-white border border-brand-olive-dark/10 rounded-xl text-xs text-brand-charcoal font-semibold focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-brand-olive-medium block mb-1.5">
                      {translations.reservePhone} *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 w-3.5 h-3.5 text-brand-olive-medium/60" />
                      <input
                        id="reserve-phone-input"
                        type="tel"
                        required
                        placeholder="+359 88..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 bg-white border border-brand-olive-dark/10 rounded-xl text-xs text-brand-charcoal font-semibold focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                  </div>

                  {/* Special Comment */}
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-brand-olive-medium block mb-1.5">
                      {translations.reserveComment}
                    </label>
                    <textarea
                      id="reserve-comment-input"
                      rows={2}
                      placeholder="e.g., Sitting on the terrace, stroller space..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full p-3 bg-white border border-brand-olive-dark/10 rounded-xl text-xs text-brand-charcoal font-medium focus:outline-none focus:border-brand-gold resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-reservation-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-4 bg-brand-olive-dark hover:bg-brand-olive-medium text-brand-stone-light text-xs font-bold rounded-xl shadow-lg hover:shadow-xl transition-all select-none mt-4 flex items-center justify-center gap-1.5 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
                    )}
                    <span>{isSubmitting ? "Sending..." : translations.reserveSubmit}</span>
                  </button>
                </motion.form>
              ) : (
                /* SUCCESS STATE VIEW */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center py-6 space-y-5"
                >
                  <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600 animate-bounce" />
                  </div>
                  
                  <h4 className="font-serif font-bold text-xl text-brand-olive-dark leading-snug">
                    {translations.reserveSuccessTitle}
                  </h4>
                  
                  <p className="font-sans text-xs text-brand-charcoal/70 leading-relaxed max-w-xs font-medium">
                    {translations.reserveSuccessDesc}
                  </p>

                  {/* Booking Receipt Preview Card */}
                  <div className="w-full p-4 rounded-2xl bg-white border border-brand-olive-dark/5 text-left space-y-2.5 shadow-sm font-sans text-xs font-medium">
                    <div className="flex justify-between pb-2 border-b border-brand-stone-medium font-bold text-brand-olive-dark">
                      <span>Booking ID</span>
                      <span className="font-mono text-[10px] text-brand-gold uppercase">{submittedData?.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-olive-medium">Guest Name</span>
                      <span className="text-brand-charcoal font-bold">{submittedData?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-olive-medium">Guests Count</span>
                      <span className="text-brand-charcoal font-bold">{submittedData?.guests} persons</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-olive-medium">Date & Time</span>
                      <span className="text-brand-charcoal font-bold">{submittedData?.date} @ {submittedData?.time}</span>
                    </div>
                    {submittedData?.comment && (
                      <div className="pt-2 border-t border-brand-stone-medium/50 text-[11px] italic text-brand-olive-medium">
                        "{submittedData.comment}"
                      </div>
                    )}
                  </div>

                  <button
                    id="reservation-success-close-btn"
                    onClick={() => setIsReservationOpen(false)}
                    className="py-3 px-8 bg-brand-stone-medium/70 text-brand-olive-dark text-xs font-bold rounded-xl transition-all"
                  >
                    {translations.closeBtn}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
