'use client';

import { useEffect, useState } from 'react';

const AllOrganizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await fetch('/api/organizations');

        if (!res.ok) {
          throw new Error('Failed to fetch organizations');
        }

        const data = await res.json();
        setOrganizations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (loading) return <div>Loading organizations...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='max-w-screen mx-auto min-h-screen'>
      <div className='flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-light-green'>
        <h1 className='font-bold text-xl text-beige'>All Organizations</h1>
      </div>
      <div className='py-2 px-3'>
          {organizations.map(org => (
            <h1 className='flex items-center justify-center rounded-full font-semibold text-dark-green h-9 bg-light-brown w-36 mb-2 ' key={org._id}>{org.name}</h1>
          ))}
        </div>
    </div>
  );
};

export default AllOrganizations;
