import { Bell, CreditCard, Home, Library, Settings } from "lucide-react";

export const MENU_ITEMS = (workspaceId: string):{
    title: string; href: string; icon: React.ReactNode
}[] => [
    {title: 'Home', href: `/dasboard/${workspaceId}/home`, icon: <Home/>},

       {title: 'My Library', href: `/dasboard/${workspaceId}/library`, icon: <Library/>},
          {title: 'Notifications', href: `/dasboard/${workspaceId}/notifications`, icon: <Bell/>},
             {title: 'Billing', href: `/dasboard/${workspaceId}/billing`, icon: <CreditCard/>},
                {title: 'Settings', href: `/dasboard/${workspaceId}/settings`, icon: <Settings/>},
                
]