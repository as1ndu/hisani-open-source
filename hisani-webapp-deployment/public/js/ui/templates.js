const Mustache = require('mustache');

import { fresh_ongoing_for_user, fresh_claimed_for_user, fresh_ended_for_user, fresh_campaign_list_for_all, single_campaign, campaign_list_for_all } from "./data";

function render_template(template_string, data, partial) {
    const output = Mustache.render(template_string, data, partial)
    return output
}

const ongoing_string = `
<ul>
{{# ongoing }}
    <li id="ongoing-for-user-{{count}}">
        <hgroup>
            <h5><a href="/{{count}}" class="white" style="text-decoration: none">{{title}}</a></h5>
            <small>USDC <b class="green">{{amount_collected}}</b> of USDC <b>{{funding_goal}}</b> raised</small>
            <p>
            {{description}}
            </p>
        </hgroup>
        <button class="contrast" data-button="endcampaign" data-counter="{{count}}" id="user-campaign-{{count}}">End Campaign</button>
    </li>
    <br/>
 {{/ ongoing }}
</ul>
`

const ended_string = `
<ul>
{{# ended }}
    <li id="ended-for-user-{{count}}">
        <hgroup>
            <h5><a href="/{{count}}" class="white" style="text-decoration: none">{{title}}</a></h5>
            <small>USDC <b class="green">{{amount_collected}}</b> of USDC <b>{{funding_goal}}</b> raised</small>
            <p>
            {{description}}
            </p>
        </hgroup>
        <button class="contrast" data-button="claimfunds" data-counter="{{count}}" id="ended-campaign-{{count}}">Claim Funds</button>
    </li>
    <br/>
 {{/ ended }}
</ul>
`

const claimed_string = `
<ul>
{{# claimed }}
    <li id="claimed-for-user-{{count}}">
        <hgroup>
            <h5><a href="/{{count}}" class="white" style="text-decoration: none" >{{title}}</a></h5>
            <small>USDC <b class="green">{{amount_collected}}</b> of USDC <b>{{funding_goal}}</b> raised</small>
            <p>
            {{description}}
            </p>
        </hgroup>
    </li>
    <br/>
 {{/ claimed }}
</ul>
`

const campaign_list_template = `
<div>
{{# campaigns }}
    <article class="campaign-item">
        <header>
        <h3><a href="/{{count}}" class="white" style="text-decoration: none">{{title}}.</a></h3>

        <span>
            {{#ongoing}}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="rgb(79, 189, 79)" d="M10 28a1 1 0 0 1-1-1V5a1 1 0 0 1 1.501-.865l19 11a1 1 0 0 1 0 1.73l-19 11A1 1 0 0 1 10 28M4 4h2v24H4z"/></svg>
                <b class="green">ongoing</b>
            {{/ongoing}}
            
            {{#ended}}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#f0f8ff" fill-rule="evenodd" d="M8 1a1 1 0 0 0-.716.302l-6 6.156A1 1 0 0 0 1 8.156V16a1 1 0 0 0 .293.707l6 6A1 1 0 0 0 8 23h8a1 1 0 0 0 .707-.293l6-6A1 1 0 0 0 23 16V8.156a1 1 0 0 0-.284-.698l-6-6.156A1 1 0 0 0 16 1zm0 10a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z" clip-rule="evenodd"/></svg>
                <b class="white">Ended</b>
            {{/ended}}
            
            {{#claimed}}
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48"><g fill="none" stroke="#a52a2a" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path d="m22 29l-8.224 4.112a3 3 0 0 1-3.287-.4L4 27.18l3.562-1.365a3 3 0 0 1 1.986-.057l3.28 1.047a3 3 0 0 0 2.27-.182l22.262-11.3A3 3 0 0 1 38.718 15H44l-1.553 3.106a3 3 0 0 1-1.341 1.341L32 24"/><path d="m22 29l-4 2l5 10l9-17m-15 1l-5-9l16 4"/></g></svg>
                <b class="red">Ended</b>
            {{/claimed}}, 
            
            <a href="#">#{{category}}</a>
        </span>

        </header>
            <p>
                {{description}}
            </p>

            <fieldset role="group" class="donation-group">
                <input type="number" placeholder="$5" id="donation-amount-{{count}}" value="5">
                <button class="contrast donate-button" data-counter="{{count}}" data-button="donate">Donate</button>
            </fieldset>

            <p>
                <ul>
                    <li><b>USDC</b> <b class="green" id="campaign-amount-raised-{{count}}">{{amount_collected}}</b> raised out of <b>USDC</b> {{funding_goal}}</li>
                    <li><a href="{{website}}" class="secondary">Project Website</a></li>
                </ul>
            </p>

            <label>
            <progress id="campaign-progress-{{count}}"  value="{{amount_collected}}" max="{{funding_goal}}">
            </label>

        <footer></footer>
    </article>
{{/ campaigns }}
</div>
`

const single_campaign_template = `
<hgroup>
    <h2><a href="/{{Campaign.count}}" class="white" style="text-decoration: none">{{Campaign.title}}</a></h2>
    <p>number: {{Campaign.count}}</p>
</hgroup>

<div class="container">
    <article class="campaign-item">
        <header>

        <span>
            {{#Campaign.ongoing}}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="rgb(79, 189, 79)" d="M10 28a1 1 0 0 1-1-1V5a1 1 0 0 1 1.501-.865l19 11a1 1 0 0 1 0 1.73l-19 11A1 1 0 0 1 10 28M4 4h2v24H4z"/></svg>
                <b class="green">ongoing</b>
            {{/Campaign.ongoing}}
            
            {{#Campaign.ended}}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#f0f8ff" fill-rule="evenodd" d="M8 1a1 1 0 0 0-.716.302l-6 6.156A1 1 0 0 0 1 8.156V16a1 1 0 0 0 .293.707l6 6A1 1 0 0 0 8 23h8a1 1 0 0 0 .707-.293l6-6A1 1 0 0 0 23 16V8.156a1 1 0 0 0-.284-.698l-6-6.156A1 1 0 0 0 16 1zm0 10a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z" clip-rule="evenodd"/></svg>
                <b class="white">Ended</b>
            {{/Campaign.ended}}
            
            {{#Campaign.claimed}}
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48"><g fill="none" stroke="#a52a2a" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path d="m22 29l-8.224 4.112a3 3 0 0 1-3.287-.4L4 27.18l3.562-1.365a3 3 0 0 1 1.986-.057l3.28 1.047a3 3 0 0 0 2.27-.182l22.262-11.3A3 3 0 0 1 38.718 15H44l-1.553 3.106a3 3 0 0 1-1.341 1.341L32 24"/><path d="m22 29l-4 2l5 10l9-17m-15 1l-5-9l16 4"/></g></svg>
                <b class="red">Ended</b>
            {{/Campaign.claimed}}, 
            
            <a href="#">#{{Campaign.category}}</a>
        </span>

        </header>
            <p>
                {{Campaign.description}}
            </p>

            {{#Campaign.ongoing}}
            <fieldset role="group" class="donation-group">
                <input type="number" placeholder="$5" id="donation-amount-{{Campaign.count}}" value="5">
                <button class="contrast donate-button" data-counter="{{Campaign.count}}" data-button="donate" >Donate</button>
            </fieldset>
            {{/Campaign.ongoing}}

            <p>
                <ul>
                    <li>USDC <b class="green" id="campaign-amount-raised-{{Campaign.count}}">{{Campaign.amount_collected}}</b> raised out of USDC <b>{{Campaign.funding_goal}}</b></li>
                    <li><a href="{{Campaign.website}}" class="secondary">Project Website</a></li>
                </ul>
            </p>

            <label>
            <progress id="campaign-progress-{{Campaign.count}}" value="{{Campaign.amount_collected}}" max="{{Campaign.funding_goal}}">
            </label>

        <footer></footer>
    </article>
</div>
`

async function ongoing_html(list) {
    return render_template(ongoing_string, { 'ongoing': await fresh_ongoing_for_user(list) }, {})
}

async function ended_html(list) {
    return render_template(ended_string, { 'ended': await fresh_ended_for_user(list) }, {})
}

async function claimed_html(list) {
    return render_template(claimed_string, { 'claimed': await fresh_claimed_for_user(list) }, {})
}

async function campaign_list_html(category, list) {
    let items;

    if (list == undefined) {
        items = await campaign_list_for_all(category)
    } else {
        items = await fresh_campaign_list_for_all(category, list)
    }

    console.log('templates.js:campaign_list_html:list', list == undefined)

    return render_template(campaign_list_template, { 'campaigns': items }, {})
}

async function single_campaign_html(counter, list) {
    const item = await single_campaign(counter)

    return render_template(single_campaign_template, { 'Campaign': item, 'status': status }, {})
}

export { render_template, ongoing_html, ended_html, claimed_html, campaign_list_html, single_campaign_html } 