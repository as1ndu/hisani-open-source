import { base_template }    from  "./../templates/base";
import { landing_template } from "./../templates/containers/landing-container";

import { render_template } from "./../utils/render-template"

async function landing_page() {

    const landing_template_html = render_template(landing_template, { }, {
        // 'CampaignList': campaign_list
    })

    const data = {
     'PageTitle': 'Hisani - Fund Starknet Projects You Care About',
    }

    const partial = {
        'BasePartial': landing_template_html
    }

    const output = render_template(base_template, data, partial)

    return output
}

export { landing_page }