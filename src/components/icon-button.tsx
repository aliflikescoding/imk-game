interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  customColor?: string;
}

export default function IconButton({
  children,
  onClick,
  customColor,
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
      className={`
    capitalize
    text-4xl
    p-[10px]
    rounded-[45%]
    font-semibold
    ${!customColor ? "bg-primary" : `${customColor}`}
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
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
