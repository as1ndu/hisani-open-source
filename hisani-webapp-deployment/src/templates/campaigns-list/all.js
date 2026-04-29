const campaign_list_template = `
<div>
{{# CampaignList }}
    <article>
        <header>
        <h3>{{title}}</h3>
        <span class="green">ongoing</span>, 
        <span><a href="#">#{{category}}</a></span>
        </header>
            <p>
                {{description}}
            </p>

            <button class="contrast" {{count}}>Donate</button>

            <p>
                <ul>
                    <li>\${{amount_collected}} raised out of \${{funding_goal}}</li>
                    <li><a href="#" class="secondary">Project Website</a></li>
                </ul>
            </p>

            <label>
            <progress value="{{amount_collected}}" max="{{funding_goal}}">
            <label>

        <footer>Footer</footer>
    </article>
{{/ CampaignList }}
</div>
`

export { campaign_list_template }