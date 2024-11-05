import Link from "next/link"
import Image from "next/image"
import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/nextjs'
import MiniProfile from "./MiniProfile"

export default function LeftSidebar() {
  return (
    <div className="flex flex-col items-center gap-4 p-10 mx-auto">
        <Link href='/'>
            <Image 
            src='/fetchLogo.png'
            width={100}
            height={100}
            alt='Fetch Logo'
            className="w-48 h-48 cursor-pointer m-1 rounded-full transition-all duration-200"
            />
        </Link>
        <Link href='/' className="flex items-center justify-center text-center w-48 h-9 text-white flex items-center p-3 bg-dark-brown rounded-full transition-all duration-200 gap-1 hover:brightness-75">
            <span className="font-bold">Home</span>
        </Link>
        <div>
          <SignedIn>
            <SignOutButton className="flex items-center justify-center text-white bg-dark-brown font-semibold rounded-full hover:brightness-75 transition-all duration-200 w-48 h-9 shadow-md hidden xl:inline" />
          </SignedIn>
          <SignedOut>
            <SignInButton className="flex items-center justify-center text-white bg-dark-brown font-semibold rounded-full hover:brightness-75 transition-all duration-200 w-48 h-9 shadow-md hidden xl:inline" />
          </SignedOut>
        </div>
        <SignedIn>
          <MiniProfile />
        </SignedIn>
    </div>
  )
}
