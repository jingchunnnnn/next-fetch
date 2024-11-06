import Link from "next/link"

export default function Communities() {
  return (
    <Link href='/communities' className="mt-4 flex items-center justify-center text-center w-48 h-9 text-white flex items-center p-3 bg-dark-brown rounded-full transition-all duration-200 gap-1 hover:brightness-75">
      <span className="font-bold">My Communities</span>
    </Link>
  )
}
