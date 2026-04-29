import { avnu_config } from "./avnu-paymaster";
import { StarkZap } from "starkzap";

const sdk = new StarkZap({ 
    network: "sepolia",
    paymaster: avnu_config
});

export { sdk }