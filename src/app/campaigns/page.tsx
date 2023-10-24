import CampaignCard from "@/src/components/campaign-card";
import CreateCampaign from "@/src/components/create-campaign";
import { Modal } from "@/src/modal";
import React from "react";

export default function ActiveCampaigns() {
  return (
    <div className=" p-12 px-20 flex flex-col items-center justify-normal ">
      <div className=" w-full items-center flex justify-between px-2  ">
        <h1>Active Campaigns</h1>
        <Modal
          title="Create Campign"
          desc="Fill all the details to create your campaign."
        >
          <CreateCampaign />
        </Modal>
      </div>
      <div className=" grid grid-cols-4 gap-6 mt-6">
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
