import { Cookie } from "tough-cookie";

export function getCookies(cookieHeader: string | undefined) {
	if (!cookieHeader) return undefined;
	return cookieHeader.split(";").map((cookieString) =>
		Cookie.parse(cookieString)
	);
}

/**
 * Get one cookie from the cookie header
 * @param cookieHeader should be req.headers.cookie per default (string | undefined)
 * @param name
 * @returns
 */
export function getCookie(cookieHeader: string | undefined, name: string) {
	return getCookies(cookieHeader)?.find((cookie) => cookie?.key === name);
}

// Note: If you have a tough-cookie object, you can use the cookie.cookieString() method
// to get the cookie string for the Set-Cookie header
// EXAMPLE:
// const cookie = new Cookie({
//     key: "session_token",
//     value: session.token,
//     maxAge: 86400, // 1 day, in seconds
//     httpOnly: true,
//     secure: false, //in Produktion muss true stehen für HTTPS
//     sameSite: "lax",
//     path: "/", // gültig für alle Routen
//   });
//   res.status(200).header({ "Set-Cookie": cookie.toString() }).json({
//     message: "Login successful",
//   });
