const dashboard_template = `
<main class="container">
<hgroup>
    <h2>Dashboard</h2>
    <p>Manage campaigns & funds.</p>
</hgroup>

<div class = "grid">
    <div>
        <button id="create-campaign-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5v2H5v14h14v-5z"/><path fill="#000" d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4z"/></svg>
            Create New Campaign
        </button>
    </div>

</div>

    <div class="container">
        <dialog id="campaign-form-modal" close>
            <article>

                <header>
                    <p>
                        <strong>🚀 What do you want funded?</strong>
                    </p>
                </header>

                <label>
                Title
                    <input id="title-input" placeholder="Cairo Coding Bootcamp for Beginners" required/>
                </label>

                <label>
                Category
                <select id="category-input" name="category" required>
                    <option selected value="hackerthon">
                        Hackerthon
                    </option>
                    <option value="infrastructure">Infrastructure (Software & Tooling) </option>
                    <option value="meetups">Meetups</option>
                    <option value="social-cause">Social Cause</option>
                    <option value="others">Others</option>
                </select>
                </label>

                <label>
                 Description
                    <textarea id="description-input"  placeholder="Talk more about the event here. Keep it brief" rows="4" cols="50" required></textarea>
                </label>

                <label>
                 Funding Goal
                    <input id="funding-goal-input" type="number" pattern="[0-9]*" placeholder="USDC 1000" required/>
                </label>

                 <label>
                 Website/(Social media announcement)
                    <input id="website-input" placeholder="https://x.com/CassandraTechs/status/2045222190564463037" required/>
                </label>
                
                <footer>
                    <button class="secondary" id="close-campaign-form-button">
                        Close
                    </button>

                    <button id="create-new-campaign-button">
                        Create 
                    </button>
                </footer>
            </article>
        </dialog>

        <p>
            <div class="grid">
                <div>
                    <article>
                       <div class="dash-tile">
                            <center>
                                <p>
                                    <div id="wallet-qr-code">
                                    </div>
                                </p>

                                <p>
                                    <span id="acc-balance">
                                        Loading ...
                                        <progress /> 
                                    </span>
                                </p>
                            </center>
                        </div>
                        <footer>
                            <small>
                                Account Balance
                            </small>
                        </footer>
                    </article>
                </div>

                <div>
                    <article>
                            <p>
                                <div class="dash-tile">
                                        <p>
                                            <label>
                                                <b>USDC</b> Destination Starknet Address
                                                <input id="destination-usdc-address" name="address" placeholder="0x03f2df18f601d815426df4a813a2580b124e1481a153dfca10b45b5755006a7b" type="text" />
                                            </label>

                                            <button id="usdc-withdraw-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><g fill="#000"><path d="M184 64v138.31L173.32 186a20 20 0 0 0-36.9 14H56V64a8 8 0 0 1 8-8h112a8 8 0 0 1 8 8" opacity="0.2"/><path d="M232 198.65V240a8 8 0 0 1-16 0v-41.35A74.84 74.84 0 0 0 192 144v58.35a8 8 0 0 1-14.69 4.38l-10.68-16.31c-.08-.12-.16-.25-.23-.38a12 12 0 0 0-20.89 11.83l22.13 33.79a8 8 0 0 1-13.39 8.76l-22.26-34l-.24-.38A28 28 0 0 1 176 176.4V64h-16a8 8 0 0 1 0-16h16a16 16 0 0 1 16 16v59.62a90.89 90.89 0 0 1 40 75.03M88 56a8 8 0 0 0-8-8H64a16 16 0 0 0-16 16v136a8 8 0 0 0 16 0V64h16a8 8 0 0 0 8-8m69.66 42.34a8 8 0 0 0-11.32 0L128 116.69V16a8 8 0 0 0-16 0v100.69L93.66 98.34a8 8 0 0 0-11.32 11.32l32 32a8 8 0 0 0 11.32 0l32-32a8 8 0 0 0 0-11.32"/></g></svg>
                                            Withdraw USDC
                                            </button>
                                        </p>
                                </div>
                            </p>

                            <footer>
                                <small>Withdraw Funds</small>
                            </footer>
                    </article>
                </div>
            </div>
        </p>

        <hr/>
        <div>
            <h5 class="green">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="rgb(79, 189, 79)" d="M10 28a1 1 0 0 1-1-1V5a1 1 0 0 1 1.501-.865l19 11a1 1 0 0 1 0 1.73l-19 11A1 1 0 0 1 10 28M4 4h2v24H4z"/></svg>
                Ongoing
            </h5>
            <div id="ongoing-for-user">
            </div>
        </div>

        <hr/>
        <div>
            <h5 class="white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#f0f8ff" fill-rule="evenodd" d="M8 1a1 1 0 0 0-.716.302l-6 6.156A1 1 0 0 0 1 8.156V16a1 1 0 0 0 .293.707l6 6A1 1 0 0 0 8 23h8a1 1 0 0 0 .707-.293l6-6A1 1 0 0 0 23 16V8.156a1 1 0 0 0-.284-.698l-6-6.156A1 1 0 0 0 16 1zm0 10a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z" clip-rule="evenodd"/></svg>
                Ended
            </h5>
            <div id="ended-for-user">
            </div>
        </div>

        <hr/>
        <div>
            <h5 class="red">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48"><g fill="none" stroke="#a52a2a" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path d="m22 29l-8.224 4.112a3 3 0 0 1-3.287-.4L4 27.18l3.562-1.365a3 3 0 0 1 1.986-.057l3.28 1.047a3 3 0 0 0 2.27-.182l22.262-11.3A3 3 0 0 1 38.718 15H44l-1.553 3.106a3 3 0 0 1-1.341 1.341L32 24"/><path d="m22 29l-4 2l5 10l9-17m-15 1l-5-9l16 4"/></g></svg>
                Claimed
            </h5>
            <div id="claimed-for-user">
            </div>
        </div>
    </div>
</main>
`

export { dashboard_template }