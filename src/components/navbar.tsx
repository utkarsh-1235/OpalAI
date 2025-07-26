import { UserButton } from "@clerk/nextjs"
import { MainNav } from "@/components/main-nav"
import StoreSwitcher from "@/components/store-switcher";

export const Navbar = () => {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <div>
                    This will be a store switcher
                </div>
                <div>
                    This will be the routes
                </div>
                <MainNav className="mx-6"/>
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/"/>
                </div>
            </div>
            This is Navbar Component
        </div>
    )
}