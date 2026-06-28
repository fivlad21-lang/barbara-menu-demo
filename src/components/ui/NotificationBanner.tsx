/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useApp } from "../../context/AppContext";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

export const NotificationBanner: React.FC = () => {
  const { toasts, removeToast } = useApp();

  const iconMap = {
    success: <CheckCircle2 className="w-4 h-4 text-green-600" />,
    info: <Info className="w-4 h-4 text-blue-600" />,
    error: <AlertTriangle className="w-4 h-4 text-red-600" />,
  };

  const borderColors = {
    success: "border-green-100 bg-green-50/95",
    info: "border-blue-100 bg-blue-50/95",
    error: "border-red-100 bg-red-50/95",
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 space-y-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            id={`toast-banner-${toast.id}`}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-2xl border shadow-lg backdrop-blur-md ${
              borderColors[toast.type]
            }`}
          >
            <div className="flex items-center gap-3">
              {iconMap[toast.type]}
              <span className="text-xs font-semibold text-brand-charcoal">
                {toast.message}
              </span>
            </div>

            <button
              id={`close-toast-${toast.id}`}
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-full hover:bg-black/5 text-brand-olive-medium transition-colors ml-4"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
