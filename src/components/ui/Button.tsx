import { JSX } from "solid-js/jsx-runtime";
import { twMerge } from "tailwind-merge";

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    // Add your own props here if needed
};

/**
 * A simple button component with a default style.
 * @param props
 * @returns
 */
export function Button(props: ButtonProps) {
    return (
        <button
            {...props}
            class={twMerge(
                props.class,
                "border-solid border-surface-secondary-dark dark:border-primary-dark/50 border-2 rounded-4xl px-8 py-4 self-center hover:cursor-pointer hover:ring-2 hover:ring-primary hover:text-primary hover:border-transparent transition-all duration-200 font-bold",
            )}
        >
            {props.children}
        </button>
    );
}
