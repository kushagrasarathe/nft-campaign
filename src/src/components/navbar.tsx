"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Hamburger from "hamburger-react";

export default function Navbar() {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <div className=" z-30 fixed flex items-center justify-between w-full py-3 px-5 desktop:px-36 laptop:px-20 border-b bg-white">
      <Link href={"/"} className=" text-base font-semibold">
        NFT Campign
      </Link>
      <div className=" hidden tablet:flex items-center justify-normal gap-x-4">
        <Link href={"/campaigns"}>
          <Button variant={"link"}>Active Campaigns</Button>
        </Link>
        <ConnectButton />
      </div>

      <div className=" tablet:hidden">
        <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
      </div>
      {isOpen && (
        <div className=" fixed w-full top-[73px] h-screen tablet:hidden flex flex-col bg-white items-center justify-center gap-4">
          <Link href={"/campaigns"}>
            <Button variant={"link"}>Active Campaigns</Button>
          </Link>
          <ConnectButton />
        </div>
      )}
    </div>
  );
}
