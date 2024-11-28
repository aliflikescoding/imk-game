"use clinet"

import React, { useRef, useState } from 'react';
import IconButton from "@/components/icon-button";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Playback error:", err);
      });
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.error("Playback error:", err);
        });
      }
    }
  };

  return (
    <div>
      <audio ref={audioRef} loop>
        <source src="/background-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {!isPlaying ? (
        <IconButton onClick={handlePlayMusic}><FaVolumeMute /></IconButton>
      ) : (
        <IconButton onClick={togglePlay}>
          {isPlaying ? <FaVolumeUp /> : <FaVolumeUp />}
        </IconButton>
      )}
    </div>
  );
};

export default MusicPlayer;
