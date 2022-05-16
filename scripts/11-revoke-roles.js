import sdk from "./1-initialize-sdk.js";
import dotenv from "dotenv";
dotenv.config();

const token = sdk.getToken(process.env.TOKEN_ADDRESS);

(async() => {
    try {
        const allRoles = token.roles.getAll();
        console.log("👀 Roles that exist right now:", allRoles);

        await token.roles.setAll({ admin: [], minter: [] });
        console.log("🎉 Roles after revoking ourselves",await token.roles.getAll());
        console.log("✅ Successfully revoked our superpowers from the ERC-20 contract");
    } catch (error) {
        console.error("failed to revoke ourselves from the DAO treasury", error);
    }
})();