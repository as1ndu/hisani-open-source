import { maxUint256, maxUint64 } from "viem";
import { hisani_contract_address, hisani_contract_call, usdc_contract_address, usdc_contract_call } from "../starzap/contract-calls"
import { byteArray, CairoFelt252, CallData, isAccount, num, uint256 } from "starknet";
import { wallet } from "../starzap/wallet";
import { show_notification, update_campaing_list_html, update_raised_funds_amount } from "../ui/onload";
import { get_acc_balance } from "../ui/data";
import { isAddress } from "ethers";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fund_campaign(campaign_counter, amount) {

    console.log("fund_campaign", campaign_counter, uint256.bnToUint256(amount))

    //  approve
    try {

        const approve_call = {
            contractAddress: usdc_contract_address,
            entrypoint: 'approve',
            calldata: [hisani_contract_address, uint256.bnToUint256(amount)]
        }

        // console.log('fund_campaign:call', approve_call)

        const txn = await usdc_contract_call(approve_call)


        const approve_txn_hash = {
            explorerURL: txn.explorerUrl,
            hash: txn.hash
        }

        show_notification(
            {
                title: 'Making Contract Call',
                content: `
                <progress></progress>
                `
            }
        )

        await delay(7000)

        // show approved message
        console.log('approve_txn_hash', approve_txn_hash)

        const fund_campaign_call = {
            entrypoint: 'fund_campaign',
            calldata: [campaign_counter, uint256.bnToUint256(amount)]
        }

        console.log('fund_campaign_call', fund_campaign_call)

        const fund_campaign_txn_hash = await hisani_contract_call(fund_campaign_call) //await hisani_contract_invoke_instance.fund_campaign(campaign_counter, amount);

        //update_raised_funds_amount
        await update_raised_funds_amount(campaign_counter, amount)

        show_notification(
            {
                title: 'Funded Campaign.',
                content: `
                Successfully Funded Campaign.
                <ul>
                    <li>txn: <a href="${fund_campaign_txn_hash.explorerURL}">${fund_campaign_txn_hash.hash}</a></li>
                <ul/>
                `
            }
        )

        // show funded message
        console.log('fund_campaign_txn_hash', fund_campaign_txn_hash)

        // await delay(17000)

        // await update_campaing_list_html()

        // await update_campaing_list_html()

        return {
            approve_txn_hash: approve_txn_hash,
            fund_campaign_txn_hash: fund_campaign_txn_hash
        }

    } catch (error) {
        console.log("fund_campaign", error)

        show_notification(
            {
                title: 'Funded Campaign Error.',
                content: `
                    ${error}
                `
            }
        )
    }

}

async function write_campaign(campaign) {

    try {
        const campaign_data = {
            title: byteArray.byteArrayFromString(campaign.title),
            category: campaign.category,
            description: byteArray.byteArrayFromString(campaign.description),
            funding_goal: uint256.bnToUint256(campaign.funding_goal),
            amount_collected: uint256.bnToUint256(campaign.amount_collected),
            status: campaign.status,
            beneficiary: num.toHex(campaign.beneficiary),
            website: byteArray.byteArrayFromString(campaign.website),
            count: campaign.count,
        }

        console.log('campaign:raw', campaign)
        console.log('campaign:converted', campaign_data)

        const write_campaign_call = {
            entrypoint: 'write_campaign',
            calldata: [campaign_data]
        }

        const txn = await hisani_contract_call(write_campaign_call)

        const write_campaign_txn = {
            explorerURL: txn.explorerURL,
            hash: txn.hash
        }

        show_notification(
            {
                title: 'Create Campaign.',
                content: `
                <p>Successfully created campaign</p>
                <ul>
                    <li>txn: <a href="${write_campaign_txn.explorerURL}">${write_campaign_txn.hash}</a></li>
                <ul/>
                `
            }
        )

        console.log('write_campaign_txn', write_campaign_txn)

        return write_campaign_txn

    } catch (error) {
        console.log('write_campaign:error', error)

        show_notification(
            {
                title: 'Create Campaign Error.',
                content: `
                    ${error}
                `
            }
        )
    }

}

async function end_campaign(campaigns_counter) {
    try {
        const end_campaign_call = {
            entrypoint: 'end_campaign',
            calldata: [campaigns_counter]
        }

        // end campaign
        const txn = await hisani_contract_call(end_campaign_call)
        const end_campaign_txn = {
            explorerURL: txn.explorerURL,
            hash: txn.hash
        }

        show_notification(
            {
                title: 'End Campaign.',
                content: `
                Successfully ended campaign
                <ul>
                    <li>
                        txn: <a href="${txn.explorerURL}">${txn.hash}</a>
                    </li>
                <ul/>
                `
            }
        )

        return end_campaign_txn

    } catch (error) {
        console.log('end_campaign:error', error)
        show_notification(
            {
                title: 'End Campaign Error.',
                content: `
                    ${error}
                `
            }
        )
    }

}

async function claim_funds(campaign_counter) {

    try {
        const campaign_counter_call = {
            entrypoint: 'claim_funds',
            calldata: [campaign_counter]
        }

        // claim funds
        const txn = await hisani_contract_call(campaign_counter_call)

        const campaign_counter_call_txn = {
            explorerURL: txn.explorerURL,
            hash: txn.hash
        }

        show_notification(
            {
                title: 'Claim Campaign.',
                content: `
                Successfully claimed campaign
                <ul>
                    <li>                    
                        txn: <a href="${txn.explorerURL}">${txn.hash}</a>
                    </li>
                <ul/>
                `
            }
        )

        return campaign_counter_call_txn

    } catch (error) {
        console.log('claim_funds:error', error)
        show_notification(
            {
                title: 'Claim Campaign Error.',
                content: `
                    ${error}
                `
            }
        )
    }

}

async function withdraw_usdc(address) {
    try {
        //0x01909473ba2299c0aef645125fa8443d7aac05fda521ae0eda61fff5d008efb6
        const amount = await get_acc_balance()

        console.log('withdraw_usdc:address', address, isAddress(address))

        const withdraw_call = {
            contractAddress: usdc_contract_address,
            entrypoint: 'transfer',
            calldata: [num.toHex(address), uint256.bnToUint256(amount)]
        }

        const usdc_withdraw_txn = await usdc_contract_call(withdraw_call)

        show_notification({
            title: 'Withdraw USDC.',
            content: `
                Successfully Withdrawn USDC
                <ul>
                    <li>                    
                        txn: <a href="${usdc_withdraw_txn.explorerUrl}">${usdc_withdraw_txn.hash}</a>
                    </li>
                <ul/>
                `
        })

    } catch (error) {

        console.log(`withdraw_usdc: ${error}`)
        //const address_valid = isAddress(address)

        if (false) {
            show_notification(
                {
                    title: 'Withdraw USDC Error.',
                    content: `
                    Invalid withdraw address
                `
                }
            )
        } else {
            show_notification(
                {
                    title: 'Withdraw USDC Error.',
                    content: `
                    Refresh your browser & refresh again.

                    ${error}
                `
                }
            )
        }


    }

}


export {
    fund_campaign, write_campaign, end_campaign, claim_funds, withdraw_usdc
}