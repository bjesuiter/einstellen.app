import { Link } from '@tanstack/solid-router';
import { JSX } from 'solid-js/jsx-runtime';

export function Nav(props: { slotRight?: JSX.Element }) {

    const activeProps = {
        class: 'font-bold'
    }

    return <nav class="flex items-center gap-4 p-2 bg-primary-dark/30">
        <Link to="/" class="hover:underline hover:underline-offset-4 hover:decoration-2" activeProps={activeProps}>Index</Link>
        <Link to="/about" class="hover:underline hover:underline-offset-4 hover:decoration-2" activeProps={activeProps}>About</Link>
        <div class='grow'></div>
        {props.slotRight}
    </nav>
}