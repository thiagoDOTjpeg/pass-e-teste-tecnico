import { Link, usePage, router } from "@inertiajs/react";
import { LogOut } from "lucide-react";
import type {ReactNode} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Toaster} from "@/components/ui/sonner";

export default function AppLayout({ children }: { children: ReactNode }) {
    const { auth } = usePage().props as any;

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <Link href="/dashboard" className="text-primary">Pass-E Todo</Link>
                    </div>

                    <div className="flex items-center gap-4">
            <span className="hidden text-sm font-medium text-muted-foreground md:inline-block">
              {auth.user?.name}
            </span>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={`https://avatar.iran.liara.run/public/username?username=${auth.user?.name}`} alt={auth.user?.name} />
                                        <AvatarFallback>{auth.user?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{auth.user?.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{auth.user?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sair</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            <main className="container mx-auto py-6 px-4">
                {children}
                <Toaster />
            </main>
        </div>
    );
}