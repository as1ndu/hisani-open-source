import { AutoRouter, html, json } from 'itty-router'

import { RpcProvider, Contract, shortString, num } from 'starknet';

import { landing_page } from './pages/landing-page'
import { dashboard_page } from "./pages/dashboard";
import { single_campaign_page } from "./pages/single-campaign";
import { get_wallet } from './api/privy-wallet';
import { sign_txn_with_privy } from './api/privy-signer';
import { node_rpc_url } from './constants';

const router = AutoRouter()

router
  .get('/', async () => {
    try {

      return html(await landing_page())

    } catch (error) {
      console.log(error)

    }
  })

  .get('/dashboard', async () => {
    return html(await dashboard_page())
  })

  .get('/:campaignId', async ({ campaignId }) => {
    return html(await single_campaign_page(campaignId))
  })

  .post('/api/privy-wallet/signer', async (request) => {
   try {
     const requestBody = await request.json()
     // verify access token 
     // request.headers.get('Authorization')
     console.log('/signer:requestBody', requestBody)
     const signature = await sign_txn_with_privy(requestBody)
     return signature
   } catch (error) {
    console.log('/api/privy-wallet/signer', error)
   }
  })

  .post('/api/privy-wallet/details/:userId', async ({ userId }) => {
    // verify access token 
    console.log('/api/privy-wallet/details/:userId:1', userId)
    try {
      const data = await get_wallet(userId)
      console.log('/api/privy-wallet/details/:userId:2', userId)
      console.log('/api/privy-wallet/details/:userId:data', data)
      return json(data)

    } catch (error) {
      console.log('/api/privy-wallet/details/:userId', error)
    }
  })

  .get('/campaigns/all', async () => {
    console.log('/campaigns/all')
    const node_instance = node_rpc_url
    const hisani_contract_address = '0x0579d5d711284b4c2ff1bb6f149f3462ccf83c041d8a9b2817d672c803329857'

    const hisaniProvider = new RpcProvider({
      nodeUrl: node_instance,
    });

    const hisani_abi = await hisaniProvider.getClassAt(hisani_contract_address);

    const hisani_contract_call_instance = new Contract({
      abi: hisani_abi.abi,
      address: hisani_contract_address,
      providerOrAccount: hisaniProvider
    });

    const campaigns = await hisani_contract_call_instance.list_all_campaigns()

    const list = campaigns.reverse()

    const formatted_list = list.map((item) => ({
      title: item.title,
      category: shortString.decodeShortString(item.category),
      description: item.description,
      funding_goal: Number(item.funding_goal) / 1000000,
      amount_collected: Number(item.amount_collected) / 1000000,
      // funding_goal: Amount.fromRaw(item.funding_goal, 6, "USDC"),
      // amount_collected: Amount.fromRaw(item.amount_collected, 6, "USDC"),
      status: shortString.decodeShortString(item.status),
      beneficiary: num.toHex(item.beneficiary),
      count: Number(item.count),
      website: (item.website),
      ongoing: (shortString.decodeShortString(item.status) == 'ongoing'),
      ended: (shortString.decodeShortString(item.status) == 'ended'),
      claimed: (shortString.decodeShortString(item.status) == 'claimed')
    }))

    console.log("formatted_list:", formatted_list[0])

    return formatted_list
  })

export default {
  ...router
}