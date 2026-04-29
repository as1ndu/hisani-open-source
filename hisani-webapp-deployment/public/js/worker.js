import { fe_server_origin } from "./constants";

const server_origin = fe_server_origin

async function pull_every_campaign() {
    const list    = await fetch(`${server_origin}/campaigns/all`)
    const respose = await list.json()

    return respose
}

setInterval(async () => {
    console.log('worker ...')
    const list = await pull_every_campaign()
   // console.log('workers.js', list)

    self.postMessage(list)

}, 3000);