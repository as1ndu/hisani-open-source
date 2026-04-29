import { RpcProvider, Contract } from 'starknet';

import { base_template }    from  "./../templates/base";
import { single_campaign_template } from "./../templates/containers/campaign";

import { render_template } from "./../utils/render-template"

import { single_campaign } from "./../utils/onchain-data";

async function single_campaign_page(campaignId) {

    const single_campaign_template_html = render_template(single_campaign_template, { 'CampaignId': campaignId }, { })

    const data = {
     'PageTitle': 'Hisani - Dashboard',
    }

    const partial = {
        'BasePartial': single_campaign_template_html
    }

    const output = render_template(base_template, data, partial)

    return output
}

export { single_campaign_page }