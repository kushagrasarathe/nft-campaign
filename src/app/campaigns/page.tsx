"use client";
import CampaignCard from "@/src/components/campaign-card";
import CreateCampaign from "@/src/components/create-campaign";
import { Modal } from "@/src/modal";
import React from "react";
import { useAccount } from "wagmi";

export default function ActiveCampaigns() {
  const { isConnected, isConnecting } = useAccount();

  return (
    <div className=" p-12 px-20 flex flex-col items-center justify-normal ">
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
      <div className=" grid grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-5 gap-6 mt-6">
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
      </div>
    </div>
  );
}
