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
import { addDoc, collection, doc, setDoc } from "@firebase/firestore";
import { db } from "../lib/firebase-confirg";
import { useRouter } from "next/navigation";

const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB_STORAGE });
export const collectionRef = collection(db, "campaigns");

export default function CreateCampaign() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [metdataURI, setMetdataURI] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { isConnected, isConnecting } = useAccount();

  const router = useRouter();

  const uploadImageToIPFS = async () => {
    // console.log(image);
    try {
      if (!image) {
        return toast.error("Please select a image for campaign");
      }
      toast.loading("Uploading image please wait...");
      const cid = await client.put([image]);
      // console.log(cid);
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
      return toast.error("Connect wallet please");
    }

    if (!title && !description && !image) {
      return toast.error("Please fill all the details");
    }

    try {
      if (!image) {
        return toast.error("Please select a image for campaign");
      }
      setLoading(true);
      const image_CID = await uploadImageToIPFS();
      // console.log(image_CID);
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
      // console.log(`https://${metadata_cid}.ipfs.w3s.link/`);
      toast.dismiss();
      toast.success("Metadata uploaded to IPFS");

      toast.loading("Creating campaign please wait");
      const saveCampaign = await saveCampaignDataToFirebase(
        metadata,
        metadata_cid
      );
      // console.log(saveCampaign);
      toast.dismiss();
      toast.success("Campaign created successfully...");
      setTimeout(() => {
        router.push(`/claim/${metadata_cid}`);
      }, 2000);
      setLoading(false);
      return metadata_cid;

      // console.log(`${title} ${description} ${image}`);
    } catch (error) {
      console.log(error);
    }

    // const imageIpfsURI = await
  };

  const saveCampaignDataToFirebase = async (
    metadata: Metadata,
    metadata_cid: string
  ) => {
    try {
      const response = await setDoc(
        doc(db, "campaigns", metadata_cid),
        metadata
      );
      // console.log(response);
      return response;
    } catch (e) {
      toast.dismiss();
      console.log(e);
    }
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
        <Button disabled={loading} onClick={createNewCampaign}>
          {loading ? <Loading /> : "Create Campaign"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export const Loading = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-6 h-6 text-gray-400 animate-spin fill-white"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
