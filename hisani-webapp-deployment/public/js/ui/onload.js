import { is_user_authenticated } from "../privy/auth";
import { wallet } from "../starzap/wallet";
import { get_acc_balance } from "./data";
import { campaign_list_html, claimed_html, ended_html, ongoing_html } from "./templates";

const user_autheticated = is_user_authenticated()

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function show_wallet_address() {

    try {
        if (user_autheticated) {
            const wallet_address_container = document.getElementById('wallet-qr-code')
            const wallet_address = wallet.address

            const wallet_html = `
             <a href="https://sepolia.voyager.online/contract/${wallet_address}">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${wallet_address}" />
            </a>
            `

            wallet_address_container.innerHTML = wallet_html
        }

    } catch (error) {
        console.log('show_wallet_address:error', error)
    }

}

async function update_account_balance() {
    try {
        let acc_balance;

        if (user_autheticated) {
            acc_balance = await get_acc_balance()
            //console.log('update_account_balance:acc_balance', acc_balance)
            acc_balance = Number((Number(acc_balance) / 1000000).toFixed(2)).toLocaleString()
        } else {
            acc_balance = 0

            // show_notification({
            //     title: 'Please login.',
            //     content: 'You need to login to create or fund a campaign.'
            // })
        }

        const acc_balance_element = document.getElementById('acc-balance');

        acc_balance_element.innerHTML = `<b>USDC ${acc_balance}</b>`;
    } catch (error) {
        //update_account_balance:error TypeError: Cannot set properties of null (setting 'innerHTML')
        console.log('update_account_balance:error', error)
    }
}

async function update_ongoing_html(list) {
    const rendred_ongoing_html = await ongoing_html(list)

    const ongoing_section = document.querySelector('#ongoing-for-user');
    try {
        ongoing_section.innerHTML = rendred_ongoing_html
    } catch (error) {
        console.log('update_ongoing_html:error', error)
    }
}

async function update_ended_html(list) {
    const rendred_ended_html = await ended_html(list)

    const ended_section = document.querySelector('#ended-for-user');
    try {
        ended_section.innerHTML = rendred_ended_html
    } catch (error) {
        console.log('update_ended_html:error', error)
    }
}

async function update_claimed_html(list) {
    const rendred_claimed_html = await claimed_html(list)

    const claimed_section = document.querySelector('#claimed-for-user');
    try {
        claimed_section.innerHTML = rendred_claimed_html
    } catch (error) {
        console.log('update_claimed_html:error', error)
    }
}


async function update_campaing_list_html(list) {
    const rendred_campaing_list_html = await campaign_list_html('all', list)

    console.log('update_campaing_list_html(list):rendred_campaing_list_html', rendred_campaing_list_html)

    const campaing_list_section = document.querySelector('#campaign-list');

    try {
        campaing_list_section.innerHTML = rendred_campaing_list_html
        console.log('update_campaing_list_html:rendred_campaing_list_html', rendred_campaing_list_html)

    } catch (error) {
        console.log('update_campaing_list_html:error', error)
    }
}

async function update_raised_funds_amount(counter, amount) {
    try {
        const raised_amount_element = document.getElementById(`campaign-amount-raised-${counter}`);
        const current_raised_amount = raised_amount_element.textContent

        raised_amount_element.innerHTML = ((Number(amount)/1000000) + Number(current_raised_amount))

        const progress = document.getElementById(`campaign-progress-${counter}`)
        progress.value = ((Number(amount)/1000000) + Number(current_raised_amount))

        //id="campaign-amount-raised-{{Campaign.count}}"
        console.log('update_raised_funds_amount:amount', amount, current_raised_amount)

    } catch (error) {
        console.log('update_raised_funds_amount:error', error)
    }
}


// open modal for campaign form
function open_campaign_form() {
    try {
        const campaign_btn = document.getElementById('create-campaign-btn');
        campaign_btn.addEventListener('click', () => {
            const modal = document.getElementById('campaign-form-modal');

            modal.showModal();;
        });
    } catch (error) {
        console.log('open_campaign_form:error', error)
    }
}

// close modal for campaign form
function close_campaign_form() {
    try {
        const campaign_btn = document.getElementById('close-campaign-form-button');
        campaign_btn.addEventListener('click', () => {
            const modal = document.getElementById('campaign-form-modal');
            modal.close();
        });
    } catch (error) {
        console.log('close_campaign_form:error', error)
    }
}

// open modal for campaign form
function show_notification(notification) {
    try {
        const modal = document.getElementById('notification-modal');

        // add title
        const modal_title = document.getElementById('notification-title')
        modal_title.innerHTML = notification.title

        // add content
        const modal_content = document.getElementById('notification-content')
        modal_content.innerHTML = notification.content

        modal.showModal();;
    } catch (error) {
        console.log('show_notification:error', error)
    }
}

// close modal for campaign form
function close_notification() {
    try {
        const modal_element = document.getElementById('close-notification-modal');
        modal_element.addEventListener('click', () => {
            const modal = document.getElementById('notification-modal');
            modal.close();
        });
    } catch (error) {
        console.log('close_notification:error', error)
    }
}

// function downloading_data() {
//     try {
//         const modal = document.getElementById('downloading-data-modal');
//         modal.showModal();
//     } catch (error) {
//         console.log('downloading_data:error', error)
//     }
// }

// function close_downloading_data_modal() {
//     try {
//         const modal = document.getElementById('downloading-modal');
//         modal.close();
//     } catch (error) {
//         console.log('downloading_data:error', error)
//     }
// }


export {
    // rendred_ongoing_html,
    // rendred_ended_html,
    // rendred_claimed_html,
    // rendred_campaing_list_html,
   // downloading_data,
   // close_downloading_data_modal,

    update_ongoing_html,
    update_ended_html,
    update_claimed_html,
    update_campaing_list_html,
    update_account_balance,

    update_raised_funds_amount,
    //show_single_campaign,
    open_campaign_form,
    close_campaign_form,

    show_wallet_address,

    show_notification,
    close_notification,
}