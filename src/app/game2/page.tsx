"use client";

import { useState, useEffect } from "react";
import { IoMdArrowRoundBack, IoMdRefresh } from "react-icons/io";
import Link from "next/link";
import IconButton from "@/components/icon-button";
import { game_image } from "../data";
import { motion } from "framer-motion";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Image from "next/image";
import { ImCross } from "react-icons/im";
import Button from "@/components/button";

const GameTwo: React.FC = () => {
  const colors: string[] = ["green", "blue", "red", "yellow", "purple"];
  const [mainNumber, setMainNumber] = useState<number>(1);
  const [coloredNumbers, setColoredNumbers] = useState<number[]>([]);
  const [wrongMessage, setWrongMessage] = useState<string>("");
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const { width, height } = useWindowSize();

  // Store the random image as a state to keep it consistent
  const [randomImage, setRandomImage] = useState<{ image_link: string } | null>(
    null
  );

  const clickSound = () => {
    const audio = new Audio("/click.mp3");
    audio.play();
  };

  const initializeGame = () => {
    // Generate or reuse the random image
    const currentRandomImage = getRandomImage();
    setRandomImage(currentRandomImage);

    // Generate random main number between 1 and 10
    const newMainNumber = Math.floor(Math.random() * 10) + 1;
    setMainNumber(newMainNumber);

    // Generate unique random numbers
    const newColoredNumbers: number[] = [];
    const usedNumbers = new Set<number>([newMainNumber]);

    while (newColoredNumbers.length < 5) {
      const newNumber = Math.floor(Math.random() * 10) + 1;

      if (!usedNumbers.has(newNumber)) {
        newColoredNumbers.push(newNumber);
        usedNumbers.add(newNumber);
      }
    }

    // Ensure one number matches the main number
    const matchIndex = Math.floor(Math.random() * newColoredNumbers.length);
    newColoredNumbers[matchIndex] = newMainNumber;

    setColoredNumbers(newColoredNumbers);
    setWrongMessage("");
    setIsWinner(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleNumberClick = (clickedNumber: number) => {
    clickSound();
    const wrong = new Audio("/wrong.mp3");
    const yay = new Audio("/yay.mp3");
    const correct = new Audio("/correct.mp3");

    if (clickedNumber === mainNumber) {
      correct.play();
      yay.play();
      setIsWinner(true);
    } else {
      wrong.play();
      setWrongMessage("Wrong Number!");

      // Remove message after 2 seconds
      setTimeout(() => {
        setWrongMessage("");
      }, 1500);
    }
  };

  const handleRestart = () => {
    // Reinitialize the game state
    initializeGame();
  };

  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * game_image.length);
    return game_image[randomIndex];
  }

  return (
    <>
      {isWinner && (
        <>
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
        </>
      )}

      <div className="w-full h-full flex flex-col gap-2 justify-center items-center relative">
        <div>
          <h1
            className={`text-3xl font-semibold p-2 drop-shadow-md rounded-md ${
              wrongMessage ? "bg-red-500 text-white" : "bg-white text-black"
            }`}
          >
            {wrongMessage
              ? "Wrong Answer it's ok, try again!"
              : "Pick a number for how many pictures you see."}
          </h1>
        </div>
        <div className="font-coiny text-8xl gap-10 font-outline-2 flex justify-center mb-5">
          {coloredNumbers.map((num, index) => (
            <span
              key={index}
              onClick={() => handleNumberClick(num)}
              className={`text-${colors[index]}-500 hover:scale-95 cursor-pointer mx-2`}
            >
              {num}
            </span>
          ))}
        </div>
        {randomImage && (
          <div className="grid grid-cols-4 bg-white rounded-md p-5 gap-5 drop-shadow-md">
            {Array.from({ length: mainNumber }).map((_, i) => (
              <Image
                key={i}
                src={randomImage.image_link}
                alt="number image"
                width={75}
                height={75}
              />
            ))}
          </div>
        )}
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
      {wrongMessage && (
        <div className="absolute top-[45%] left-[45%] z-10">
          <ImCross className="text-9xl text-red-500" />
        </div>
      )}
    </>
  );
};

export default GameTwo;
