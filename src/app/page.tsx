import Image from "next/image";
import Button from "@/components/button";

export default function Home() {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.svg')" }}
    >
      <div className="w-full h-full flex justify-center items-center">
        <Button>
          Start
        </Button>
      </div>
    </div>
  );
}
