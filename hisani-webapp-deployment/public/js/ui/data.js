import { Contract, shortString, num, RpcProvider } from 'starknet';
import { read_campaigns_cache, write_campaigns_cache } from "./disk";
import { wallet } from '../starzap/wallet';
import { is_user_authenticated } from '../privy/auth';
import { fe_server_origin, rpc_node } from '../constants';
//import { downloading_data } from './onload';

const node_instance = rpc_node

const hisaniProvider = new RpcProvider({
    nodeUrl: node_instance,
});

const hisani_contract_address = '0x0579d5d711284b4c2ff1bb6f149f3462ccf83c041d8a9b2817d672c803329857'
const usdc_contract_address = '0x0512feac6339ff7889822cb5aa2a86c848e9d392bb0e3e237c008674feed8343'

const hisani_abi = await hisaniProvider.getClassAt(hisani_contract_address);
const usdc_abi = await hisaniProvider.getClassAt(usdc_contract_address);

const hisani_contract_read_instance = new Contract({
    abi: hisani_abi.abi,
    address: hisani_contract_address,
    providerOrAccount: hisaniProvider
});

const usdc_contract_read_instance = new Contract({
    abi: usdc_abi.abi,
    address: usdc_contract_address,
    providerOrAccount: hisaniProvider
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


async function raw_list() {
    const response = await fetch(`${fe_server_origin}/campaigns/all`)
    const list = await response.json()

    return list
}

async function all_projects() {
    // const list = await hisani_contract_read_instance.list_all_campaigns()

    let list = JSON.parse(read_campaigns_cache('list'))

    console.log('all_projects:list', list)
    console.log('all_projects:list:list.length', list.length, (list.length == 0))


    if ((list.length == 0)) {
        console.log('all_projects:nothing_in_list')

        // downloading_data()

       // list = await raw_list()

        // await delay(20000)

        // location.reload()

        console.log('all_projects:nothing_in_list:await raw_list()', list)
    }

    if (list) {
        return list
    } else {
        list = [ 
            {
                title: "",
                category: "0x0",
                description: "",
                funding_goal: "0x0",
                amount_collected: "0x0",
                status: "0x0",
                beneficiary: "0x0",
                website: "",
                count: "0x0"
            }
        ]
    }

    return list
}

async function single_campaign_raw(counter) {
    const item = await hisani_contract_read_instance.read_campaign(counter)
    // update cache
    return item
}

const list = await all_projects()

let userAddress;

try {
    userAddress = num.toHex(wallet.address)
} catch (error) {
    userAddress = '0x-starknet-wallet-address'
}

console.log('num.toHex', userAddress)

async function get_acc_balance() {
    let balance = 0

    if (is_user_authenticated()) {
        balance = await usdc_contract_read_instance.balance_of(userAddress)
    }

    return balance
}

// async function every_campaign() {
//     const list = await hisani_contract_read_instance.list_all_campaigns()
//     const formatted_list = list.map((item) => ({
//         title: item.title,
//         category: shortString.decodeShortString(item.category),
//         description: item.description,
//         funding_goal: Number(item.funding_goal) / 1000000,
//         amount_collected: Number(item.amount_collected) / 1000000,
//         // funding_goal: Amount.fromRaw(item.funding_goal, 6, "USDC"),
//         // amount_collected: Amount.fromRaw(item.amount_collected, 6, "USDC"),
//         status: shortString.decodeShortString(item.status),
//         beneficiary: num.toHex(item.beneficiary),
//         count: Number(item.count),
//         website: item.website
//     }))

//     return formatted_list
// }

// ongoing for user
async function ongoing_for_user() {
    try {
        // const formatted_list = list.map((item) => ({
        //     title: item.title,
        //     category: shortString.decodeShortString(item.category),
        //     description: item.description,
        //     funding_goal: Number(item.funding_goal) / 1000000,
        //     amount_collected: Number(item.amount_collected) / 1000000,
        //     // funding_goal: Amount.fromRaw(item.funding_goal, 6, "USDC"),
        //     // amount_collected: Amount.fromRaw(item.amount_collected, 6, "USDC"),
        //     status: shortString.decodeShortString(item.status),
        //     beneficiary: num.toHex(item.beneficiary),
        //     count: Number(item.count),
        //     website: item.website
        // }))

        const formatted_list = list;


        let ongoing_projects = formatted_list.filter(item => (item.status === 'ongoing'))
        ongoing_projects = ongoing_projects.filter(item => (item.beneficiary === userAddress))

        console.log('ongoing_for_user:ongoing_projects', ongoing_projects)

        return ongoing_projects
    } catch (error) {
        console.log('ongoing_for_user:error', error)
    }
}

// ended for user
async function ended_for_user() {
    try {
        // const formatted_list = list.map((item) => ({
        //     title: item.title,
        //     category: shortString.decodeShortString(item.category),
        //     description: item.description,
        //     funding_goal: Number(item.funding_goal) / 1000000, //Amount.fromRaw(100000000n, 6, "USDC")
        //     // funding_goal: Amount.fromRaw(item.funding_goal, 6, "USDC"),
        //     // amount_collected: Amount.fromRaw(item.amount_collected, 6, "USDC"),
        //     amount_collected: Number(item.amount_collected) / 1000000,
        //     status: shortString.decodeShortString(item.status),
        //     beneficiary: num.toHex(item.beneficiary),
        //     count: Number(item.count),
        //     website: item.website
        // }))

        const formatted_list = list;

        console.log('ended_for_user:formatted_list', formatted_list)

        let ongoing_projects = formatted_list.filter(item => (item.status === 'ended'))
        ongoing_projects = ongoing_projects.filter(item => (item.beneficiary === userAddress))//user))

        return ongoing_projects
    } catch (error) {
        console.log('ended_for_user:error', error)
    }
}

// clamied for user
async function claimed_for_user() {
    try {
        // const formatted_list = list.map((item) => ({
        //     title: item.title,
        //     category: shortString.decodeShortString(item.category),
        //     description: item.description,
        //     funding_goal: Number(item.funding_goal) / 1000000, //Amount.fromRaw(100000000n, 6, "USDC")
        //     //funding_goal: Amount.fromRaw(item.funding_goal, 6, "USDC"),
        //     amount_collected: Number(item.amount_collected) / 1000000,
        //     //amount_collected: Amount.fromRaw(item.amount_collected, 6, "USDC"),
        //     status: shortString.decodeShortString(item.status),
        //     beneficiary: num.toHex(item.beneficiary),
        //     count: Number(item.count),
        //     website: item.website
        // }))

        const formatted_list = list;

        //console.log('claimed_for_user:formatted_list', formatted_list)

        let ongoing_projects = formatted_list.filter(item => (item.status === 'claimed'))
        ongoing_projects = ongoing_projects.filter(item => (item.beneficiary === userAddress))

        return ongoing_projects
    } catch (error) {
        console.log('claimed_for_user:error', error)
    }
}

async function campaign_list_for_all(category) {

    try {
        // const formatted_list = list.map((item) => ({
        //     title: item.title,
        //     category: shortString.decodeShortString(item.category),
        //     description: item.description,
        //     funding_goal: Number(item.funding_goal) / 1000000, //Amount.fromRaw(100000000n, 6, "USDC")
        //     //funding_goal: Amount.fromRaw(item.funding_goal, 6, "USDC"),
        //     amount_collected: Number(item.amount_collected) / 1000000,
        //     // amount_collected: Amount.fromRaw(item.amount_collected, 6, "USDC"),
        //     status: shortString.decodeShortString(item.status),
        //     beneficiary: num.toHex(item.beneficiary),
        //     count: Number(item.count),
        //     website: item.website
        // }))

        //console.log('campaign_list_for_all:formatted_list', formatted_list)

        const formatted_list = list;
        let ongoing_projects = formatted_list.filter(item => (item.status === 'ongoing'))

        if (!(category == 'all')) {
            ongoing_projects = ongoing_projects.filter(item => (item.category === category))
        }

        return ongoing_projects
    } catch (error) {
        console.log('campaign_list_for_all', error)
    }
}

async function single_campaign(counter) {
    // const item = await single_campaign_raw(counter)

    // const formatted_item = {
    //     title: item.title,
    //     category: shortString.decodeShortString(item.category),
    //     description: item.description,
    //     funding_goal: Number(item.funding_goal) / 1000000, //Amount.fromRaw(100000000n, 6, "USDC")
    //     // funding_goal: Amount.fromRaw(item.funding_goal, 6, "USDC"),
    //     amount_collected: Number(item.amount_collected) / 1000000,
    //     //amount_collected: Amount.fromRaw(item.amount_collected, 6, "USDC"),
    //     status: shortString.decodeShortString(item.status),
    //     beneficiary: num.toHex(item.beneficiary),
    //     count: Number(item.count),
    //     website: item.website
    // }

    const formatted_list = list;
    let ongoing_projects = formatted_list.filter(item => (item.count == counter))

    console.log('ongoing_projects', ongoing_projects)

    return ongoing_projects[0]
}

// export {
//     hisani_abi, usdc_abi, hisani_contract_read_instance, ongoing_for_user, ended_for_user, claimed_for_user, campaign_list_for_all, single_campaign,
//     //every_campaign, 
//     get_acc_balance
// }

// Fresh Lists

// ongoing for user
async function fresh_ongoing_for_user(fresh_list) {
    try {
        // const formatted_list = list.map((item) => ({
        //     title: item.title,
        //     category: shortString.decodeShortString(item.category),
        //     description: item.description,
        //     funding_goal: Number(item.funding_goal) / 1000000,
        //     amount_collected: Number(item.amount_collected) / 1000000,
        //     // funding_goal: Amount.fromRaw(item.funding_goal, 6, "USDC"),
        //     // amount_collected: Amount.fromRaw(item.amount_collected, 6, "USDC"),
        //     status: shortString.decodeShortString(item.status),
        //     beneficiary: num.toHex(item.beneficiary),
        //     count: Number(item.count),
        //     website: item.website
        // }))

        const formatted_list = fresh_list;


        let ongoing_projects = formatted_list.filter(item => (item.status === 'ongoing'))
        ongoing_projects = ongoing_projects.filter(item => (item.beneficiary === userAddress))

        console.log('ongoing_for_user:ongoing_projects', ongoing_projects)

        return ongoing_projects
    } catch (error) {
        console.log('ongoing_for_user:error', error)
    }
}

// ended for user
async function fresh_ended_for_user(fresh_list) {
    try {
        // const formatted_list = list.map((item) => ({
        //     title: item.title,
        //     category: shortString.decodeShortString(item.category),
        //     description: item.description,
        //     funding_goal: Number(item.funding_goal) / 1000000, //Amount.fromRaw(100000000n, 6, "USDC")
        //     // funding_goal: Amount.fromRaw(item.funding_goal, 6, "USDC"),
        //     // amount_collected: Amount.fromRaw(item.amount_collected, 6, "USDC"),
        //     amount_collected: Number(item.amount_collected) / 1000000,
        //     status: shortString.decodeShortString(item.status),
        //     beneficiary: num.toHex(item.beneficiary),
        //     count: Number(item.count),
        //     website: item.website
        // }))

        const formatted_list = fresh_list;

        console.log('ended_for_user:formatted_list', formatted_list)

        let ongoing_projects = formatted_list.filter(item => (item.status === 'ended'))
        ongoing_projects = ongoing_projects.filter(item => (item.beneficiary === userAddress))//user))

        return ongoing_projects
    } catch (error) {
        console.log('ended_for_user:error', error)
    }
}

// clamied for user
async function fresh_claimed_for_user(fresh_list) {
    try {
        // const formatted_list = list.map((item) => ({
        //     title: item.title,
        //     category: shortString.decodeShortString(item.category),
        //     description: item.description,
        //     funding_goal: Number(item.funding_goal) / 1000000, //Amount.fromRaw(100000000n, 6, "USDC")
        //     //funding_goal: Amount.fromRaw(item.funding_goal, 6, "USDC"),
        //     amount_collected: Number(item.amount_collected) / 1000000,
        //     //amount_collected: Amount.fromRaw(item.amount_collected, 6, "USDC"),
        //     status: shortString.decodeShortString(item.status),
        //     beneficiary: num.toHex(item.beneficiary),
        //     count: Number(item.count),
        //     website: item.website
        // }))

        const formatted_list = fresh_list;

        //console.log('claimed_for_user:formatted_list', formatted_list)

        let ongoing_projects = formatted_list.filter(item => (item.status === 'claimed'))
        ongoing_projects = ongoing_projects.filter(item => (item.beneficiary === userAddress))

        return ongoing_projects
    } catch (error) {
        console.log('claimed_for_user:error', error)
    }
}

async function fresh_campaign_list_for_all(category, fresh_list) {

    try {
        // const formatted_list = list.map((item) => ({
        //     title: item.title,
        //     category: shortString.decodeShortString(item.category),
        //     description: item.description,
        //     funding_goal: Number(item.funding_goal) / 1000000, //Amount.fromRaw(100000000n, 6, "USDC")
        //     //funding_goal: Amount.fromRaw(item.funding_goal, 6, "USDC"),
        //     amount_collected: Number(item.amount_collected) / 1000000,
        //     // amount_collected: Amount.fromRaw(item.amount_collected, 6, "USDC"),
        //     status: shortString.decodeShortString(item.status),
        //     beneficiary: num.toHex(item.beneficiary),
        //     count: Number(item.count),
        //     website: item.website
        // }))

        //console.log('campaign_list_for_all:formatted_list', formatted_list)

        const formatted_list = fresh_list;
        let ongoing_projects = formatted_list.filter(item => (item.status === 'ongoing'))

        if (!(category == 'all')) {
            ongoing_projects = ongoing_projects.filter(item => (item.category === category))
        }

        return ongoing_projects
    } catch (error) {
        console.log('campaign_list_for_all', error)
    }
}

async function fresh_single_campaign(counter, fresh_list) {
    // const item = await single_campaign_raw(counter)

    // const formatted_item = {
    //     title: item.title,
    //     category: shortString.decodeShortString(item.category),
    //     description: item.description,
    //     funding_goal: Number(item.funding_goal) / 1000000, //Amount.fromRaw(100000000n, 6, "USDC")
    //     // funding_goal: Amount.fromRaw(item.funding_goal, 6, "USDC"),
    //     amount_collected: Number(item.amount_collected) / 1000000,
    //     //amount_collected: Amount.fromRaw(item.amount_collected, 6, "USDC"),
    //     status: shortString.decodeShortString(item.status),
    //     beneficiary: num.toHex(item.beneficiary),
    //     count: Number(item.count),
    //     website: item.website
    // }

    const formatted_list = fresh_list;
    let ongoing_projects = formatted_list.filter(item => (item.count == counter))

    console.log('ongoing_projects', ongoing_projects)

    return ongoing_projects[0]
}

export {
    hisani_abi, usdc_abi, hisani_contract_read_instance, 
    ongoing_for_user, 
    ended_for_user, 
    claimed_for_user, 
    campaign_list_for_all, 
    single_campaign,

    fresh_ongoing_for_user, 
    fresh_ended_for_user, 
    fresh_claimed_for_user, 
    fresh_campaign_list_for_all, 
    fresh_single_campaign,

    //every_campaign, 
    get_acc_balance
}