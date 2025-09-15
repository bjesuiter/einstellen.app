import { createClerkClient } from '@clerk/backend';
import { envStore } from './envStore';

// Available options:
// https://clerk.com/docs/references/backend/overview#create-clerk-client-options
export const clerk = createClerkClient({
    secretKey: envStore.CLERK_SECRET_KEY,
});
