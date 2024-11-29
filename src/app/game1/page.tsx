"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import IconButton from "@/components/icon-button";
import { IoMdArrowRoundBack, IoMdRefresh } from "react-icons/io";
import { game1_data } from "@/app/data.js";
import Button from "@/components/button";
import Image from "next/image";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

interface DataObject {
  id: number;
  number: number;
  image_link: string;
  audio: string;
  duration?: number;
  highLightTime?: number;
}

interface ButtonProps {
  textSize?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string | undefined; // Make sure it can accept undefined explicitly
  children: React.ReactNode;
}


const getGameDataByNumber = (number: number): DataObject | undefined => {
  return game1_data.find((item) => item.number === number);
};

const Page = () => {
  const [number, setNumber] = useState<number>(1);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [isInitialMount, setIsInitialMount] = useState<boolean>(true);
  const dataObject = getGameDataByNumber(number);
  const { width = 0, height = 0 } = useWindowSize();
  const [isWinner, setIsWinner] = useState<boolean>(false);

  const handleNext = () => {
    if (number >= 10) {
      setIsWinner(true);
      return;
    }

    if (!isNextDisabled) {
      const nextDataObject = getGameDataByNumber(number + 1);

      if (nextDataObject) {
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }

        const audio = new Audio(nextDataObject.audio);
        setCurrentAudio(audio);
        audio.play();

        setNumber(number + 1);

        if (nextDataObject?.duration) {
          setIsNextDisabled(true);
          setTimeRemaining(nextDataObject.duration);
        }

        if (nextDataObject?.highLightTime === 0) {
          setIsHighlighted(true);
          setTimeout(() => setIsHighlighted(false), 1000);
        }
      }
    }
  };

  const handlePrevious = () => {
    const prevDataObject = getGameDataByNumber(number - 1);

    if (prevDataObject) {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      const audio = new Audio(prevDataObject.audio);
      setCurrentAudio(audio);
      audio.play();

      setNumber(number - 1);

      if (prevDataObject?.duration) {
        setIsNextDisabled(true);
        setTimeRemaining(prevDataObject.duration);
      }

      if (prevDataObject?.highLightTime === 0) {
        setIsHighlighted(true);
        setTimeout(() => setIsHighlighted(false), 1000);
      }
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (isInitialMount && dataObject) {
      const audio = new Audio(dataObject.audio);
      setCurrentAudio(audio);
      audio.play();
      setIsInitialMount(false);
    }

    setIsNextDisabled(false);
    setIsHighlighted(false);

    if (dataObject?.duration) {
      setIsNextDisabled(true);
      setTimeRemaining(dataObject.duration);

      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === (dataObject.highLightTime ?? 0) + 1) {
            setIsHighlighted(true);
            setTimeout(() => setIsHighlighted(false), 1000);
          }

          if (prev <= 1) {
            clearInterval(timer);
            setIsNextDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [number, dataObject, isInitialMount]);

  return (
    <>
      {isWinner && (
        <div className="fixed inset-0 bg-black text-white bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-blue-300 p-8 rounded-lg text-center shadow-xl drop-shadow-md">
            <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
            <p className="mb-6 text-xl">You found the right number!</p>
            <div className="flex flex-col gap-5">
              <Button textSize="text-2xl" onClick={handleRestart}>
                Restart Game
                <IoMdRefresh className="text-2xl" />
              </Button>
              <Link href="/game-selection">
                <Button textSize="text-2xl">Back to game selection</Button>
              </Link>
            </div>
          </div>
          <Confetti width={width} height={height} />
        </div>
      )}
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
                  className={isHighlighted ? "bg-yellow-300 p-2 rounded-md" : ""}
                />
              ))
            ) : (
              <p>Data not found</p>
            )}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          {!isNextDisabled && number > 1 && (
            <Button onClick={handlePrevious}>Previous</Button>
          )}
          <Button
            onClick={handleNext}
            disabled={isNextDisabled}
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