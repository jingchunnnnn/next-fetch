import Link from "next/link"
import Image from "next/image"
import { HiHome } from 'react-icons/hi'
import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/nextjs'

export default function LeftSidebar() {
  return (
    <div className="flex flex-col gap-4 p-3">
        <Link href='/'>
            <Image 
            src='/fetchLogo.png'
            width={100}
            height={100}
            alt='Fetch Logo'
            className="w-48 h-48 cursor-pointer m-1 hover:bg-violet-500 rounded-full transition-all duration-200"
            />
        </Link>
        <Link href='/' className="text-violet-500 flex items-center p-3 hover:bg-gray-300 rounded-full transition-all duration-200 gap-2 w-fit">
            <HiHome className="w-6 h-6" />
            <span className="font-bold hidden xl:inline">Home</span>
        </Link>
        <div>
          <SignedIn>
            <SignOutButton className="flex items-center justify-center text-yellow-200 bg-violet-500 font-semibold rounded-full hover:brightness-75 transition-all duration-200 w-48 h-9 shadow-md hidden xl:inline" />
          </SignedIn>
          <SignedOut>
            <SignInButton className="flex items-center justify-center text-yellow-200 bg-violet-500 font-semibold rounded-full hover:brightness-75 transition-all duration-200 w-48 h-9 shadow-md hidden xl:inline" />
          </SignedOut>
        </div>
    </div>
  )
}
