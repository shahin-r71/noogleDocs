"use server"

import { clerkClient, currentUser } from "@clerk/nextjs/server"
import { getUserColor, parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";


export const getClerkUsers = async ({userIds}:{userIds: string[]}) => {
  try {
    const {data} = await clerkClient().users.getUserList({emailAddress: userIds});
    const users=data.map(user=>{
      return{
        id:user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.emailAddresses[0].emailAddress,
        avatar: user.imageUrl,
        color: getUserColor(user.id),
      }
    })
    // return users;
    //TODO: sort users according to userIds and return sorted users
    const sortedUsers = userIds.map((userId) => users.find((user) => user.email === userId))
    return sortedUsers
  } catch (error) {
    console.log(error)
  }
  
}

export const getDocumentUsers = async ({roomId,text,currentUser}:{roomId:string, text:string, currentUser:string}) => {
  try {
    const room = await liveblocks.getRoom(roomId);
    const users = Object.keys(room.usersAccesses).filter((user=>user!==currentUser));

    if(text.length){
      const lowercaseText = text.toLowerCase();
      const filteredUsers = users.filter((user)=>user.toLowerCase().includes(lowercaseText));
      return parseStringify(filteredUsers);
    }
    console.log('users', users);
    return parseStringify(users);
  } catch (error) {
    console.log('error occured')
  }
}