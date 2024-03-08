// app/page.tsx
"use client";
import { motion } from "framer-motion";
import { quicksand, tourney, museoModerno } from "./fonts";
import { useContext } from "react";
import { ToastContext } from "@/contexts/ToastContext";

export default function Home() {
  const { addToast } = useContext(ToastContext);

  const containerVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
  };

  const divVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <main className="flex items-center text-center justify-center min-h-screen">
      <motion.div
        className="bg-stone-800 bg-opacity-50 text-white w-full p-2 shadow-2xl shadow-slate-800"
        variants={divVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1.5 }} // Adjust timing as needed
      >
        <motion.div
          variants={containerVariants}
          initial={{ opacity: 0 }}
          animate="visible"
          transition={{ duration: 0.75, delay: 0.25 }}
          className={`${museoModerno.className} text-4xl font-extralight p-1`}
        >
          mag-foundation
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1.0, delay: 0.75 }}
          className={`${quicksand.className} text-sm px-6 py-4`}
        >
          <ul>
            <li>Next.js 14 - App Router - Server Components</li>
            <li>AWS Amplify Gen 2</li>
            <li>TailwindCSS</li>
            <li>Framer Motion</li>
            <li>Toast alerts</li>
            <li>Contact page</li>
            <li>Dynamic, optimized image background</li>
            <li>User management - registration/login/forgot password</li>
            <li>Middleware protected routes</li>
          </ul>
        </motion.div>

        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 1.5 }} // Delay equal to div transition
        >
          <div>
            <button
              className="mt-4 bg-green-600 text-white py-2 m-4 px-4 rounded"
              onClick={() =>
                addToast({ messageType: "success", message: "Success!" })
              }
            >
              Show Success Toast
            </button>

            <button
              className="mt-4 bg-red-700 text-white py-2 m-4 px-4 rounded"
              onClick={() =>
                addToast({ messageType: "error", message: "Error!" })
              }
            >
              Show Error Toast
            </button>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
