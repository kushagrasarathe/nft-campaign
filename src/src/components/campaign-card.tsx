import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";
import sample from "../assets/sample.jpg";

export default function CampaignCard({
  title,
  description,
  imageUrl,
}: Metadata) {
  return (
    <Card className=" max-w-[300px] min-h-[30px] h-full">
      <CardHeader>{title && title}</CardHeader>
      <CardContent className=" border-0">
        {imageUrl && (
          <img
            width={100}
            height={100}
            className=" max-h-[200px] h-[200px] w-full object-cover "
            src={imageUrl && imageUrl}
            alt="campaign image"
          />
        )}
      </CardContent>
      <CardFooter>
        <p className=" line-clamp-1">{description && description}</p>
      </CardFooter>
    </Card>
  );
}
