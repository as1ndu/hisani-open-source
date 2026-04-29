import {
    StarkZap,
    OnboardStrategy,
    accountPresets,
    Amount,
    fromAddress,
    getPresets,
} from "starkzap";

import { privy } from "./../privy/instance";
import { sdk } from "./network-and-rpc";
import { show_notification } from "../ui/onload";
import { fe_server_origin } from "../constants";

console.log(`fe_server_origin: ${fe_server_origin.trim()}/api/privy-wallet/details/`)

const onboard = async function () {

    try {
        let userObject = await privy.user.get();

        if (userObject) {
            let accessToken = await privy.getAccessToken();

            const user_wallet = await sdk.onboard({
                strategy: OnboardStrategy.Privy,
                privy: {
                    resolve: async () =>
                        fetch(`${fe_server_origin}/api/privy-wallet/details/${userObject.user.id}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }).then((r) => r.json()), // { walletId, publicKey, serverUrl }
                },
                accountPreset: accountPresets.argentXV050,
                deploy: "if_needed",
                feeMode: 'sponsored',
            });

            return user_wallet
        }

    } catch (error) {
        console.log('onboard:error', error)

        show_notification({
            title: "Onboarding Error",
            content: '<p>Try refreshing your browser</p><p>${error}</p>'
        })

        //location.reload()
    }
}

export { onboard }
