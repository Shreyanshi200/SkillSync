'use client';

import { useEffect, useState } from 'react';
import { ClipboardCheck, LinkIcon } from 'lucide-react';

type Props = {
  userId: string;
};

export default function PublicProfileToggle({ userId }: Props) {
  const [isPublic, setIsPublic] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Fetch current public status
    const fetchVisibility = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/profile-visibility?user_id=${userId}`);
        const data = await res.json();
        setIsPublic(data?.isPublic || false);
      } catch (err) {
        console.error('Failed to fetch profile visibility:', err);
      }
    };

    fetchVisibility();
  }, [userId]);

  const toggleVisibility = async () => {
    const newStatus = !isPublic;
    setIsPublic(newStatus);

    await fetch('http://localhost:8080/api/profile-visibility', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, isPublic: newStatus }),
    });
  };

  const handleCopy = () => {
    const publicUrl = `${window.location.origin}/public-profile/${userId}`;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-indigo-700 mb-2">Public Profile</h2>

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-gray-700 mb-1">
            {isPublic
              ? 'Your profile is publicly accessible.'
              : 'Your profile is private. Toggle to make it public.'}
          </p>
          {isPublic && (
            <div className="flex items-center gap-2">
              <input
                value={`${window.location.origin}/public-profile/${userId}`}
                readOnly
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm w-full md:w-[360px]"
              />
              <button
                onClick={handleCopy}
                className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
              >
                {copied ? (
                  <span className="flex items-center gap-1"><ClipboardCheck size={16} /> Copied</span>
                ) : (
                  <span className="flex items-center gap-1"><LinkIcon size={16} /> Copy</span>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <span className="mr-2 text-gray-600 font-medium text-sm">
            {isPublic ? 'Public' : 'Private'}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isPublic}
              onChange={toggleVisibility}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 
              peer-focus:ring-indigo-300 rounded-full peer dark:bg-gray-600 
              peer-checked:after:translate-x-full peer-checked:after:border-white 
              after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
              after:bg-white after:border-gray-300 after:border after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600">
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
