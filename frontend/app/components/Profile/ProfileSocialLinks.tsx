'use client';

import { useEffect, useState } from 'react';

type Props = {
  userId: string;
};

type SocialLinks = {
  github: string;
  linkedin: string;
};

export default function ProfileSocialLinks({ userId }: Props) {
  const [links, setLinks] = useState<SocialLinks>({ github: '', linkedin: '' });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/profile-social?user_id=${userId}`);
        const data = await res.json();
        if (data) setLinks(data);
      } catch (err) {
        console.error('Failed to load social links:', err);
      }
    };

    fetchLinks();
  }, [userId]);

  const handleSave = async () => {
    setEditing(false);
    await fetch('http://localhost:8080/api/profile-social', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, ...links }),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-10">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Social Profiles</h2>

      {!editing ? (
        <>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>GitHub:</strong>{' '}
              {links.github ? (
                <a
                  href={links.github}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {links.github}
                </a>
              ) : (
                <span className="text-gray-400">Not linked</span>
              )}
            </p>
            <p>
              <strong>LinkedIn:</strong>{' '}
              {links.linkedin ? (
                <a
                  href={links.linkedin}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {links.linkedin}
                </a>
              ) : (
                <span className="text-gray-400">Not linked</span>
              )}
            </p>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Edit Links
          </button>
        </>
      ) : (
        <div className="space-y-4">
          <input
            placeholder="GitHub URL"
            value={links.github}
            onChange={(e) => setLinks({ ...links, github: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            placeholder="LinkedIn URL"
            value={links.linkedin}
            onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
