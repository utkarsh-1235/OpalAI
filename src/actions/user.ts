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

       if(!newUser){
        return {status: 201, user: newUser}
       }
    return {status: 400}
    }catch(error){
      return { status: 500, error: error }
    }
}