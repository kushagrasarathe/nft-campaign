"use client";

import { Loading } from "@/src/components/create-campaign";
import { Button } from "@/src/components/ui/button";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/src/lib/constants";
import { collectionRef, db } from "@/src/lib/firebase-confirg";
import { collection, doc, getDoc, onSnapshot } from "@firebase/firestore";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useContractWrite } from "wagmi";

export default function Claim() {
  const { slug } = useParams();
  // const id = router;
  const [data, setData] = useState<Metadata[] | any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [campaignDocExists, setCampaignDocExists] = useState<boolean>(true);
  const { address, isConnected } = useAccount();
  const {
    data: contractData,
    isLoading,
    isSuccess,
    write,
  } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "safeMint",
    args: [address, `ipfs://${slug}`],
  });
  // console.log(campaignID.slug);
  // console.log(slug);

  useEffect(() => {
    function fetchData() {
      onSnapshot(collectionRef, async (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.id);

        if (data.includes(slug as string)) {
          const userDocSnap = await getDoc(
            doc(db, "campaigns", slug as string)
          );
          const userData = userDocSnap.data();
          setData(userData);
          setLoading(false);
        } else {
          setCampaignDocExists(false);
          setLoading(false);
        }
      });
    }

    fetchData();
  }, []);

  if (!campaignDocExists) {
    return (
      <div className="min-h-[92vh] flex items-center justify-center">
        {/* {loading && <Loading />} */}
        Requested campaign could not be found
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[92vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-[92vh] flex items-center justify-center">
      {data && (
        <div className="  grid grid-cols-12 gap-8  w-full items-stretch  justify-between laptop:py-12 laptop:px-20 desktop:px-36 desktop:py-12  ">
          <div className=" col-span-6">
            <img
              src={data && data.imageUrl}
              className=" laptop:max-w-xl desktop:max-w-3xl "
              alt="campaign image"
            />
          </div>
          <div className=" col-span-6 flex flex-col items-start gap-y-4  justify-start">
            <h1 className=" text-4xl font-[700] tracking-wider">
              {data && data.title}
            </h1>
            <p className=" max-w-2xl text-start text-lg tracking-wide">
              {data && data.description}
            </p>
            <Button
              onClick={() => isConnected ?  write() : toast.error("Connect your wallet please")}
              className=" font-[600] tracking-wide"
            >
              Mint NFT
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
