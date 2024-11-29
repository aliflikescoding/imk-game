"use client";

import React, { useState, useEffect } from "react";
import { IoMdArrowRoundBack, IoMdRefresh } from "react-icons/io";
import Link from "next/link";
import { motion } from "framer-motion";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { ImCross } from "react-icons/im";
import IconButton from "@/components/icon-button";
import Button from "@/components/button";

const GameThree: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [userAnswer, setUserAnswer] = useState<number[]>([]);
  const [wrongMessage, setWrongMessage] = useState<string>("");
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const { width, height } = useWindowSize();
  const colors: string[] = ["green", "blue", "red", "yellow", "purple"];

  const clickSound = () => {
    const audio = new Audio("/click.mp3");
    audio.play();
  };

  const initializeGame = () => {
    // Generate 5 random unique numbers between 1 and 10
    const newNumbers: number[] = [];
    const usedNumbers = new Set<number>();
  
    while (newNumbers.length < 5) {
      const newNumber = Math.floor(Math.random() * 10) + 1;
  
      if (!usedNumbers.has(newNumber)) {
        newNumbers.push(newNumber);
        usedNumbers.add(newNumber);
      }
    }
  
    setNumbers(newNumbers);
    setUserAnswer([]);
    setWrongMessage("");
    setIsWinner(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const colorClasses: { [key: string]: string } = {
    green: 'text-green-500',
    blue: 'text-blue-500',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
    purple: 'text-purple-500'
  };

  const handleNumberClick = (clickedNumber: number) => {
    clickSound();
    const wrong = new Audio("/wrong.mp3");
    const yay = new Audio("/yay.mp3");
    const correct = new Audio("/correct.mp3");

    // If number is already in userAnswer, remove it
    if (userAnswer.includes(clickedNumber)) {
      setUserAnswer(userAnswer.filter((num) => num !== clickedNumber));
      return;
    }

    // Get the sorted numbers
    const sortedNumbers = [...numbers].sort((a, b) => a - b);

    // Check if the clicked number is the correct next number in sequence
    const expectedNumber = sortedNumbers[userAnswer.length];

    if (clickedNumber !== expectedNumber) {
      // Wrong number clicked
      wrong.play();
      setWrongMessage("Wrong Order!");

      // Remove message after 1.5 seconds
      setTimeout(() => {
        setWrongMessage("");
      }, 1500);
      return;
    }

    // Add the correct number to userAnswer
    const newUserAnswer = [...userAnswer, clickedNumber];

    // If we have all 5 numbers, it means we've won
    if (newUserAnswer.length === 5) {
      correct.play();
      yay.play();
      setIsWinner(true);
    }

    setUserAnswer(newUserAnswer);
  };

  const handleRestart = () => {
    initializeGame();
  };

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
              : "Sort these 5 numbers from smallest to largest"}
          </h1>
        </div>
        <div className="text-8xl gap-10 font-outline-2 flex justify-center mb-5 font-coiny">
          {numbers.map((num, index) => (
            <span
              key={index}
              onClick={() => handleNumberClick(num)}
              className={`text-${colors[index]}-500 hover:scale-95 cursor-pointer mx-2`}
            >
              {num}
            </span>
          ))}
        </div>

        <div className="flex gap-4 font-outline-2">
          {userAnswer.map((num, index) => (
            <div
              key={index}
              className={`text-8xl font-coiny p-2 ${
                colorClasses[colors[index]]
              } rounded`}
            >
              {num}
            </div>
          ))}
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

      {wrongMessage && (
        <div className="absolute top-[45%] left-[45%] z-10">
          <ImCross className="text-9xl text-red-500" />
        </div>
      )}
    </>
  );
};

export default GameThree;
