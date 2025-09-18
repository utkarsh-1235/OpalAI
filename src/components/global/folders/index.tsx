import { cn } from "@/lib/utils";
import {ArrowRight, FoldersIcon } from "lucide-react";

type Props = {
    workspaceId: string
}

const Folders = (props: Props) => {

    // Get Folders
    return(
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                <FoldersIcon/>
                <h2 className="text-[#BDBDBD] text-xl"> Folders</h2>
                </div>
                <div className="flex items-center gap-2">
                   <p className="text-[#BDBDBD]">See all</p>
                   <ArrowRight color="707070"/>
                </div>
            </div>
            <section className={cn('flex items-center gap-4 overflow-x-auto w-full')}>
               <FolderCard/>
            </section>
        </div>
 )
}

export default Folders;