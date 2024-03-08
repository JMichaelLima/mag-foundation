// @/components/Toast.tsx
"use client";

import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContext } from "@/contexts/ToastContext";

const Toast: React.FC = () => {
  const { toasts, removeToast } = useContext(ToastContext);

  const variants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  };

  return (
    <div className="fixed top-0 w-full z-50">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            className={`text-lg p-3 max-w-md m-auto rounded-lg shadow bg-opacity-90 mt-1 ${
              toast.messageType === "success"
                ? "shadow-green-900 bg-green-600 text-green-50"
                : "shadow-red-900 bg-red-600 text-red-50"
            }`}
          >
            <div className="p-3 grid grid-cols-[auto,1fr] gap-2 items-center font-extralight">
              <div className="flex-grow">{toast.message}</div>
              <button
                onClick={() => toast.id && removeToast(toast.id)}
                className="justify-self-end"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
