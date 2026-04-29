import { privy_auth_private_key } from "../constants";
import { privyBackend } from "./instance";

async function sign_txn_with_privy(requestBody) {
    const { walletId, hash } = requestBody;

    console.log('requestBody', requestBody)

    try {
        const result = await privyBackend.wallets().rawSign(walletId, {
            params: { hash: hash },
            authorization_context: {
                authorization_private_keys: [privy_auth_private_key],
            }
        });
        return { signature: result.signature };

    } catch (error) {
        console.log(error);
    }
}

export { sign_txn_with_privy }

