"use server";

import { getRequestEvent } from "solid-js/web";
import { Cookie } from "tough-cookie";
import { getCookie } from "~/lib/cookie-utils";
import { serverLogger } from "~/lib/serverLogger";

/**
 * @returns Returns all necessary info for the websocket connection via trpc:
 * - peerId (from cookie, or newly generated)
 * - the protocol (ws or wss, depending on the request http or https)
 */
export async function getWsInfo() {
    const event = getRequestEvent();

    if (!event) {
        throw new Error("DEV ERROR: No request event found in solidstart!");
    }

    let peerIdCookie = getCookie(
        event.request.headers.get("cookie"),
        "peerId",
    );

    if (!peerIdCookie) {
        // generate a new one
        const peerId = crypto.randomUUID();
        serverLogger.debug(`New peerId created: ${peerId}`);
        // Note: If you have a tough-cookie object, you can use the cookie.cookieString() method
        // to get the cookie string for the Set-Cookie header
        // EXAMPLE:
        peerIdCookie = new Cookie({
            key: "peerId",
            value: peerId,
            maxAge: 86400, // 1 day, in seconds
            httpOnly: true,
            secure: true, //in Produktion muss true stehen für HTTPS
            sameSite: "lax",
            path: "/", // gültig für alle Routen
        });
        event.response.headers.set(
            "Set-Cookie",
            peerIdCookie.cookieString(),
        );
    }

    return {
        peerId: peerIdCookie.value,
        wsServerProtocol: new URL(event.request.url).protocol === "https:"
            ? "wss"
            : "ws",
        wsServerHost: new URL(event.request.url).host,
    };
}
