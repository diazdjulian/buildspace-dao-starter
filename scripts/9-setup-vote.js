import sdk from "./1-initialize-sdk.js";
import dotenv from "dotenv";
dotenv.config();

const vote = sdk.getVote(process.env.VOTING_ADDRESS);
const token = sdk.getToken(process.env.TOKEN_ADDRESS);

(async() => {
    try {
        await token.roles.grant("minter", vote.getAddress());

        console.log("✅ successfully gave vote contract permissions to act on token contract");
    } catch (error) {
        console.error("failed to grant vote contract permissions on token contract", error);
        process.exit(1);
    }

    try {
        const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS);
        const ownedAmount = ownedTokenBalance.displayValue;
        const percent90 = Number(ownedAmount) / 100 * 90;

        await token.transfer(vote.getAddress(), percent90);

        console.log("✅ Successfully transferred " + percent90 + " tokens to vote contract");
    } catch (error) {
        console.error("failed to transfer tokens to vote contract", error);
    }
})();