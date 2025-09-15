import { Link } from '@tanstack/solid-router';

export function Nav() {
    return <nav>
        <Link to="/">Index</Link>
        <Link to="/about">About</Link>
    </nav>
}