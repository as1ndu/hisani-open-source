import { claim_funds, end_campaign, fund_campaign, withdraw_usdc, write_campaign } from "../operations/operations";
import { is_user_authenticated } from "../privy/auth";
import { wallet } from "../starzap/wallet";
import { show_notification } from "./onload";
import { campaign_list_html } from "./templates";

const user_authenticated = is_user_authenticated()

function fund_campaign_event() {
    // Donate
    try {
        document.addEventListener('click', async (event) => {

            const donate_button = event.target.dataset.button;

            if (donate_button == "donate") {
                const counter = event.target.dataset.counter;

                show_notification({
                    title: 'Making Contract Call',
                    content: '<progress></progress>'
                })

                // amount value
                const amount = document.getElementById(`donation-amount-${counter}`).value;

                console.log('fund_campaign_event:counter, amount', (counter, amount))
                console.log('event.target', event.target.dataset)

                if (user_authenticated) {
                    await fund_campaign(
                        counter,
                        //Amount.parse(amount, 6, "USDC").toBase()
                        (amount * 1000000)
                    )

                    // location.reload()

                } else {
                    show_notification({
                        title: 'Please login.',
                        content: 'You need to login to create or fund a campaign.'
                    })
                }
            }
        });
    } catch (error) {
        console.log('fund_campaign_event:error', error)

        const err = `${error}`.match(/\baddEventListener\b/g)

        if (!(err == 'addEventListener')) {
            show_notification({
                title: 'Fund Campaign Error.',
                content: `${error}`
            })
        }
    }
}

function write_campaign_event() {
    // write_campaign_event
    try {
        const campaign_btn = document.getElementById('create-new-campaign-button');
        campaign_btn.addEventListener('click', async () => {
            const title = document.getElementById('title-input').value;
            const category = document.getElementById('category-input').value;
            const funding_goal = document.getElementById('funding-goal-input').value;
            const website = document.getElementById('website-input').value;
            const description = document.getElementById('description-input').value;

            if (user_authenticated) {

                const campaign = {
                    title: title,
                    category: category,
                    description: description.trim(),
                    funding_goal: (funding_goal * 1000000),
                    amount_collected: 0,
                    status: "ongoing",
                    beneficiary: wallet.address,
                    website: website,
                    count: 0
                    // approved: "no" // declined, yes, no
                }

                // close modal, campaign-form-modal
                const modal = document.getElementById('campaign-form-modal');
                modal.close();

                show_notification({
                    title: 'Making Contract Call',
                    content: '<progress></progress>'
                })

                await write_campaign(campaign)

                //location.reload()

            } else {
                show_notification({
                    title: 'Please login.',
                    content: 'You need to login to create or fund a campaign.'
                })
            }

        });
    } catch (error) {
        console.log('write_campaign_event:error', error)

        const err = `${error}`.match(/\baddEventListener\b/g)

        if (!(err == 'addEventListener')) {
            show_notification({
                title: 'Create Campaign Error.',
                content: `${error}`
            })
        }
    }
}

function end_campaign_event() {
    // End campaign
    try {
        document.addEventListener('click', async (event) => {
            const donate_button = event.target.dataset.button;

            if (donate_button == "endcampaign") {
                const counter = event.target.dataset.counter;

                // amount value 
                //const amount = document.getElementById(`user-campaign-${counter}`).value;
                //ongoing-for-user-{{count}}

                if (user_authenticated) {
                    const ongoing_item = document.getElementById(`ongoing-for-user-${counter}`)
                    ongoing_item.style.display = 'none'

                    await end_campaign(counter)
                    //location.reload()

                } else {
                    show_notification({
                        title: 'Please login.',
                        content: 'You need to login to create or fund a campaign.'
                    })
                }
            }
        });
    } catch (error) {
        console.log('end_campaign_event:error', error)

        const err = `${error}`.match(/\baddEventListener\b/g)


        if (!(err == 'addEventListener')) {
            show_notification({
                title: 'End Campaign Error.',
                content: `${error}`
            })
        }

    }
}

function claim_funds_event() {
    // Claim funds
    try {
        document.addEventListener('click', async (event) => {
            const donate_button = event.target.dataset.button;

            if (donate_button == "claimfunds") {
                const counter = event.target.dataset.counter;

                // amount value
                // const amount = document.getElementById(`user-campaign-${counter}`).value;

                if (user_authenticated) {
                    const ongoing_item = document.getElementById(`ended-for-user-${counter}`)
                    ongoing_item.style.display = 'none'
                    await claim_funds(counter)
                    //location.reload()
                } else {
                    show_notification({
                        title: 'Please login.',
                        content: 'You need to login to create or fund a campaign.'
                    })
                }
            }
        });
    } catch (error) {
        console.log('claim_funds_event:error', error)

        const err = `${error}`.match(/\baddEventListener\b/g)

        if (!(err == 'addEventListener')) {
            show_notification({
                title: 'Claim Funds Error.',
                content: `${error}`
            })
        }

    }

}

// destination-usdc-address, usdc-withdraw-btn
function make_external_withdraw() {
    // Claim funds
    try {
        const usdc_withdraw_btn = document.getElementById('usdc-withdraw-btn');

        usdc_withdraw_btn.addEventListener('click', async () => {

            // Starknet address
            const address = document.getElementById('destination-usdc-address').value;

            console.log('make_external_withdraw:address', address)

            if (user_authenticated) {

                show_notification({
                    title: 'Making Contract Call',
                    content: '<progress><progress />'
                })

                await withdraw_usdc(address)
            } else {
                show_notification({
                    title: 'Please login.',
                    content: 'You need to login to create or fund a campaign.'
                })
            }

        });

    } catch (error) {
        console.log('claim_funds_event:error', error)

        const err = `${error}`.match(/\baddEventListener\b/g)

        if (!(err == 'addEventListener')) {
            show_notification({
                title: 'Make External Withdraw Error.',
                content: `${error}`
            })
        }

    }

}


function category_selection() {

    try {
        const category_selection = document.getElementById('category-selection');

        category_selection.addEventListener('change', async () => {
            const selected_category = category_selection.value

            const campaing_list_section = document.querySelector('#campaign-list');
            campaing_list_section.innerHTML = await campaign_list_html(selected_category)
        });

    } catch (error) {
        console.log(error)

        const err = `${error}`.match(/\baddEventListener\b/g)

        console.log('category_selection:err', err)

        if (!(err == 'addEventListener')) {
            show_notification({
                title: 'Category Selection Error.',
                content: `${error}`
            })
        }

    }
}

export { fund_campaign_event, write_campaign_event, end_campaign_event, claim_funds_event, category_selection, make_external_withdraw }