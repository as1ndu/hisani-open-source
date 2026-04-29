import { shortString, num } from 'starknet';

function single_campaign(campaign) {
    const item = {
        title: campaign.title,
        category: shortString.decodeShortString(campaign.category),
        description: campaign.description,
        funding_goal: Number(campaign.funding_goal),
        amount_collected: Number(campaign.amount_collected),
        status: shortString.decodeShortString(campaign.status),
        beneficiary: num.toHex(campaign.beneficiary)
    }
    return item
}

export {
    single_campaign
}