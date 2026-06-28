/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { reservationService } from "../../services/reservationService";
import { motion, AnimatePresence } from "motion/react";
import { X, BellRing, CheckCircle2, Award } from "lucide-react";

export const CallWaiterModal: React.FC = () => {
  const { isCallWaiterOpen, setIsCallWaiterOpen, translations, showToast, tableNumber, setTableNumber } = useApp();
  const [inputTable, setInputTable] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isCallWaiterOpen) {
      document.body.style.overflow = "hidden";
      setInputTable(tableNumber); // Prefill from state
    } else {
      document.body.style.overflow = "";
      if (success) {
        setSuccess(false);
      }
      setError("");
    }
  }, [isCallWaiterOpen, tableNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!inputTable.trim() || isNaN(Number(inputTable))) {
      setError("Please enter a valid table number.");
      return;
    }

    // Save table number
    setTableNumber(inputTable.trim());
    
    // Call waiter service action
    reservationService.callWaiter(inputTable.trim());
    
    setSuccess(true);
    showToast(`${translations.notificationCallWaiter} ${inputTable.trim()}`, "info");
  };

  if (!isCallWaiterOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCallWaiterOpen(false)}
          className="absolute inset-0 bg-brand-olive-dark/45 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          id="call-waiter-modal-container"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative w-full max-w-md bg-brand-stone-light sm:rounded-[2.5rem] rounded-t-[2.5rem] shadow-2xl border-t border-brand-olive-dark/10 overflow-hidden z-10 flex flex-col max-h-[85vh]"
        >
          {/* Top drag handlebar */}
          <div className="block sm:hidden absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-brand-olive-dark/15 rounded-full z-20" />

          {/* Close button */}
          <button
            id="close-call-waiter-modal"
            onClick={() => setIsCallWaiterOpen(false)}
            className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/90 text-brand-olive-dark shadow hover:bg-white transition-colors border border-brand-olive-dark/5"
            aria-label={translations.closeBtn}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="px-6 pt-8 pb-4 border-b border-brand-stone-medium flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-brand-gold/15 flex items-center justify-center mb-2.5">
              <BellRing className="w-5 h-5 text-brand-gold animate-bounce" />
            </div>
            <h3 className="font-serif font-bold text-xl text-brand-olive-dark">
              {translations.callTitle}
            </h3>
            <p className="font-sans text-[11px] text-brand-olive-medium font-medium uppercase tracking-wider mt-1">
              {translations.callSubtitle}
            </p>
          </div>

          {/* Body content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {!success ? (
                /* Form view */
                <motion.form
                  key="call-form"
                  id="call-waiter-form"
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

                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-brand-olive-medium block mb-2 text-center">
                      {translations.callTableNumber}
                    </label>
                    
                    <div className="flex justify-center max-w-xs mx-auto">
                      <input
                        id="table-number-input"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        required
                        value={inputTable}
                        onChange={(e) => setInputTable(e.target.value)}
                        placeholder="e.g., 5"
                        className="w-24 text-center p-4 bg-white border border-brand-olive-dark/15 rounded-2xl text-2xl font-bold font-mono text-brand-olive-dark focus:outline-none focus:border-brand-gold shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Submission triggers */}
                  <button
                    id="submit-call-waiter-btn"
                    type="submit"
                    className="w-full py-4 bg-brand-olive-dark hover:bg-brand-olive-medium text-brand-stone-light text-xs font-bold rounded-xl shadow-md uppercase tracking-wider transition-all select-none mt-4 flex items-center justify-center gap-1.5"
                  >
                    <BellRing className="w-4 h-4 text-brand-gold" />
                    <span>{translations.callSubmit}</span>
                  </button>
                </motion.form>
              ) : (
                /* Success view */
                <motion.div
                  key="call-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center py-4 space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                  </div>
                  
                  <h4 className="font-serif font-bold text-lg text-brand-olive-dark">
                    {translations.callSuccessTitle}
                  </h4>
                  
                  <p className="font-sans text-xs text-brand-charcoal/70 leading-relaxed max-w-xs font-medium">
                    {translations.callSuccessDesc}
                  </p>

                  <div className="bg-brand-stone-medium/50 py-3 px-6 rounded-2xl border border-brand-olive-dark/5 flex items-center gap-2">
                    <span className="text-xs text-brand-olive-medium">Table Number:</span>
                    <strong className="font-mono text-lg text-brand-olive-dark">{tableNumber}</strong>
                  </div>

                  <button
                    id="call-success-close-btn"
                    onClick={() => setIsCallWaiterOpen(false)}
                    className="py-2.5 px-8 bg-brand-stone-medium/70 text-brand-olive-dark text-xs font-bold rounded-xl transition-all mt-2"
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
