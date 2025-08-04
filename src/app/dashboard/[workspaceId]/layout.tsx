import { onAuthenticateUser } from "@/actions/user";
import { getAllUserVideos, getUserNotifications, getWorkSpaces, getWorkspaceFolders, verifyAccessToWOrkspace } from "@/actions/workspace";
import { redirect } from "next/navigation";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Sidebar from "@/components/global/sidebar";


type Props = {
    params: { workspaceId: string };
}
const ComponentStuff = async (props: Props & { children: React.ReactNode }) => {
    const params = await props.params;
    const workspaceId = params.workspaceId;
    const { children } = props;

    const auth = await onAuthenticateUser();
    if(!auth.user?.workspaces) redirect("/auth/sign-in");
    if(!auth.user.workspaces.length) redirect("/auth/sign-in");

    const hasAccess = await verifyAccessToWOrkspace(workspaceId);

    if(hasAccess.status !== 200 ){
        redirect(`dashboard/${auth.user?.workspaces[0].id}`);
    }

    if(!hasAccess.data?.workspace) return null;

    const query = new QueryClient();
    await query.prefetchQuery({
        queryKey: ['workspace-folders'],
        queryFn: () => getWorkspaceFolders(workspaceId)
    })
    await query.prefetchQuery({
        queryKey: ['user-videos'],
        queryFn: () => getAllUserVideos(workspaceId)
    })
    await query.prefetchQuery({
        queryKey: ['user-workspaces'],
        queryFn: () => getWorkSpaces()
    })
    await query.prefetchQuery({
        queryKey: ['user-notifications'],
        queryFn: () => getUserNotifications()
    })
    return (
         <HydrationBoundary state={dehydrate(query)}>
    <div className="flex h-screen">
      <Sidebar activeWorkspaceId={workspaceId} />
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  </HydrationBoundary>
    )
}

export default ComponentStuff;