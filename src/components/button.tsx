import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  textSize?: string;
}

export default function Button({
  children,
  onClick,
  disabled,
  loading,
  textSize,
}: ButtonProps) {
  const handleClick = () => {
    // Play the click sound
    const audio = new Audio("/click.mp3"); // Adjust the path as needed
    audio.play();

    // Trigger the custom onClick if provided
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`font-coiny
        capitalize
        leading-[50px]
        ${textSize ? `${textSize}` : "text-[40px]"}
        px-[20px]
        pb-[10px]
        tracking-[2.5px]
        rounded-[15px] 
        font-semibold
        bg-primary
        shadow-[7px_7px_0_rgb(255,255,255)] 
        transition-all 
        hover:shadow-none 
        hover:translate-x-2 
        hover:translate-y-2 
        active:translate-x-2 
        active:translate-y-2 
        active:shadow-none
        flex
        justify-center
        items-center
        border-[5px]
        text-white
        border-white`}
      disabled={disabled}
      onClick={handleClick}
    >
      {loading ? "loading..." : children}
    </button>
  );
}
