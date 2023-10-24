import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";
import sample from "../assets/sample.jpg";

export default function CampaignCard() {
  return (
    <Card className=" max-w-[300px]">
      <CardHeader>Campaign Title</CardHeader>
      <CardContent className=" border-0">
        <Image
          className=" max-h-[200px] w-full object-cover "
          src={sample}
          alt="campaign image"
        />
      </CardContent>
      <CardFooter>
        <p className=" line-clamp-2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia
          perferendis dolorem ea exercitationem facilis nemo, aliquam itaque a
          excepturi architecto sed laborum velit numquam hic quaerat nisi id
          debitis eos?
        </p>
      </CardFooter>
    </Card>
  );
}
