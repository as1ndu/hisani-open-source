const single_campaign_template = `
<main class="container">
    <script type="module">
        import { show_single_campaign } from './js-dist/bundle.js';
        show_single_campaign({{CampaignId}})
    </script>

    <div id="single-campaign">
    Downloading data from Starknet ...
    <progress />
    </div>

</main>
`

export { single_campaign_template }