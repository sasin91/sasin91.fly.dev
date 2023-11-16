import AppFooter from '@/Components/AppFooter';
import AppHeader from '@/Components/AppHeader';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <>
            <AppHeader />
            <main className="antialiased to-magenta-100/20 isolate bg-gradient-to-br from-white via-cyan-100/5">
                {children}
            </main>
            <AppFooter />
        </>
    );
}
