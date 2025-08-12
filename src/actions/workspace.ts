"use server"

import client from "@/lib/prismadb"
import { currentUser } from "@clerk/nextjs/server"

export const verifyAccessToWOrkspace = async(workspaceId: string) => {
  try{
    const user = await currentUser();
    if(!user) return {status: 403}

    const isUserInWorkSpace = await client.workspace.findUnique({
        where: {
            id: workspaceId,
            OR: [
                {
                    user: {
                        clerkId: user.id
                    }
                },
                {
                    members: {
                        every: {
                            user: {
                                clerkId: user.id
                            }
                        }
                    }
                }
            ]
        }
    })

    return {status: 200, data: {workspace: isUserInWorkSpace}}
  }catch(error){
     return {
        status: 403,
        data: {workspace: null},
        error: error
     }
  }
}

export const getWorkspaceFolders = async(workspaceId: string) => {
    try{
  const isFolders = await client.folder.findMany({
        where: {
            workspaceId
        },
        include: {
            _count: {
                select: {
                    videos: true
                },
            },
        },
  })
  if (isFolders && isFolders.length > 0) {
    return {status: 200, data: isFolders}
  }
  return {status: 404, data: []}
    }catch(error){
      return {status: 403, data: [], error: error}
    }
}

export const getAllUserVideos = async(workspaceId: string) => {
    try{
        const videos = await client.videos.findMany({
            where: {
                OR: [
                    { workspaceId },
                    {folderId: workspaceId}
                ]
            },
            select: {
                id: true,
                title: true,
                createdAt: true,
                source: true,
                processing: true,
                Folder: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                user: {
                    select: {
                        firstname: true,
                        lastname: true,
                        image: true
                    }
                }
            }
        })

        if(videos && videos.length > 0){
            return {status: 200, data: videos}
        }
        return {status: 404, data: []}
    }catch(error){
        return {status: 403, data: [], error: error}
    }
}

export const getWorkSpaces = async() => {
    try{
        const user = await currentUser();
        if(!user) return {status: 404}

        const workspaces = await client.user.findUnique({
            where: {
                clerkId: user.id,
            },
            select: {
                subscriptions: {
                    select: {
                        plan: true,
                    }
                },
                workspaces: {
                    select: {
                        id: true,
                        name: true,
                        type: true
                    }
                },
                members: {
                    select: {
                        workspace: {
                            select: {
                                id: true,
                                name: true,
                                type: true
                            }
                        }
                    }
                }
            }
        })

        if(workspaces){
            return {status: 200, data: workspaces}
        }
        return {status: 404, data: []}
    }catch(error){
        return {status: 403, data: [], error: error}
    }
}

export const getUserNotifications = async() => {
    try{
     const user = await currentUser();
        if(!user) return {status: 404}

        const notifications = await client.user.findMany({
            where: {
                clerkId: user.id
            },
            select: {
                notifications: true,
                _count: {
                    select: {
                        notifications: true
                    }
                }
            }
        })

        if(notifications && notifications.length > 0){
            return {status: 200, data: notifications[0].notifications}
        }
        return {status: 404, data: []}
    }catch(error){
        return {status: 403, data: [], error: error}
    }
}

export const searchWorkspace = async(query: string) => {
  try{
   const user = await currentUser();
   if(!user) return {status: 401}

   const workspace = await client.user.findMany({
    where: {
        OR: [
            {firstname: {contains: query}},
            {email: {contains: query}},
            {lastname: {contains: query}},

        ],
        NOT: [{clerkId: user.id}]
    },
    select: {
        id: true,

        subscriptions: {
            select: {
                plan: true
            }
        },
        firstname: true,
        lastname: true,
        image: true,
        email: true
    }
   })

   if(workspace && workspace.length > 0){
    return {status: 200, data: workspace}
   }
   return {status: 404, data: undefined}
  }catch(error){
   return {status: 500, data: error}
  }
}