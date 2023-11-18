import AppFooter from "@/Components/AppFooter";
import AppHeader from "@/Components/AppHeader";
import type { PropsWithChildren } from "react";

export default function ProjectsLayout({ children }: PropsWithChildren) {
    return (
        <main className="font-sans antialiased bg-blend-multiply bg-gradient-to-b from-violet-100 via-pink-100 to-indigo-100">
            <AppHeader />
            {children}
            <AppFooter />
        </main>
    );
}
