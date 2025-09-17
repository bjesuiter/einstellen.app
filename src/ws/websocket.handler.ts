import { eventHandler } from "vinxi/http";
import { trpcWsServer } from "~/routes/-trpc/trpc-ws.server";
export default eventHandler({
    handler() {},
    websocket: {
        async open(peer) {
            console.log("open", peer.id, peer.websocket.url);
            trpcWsServer.emit("connection", peer.websocket);
        },
        async message(peer, msg) {
            console.log("msg", peer.id, peer.websocket.url, msg);
        },
        async close(peer, details) {
            console.log("close", peer.id, peer.websocket.url);
        },
        async error(peer, error) {
            console.log("error", peer.id, peer.websocket.url, error);
        },
    },
});

// TODO: Fill in the websocket handler
// - saving the peer in a peer list for the group the user currently is in
