"use client";
import CampaignCard from "@/src/components/campaign-card";
import CreateCampaign, { Loading } from "@/src/components/create-campaign";
import { db } from "@/src/lib/firebase-confirg";
import { Modal } from "@/src/modal";
import { collection, onSnapshot } from "@firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function ActiveCampaigns() {
  const [data, setData] = useState<Metadata[] | any>([]);
  const [loading, setLoading] = useState(true);

  const { isConnected, isConnecting } = useAccount();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "campaigns"), (snapshot) => {
      // setLoading(true);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(data);
      setData(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="  p-12 px-20 flex flex-col items-center justify-normal ">
      <div className=" w-full items-center flex justify-between laptop:px-2 desktop:px-20  ">
        <h1>Active Campaigns</h1>
        <Modal
          title="Create Campign"
          desc="Fill all the details to create your campaign."
        >
          {/* {isConnected ? <CreateCampaign /> : <div>Connect Wallet to create Ca</div>} */}
          <CreateCampaign />
        </Modal>
      </div>
      <div className=" items-stretch justify-stretch grid grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-5  gap-6 mt-6">
        {data &&
          data.map(
            ({ id, imageUrl, title, description }: Metadata, idx: number) => (
              <Link
                href={`/claim/${id}`}
                key={idx}
                className=" cursor-pointer h-full hover:scale-105 transition-all ease-in-out"
              >
                <CampaignCard
                  title={title}
                  description={description}
                  imageUrl={imageUrl}
                />
              </Link>
            )
          )}
      </div>
      {loading && (
        <div className=" mt-2 flex items-center justify-center flex-col">
          <Loading />
        </div>
      )}
    </div>
  );
}
