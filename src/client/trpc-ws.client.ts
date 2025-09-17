import {
    createTRPCClient,
    createWSClient,
    TRPCClientError,
    wsLink,
} from "@trpc/client";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createEffect, createResource, createSignal } from "solid-js";
import type { TrpcWsRouter } from "~/routes/-trpc/trpc-ws.router";
import { clientLogger } from "./clientLogger";
import { getWsInfo } from "~/server/wsInfo";

// export inferred router types
// ------------------------
export type WsRouterInput = inferRouterInputs<TrpcWsRouter>;
export type WsRouterOutput = inferRouterOutputs<TrpcWsRouter>;

// Helper functions
// ------------------------
export function isWsTRPCClientError(
    cause: unknown,
): cause is TRPCClientError<TrpcWsRouter> {
    return cause instanceof TRPCClientError;
}

// Public Signals - used throughout the app
// -----------------------------------------
export const [wsConnected, setWsConnected] = createSignal<boolean | undefined>(
    undefined,
);

/**
 * tabId is used to identify this one browser tab on the server
 *
 * It MUST be regenerated on every page load, otherwise I will get tabs with stale state!
 * The problem with "this room is controlled by another tab" has to be solved differently.
 */
export const [tabId] = createResource(async () => {
    if (crypto.randomUUID) {
        return crypto.randomUUID();
    } else {
        // crypto.randomUUID is not available in Capacitor => using uuid package
        const { v4: uuidV4 } = await import("uuid");
        return uuidV4();
    }
});

export const [peerId] = createResource(async () => {
    const { peerId } = await getWsInfo();
    clientLogger.debug("Got peerId from Server: ", peerId);
    return peerId;
});

createEffect(() => {
    const anyWindow = window as any;
    anyWindow.einstellenApp = {
        peerId: peerId(),
        tabId: tabId(),
    };
});

/**
 * These two are internal signals used to handle the reconnect in this file
 */
const [wsReconnecting, setWsReconnecting] = createSignal(false);
const [wsReconnectCount, setWsReconnectCount] = createSignal(0);

// create persistent WebSocket connection
const internalWsClient = createWSClient({
    url: async () => {
        // bjesuiter: DO NOT use the peerId() signal here, otherwise it might not be available when the websocket is about to initialize!
        // Use this direct trpc call instead!
        const wsInfo = await getWsInfo();
        return `${wsInfo.wsServerProtocol}://${wsInfo.wsServerHost}/ws?peerId=${wsInfo.peerId}&tabId=${tabId()}`;
    },
    onClose: () => {
        if (wsConnected()) {
            // if this close event is triggered, the server is not reachable anymore after initial connection
            setWsReconnecting(true);
            clientLogger.debug("Server connection lost, reconnecting...");
        }
        setWsConnected(false);
    },
    onOpen: () => {
        if (wsReconnecting()) {
            // if this open event is triggered, the server is reachable again after initial connection
            // Hotfix for now: completely reload the client!
            const hotfix = true;

            if (hotfix) {
                window.location.reload();
            } else {
                // TODO: enable granular reconnecting!
                setWsReconnecting(false);
                setWsReconnectCount(wsReconnectCount() + 1);
                clientLogger.debug(
                    "Server connection restored, reconnect count: ",
                    wsReconnectCount(),
                );
            }
        } else {
            clientLogger.debug("Initial server connection established");
        }
        setWsConnected(true);
    },
    retryDelayMs(attemptIndex) {
        // Attempt 0: 1000ms (1 second)
        // Attempt 1: 2000ms (2 seconds)
        // Attempt 2: 4000ms (4 seconds)
        // Attempt 3: 8000ms (8 seconds)
        // Attempt 4+: 10000ms (10 seconds, capped)
        return Math.min(1000 * 2 ** attemptIndex, 10000);
    },
});

export const trpcWSClient = createTRPCClient<TrpcWsRouter>({
    links: [
        wsLink({
            client: internalWsClient,
        }),
    ],
});
