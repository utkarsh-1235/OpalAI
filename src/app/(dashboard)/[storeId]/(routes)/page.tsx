import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
    params: {storeId: string}
}
export default async function DashboardPage({
    params
}:DashboardPageProps){
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
})
    return(
        <div>
            Active Store: {store?.name}
        </div>
    )
}


// ✅ This is critical — avoids params sync error
export async function generateStaticParams() {
    const stores = await prismadb.store.findMany();
    return stores.map((store) => ({
        storeId: store.id
    }));
}


