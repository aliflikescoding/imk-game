"use client";

import "./globals.css";
import { motion } from "framer-motion";
import MusicPlayer from "@/components/musicplayer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main
          className="w-screen h-screen bg-cover bg-center relative"
          style={{ backgroundImage: "url('/background.svg')" }}
        >
          {children}
          <motion.div
            className="absolute top-0 left-0 m-4"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          >
            <MusicPlayer />
          </motion.div>
        </main>
      </body>
    </html>
  );
}
