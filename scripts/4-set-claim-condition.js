import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";
import dotenv from "dotenv";
dotenv.config();

const editionDrop = sdk.getEditionDrop(process.env.NFT_ADDRESS);

(async() => {
    try {
        const claimConditions = [{
            startTime: new Date(),
            maxQuantity: 1_000,
            price: 0,
            quantityLimitPerTransaction: 1,
            waitInSeconds: MaxUint256,
        }];

        await editionDrop.claimConditions.set("0", claimConditions);
        console.log("✅ Successfully set claim condition!");
    } catch (error) {
        console.error("failed to set claim condition", error);
    }
})();