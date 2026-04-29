import { CallData } from "starknet";
import { wallet } from "./wallet";
import { hisani_abi } from "../ui/data";

const hisani_contract_address = '0x0579d5d711284b4c2ff1bb6f149f3462ccf83c041d8a9b2817d672c803329857'
const usdc_contract_address   = '0x0512feac6339ff7889822cb5aa2a86c848e9d392bb0e3e237c008674feed8343'

async function hisani_contract_call(call_params) {
    console.log('call_params.entry', call_params.entrypoint)
    console.log('call_params.call_data', call_params.calldata)

   // const entryCallData = new CallData(hisani_abi);

    try {
        const call = {
            contractAddress: hisani_contract_address,
            entrypoint: call_params.entrypoint,
            calldata:  call_params.calldata,
        }

        console.log('hisani_contract_call:call', call)
        const txn = await wallet.execute([call], { feeMode: "sponsored" });
        
        const result = {
            explorerURL: txn.explorerUrl,
            hash: txn.hash
        }

        return result

    } catch (error) {
        console.log("hisani_contract_call:error", error)
    }

}

async function usdc_contract_call(call_params) {

    try {
        const tx = await wallet.execute([call_params], { feeMode: "sponsored" });
        //console.log(' await tx.wait();', await tx.wait())
        console.log('usdc_contract_call:error:tx', tx)

        return tx

    } catch (error) {
        console.log('usdc_contract_call:error', error)

    }
}

export {
    hisani_contract_call,
    usdc_contract_call,

    usdc_contract_address,
    hisani_contract_address
}