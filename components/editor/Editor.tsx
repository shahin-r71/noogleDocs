'use client';

import Theme from './plugins/Theme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import React from 'react';
import {FloatingComposer, FloatingThreads, liveblocksConfig, LiveblocksPlugin, useEditorStatus} from "@liveblocks/react-lexical";
import FloatingToolbar from './plugins/FloatingToolbarPlugin';
import Loader from '../Loader';
import Comments from '../Comments';
import { ClientSideSuspense, useThreads } from '@liveblocks/react/suspense';
import { DeleteModal } from '../DeleteModal';
// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export function Editor({roomId,currentUserType}:{roomId:string,currentUserType:UserType}) {
  const initialConfig = liveblocksConfig({
    namespace: 'Editor',
    nodes: [HeadingNode],
    // If something goes wrong during a Lexical update, this callback will be called
    // with the error that occurred. In a production app, you might want to send this
    // error to your analytics or logging service. In this example, we just log it to
    // the console, but if you want to gracefully recover from errors without losing
    // user data, you should *not* throw the error. Instead, you can return a value
    // that indicates whether Lexical should retry the update or not. If you return
    // `true`, Lexical will retry the update. If you return `false`, Lexical will
    // not retry the update and will discard the changes that caused the error.
    // If you throw the error, Lexical will propagate the error up the call stack and
    // your app might crash. This can be useful for debugging, since you can see the
    // full call stack in the error message, but it's not recommended for production
    // since it can lead to data loss. In this example, we throw the error for
    // demonstration purposes only.
    onError: (error: Error) => {
      console.error(error);
      throw error;
    },
    theme: Theme,
    editable: currentUserType==='editor',
  });

  const {threads} = useThreads();
  const status = useEditorStatus();

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container size-full">
        <div className="toolbar-wrapper flex min-w-full justify-between">
          <ToolbarPlugin />
          {currentUserType === "editor" && <DeleteModal roomId={roomId} />}
        </div>

        <div className="editor-wrapper flex flex-col items-center justify-start">
          {status === "not-loaded" || status === "loading" ? (
            <Loader />
          ) : (
            <div className="editor-inner min-h-[1100px] relative mb-5 h-fit w-full max-w-[800px] shadow-md lg:mb-10">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="editor-input h-full" />
                }
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
              />

              <HistoryPlugin />
              <AutoFocusPlugin />
              {currentUserType === "editor" && <FloatingToolbar />}
            </div>
          )}
          <LiveblocksPlugin>
            <FloatingComposer className="w-[350px]" />
            <FloatingThreads threads={threads} />
            <Comments />
            {/* className="w-[350px] block" */}
            {/* <ClientSideSuspense fallback={<Loader />}>
            </ClientSideSuspense> */}
          </LiveblocksPlugin>
        </div>
      </div>
    </LexicalComposer>
  );
}
