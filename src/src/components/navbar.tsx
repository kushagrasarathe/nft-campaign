import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className=" flex items-center justify-between w-full py-3 px-12 border-b bg-white">
      <Link href={"/"} className=" text-base font-semibold">
        NFT Campign
      </Link>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
}
