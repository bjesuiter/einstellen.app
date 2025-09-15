import {
    ClerkLoaded,
    ClerkLoading,
    SignedIn,
    SignedOut,
    SignInButton,
    SignOutButton,
} from "clerk-solidjs";
import { JSX } from "solid-js";
import SineWave from "./SineWave";

export function ClerkLoginWrapper(
    { children }: { children: JSX.Element | JSX.Element[] | string },
) {
    const LoginLayout = ({ title }: { title: string }) => {
        return (
            <div class="flex flex-col justify-center items-center h-[100dvh] bg-surface-secondary-light dark:bg-surface-secondary-dark">
                <div class="shadow-lg rounded-lg border-solid border-neutral-300 dark:border-neutral-700 border-2 bg-surface-main-light dark:bg-surface-main-dark text-foreground-light dark:text-foreground-dark flex flex-col gap-4 pb-6">
                    <SineWave className="mt-2" />
                    <h1 class="text-2xl font-bold text-center">{title}</h1>
                    <SignInButton class='border-solid border-gray-500 border-2 rounded-lg p-2 self-center' />
                </div>
            </div>
        );
    };

    return (
        <div>
            <ClerkLoading>
                <LoginLayout title="Loading Clerk..." />
            </ClerkLoading>
            <ClerkLoaded>
                <SignedIn>
                    <SignOutButton />
                    {children}
                </SignedIn>
                <SignedOut>
                    <LoginLayout title="Login to einstellen.app" />
                </SignedOut>
            </ClerkLoaded>
        </div>
    );
}
