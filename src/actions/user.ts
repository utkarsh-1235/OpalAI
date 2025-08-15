"use server"

import client from "@/lib/prismadb";
import {currentUser} from "@clerk/nextjs/server";

export const onAuthenticateUser = async() => {
    try{
       const user = await currentUser();
       if(!user){
         return { status: 403}
       }
       const userExist = await client.user.findUnique({
          where: {
            clerkId: user.id,
          },
          include: {
            workspaces: {
               where: {
                user: {
                    clerkId: user.id
                }
               }
            }
          }
       })

       if(userExist){
        return { status: 200, user: userExist}
       }

       const newUser = await client.user.create({
        data: {
            clerkId: user.id,
            email: user.emailAddresses[0]?.emailAddress ,
            firstname: user.firstName,
            lastname: user.lastName,
            image: user.imageUrl,
            studio: {
                create: {
                    screen: "",
                    mic: "",
                    camera: "",
                }
            },
            subscriptions: {
                create: {}
            },
            workspaces: {
                create: {
                    name: `${user.firstName}'s Workspace`,
                    type: 'PERSONAL'
                    
                }
            }
        },
        include: {
            workspaces: {
                where: {
                    user: {
                        clerkId: user.id
                    }
                }
            },
            subscriptions: {
                select: {
                    plan: true
                }
            }
        }
       })

       if(newUser){
        return {status: 201, user: newUser}
       }
    return {status: 400}
    }catch(error){
      return { status: 500, error: error }
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

export const searchUsers = async(query: string) => {
  try{
   const user = await currentUser();
   if(!user) return {status: 401}

   const users = await client.user.findMany({
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

   if(users && users.length > 0){
    return {status: 200, data: users}
   }
   return {status: 404, data: undefined}
  }catch(error){
   return {status: 500, data: error}
  }
}