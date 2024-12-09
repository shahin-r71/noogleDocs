import { DeleteModal } from '@/components/DeleteModal'
import Header from '@/components/header'
import Notifications from '@/components/Notifications'
import AddDocumentBtn from '@/components/ui/AddDocumentBtn'
import { getDocuments } from '@/lib/actions/room.actions'
import { dateConverter } from '@/lib/utils'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import React from 'react'

const page = async() => {
  const clerkUser=await currentUser();

  if(!clerkUser) {
    redirect('/sign-in')
  }
  const rooms= await getDocuments(clerkUser.emailAddresses[0].emailAddress);
  const documents = rooms.data;

  // console.log(documents);
  return (
    <main className='home-container'>
      <Header >
        <div className='flex justify-between items-center gap-3'>
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
          
        </div>
      </Header>
      {
        documents.length > 0 ? (
          <div className='document-list-container'>
            <div className="document-list-title">
              <h3 className='text-28-semibold'>All documents</h3>
              <AddDocumentBtn 
                userId={clerkUser.id} 
                email={clerkUser.emailAddresses[0].emailAddress} 
              />
            </div>
            <ul className='document-ul'>
              {
                documents.map(({id,metadata,createdAt}:any)=>(
                  <li key={id} className='document-list-item'>
                    <Link href={`/documents/${id}`} className='flex flex-1 items-center gap-4'>
                      <div className='hidden rounded-md sm:block p-2 bg-dark-500'> 
                        <Image
                          src="/assets/icons/doc.svg"
                          alt='doc'
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className='space-y-1'>
                        <p className='text-lg line-clamp-1'>{metadata.title}</p>
                        <p className='text-sm font-light text-blue-100'>Created about {dateConverter(createdAt)}</p>
                      </div>
                    </Link>
                    <DeleteModal roomId={id}/>
                  </li>
                ))
              }
            </ul>
          </div>
        ):(
          <div className="document-list-empty">
            <Image
              src="/assets/icons/doc.svg"
              alt='doc'
              width={50}
              height={50}
              className='mx-auto'
            />
            <AddDocumentBtn userId={clerkUser.id} email={clerkUser.emailAddresses[0].emailAddress} />
          </div>
        )
      }
    </main>
  )
}

export default page