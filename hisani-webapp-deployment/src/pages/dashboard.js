import { base_template }    from  "./../templates/base";
import { dashboard_template } from "./../templates/containers/dashboard-container";

import { render_template } from "./../utils/render-template"

async function dashboard_page() {

    const dashboard_template_html = render_template(dashboard_template, { }, { })

    const data = {
     'PageTitle': 'Hisani - Dashboard'
    }

    const partial = {
        'BasePartial': dashboard_template_html
    }

    const output = render_template(base_template, data, partial)

    return output
}

export { dashboard_page }