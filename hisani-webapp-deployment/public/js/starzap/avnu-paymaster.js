import { paymaster_key } from "../constants"

const avnu_config = {
    nodeUrl: "https://sepolia.paymaster.avnu.fi",
    headers: { "x-paymaster-api-key": paymaster_key },
}

export { avnu_config }