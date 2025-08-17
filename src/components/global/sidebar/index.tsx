"use client";

import { getWorkSpaces } from "@/actions/workspace";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useQueryData } from "@/hooks/useQueryData";
import { NotificationProps, WorkspaceProps } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import Modal from "../modal";
import { Menu, PlusCircle } from "lucide-react";
import Search from "../search";
import { MENU_ITEMS } from "@/constants";
import SidebarItem from "./sidebar-item";
import { getUserNotifications } from "@/actions/user";
import WorkSpacePlaceholder from "./workspaceplaceholder";
import GlobalCard from "../global-card";
import { Button } from "@/components/ui/button";
import Loader from "../loader/index";
import { Sheet, SheetContent,SheetTrigger } from "@/components/ui/sheet";
import InfoBar from "../info-bar";

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();
  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkSpaces);
 console.log(isFetched);
  const menuItems = MENU_ITEMS(activeWorkspaceId);

  const { data: notifications } = useQueryData(
    ["user-notifications"],
    getUserNotifications
  );

  const { data: workspaceData } = data as WorkspaceProps;

  const { data: count } = notifications as NotificationProps;

  const onChangeActiveWorkSpace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  const currentWorkspace =
    workspaceData?.workspaces?.find((s) => s.id === activeWorkspaceId) ?? null;

  const pathname = usePathname();

  const SidebarSection =  (
    <div className="bg-[#111111] flex-none p-4 h-full w-[250px] flex flex-col">
      {/* Logo */}
      <div className="flex text-2xl justify-center font-bold bg-white bg-clip-text text-transparent mb-6">
        VisionAI
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
        {/* Workspace Select */}
        <Select
          defaultValue={activeWorkspaceId}
          onValueChange={onChangeActiveWorkSpace}
        >
          <SelectTrigger className="w-full text-neutral-400 bg-[#1a1a1a] border border-neutral-700 rounded-md">
            <SelectValue placeholder="Select a workspace" />
          </SelectTrigger>
          <SelectContent className="bg-[#111111] backdrop-blur-xl">
            <SelectGroup>
              <SelectLabel> Workspaces</SelectLabel>
              <Separator />
              {workspaceData?.workspaces.map((workspace) => (
                <SelectItem key={workspace.id} value={workspace.id}>
                  {workspace.name}
                </SelectItem>
              ))}
              {workspaceData?.members.length > 0 &&
                workspaceData?.members.map(
                  (member) =>
                    member.Workspace && (
                      <SelectItem
                        value={member.Workspace.id}
                        key={member.Workspace.id}
                      >
                        {member.Workspace.name}
                      </SelectItem>
                    )
                )}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Invite Modal */}
        {currentWorkspace?.type === "PUBLIC" &&
          workspaceData.subscriptions?.plan === "PRO" && (
            <Modal
              trigger={
                <span className="text-sm cursor-pointer flex items-center justify-center border-t-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
                  <PlusCircle
                    size={15}
                    className="text-neutral-800/90 fill-neutral-500 "
                  />
                  <span className="text-neutral-400 font-semibold text-xs">
                    Invite to Workspace
                  </span>
                </span>
              }
              title="Invite to workspace"
              description="Invite other users to your workspace"
            >
              <Search workspaceId={activeWorkspaceId} />
            </Modal>
          )}

        {/* Menu */}
        <p className="w-full text-[#9D9D9D] font-bold mt-2"> Menu</p>
        <nav>
          <ul>
            {menuItems.map((item) => (
              <SidebarItem
                key={item.title}
                href={item.href}
                icon={item.icon}
                selected={pathname === item.href}
                title={item.title}
                notifications={
                  (item.title === "Notifications" &&
                    count._count &&
                    count._count.notification) ||
                  0
                }
              />
              
            ))}
          </ul>
        </nav>

        <Separator className="w-4/5" />

        {/* Workspaces */}
        <p className="w-full text-[#9D9D9D] font-bold">Workspaces</p>
        <nav className="w-full">
          <ul className="max-h-[150px] overflow-auto overflow-x-hidden fade-layer">
            {workspaceData?.workspaces.length > 0 &&
              workspaceData?.workspaces.map(
                (item) =>
                  item.type !== "PERSONAL" && (
                    <SidebarItem
                      key={item.name}
                      href={`/dashboard/${item.id}`}
                      selected={pathname === `/dashboard/${item.id}`}
                      title={item.name}
                      notifications={0}
                      icon={
                        <WorkSpacePlaceholder>
                          {item.name.charAt(0)}
                        </WorkSpacePlaceholder>
                      }
                    />
                  )
              )}
            {workspaceData?.members.length > 0 &&
              workspaceData?.members.map((item) => (
                <SidebarItem
                  key={item.Workspace.name}
                  href={`/dashboard/${item.Workspace.id}`}
                  selected={pathname === `/dashboard/${item.Workspace.id}`}
                  title={item.Workspace.name}
                  notifications={0}
                  icon={
                    <WorkSpacePlaceholder>
                      {item.Workspace.name.charAt(0)}
                    </WorkSpacePlaceholder>
                  }
                />
              ))}
          </ul>
        </nav>
      </div>

      {/* Fixed Bottom Upgrade CTA */}
      {workspaceData.subscriptions?.plan === "FREE" && (
        <div className="mt-4">
          <GlobalCard
            title="Upgrade to Pro"
            description="Unlock AI features like transcription, AI summary, and more."
            footer={
              <Button className="text-sm w-full">
                <Loader state={false}>Upgrade</Loader>
              </Button>
            }
          />
        </div>
      )}
    </div>
  );

  return <div className="full">
     <InfoBar/>
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger
          asChild
          className="ml-2">
           <Button
           variant={'ghost'}
           className="mt-[2px]">
            <Menu/>
           </Button>
          </SheetTrigger>
          <SheetContent
          side={'left'}
          className="p-0 w-fit h-full">
            
              {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">
         {SidebarSection}
      </div>
  </div>
};

export default Sidebar;

