import { createMiddleware } from "@solidjs/start/middleware";
import { clerkMiddleware } from 'clerk-solidjs/server';
import { envStore } from './lib/envStore';

export default createMiddleware({
  onRequest: [
    clerkMiddleware({
      publishableKey: envStore.VITE_CLERK_PUBLISHABLE_KEY,
      secretKey: envStore.CLERK_SECRET_KEY,
    })
    // async (event) => {
    //   console.log("Request received:", event.request.url);
    //   event.locals.startTime = Date.now();
  
    // }
  ],
  // onBeforeResponse: (event) => {
  //   const endTime = Date.now();
  //   const duration = endTime - event.locals.startTime;
  //   console.log(`Request took ${duration}ms`);
  // },
});