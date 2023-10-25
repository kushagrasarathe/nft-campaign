import { ethers } from "hardhat";

async function main() {
  const CONTRACT = await ethers.getContractFactory("OpenEdition");
  const reponse = await CONTRACT.deploy();
  console.log("Contract Deployed to Address:", await reponse.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
