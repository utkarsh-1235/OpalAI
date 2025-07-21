import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import {redirect} from "next/navigation";

export default async function SetUpLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: {storeId: string}
}) {
    const {userId} = await auth();

    if(!userId){
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
         where: {
            id: params.storeId,
            userId
         }
    });

    if(store){
        redirect(`/${store.id}`);
    }
    return (
        <>
        {children}
        </>
    )
}