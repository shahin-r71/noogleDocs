"use client"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InboxNotification, InboxNotificationList, LiveblocksUIConfig } from "@liveblocks/react-ui";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import Image from "next/image";
import { ReactNode } from "react";


const Notifications = () => {
  const { inboxNotifications } = useInboxNotifications(); 
  const unreadNotifications = inboxNotifications.filter((notification) => !notification.readAt)
  // console.log(inboxNotifications);
  return (
    <Popover>
      <PopoverTrigger className="relative">
        <Image
          src="/assets/icons/bell.svg"
          alt="notifications"
          width={26}
          height={26}
        />
        {unreadNotifications.length > 0 && (
          <span className="absolute top-0 right-0 flex h-4 w-4 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold leading-none text-white">
            {unreadNotifications.length}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="shad-popover">    
        <InboxNotificationList>
          {unreadNotifications.length <= 0 && (
            <p className="py-2 text-center text-white">
              No new notifications
            </p>
          )}
          {unreadNotifications.length > 0 &&
            inboxNotifications.map((inboxNotification) => (
              <InboxNotification
                key={inboxNotification.id}
                href={`/documents/${inboxNotification.roomId}`}
                className="my-2 text-white"
                inboxNotification={inboxNotification}
                kinds={{
                  thread: (props) => (
                    <InboxNotification.Thread
                      {...props}
                      showRoomName={false}
                    />
                  ),
                  $documentAccess: (props) =>(
                    <InboxNotification.Custom {...props} title={props.inboxNotification.activities[0].data.title} aside={
                      <InboxNotification.Icon className="bg-transparent">
                        <Image 
                          src={props.inboxNotification.activities[0].data.avatar as string || ""}
                          alt={props.inboxNotification.activities[0].data.title as string || ""}
                          width={26}
                          height={26}
                          className="rounded-full"
                        />
                      </InboxNotification.Icon>
                    }>

                      {props.children}
                    </InboxNotification.Custom>
                  )
                }}
              />
            ))}
        </InboxNotificationList>
      </PopoverContent>
    </Popover>
  );

};

export default Notifications;
