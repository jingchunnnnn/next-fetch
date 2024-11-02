'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import { HiDotsHorizontal } from 'react-icons/hi';

export default function MiniProfile() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className='mt-80 text-gray-700 text-sm flex items-center cursor-pointer p-3 hover:bg-violet-300 rounded-full transition-all duration-200 justify-between xl:w-56 w-fit gap-2 bg-violet-500'>
      <UserButton />

      <div className='hidden xl:inline flex-1 w-8'>
        <h4 className='font-bold text-sm truncate text-white'>{user && user.fullName}</h4>
        <p className='text-gray-300 text-sm truncate'>
          @{user && user.username}
        </p>
      </div>
      <HiDotsHorizontal className='h-3 w-3 hidden xl:inline mr-1' />
    </div>
  );
}