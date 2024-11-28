"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/button";
import { game_data } from "@/app/data.js";
import Image from "next/image";
import Link from "next/link";
import IconButton from "@/components/icon-button";
import { IoMdArrowRoundBack } from "react-icons/io";

const GameSelection = () => {
  const handleClick = () => {
    // Play the click sound
    const audio = new Audio("/click.mp3"); // Adjust the path as needed
    audio.play();
  };

  return (
    <div className="w-full h-full flex gap-5 justify-center items-center">
      {game_data.map((game) => (
        <motion.div
          key={game.id}
          className="flex flex-col items-center"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Link href={`${game.link}`} onClick={handleClick}>
            <div className="hover:scale-95 cursor-pointer">
              <Image
                src={`${game.image_link}`}
                alt="game image"
                width={200}
                height={200}
              />
            </div>
          </Link>
        </motion.div>
      ))}
      <Link href="/">
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
    </div>
  );
};

export default GameSelection;
