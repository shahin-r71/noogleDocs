

import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";
// import { liveblocks } from "@/lib/liveblocks";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function Page({params:{id}}:SearchParamProps) {

  const clerkUser= await currentUser()
  if(!clerkUser)redirect("/sign-in");

  const document = await getDocument({
    roomId:id,
    userId: clerkUser.emailAddresses[0].emailAddress
  }

  )
  // console.log(document)
  const currentUserType = document.usersAccesses[clerkUser.emailAddresses[0].emailAddress].includes("room:write")?"editor":"viewer";
  const userIds=Object.keys(document.usersAccesses);
  
  const users=await getClerkUsers({userIds});
  const usersData:User[]=users!.map((user:User)=>({
    ...user,
    userType:document.usersAccesses[user.email].includes("room:write")?"editor":"viewer",
  }))

  // console.log(usersData)
  return (
    <div className="home-container relative">
      <CollaborativeRoom 
        roomId={id}
        roomMetadata={document.metadata}
        users={usersData}
        currentUserType={currentUserType}
       />
    </div>
  );
}