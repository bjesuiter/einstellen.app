import { SignInButton } from 'clerk-solidjs';
import SineWave from '../SineWave';

export  const LoginLayout = ({ title, clerkButtonClasses }: { title?: string, clerkButtonClasses: string }) => {

    const titleElement = title && (
        <h1 class="text-2xl font-bold text-center">{title}</h1>
    );
  
    return (
        <div class="flex flex-col justify-center-safe items-center-safe h-full">
            <div class="shadow-xl shadow-primary-dark/20 rounded-4xl border-solid border-primary/40 dark:border-primary-dark/40 border-2 bg-surface-main-light dark:bg-surface-main-dark text-foreground-light dark:text-foreground-dark flex flex-col gap-4 pb-6 transition-all duration-200">
                <SineWave className="mt-2 rounded-4xl" />
                {titleElement}
                <SignInButton class={clerkButtonClasses} />
            </div>
        </div>
    );
};