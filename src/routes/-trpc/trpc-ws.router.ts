import { mergeRouters, publicProcedure, routerFn } from "./trpc-ws.base";

const mainWsRouter = routerFn({
    wsping: publicProcedure.query(() => "wspong"),
});

// Export the full trpc router object
export const trpcWsRouter = mergeRouters(mainWsRouter);

// Export router type signature,
// NOT the router itself.
export type TrpcWsRouter = typeof trpcWsRouter;
