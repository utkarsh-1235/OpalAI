"use client"

import { Workspace } from "@/generated/prisma"
import { usePathname } from "next/navigation"


type Props = {
    workspace : Workspace
}

const GlobalHeader = ({workspace}: Props) => {
    const pathname = usePathname().split(`/dashboard${workspace.id}`)[1];
    return (
        <article className="flex flex-col gap-2">
           <span className="text-[#707070] text-xs">
                  {workspace.type.toLocaleUpperCase()}
           </span>
           <h1 className="text-4xl">{pathname && !pathname.includes('folder') ? pathname.charAt(0).toUpperCase() + pathname.slice(1).toLowerCase() : 'My Library'}</h1>
        </article>
    )
}

export default GlobalHeader