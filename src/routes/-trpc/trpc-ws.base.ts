import { initTRPC } from "@trpc/server";
import type { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";

/**
 * Factory for trpc context for websocket adapter - created per ws connection
 * req - the initial http upgrade request for the websocket
 */
export function createTrpcWsContext(
    { req, res: ws }: CreateWSSContextFnOptions,
) {
    // retrieve session info from the request
    if (!req.url) {
        throw new Error("No url found in request");
    }
    // Note: the base url is not relevant here, I only want to extract the search params
    const url = new URL(req.url, "http://localhost");
    const peerId = url.searchParams.get("peerId");
    if (!peerId) {
        throw new Error(
            "DEV ERROR: Cannot create trpc_ws context: peerId not found",
        );
    }
    const tabId = url.searchParams.get("tabId");
    if (!tabId) {
        throw new Error(
            "DEV ERROR: Cannot create trpc_ws context: tabId not found",
        );
    }

    // init new client with empty transports
    // if (peerId && tabId && !peersStore.has(tabId)) {
    //     peersStore.initPeer(peerId, tabId, true);
    //     serverLogger.debug(
    //         `New connectedPeer initialized for peerId: ${peerId} && tabId: ${tabId}`,
    //     );
    // }

    // if (peersStore.has(tabId)) {
    //     peersStore.setWsConnected(tabId, true);
    // }

    // store the peerId and tabId on the websocket connection object
    // to be able to access them on websocket close event
    (ws as any).peerId = peerId;
    (ws as any).tabId = tabId;

    return {
        peerId,
        tabId,
        // getCookie: (name: string) => getCookie(req.headers.cookie, name),
        // setCookie not supported in ws context
    };
}

export type TRPC_WS_Context = Awaited<ReturnType<typeof createTrpcWsContext>>;

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const trpc_ws = initTRPC.context<TRPC_WS_Context>().create();

export const routerFn = trpc_ws.router;
export const publicProcedure = trpc_ws.procedure;
export const mergeRouters = trpc_ws.mergeRouters;
