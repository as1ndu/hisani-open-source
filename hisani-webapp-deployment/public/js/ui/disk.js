import { delay } from "../privy/login";
import { get_acc_balance } from "./data";
import { update_campaing_list_html, update_claimed_html, update_ended_html, update_ongoing_html } from "./onload";

// all campaigns
async function write_campaigns_cache(list) {
    console.log('disk.js:write_campaigns_cache')

    try {
        const list_string = JSON.stringify(list)
        console.log('write_campaigns_cache', list_string.length)

        console.log('read_campaigns_cache:current_data:1', list_string.length)

        localStorage.setItem('list', list_string)
        //console.log('write_campaigns_cache', localStorage.getItem('list'))

        console.log('read_campaigns_cache:current_data:2', list_string.length)

        //await update_campaing_list_html(list)
        await update_ongoing_html(list)
        await update_claimed_html(list)
        await update_ended_html(list)

        console.log('write_campaigns_cache:successful')


    } catch (error) {
        console.log('write_campaigns_cache:error', error)
    }
}

// write single campaigns cache
function write_single_campaign_cache(count, campaign) {
    try {
        const single_campaign = JSON.stringify(campaign)
        localStorage.setItem(count, single_campaign)

    } catch (error) {
        console.log('write_single_campaigns_cache:error', error)
    }
}


// read all campaigns
function read_campaigns_cache() {
    try {
        console.log('read_campaigns_cache')
        const data = localStorage.getItem('list')
        console.log('read_campaigns_cache:data', data)

        if (data == null) {
            return JSON.stringify([])
        }

        return data
    } catch (error) {
        console.log('read_campaigns_cache:error', error)
        
    }
}

// read single campaign
function read_single_campaign_cache(count) {
    try {
        return localStorage.getItem(count)
    } catch (error) {
        console.log('read_single_campaigns_cache:error', error)
    }
}




export { write_campaigns_cache, write_single_campaign_cache, read_campaigns_cache, read_single_campaign_cache }
