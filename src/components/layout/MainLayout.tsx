import { UserButton } from "clerk-solidjs";
import { JSX } from "solid-js/jsx-runtime";
import { Nav } from "../Nav";

/**
 * @returns The main layout component for the app - after login
 */
export function MainLayout(
    { children, clerkButtonClasses }: {
        children: JSX.Element | JSX.Element[] | string;
        clerkButtonClasses: string;
    },
) {
    return (
        <div class="flex flex-col h-full ">
            <Nav slotRight={<UserButton appearance={
                {
                    elements: {
                        userButtonAvatarBox: "size-11 shadow-md",
                    }
                }
            } />} />
            {children}
        </div>
    );
}
