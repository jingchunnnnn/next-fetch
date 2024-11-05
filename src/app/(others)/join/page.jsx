'use client'

import { useEffect, useState } from 'react';
import { useOrganization, useUser } from '@clerk/nextjs';

const JoinOrganizations = () => {
  const { user } = useUser();
  const { organizations } = useOrganization();
  const [existingOrganizations, setExistingOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizations = async () => {
      if (!user) return; 
      try {
        const response = await fetch('/api/organizations');
        const data = await response.json();
        
        setExistingOrganizations(data);
      } catch (e) {
        console.error('Failed to fetch organizations:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, [user]);

  const joinOrganization = async (organizationId) => {
    try {
      const response = await fetch(`/api/join-organization/${organizationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (response.ok) {
        alert('Joined organization successfully!');
      } else {
        alert('Failed to join the organization.');
      }
    } catch (e) {
      console.error('Join organization error:', e);
    }
  };

  if (loading) return <div>Loading organizations...</div>;

  return (
    <div>
      <h1>Join Existing Organizations</h1>
        {existingOrganizations.map((org) => (
          <div key={org.id}>
            <span>{org.name}</span>
            <button onClick={() => joinOrganization(org.id)}>Join</button>
          </div>
        ))}
    </div>
  );
};

export default JoinOrganizations;

