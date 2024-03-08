// 'components/Root_Background.tsx'
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import VirtualForest from "@/public/virtual_forest.png";
import AtomicCarbon from "@/public/carbon.png";
import BlueCurls from "@/public/blue-curls.png";
import RobotWorkspace from "@/public/robot-workspace.png";
import AlienArcade from "@/public/alien-arcade.png";
import AspenLeaves from "@/public/aspen-leaves.png";
import BlueMountains from "@/public/blue-mountains.png";
import Computing from "@/public/computing.png";
import Mechanic from "@/public/mechanic.png";

const images = [
  VirtualForest,
  AlienArcade,
  RobotWorkspace,
  AspenLeaves,
  AtomicCarbon,
  Computing,
  BlueCurls,
  Mechanic,
  BlueMountains,
];

export default function RootBackground() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage) => (currentImage + 1) % images.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed w-full h-screen -z-50 overflow-hidden">
      <AnimatePresence>
        <motion.div
          className="absolute w-full h-screen"
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 5 } }}
          transition={{ duration: 10 }}
        >
          <Image
            src={images[currentImage]}
            alt="Background Image"
            fill
            style={{
              objectFit: "cover",
              //opacity: 0.8
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
