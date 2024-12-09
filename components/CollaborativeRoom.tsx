"use client"
import { ClientSideSuspense, RoomProvider, useThreads } from '@liveblocks/react/suspense'
import Header from './header'
import { SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import { Editor } from "@/components/editor/Editor";
import Loader from './Loader';
import ActiveCollaborators from './ActiveCollaborators';
import { useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';
import Image from 'next/image';
import { updateDocument } from '@/lib/actions/room.actions';
import ShareModal from './ShareModal';

// import { currentUser } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';


const CollaborativeRoom = ({roomId,roomMetadata,users,currentUserType}:CollaborativeRoomProps) => {
  const [documentTitle,setDocumentTitle]=useState(roomMetadata.title)
  const [editing,setEditing] = useState(false);
  const [loading,setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitle = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      setLoading(true);

      try {
        const updatedDocument = await updateDocument({roomId,title:documentTitle});

        if(updatedDocument) setEditing(false);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);

    }
  }

  useEffect(() => {
    const mouseDownHandler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)){
        setEditing(false);
        updateDocument({roomId,title:documentTitle})
      }
    }
    document.addEventListener('mousedown',mouseDownHandler);
    return () => {
      document.removeEventListener('mousedown',mouseDownHandler);
    }
  }, [roomId,documentTitle])
  

  useEffect(() => {
    if(editing && inputRef.current){
      inputRef.current.focus();
    } 
  }, [editing])

  // for comments
  

    
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          {/* sticky left-0 top-0 z-50 */}
          <Header>
            <div
              ref={containerRef}
              className="flex w-fit items-center justify-center gap-2"
            >
              {editing && !loading ? (
                <Input
                  type="text"
                  ref={inputRef}
                  value={documentTitle}
                  placeholder="Enter document title"
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onKeyDown={updateTitle}
                  className="document-title-input"
                />
              ) : (
                <p className="document-title">{documentTitle}</p>
              )}

              {currentUserType === "editor" && !editing && (
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={24}
                  height={24}
                  className="pointer"
                  onClick={() => setEditing(true)}
                />
              )}

              {currentUserType !== "editor" && (
                <p className="view-only-tag">View only</p>
              )}
              {loading && <p className="text-xs">saving...</p>}
            </div>
            <div className="flex gap-2 sm:gap-3 items-center justify-end">
              <ActiveCollaborators />
              <ShareModal
                roomId={roomId}
                collaborators={users}
                creatorId={roomMetadata.creatorId}
                currentUserType={currentUserType}
              />
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
        </div>
        <Editor roomId={roomId} currentUserType={currentUserType} />
      </ClientSideSuspense>
    </RoomProvider>
  );
}

export default CollaborativeRoom