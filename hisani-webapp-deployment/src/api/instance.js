import { PrivyClient } from "@privy-io/node";
import { privy_app_id, privy_app_secret } from "../constants";

const privyBackend = new PrivyClient({
  appId: privy_app_id,
  appSecret: privy_app_secret,
});

export {privyBackend}