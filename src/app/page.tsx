"use client";

import { motion } from "framer-motion";
import Button from "@/components/button";
import Link from "next/link";
import MusicPlayer from "@/components/musicplayer";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col gap-5 justify-center items-center">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
      >
        <motion.h1
          className="font-coiny text-7xl font-outline-2 flex justify-center mb-5"
          animate={{ rotate: [-10, 10, -10] }}
          transition={{
            duration: 2, // Adjust the duration for speed
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-green-500">F</span>
          <span className="text-red-500">a</span>
          <span className="text-blue-500">r</span>
          <span className="text-yellow-500">m</span>{" "}
          <span className="text-green-500">C</span>
          <span className="text-red-500">o</span>
          <span className="text-blue-500">u</span>
          <span className="text-yellow-500">n</span>
          <span className="text-purple-500">t</span>
        </motion.h1>
      </motion.div>
      <Link href="/game-selection">
        <motion.div
          className="flex flex-col items-center"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Button>Start</Button>
        </motion.div>
      </Link>
      
    </div>
  );
}
