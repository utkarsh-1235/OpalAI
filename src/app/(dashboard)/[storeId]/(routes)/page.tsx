// import prismadb from "@/lib/prismadb";
"use client";
import { useStore } from "@/context/store-context"

export default function DashboardPage(){

const store = useStore();
    return(
        <div>
            Active Store: {store?.name}
        </div>
    )
}



