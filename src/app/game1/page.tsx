"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import IconButton from "@/components/icon-button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { game1_data } from "@/app/data.js";
import Button from "@/components/button";
import Image from "next/image";

// Define the DataObject interface
interface DataObject {
  id: number;
  number: number;
  image_link: string;
  audio: string;
  duration?: number;
  highLightTime?: number;
}

// Update game1_data to use the DataObject type
const getGameDataByNumber = (number: number): DataObject | undefined => {
  return game1_data.find((item) => item.number === number);
};

const Page = () => {
  const [number, setNumber] = useState<number>(1);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
  const dataObject = getGameDataByNumber(number);

  const handleNext = () => {
    // Only proceed if the button is not disabled
    if (!isNextDisabled) {
      setNumber(number + 1);

      // If there's a duration in the data object, disable the button
      if (dataObject?.duration) {
        setIsNextDisabled(true);
        setTimeRemaining(dataObject.duration);
      }

      // Check for highlight condition
      if (dataObject?.highLightTime === 0) {
        setIsHighlighted(true);

        // Remove highlight after 1 second
        const highlightTimer = setTimeout(() => {
          setIsHighlighted(false);
        }, 1000);

        // Cleanup the timeout
        return () => clearTimeout(highlightTimer);
      }
    }
  };

  useEffect(() => {
    // Reset disabled state when the number changes
    setIsNextDisabled(false);
    setIsHighlighted(false);

    // If there's a duration, start a countdown
    if (dataObject?.duration && dataObject?.highLightTime !== undefined) {
      setIsNextDisabled(true);
      setTimeRemaining(dataObject.duration);

      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          // Check for highlighting condition
          if (prev === dataObject.highLightTime + 1) {
            setIsHighlighted(true);

            // Remove highlight after 1 second
            setTimeout(() => {
              setIsHighlighted(false);
            }, 1000);
          }

          if (prev <= 1) {
            clearInterval(timer);
            setIsNextDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Cleanup the interval on component unmount or number change
      return () => clearInterval(timer);
    }
  }, [number, dataObject]);

  return (
    <>
      <div className="w-full h-full flex flex-col gap-5 justify-center items-center">
        <div className="flex gap-2 items-center">
          <h1 className="text-7xl bg-white px-6 py-3 font-coiny rounded-md">
            {number}
          </h1>
          <div className="grid grid-cols-3 bg-white gap-3 p-4 rounded-md">
            {dataObject ? (
              Array.from({ length: dataObject.number }).map((_, i) => (
                <Image
                  key={i}
                  src={dataObject.image_link}
                  alt="number image"
                  width={100}
                  height={100}
                  className={`
                    ${isHighlighted ? "bg-yellow-300 p-2 rounded-md" : ""}
                  `}
                />
              ))
            ) : (
              <p>Data not found</p>
            )}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          {!isNextDisabled && number > 1 && (
            <Button onClick={() => setNumber(number - 1)}>Previous</Button>
          )}
          <Button
            onClick={handleNext}
            disabled={isNextDisabled}
            className={isNextDisabled ? "opacity-50 cursor-not-allowed" : ""}
          >
            {isNextDisabled ? `Next (${timeRemaining}s)` : "Next"}
          </Button>
        </div>
      </div>
      <Link href="/game-selection">
        <motion.div
          className="absolute top-20 left-0 m-4"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
        >
          <IconButton customColor="bg-red-500">
            <IoMdArrowRoundBack />
          </IconButton>
        </motion.div>
      </Link>
    </>
  );
};

export default Page;
