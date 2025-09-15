import { twMerge } from 'tailwind-merge';

/**
 * A simple button component with a default style.
 * @param props 
 * @returns 
 */
export function Button(props: { children: string, class?:string }) {
    const classes = twMerge(
        props.class,
        'border-solid border-surface-secondary-dark dark:border-primary-dark/50 border-2 rounded-4xl px-8 py-4 self-center hover:cursor-pointer hover:ring-2 hover:dark:ring-primary hover:ring-primary hover:text-primary hover:border-transparent transition-all duration-200 font-bold'
    );
    return <button class={classes}>{props.children}</button>;
}