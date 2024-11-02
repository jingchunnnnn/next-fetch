'use client'

import { useUser } from "@clerk/nextjs"
import { HiOutlinePhotograph } from "react-icons/hi"
import { useState } from "react"

export default function Input() {
    const { user, isSignedIn, isLoaded } = useUser();
    if (!isSignedIn || !isLoaded) {
        return null;
    }
    return (
        <div className="flex border-b border-gray-200 p-3 space-x w-full">
            <img
              src={user.imageUrl}
              alt='user-profile-photo'
              className="h-11 w-11 rounded-full cursor-pointer hover:brightness-90 object-cover mr-2"
            />
            <div className="w-full divide-y divide-gray-200">
                <textarea 
                  className="w-full border-none outline-none tracking-wide min-h-[50px] text-black bg-gray-200"
                  placeholder="Write a caption"
                  rows='2'
                />
                <div className="flex items-center justify-between pt-2.5">
                    <HiOutlinePhotograph className="h-10 w-10 p-2 text-violet-500 hover:text-violet-700 rounded-full cursor-pointer" />
                    <button 
                      disabled
                      className="bg-violet-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:bg-indigo-300 disabled:opacity-50">
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
}
