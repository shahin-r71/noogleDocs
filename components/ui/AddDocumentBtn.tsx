"use client"

import { createDocument } from '@/lib/actions/room.actions'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import React from 'react'

const AddDocumentBtn = ({userId,email}:CreateDocumentParams) => {
  const router = useRouter();
  const handleAddDocumentBtn = async () => {
    try {
      const room = await createDocument({userId,email});
      if(room)
        router.push(`/documents/${room.id}`);
      
    } catch (error) {
      console.log(error);
    }
   
  }
  return (
    <button type="submit" onClick={handleAddDocumentBtn} className='gradient-blue flex items-center gap-1 rounded-md px-3 py-2'>
      <Image
        src="/assets/icons/add.svg"
        alt="add document"
        width={24}
        height={24}
      />
      <p className='hidden sm:block'>Add Document</p>
    </button>
  )
}

export default AddDocumentBtn