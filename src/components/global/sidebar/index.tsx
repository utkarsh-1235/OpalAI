"use client";

import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

type Props = {
    activeWorkspaceId: string
}
const Sidebar = ({activeWorkspaceId}: Props) => {
    const router = useRouter();
    const onChangeActiveWorkSpace = (value: string) => {
        router.push(`/dashboard/${value}`)
    }
return (
<div className="bg-white flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
    <div className="bg-[#111111] p-4 gap-2 justify-center items-center mb-4 absolute top-0 right-0">
        <div className=" flex text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
           VisionAI
        </div>
    </div>
    <Select 
    defaultValue={activeWorkspaceId}
    onValueChange={onChangeActiveWorkSpace}
    >
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
            <SelectValue placeholder="Select a workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
            <SelectGroup>
                <SelectLabel> Workspaces</SelectLabel>
                <Separator/>
            </SelectGroup>
        </SelectContent>
    </Select>
</div>
)
}

export default Sidebar;