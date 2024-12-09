"use server"
import {nanoid} from 'nanoid';
import { getAccessType, parseStringify } from '../utils';
import { liveblocks } from '../liveblocks';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// import { redirect } from 'next/navigation';

export const createDocument = async ({userId,email}:CreateDocumentParams) => {
  const roomId= nanoid();

  try{
    const metadata: RoomMetadata = {
      creatorId: userId,
      email,
      title: "Untitled Document",
    }
    const usersAccesses: RoomAccesses = {
      [email]: ['room:write'],
    }
    const room = await liveblocks.createRoom(roomId,{
      metadata,
      usersAccesses,
      defaultAccesses: [],
    })

    revalidatePath('/');

    return parseStringify(room);
  }catch (error){
    console.log(`The following error occured during creating the document: ${error}`);
  }
}

export const getDocument = async ({roomId,userId}:{roomId:string;userId:string;})=>{
  
  try {
    const document= await liveblocks.getRoom(roomId)

    const hasAccess= Object.keys(document.usersAccesses).includes(userId)
    if(!hasAccess)throw new Error("You do not have access to this document");

    return parseStringify(document);
  } catch (error) {
    console.log("can't access document due to", error);
  }
}

export const updateDocument = async ({roomId,title}:{roomId:string;title:string;}) =>{

  try {
    const updatedDocument = await liveblocks.updateRoom(roomId,{
      metadata: {
        title
      }
    })

    return parseStringify(updatedDocument);
    revalidatePath(`/documents/${roomId}`);
  } catch (error) {
    console.log("can't access document due to", error);
  }
}

export const getDocuments = async (userId:string)=>{
  
  try {
    const documents= await liveblocks.getRooms({userId})
    return parseStringify(documents);
  } catch (error) {
    console.log("can't access documents due to", error);
  }
}

export const getRoom = async ({roomId}:{roomId:string})=>{
  
  try {
    const document= await liveblocks.getRoom(roomId)

    return parseStringify(document);
  } catch (error) {
    console.log("can't access document due to", error);
  }
}


export const updateDocumentAccess = async ({roomId,email,userType,updatedBy}:ShareDocumentParams) => {
  try {
    const room = await liveblocks.updateRoom(roomId,{
      usersAccesses: {
        [email]: getAccessType(userType) as AccessType,
      }
    })

    // send notification
    if(room){
      const notificationId = nanoid();

      await liveblocks.triggerInboxNotification({
        userId: email,
        kind: "$documentAccess",
        subjectId: notificationId,
        activityData: {
          title: `You have been granted access as ${userType} by ${updatedBy.name}`,
          avatar: updatedBy.avatar,
          updateBy: updatedBy.name,
          email: updatedBy.email,
          roomId,
        },
        roomId: roomId,
      })
    }
    revalidatePath(`/documents/${roomId}`);
    return parseStringify(room);
    
  } catch (error) {
    console.log("can't access document due to", error);
  }
}

export const removeDocumentAccess = async ({roomId,email}:{roomId:string;email:string}) => {
  try {
    const room = await liveblocks.updateRoom(roomId,{
      usersAccesses: {
        [email]: null
      }
    })
  
    revalidatePath(`/documents/${roomId}`);
    return parseStringify(room);
    
  } catch (error) {
    console.log("can't access document due to", error);
  }
}


export const deleteDocument = async (roomId:string) => {

  try {
    await liveblocks.deleteRoom(roomId);
    revalidatePath('/');
    redirect('/');
  } catch (error) {
    console.log("can't access document due to", error);
  }
}