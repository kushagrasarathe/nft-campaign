import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className=" flex items-center justify-between w-full py-3 px-20 border-b bg-white">
      <Link href={"/"} className=" text-base font-semibold">
        NFT Campign
      </Link>
      <div className=" flex items-center justify-normal gap-x-4">
        <Link href={"/campaigns"}>
          <Button variant={"link"}>Active Campaigns</Button>
        </Link>
        <ConnectButton />
      </div>
    </div>
  );
}
