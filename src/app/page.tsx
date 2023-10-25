import Image from "next/image";
import panda from "@/src/assets/hero.gif";

export default function Home() {
  return (
    <>
      <main className="flex min-h-[90vh] px-4 flex-col items-center justify-center">
        <h1 className=" text-center mb-3 text-4xl tablet:text-5xl font-bold tracking-wide">
          Mint NFTs from campaigns
        </h1>
        <Image src={panda} alt="panda" className=" tablet:mt-4 tablet:max-w-lg" />
      </main>
    </>
  );
}
