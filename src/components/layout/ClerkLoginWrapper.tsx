import {
    ClerkLoaded,
    ClerkLoading,
    SignedIn,
    SignedOut
} from "clerk-solidjs";
import { JSX } from "solid-js";
import { LoginLayout } from './LoginLayout';
import { MainLayout } from './MainLayout';

export function ClerkLoginWrapper(
    { children }: { children: JSX.Element | JSX.Element[] | string },
) {

    const clerkButtonClasses = `border-solid border-surface-secondary-dark dark:border-primary-dark/50 border-2 rounded-4xl px-8 py-4 self-center hover:cursor-pointer hover:ring-2 hover:dark:ring-primary hover:ring-primary hover:text-primary hover:border-transparent transition-all duration-200 font-bold`;

    return (
        // main "body" styles for login and main page go here
        <div class="bg-surface-secondary-light dark:bg-surface-secondary-dark h-[100dvh] w-[100dvw] text-foreground-light dark:text-foreground-dark overflow-y-auto">
            <ClerkLoading>
                <LoginLayout title="Loading Clerk..." clerkButtonClasses={clerkButtonClasses}/>
            </ClerkLoading>
            <ClerkLoaded>
                <SignedIn>
                    <MainLayout clerkButtonClasses={clerkButtonClasses}>
                        {children}
                    </MainLayout>
                </SignedIn>
                <SignedOut>
                    <LoginLayout title="Login to einstellen.app" clerkButtonClasses={clerkButtonClasses} />
                </SignedOut>
            </ClerkLoaded>
        </div>
    );
}
