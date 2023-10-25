NFT Campaign is built using Next.JS, TypeScript, TailwindCSS and ShadcnUI.

## Getting Started

To run the project locally follow these steps:

1. Clone the git repository directly through VS Code or simply run the following command in your terminal `git clone https://github.com/kushagrasarathe/nft-campaign.git`
2. Now open the cloned repository in VS Code or any other code editor of your choice.
3. Next rename the `.env.local.example` to `.env.local` and paste the required environment variables.
> **NOTE** The pooject uses Firebase for saving the campaigns that are created by users.
4. Run either of the following command in terminal to install all the dependencies:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to interact with the application.


## Deployed link

The project is deployed on vercel and can be accessed by simply visiting  [Website](https://coinvise-task.vercel.app/).

## Contract

The `contracts` directory has the `OpenEdition` smart-contract written in solidity. 

The contract is deployed on the following address `0xF34999a7f6068cAdD8F63B66963EfB2485022029` on *Seploia* Testnet.