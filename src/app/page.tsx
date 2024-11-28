import Image from "next/image";

export default function Home() {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.svg')" }}
    >
      <div className="w-full h-full flex justify-center items-center">
        <h1 className="font-coiny text-5xl">test</h1>
      </div>
    </div>
  );
}
