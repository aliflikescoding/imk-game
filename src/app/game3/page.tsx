"use client"

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import IconButton from "@/components/icon-button";
import { IoMdArrowRoundBack } from "react-icons/io";

const GameThree = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col gap-5 justify-center items-center relative">
        GameThree
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

export default GameThree;
