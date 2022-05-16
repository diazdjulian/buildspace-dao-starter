import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const vote = sdk.getVote(process.env.VOTING_ADDRESS);
const token = sdk.getToken(process.env.TOKEN_ADDRESS);

(async() => {
    try {
        // a proposal to mint 45k marvel
        const amount = 45_000;
        const description = "Should the DAO mint an additional " + amount + " tokens into the treasury?";
        const executions = [{
            toAddress: token.getAddress(),
            nativeTokenValue: 0,
            transactionData: token.encoder.encode(
                "mintTo", [
                    vote.getAddress(),
                    ethers.utils.parseUnits(amount.toString(), 18),
                ]
            ),
        }];

        await vote.propose(description, executions);

        console.log("✅ Successfully created proposal to mint tokens");
    } catch (error) {
        console.error("failed to create first proposal", error);
        process.exit(1);
    }

    try {
        // a proposal to transfer 3777 to me just because
        const amount = 3_777;
        const description = "Should the DAO transfer " + amount + " tokens to " + process.env.WALLET_ADDRESS + " just because?";
        const executions = [{
            toAddress: token.getAddress(),
            nativeTokenValue: 0,
            transactionData: token.encoder.encode(
                "transfer", [
                    process.env.WALLET_ADDRESS,
                    ethers.utils.parseUnits(amount.toString(), 18),
                ]
            ),
        }];

        await vote.propose(description, executions);

        console.log("✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!");
    } catch (error) {
        console.error("failed to create second proposal");
    }
})();