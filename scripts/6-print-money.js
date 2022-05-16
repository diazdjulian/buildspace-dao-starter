import sdk from "./1-initialize-sdk.js";
import dotenv from "dotenv";
dotenv.config();

const token = sdk.getToken(process.env.TOKEN_ADDRESS);

(async() => {
    try {
        const amount = 100000;

        await token.mint(amount);
        const totalSupply = await token.totalSupply();

        console.log("✅ There now is", totalSupply.displayValue, "$MARVEL in circulation");
    } catch (error) {
        console.error("failed to print money", error);
    }
})();