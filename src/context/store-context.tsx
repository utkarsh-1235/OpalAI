"use client";

import { createContext, useContext } from "react";
import { Store } from "@/generated/prisma";

export const storeContext = createContext<Store | null>(null);

export const useStore = () => {
    const context = useContext(storeContext);
    if(!context)throw new Error("useStore must be used inside StoreProvider");
    
    return context;
    
}

