import { byteArray, CallData, uint256 } from "starknet";
import { privy_login, verify_otp, show_linked_account, privy_logout, delay } from "./privy/login";
import { wallet } from "./starzap/wallet";
import { fund_campaign_event, write_campaign_event, end_campaign_event, claim_funds_event, category_selection, make_external_withdraw } from "./ui/events";
import { update_ongoing_html, update_ended_html, update_claimed_html, update_campaing_list_html, update_account_balance, open_campaign_form, close_campaign_form, show_notification, close_notification, show_wallet_address } from "./ui/onload";
import { single_campaign_html } from "./ui/templates";
import { read_campaigns_cache, write_campaigns_cache } from "./ui/disk";

// auth events
await privy_login()
await privy_logout()
await verify_otp()

// update UI to authenticated accounts
await show_linked_account()

// open & close campaign modal
open_campaign_form()
close_campaign_form()

// show notifications
show_notification()
close_notification()

// update data ui
await update_ongoing_html()
await update_ended_html()
await update_claimed_html()
await update_campaing_list_html()
await update_account_balance()

// operations events
fund_campaign_event()
write_campaign_event()
end_campaign_event()
claim_funds_event()

category_selection()

make_external_withdraw()

await show_wallet_address()

try {
    console.log('wallet', wallet)
} catch (error) {
    console.log(error)
}

export async function show_single_campaign(counter) {
    // single-campaign
    const container = document.getElementById('single-campaign')
    const item_html = await single_campaign_html(counter)
    container.innerHTML = item_html
}

window.show_single_campaign = show_single_campaign;

const hisaniWorker = new Worker("js-dist/worker.js", { type: "module" });

hisaniWorker.onerror = (error) => {
    console.error('hisaniWorker.onerror', error);
};

hisaniWorker.onmessage = async (event) => {
    const data = event.data
    console.log('hisaniWorker:event.data', data)

    const current_data = JSON.parse(read_campaigns_cache('list'))

    await write_campaigns_cache(data)

    await update_account_balance()

    console.log('hisaniWorker:(current_data.length == 0)', (current_data.length == 0), current_data.length, current_data)

    if (current_data.length == 0) {
        await delay(1000)
        location.reload()
    }

    // await update_ongoing_html()
    // await update_ended_html()
    // await update_claimed_html()

    // await update_campaing_list_html()
}

//window.show_single_campaign = show_single_campaign

////////////////////////////////
/*
const campaign_data = {
    title: byteArray.byteArrayFromString('Sky Pass'),
    category: 'hackerthon',
    description: byteArray.byteArrayFromString('Lorem Ipsum'),
    funding_goal: uint256.bnToUint256(1 * 1000000),
    amount_collected: uint256.bnToUint256(0),
    status: "ongoing",
    beneficiary: '0x03f2df18f601d815426df4a813a2580b124e1481a153dfca10b45b5755006a7b',
    website: byteArray.byteArrayFromString('x.com/CassandraTechs'),
    count: 0
}

const call_params = {
    contractAddress: '0x0579d5d711284b4c2ff1bb6f149f3462ccf83c041d8a9b2817d672c803329857',
    entrypoint: 'write_campaign',
    calldata: [campaign_data]//CallData.toHex(campaign_data),
}

const txn = await wallet.execute([call_params], { feeMode: "sponsored" })

console.log('txn', txn)

*/

// setInterval(async () => {
//     // update ui
//     await update_campaing_list_html()
//     await update_account_balance()

// }, 5000);
