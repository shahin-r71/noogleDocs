import React, { useState } from 'react'


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import Image from "next/image";
import UserTypeSelector from './UserTypeSelector';
import { useSelf } from "@liveblocks/react/suspense";
import { updateDocumentAccess } from '@/lib/actions/room.actions';
import Collaborator from './Collaborator';

const ShareModal = ({roomId,collaborators,creatorId,currentUserType}:ShareDocumentDialogProps) => {
  const user = useSelf();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<UserType>("viewer");

  const shareDocumentHandler = async () => {
    setLoading(true);
    await updateDocumentAccess({
      roomId,
      email,
      userType,
      updatedBy: user.info,
    });
    setEmail("");
    setLoading(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="gradient-blue flex h-9 gap-1 px-4"
          disabled={currentUserType !== "editor"}
        >
          <Image
            src="/assets/icons/share.svg"
            alt="share"
            width={20}
            height={20}
            className="min-w-4 md:size-5"
          />
          <p className="mr-1 hidden sm:block">Share</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <DialogTitle>Manage who can view and edit this document</DialogTitle>
          <DialogDescription>
            Select which users can view and edit this document
          </DialogDescription>
        </DialogHeader>
        <Label htmlFor="email" className="mt-6 test-blue-100">
          Email address
        </Label>

        <div className="flex items-center gap-3">
          <div className="flex gap-2 ">
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="share-input"
            />
            <UserTypeSelector userType={userType} setUserType={setUserType} />
          </div>
          <Button
            type="submit"
            onClick={shareDocumentHandler}
            className="gradient-blue px-5"
          >
            {loading ? "Adding..." : "Invite"}
          </Button>
        </div>

        <div className="my-2 space-y-2">
          <ul className="flex flex-col">
            {collaborators.map((collaborator) => (
              <Collaborator
                key={collaborator.id}
                roomId={roomId}
                creatorId={creatorId}
                email={collaborator.email}
                collaborator={collaborator}
                user={user.info}
              />
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ShareModal