
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = ({children}:HeaderProps) => {
  return (
    <header className="header">
      <Link href="./" className="flex items-center justify-center gap-2">
        <Image
          src="/assets/icons/noogleDocs_Logo.svg"
          alt="logo"
          width={34}
          height={34}
          className="rounded-sm"
        />
        <p className="text-3xl font-bold hidden md:block text-blue-300">
          NoogleDocs
        </p>
        
      </Link>

      {children}
    </header>
  );
}

export default Header