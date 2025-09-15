import { SignInButton } from 'clerk-solidjs';
import SineWave from './SineWave';

export function LoginCard() {
    return <div class='flex flex-col justify-center items-center h-[100dvh]'>
        <div class="shadow-lg rounded-lg p-4">
            <div>Login to einstellen.app</div>
            <SineWave />
            <SignInButton />
        </div>
    </div>
}