import { is_user_authenticated } from "../privy/auth";
import { onboard } from "./oboarding";


let wallet;

if (is_user_authenticated()) {
    const onboarding = await onboard()
          wallet     = onboarding.wallet
          
    console.log('wallet.address', wallet.address)
} 


export { wallet }