import CreateCampaign from "@/src/components/create-campaign";
import Navbar from "@/src/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <CreateCampaign />
      </main>
    </>
  );
}
