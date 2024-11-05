import { OrganizationSwitcher } from "@clerk/nextjs"
import Link from "next/link"

export default function Organizations() {
  return (
    <>
      <div className="flex flex-col gap-4 mx-auto text-dark-green ml-10 mt-10">
        <Link href='/join' className="flex items-center justify-center text-center rounded-full w-64 h-9 flex items-center p-5 bg-pinky transition-all duration-200 gap-1 hover:brightness-75">
          <span className="font-bold">Join Organization</span>
        </Link>
      </div>
      <div className="flex flex-col rounded-full gap-4 mx-auto text-dark-green ml-10 mt-[520px] flex items-center justify-center text-center w-64 h-20 p-5 bg-light-brown transition-all duration-200 gap-1 hover:brightness-75">
        <span className="font-bold mt-2">My Organizations</span>
        <OrganizationSwitcher />
      </div>
    </>
  )
}
