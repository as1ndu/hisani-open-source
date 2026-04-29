import { privy_signer_id, server_origin } from "../constants";
import { privyBackend } from "./instance";

async function get_wallet(userId) {
    let wallet_list;
    try {
         wallet_list = await privyBackend.wallets().list({
            chain_type: "starknet",
            user_id: userId
        })
        
    } catch (error) {
        console.log('get_wallet:get_wallet', error)
    }

    if (wallet_list.data.length == 0) {
        try {
            const wallet = await privyBackend.wallets().create({
                chain_type: "starknet",
                owner: { user_id: userId },
                additional_signers: [{
                    // Add authorized signer to new wallet
                    signer_id: privy_signer_id
                }]
            });

            const wallet_details = {
                wallet: {
                    walletId: wallet.id,
                    address: wallet.address,
                    publicKey: wallet.public_key,
                },
            };

            return wallet_details

        } catch (error) {
            console.log(error);
        }

    } else {
        const wallet = wallet_list.data[0]
        return {
            walletId: wallet.id,
            address: wallet.address,
            publicKey: wallet.public_key,
            serverUrl: `${server_origin}/api/privy-wallet/signer`,
        }
    }
}

export { get_wallet }