"use client";
import Loader from "@/components/Loader";
import { getClerkUsers, getDocumentUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";

import {
  ClientSideSuspense,
  LiveblocksProvider,
} from "@liveblocks/react/suspense";
import React from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user: clerkUser } = useUser();
  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth"}
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        return users;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        // Fetch all users from your back end
        const users = await getDocumentUsers({
          roomId,
          text,
          currentUser: clerkUser?.emailAddresses[0].emailAddress ?? "",
        });
        return users;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
