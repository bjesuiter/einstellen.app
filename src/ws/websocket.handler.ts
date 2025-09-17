import { eventHandler } from "vinxi/http";
export default eventHandler({
    handler() {},
    websocket: {
        async open(peer) {},
        async message(peer, msg) {},
        async close(peer, details) {},
        async error(peer, error) {},
    },
});

// TODO: Fill in the websocket handler
// - saving the peer in a peer list for the group the user currently is in
