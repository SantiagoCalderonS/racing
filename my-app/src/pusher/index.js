import Pusher from "pusher-js";

import PusherServer from "pusher";

//crear la instancia del servidor de pusher con las claves dadas
export const ServidorPusher = new PusherServer({
    appId: process.env.NEXT_PUBLIC_APP_ID,
    key: process.env.NEXT_PUBLIC_KEY,
    secret: process.env.PUSHER_SECRET_KEY,
    cluster: process.env.NEXT_PUBLIC_CLUSTER
})


export const clientPusher = new Pusher(
    process.env.NEXT_PUBLIC_KEY,
    {
        cluster: process.env.NEXT_PUBLIC_CLUSTER
})