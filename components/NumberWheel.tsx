"use client";
import { motion, useMotionValue, useTransform } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';

const numbers = Array.from({ length: 10 }, (_, i) => i); // Dynamic generation for numbers 0-9
const height = 50; // Height for each number element
const totalHeight = height * numbers.length;

const NumberWheel = () => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const y = useMotionValue(0);
  const constraintsRef = useRef(null);

  // Adjust y value on drag end to simulate infinite behavior and snap to center
  const onDragEnd = () => {
    // Snap logic: adjust y to the closest number center
    const endY = y.get();
    const closest = Math.round(endY / height) * height;
    y.set(closest);

    // Adjust for infinite scroll by wrapping the value
    const wrappedY = (totalHeight + (closest % totalHeight)) % totalHeight;
    setCurrentNumber(wrappedY / height);
  };

  useEffect(() => {
    const unsubscribeY = y.onChange(() => {
      let newY = y.get();
      
      // Reset the value to create a wrapping illusion without visual break
      if (newY > 0) {
        y.set(-totalHeight + newY % totalHeight);
      } else if (newY < -totalHeight) {
        y.set(-newY % totalHeight);
      }

      setCurrentNumber(Math.abs(Math.round(newY / height)) % numbers.length);
    });

    return () => {
      unsubscribeY();
    };
  }, [y]);

  return (
    <div className="overflow-hidden h-[50px] w-[100px] relative text-white bg-blue-950" ref={constraintsRef}>
      <motion.div
        drag="y"
        dragConstraints={constraintsRef}
        style={{ y }}
        onDragEnd={onDragEnd}
        className="cursor-pointer"
      >
        {numbers.map((number, index) => (
          <motion.div
            key={index}
            style={{ height: `${height}px`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            className="select-none"
          >
            {number}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default NumberWheel;
