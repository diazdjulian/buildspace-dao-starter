import sdk from "./1-initialize-sdk.js";
import dotenv from "dotenv";
dotenv.config();

const editionDrop = sdk.getEditionDrop(process.env.NFT_ADDRESS);
const token = sdk.getToken(process.env.TOKEN_ADDRESS);

(async() => {
    try {
        const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

        if (walletAddresses.length === 0) {
            console.log("No NFTs have been claimed yet, seems everyone agrees lastest movies were okay...DA FUCK bro");
            process.exit(0);
        }

        const airdropTargets = walletAddresses.map((address) => {
            const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
            console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

            const airdropTarget = {
                toAddress: address,
                amount: randomAmount,
            };

            return airdropTarget;
        });

        console.log("🌈 Starting airdrop...");
        await token.transferBatch(airdropTargets);
        console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
    } catch (error) {
        console.log("failed to airdrop tokens", error);
    }
})();