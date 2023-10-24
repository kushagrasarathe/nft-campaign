"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useAccount } from "wagmi";

export default function CreateCampaign() {
  const { isConnected, isConnecting } = useAccount();
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Campaign</CardTitle>
        <CardDescription>
          Fill all the details to create your campaign.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                placeholder="Add Image"
                className=" cursor-pointer"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Title</Label>
              <Input id="name" placeholder="Name of your campaign" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Textarea placeholder="Enter Campaign description" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
