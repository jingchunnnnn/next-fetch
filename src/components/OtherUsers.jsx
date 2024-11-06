'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export default function GetAllUsers() {
  const { user } = useUser(); // Get the current user's data
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]); // Track users to display
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleUsersCount, setVisibleUsersCount] = useState(3); // Initially show 3 users


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user/list');

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();

        console.log('Current User:', user);
        console.log('Fetched Users:', data);

        // Filter out the current user
        const filteredUsers = data.filter((u) => u.username !== user?.username);
        setUsers(filteredUsers);

        // Initially, display the first 3 users
        setDisplayedUsers(filteredUsers.slice(0, visibleUsersCount));
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, visibleUsersCount]);

  const loadMoreUsers = () => {
    setVisibleUsersCount(visibleUsersCount + 3);
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className='flex flex-col items-center text-white mt-10 bg-dark-green w-64 ml-10'>
        Recommended Accounts
      </h2>

      <div className='hidden xl:inline flex-1 w-8'>
        <div className='flex flex-col items-center mt-6'>
          {displayedUsers.map((user) => (
            <div
              key={user._id}
              className='flex items-center justify-start text-center bg-pinky h-[50px] w-[250px] rounded-full mb-6 cursor-pointer hover:brightness-90'
            >
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt={`${user.username}'s profile picture`}
                  className='h-8 w-8 ml-2 rounded-full'
                />
              )}
              <div className='flex flex-col ml-4'>
                <span className='text-sm font-semibold'>{user.firstName}</span>
                <span className='text-xs text-gray-600'>@{user.username}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {users.length > visibleUsersCount && (
        <div className="flex justify-center mt-2">
          <button
            onClick={loadMoreUsers}
            className="bg-dark-green text-white text-sm px-1 py-1 rounded-md hover:brightness-75"
          >
            Show More Users
          </button>
        </div>
      )}
    </div>
  );
}
