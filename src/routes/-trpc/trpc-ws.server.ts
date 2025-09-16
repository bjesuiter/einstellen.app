// import {peersStore} from '@server/lib/mediasoup/peers.store';
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { WebSocketServer } from "ws";
import { serverLogger } from "~/lib/serverLogger";
import { createTrpcWsContext } from "./trpc-ws.base";
import { trpcWsRouter } from "./trpc-ws.router";

const trpcWsServer = new WebSocketServer({ noServer: true });

const trpcWsHandler = applyWSSHandler({
    wss: trpcWsServer,
    router: trpcWsRouter,
    createContext: createTrpcWsContext,
    // Enable heartbeat messages to keep ws connection open
    keepAlive: {
        enabled: true,
        // server ping message interval in milliseconds
        pingMs: 30000,
        // connection is terminated if pong message is not received in this many milliseconds
        pongWaitMs: 5000,
    },
});

trpcWsServer.on("connection", (ws) => {
    serverLogger.info(`➕➕ WS TRPC Connection (${trpcWsServer.clients.size})`);

    // Add error handler for the WebSocket
    ws.on("error", (error) => {
        serverLogger.error("ws.error Handler: caught error:", error);
        // Attempt to close the connection gracefully
        try {
            ws.terminate();
        } catch (e) {
            serverLogger.error(
                "ws.error Handler: Error while terminating socket:",
                e,
            );
        }
    });

    ws.once("close", async (code, reason) => {
        try {
            serverLogger.info(
                `➖➖ WS TRPC Connection (${trpcWsServer.clients.size})`,
            );

            // cleanup peerTab from connectedPeersStore
            // const tabId = (ws as any).tabId;
            // peersStore.remove(tabId);

            // cleanup any consumer for this tabId to not have dangling consumers
            // consumersStore.removeByTabId(tabId);
        } catch (error) {
            serverLogger.error(`ws.close Handler: `, error);
        }
    });
});

function gracefullExit() {
    // notify all ws clients to reconnect, in case the server comes back online soon
    trpcWsHandler.broadcastReconnectNotification();
    trpcWsServer.close();

    // any cleanup code goes here
}

// detect SIGINT (Ctrl-C) and exit gracefully
process.on("SIGINT", () => {
    serverLogger.info(
        "SIGINT (CTRL+C) - gracefull shutdown and notifying ws clients to reconnect",
    );
    gracefullExit();
});

// detect SIGTERM (Operating system shutting down my process) and exit gracefully
process.on("SIGTERM", () => {
    serverLogger.info(
        "SIGTERM (from OS) - gracefull shutdown and notifying ws clients to reconnect",
    );
    gracefullExit();
});

// Add these near the top of your file
process.on("uncaughtException", (error) => {
    serverLogger.error("Uncaught Exception:", error);
    // Optionally initiate graceful shutdown here if needed
});

process.on("unhandledRejection", (reason, promise) => {
    serverLogger.error("Unhandled Rejection at:", promise, "reason:", reason);
    // Optionally initiate graceful shutdown here if needed
});

export { trpcWsServer };
