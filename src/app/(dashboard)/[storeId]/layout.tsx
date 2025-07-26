
import { Navbar } from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { storeContext } from "@/context/store-context";


export default async function DashboardLayout({ children, params }: {
    children: React.ReactNode; 
    params: { storeId: string }
}) {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const storeId = params.storeId;
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    });

    if (!store) {
        redirect('/');
    }

    return (
        <storeContext.Provider value={store}>
            <Navbar />
            {children}
        </storeContext.Provider>
    );
}

