import Image from "next/image";
import { useState } from "react";
import UserTypeSelector from "./UserTypeSelector";
import { removeDocumentAccess, updateDocumentAccess } from "@/lib/actions/room.actions";
import { Button } from "./ui/button";
const Collaborator = ({
  roomId,
  creatorId,
  email,
  collaborator,
  user,
}: CollaboratorProps) => {

  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<UserType>(collaborator.userType || "viewer");

  const shareDocumentHandler = async (type: UserType) => {
    setLoading(true);
    console.log(userType,type);
    await updateDocumentAccess({
      roomId,
      email,
      userType: type,
      updatedBy: user,
    })
    setLoading(false);
  }

  const removeAccessHandler = async (email:string) => {
    setLoading(true);
    await removeDocumentAccess({roomId,email});
    setLoading(false);
  } 


  return (
    <li className="flex items-center justify-between gap-2 py-3">
      <div className="flex gap-2">
        <Image
          src={collaborator.avatar}
          alt={collaborator.name}
          width={36}
          height={36}
          className="rounded-full size-9"
        />
        <div>
          <p className="line-clamp-1 text-sm font-semibold leading-4 text-white">
            {collaborator.name}
            <span className="text-10-regular pl-2 text-blue-100">
              {loading && "saving..."}
            </span>
          </p>
          <p className="text-sm font-light text-blue-100">
            {collaborator.email}
          </p>
        </div>
      </div>
      {creatorId === collaborator.id ? (
        <p className="text-sm text-blue-100">owner</p>
      ) : (
        <div className="flex items-center">
          <UserTypeSelector
            userType={userType}
            setUserType={setUserType}
            onClickHandler={shareDocumentHandler}
          />

          <Button type="button" onClick={() => removeAccessHandler(collaborator.email)}>
            remove
          </Button>
        </div>
      )}
    </li>
  );
};

export default Collaborator;
