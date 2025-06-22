'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  userId: string;
  roleType: string;
};

export default function ProfileHeader({ userId, roleType }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('you@example.com');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch profile image + info from backend
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/profile-header?user_id=${userId}`);
        const data = await res.json();
        if (data.image) setImage(data.image);
        if (data.name) setName(data.name);
        if (data.email) setEmail(data.email);
      } catch (err) {
        console.error('Failed to fetch header info:', err);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImage(base64);

      fetch('http://localhost:8080/api/upload-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, image: base64 }),
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveInfo = async () => {
    setIsEditing(false);
    await fetch('http://localhost:8080/api/update-profile-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, name, email }),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-8">
      <div className="relative">
        <img
          src={image || '/default-avatar.png'}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-indigo-600"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full"
        >
          Edit
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <div className="flex-1 space-y-2 text-gray-700">
        {isEditing ? (
          <>
            <input
              className="border border-gray-300 rounded px-3 py-1 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border border-gray-300 rounded px-3 py-1 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSaveInfo}
              className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-indigo-700">{name}</h2>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>User ID:</strong> {userId}
            </p>
            <p>
              <strong>Role:</strong> {roleType}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-2 bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
            >
              Edit Info
            </button>
          </>
        )}
      </div>
    </div>
  );
}
