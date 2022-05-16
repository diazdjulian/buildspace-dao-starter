import sdk from "./1-initialize-sdk.js";
import dotenv from "dotenv";
dotenv.config();

(async() => {
    try {
        const voteContractAddress = await sdk.deployer.deployVote({
            name: "MarvelDAO Governance Council",
            voting_token_address: process.env.TOKEN_ADDRESS,
            voting_delay_in_blocks: 0, //right away
            voting_period_in_blocks: 6570, //one day
            voting_quorum_fraction: 0, // you can propose and approve without waiting the others
            proposal_token_threshold: 0, //anyone can propose
        });

        console.log("✅ Successfully deployed vote contract, address:", voteContractAddress);
    } catch (error) {
        console.error("failed to deploy vote contract", error);
    }
})();