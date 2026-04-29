const landing_template = `
<main class="container">
    <hgroup>
        <h2>
            <span class="icon-for-heading-fix">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ff9500" d="M16 2c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5m0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3s-1.34 3-3 3m3 6h-2c0-1.2-.75-2.28-1.87-2.7L8.97 11H1v11h6v-1.44l7 1.94l8-2.5v-1c0-1.66-1.34-3-3-3M5 20H3v-7h2zm8.97.41L7 18.5V13h1.61l5.82 2.17c.34.13.57.46.57.83c0 0-2-.05-2.3-.15l-2.38-.79l-.63 1.9l2.38.79c.51.17 1.04.25 1.58.25H19c.39 0 .74.24.9.57z"/></svg>
            </span>
            HISANI
        </h2>
        <p>Fund Starknet projects you care about.</p>
    </hgroup>

    <p id="sepolia-testnet-msg">
    <ins>This product currently runs on Starknet Sepolia.</ins> <mark><a style="text-decoration: none" href="https://faucet.circle.com/" class="contrast">Get free Sepolia USDC from Circle</a></mark>
    </p>

    <div class="container">

    <center>
        <form>
            <fieldset role="group">
                <input type="submit" value="Choose Category" />
                <select name="category" id="category-selection">
                    <option selected value="all">
                        All
                    </option>
                    <option value="hackerthon">Hackerthon</option>
                    <option value="infrastructure">Infrastructure (Software & Tooling) </option>
                    <option value="meetups">Meetups</option>
                    <option value="social-cause">Social Cause</option>
                    <option value="others">Others</option>
                </select>
            </fieldset>
        </form>
    </center>

    <!--{{> CampaignList }}-->

    <div id="campaign-list">
        Downloading data from Starknet ...
        <progress /> 
    </div>

    </div>
</main>
`

export { landing_template }