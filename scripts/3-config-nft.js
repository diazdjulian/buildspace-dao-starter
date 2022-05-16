import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";
import dotenv from "dotenv";
dotenv.config();

const editionDrop = sdk.getEditionDrop(process.env.NFT_ADDRESS);

(async() => {
    try {
        await editionDrop.createBatch([
            {
                name: "Infinity Gauntlet",
                description: "This NFT will give you access to MarvelDAO!",
                image: readFileSync("scripts/assets/infinitygauntlet.png"),
            }
        ]);

        console.log("✅ Successfully created a new NFT in the drop!");
    } catch (error) {
        console.error("failed to create the new NFT", error);
    }
})();