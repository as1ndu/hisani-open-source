# HISANI

A Crowd Funding Platform on Starknet (Kick Starter, Go Fund Me Style)

## Features

Contributors:

1. Create a Starknet Wallet with an Email based off the Privy API.
2. Browse amongst Hackerthons, Infrastructure (Software & Tooling), Social Causes, Meetups & Others.
3. What a campaign you care about in USDC.

Fund raisers:

1. Create campaigns for something you want funded.
2. Raise money in USDC.
3. Withdraw funds to wallet of choice.

## Cairo Smart contracts

Smart contracts folder is at [`/hisani_contract/src`](/hisani_contract/src/)

Live Sepolia deployment is at - [`https://sepolia.voyager.online/contract/0x0579d5d711284b4c2ff1bb6f149f3462ccf83c041d8a9b2817d672c803329857`](https://sepolia.voyager.online/contract/0x0579d5d711284b4c2ff1bb6f149f3462ccf83c041d8a9b2817d672c803329857)

## Starzap Integration

Inspect [StarkZap integration folder in `/public/js/starzap/`](/public/js/starzap/)

- [x] Onboarding
- [x] Privy Integration
- [x] Network & RPC
- [x] AVNU Paymaster gas sponsorship
- [x] Privy Wallet management
- [x] USDC

## Environment variables

### Frontend (JS browser code)

Located at `/hisani-webapp-deployment/public/js/constants.js`

`fe_server_origin` = 'https://hisani.cassandra.technology or //'http://localhost:8787'
`rpc_node`         = 'from Alchemy dashboard'
`paymaster_key`    = 'from AVNU dashboard'

`privy_app_id`    = 'from Privy dashboard'
`privy_client_id` = 'from Privy dashboard'

### Backend (server side)

These can be located and modified in [`/hisani-webapp-deployment/src/constants.js`](/hisani-webapp-deployment/src/constants.js)

`server_origin`   = 'https://localhost:8787 or https://hisani.cassandra.technology, https://your-domain-com' // remember to whitelist on Privy

`privy_app_id`     = 'from Privy dashboard';
`privy_app_secret` = 'from Privy dashboard';

`privy_auth_private_key` = 'from Privy dashboard'

`privy_signer_id`  = 'from Privy dashboard'

`node_rpc_url`    = 'from Privy alchemy'



## Instructions to run locally

- Navigate to hisani-webapp-deployment
  
```bash
cd hisani-webapp-deployment
```

- Install dependencies & compile

```bash
sudo yarn install && npm run compile
```

- Run local instance

```bash
sudo npx wrangler dev --live-reload=true
```
