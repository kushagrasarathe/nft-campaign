"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
// @ts-ignore
import { Web3Storage } from "web3.storage";

const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB_STORAGE });

export default function CreateCampaign() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [metdataURI, setMetdataURI] = useState<string>("");

  const { isConnected, isConnecting } = useAccount();

  const uploadImageToIPFS = async () => {
    console.log(image);
    try {
      if (!image) {
        return toast.error("Please select a image for campaign");
      }
      toast.loading("Uploading image please wait...");
      const cid = await client.put([image]);
      console.log(cid);
      // setImageCID(cid);
      toast.success("Image uploaded");
      // toast.dismiss();
      // console.log(`https://${cid}.ipfs.w3s.link/${image?.name}`);
      // console.log(`https://w3s.link/ipfs/${cid}`);
      return cid;
    } catch (error) {
      return toast.error(`${error}`);
    }
  };

  const createNewCampaign = async () => {
    if (!isConnected) {
      toast.error("Connect wallet please");
    }

    if (!title && !description && !image) {
      toast.error("Please fill all the details");
    }

    try {
      const image_CID = await uploadImageToIPFS();
      console.log(image_CID);
      toast.dismiss();
      const metadata = {
        title: title,
        description: description,
        imageUrl: `https://${image_CID}.ipfs.w3s.link/${image?.name}`,
      };
      toast.loading("Uploading metadata....");
      const metadata_cid = await client.put([
        new File([JSON.stringify(metadata)], "metadata.json"),
      ]);
      setMetdataURI(`https://${metadata_cid}.ipfs.w3s.link/`);
      console.log(`https://${metadata_cid}.ipfs.w3s.link/`);
      toast.dismiss();
      toast.success("Metadata uploaded to IPFS");
      return metadata_cid;

      // console.log(`${title} ${description} ${image}`);
    } catch (error) {
      console.log(error);
    }

    // const imageIpfsURI = await
  };
  return (
    <Card className=" w-full border-0 shadow-none">
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Image</Label>
              <Input
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const selectedImage = e.target.files[0];
                    setImage(selectedImage);
                  }
                }}
                id="image"
                type="file"
                accept="image/*"
                placeholder="Add Image"
                className=" cursor-pointer"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="name"
                placeholder="Name of your campaign"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Enter Campaign description"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        {/* <Button variant="outline">Cancel</Button> */}
        <Button onClick={createNewCampaign}>Create Campaign</Button>
        {/* <Button onClick={uploadImageToIPFS}>Upload Metadata</Button> */}
      </CardFooter>
    </Card>
  );
}
