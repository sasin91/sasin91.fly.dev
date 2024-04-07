import AppFooter from "@/Components/AppFooter";
import AppHeader from "@/Components/AppHeader";
import Status from "@/Components/ui/Status";
import { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <main className="font-sans antialiased to-magenta-100/20 isolate bg-gradient-to-br from-background via-cyan-100/5">
            <AppHeader />
            <Status />
            {children}
            <AppFooter />
        </main>
    );
}
