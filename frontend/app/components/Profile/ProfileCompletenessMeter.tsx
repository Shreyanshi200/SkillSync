'use client';

import { useEffect, useState } from 'react';

type Props = {
  userId: string;
};

export default function ProfileCompletenessMeter({ userId }: Props) {
  const [progress, setProgress] = useState(0);
  const [label, setLabel] = useState('Getting started...');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/profile-completeness?user_id=${userId}`);
        const data = await res.json();

        // Backend returns completion percentage (0-100)
        const percent = data?.percentage || 0;
        setProgress(percent);

        if (percent >= 90) setLabel('✅ Profile Complete!');
        else if (percent >= 70) setLabel('🚀 Almost there!');
        else if (percent >= 40) setLabel('🛠️ Halfway done!');
        else setLabel('📄 Let’s build your profile!');
      } catch (err) {
        console.error('Error loading profile completeness:', err);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-10">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-indigo-700">📊 Profile Completeness</h2>
        <span className="text-gray-600 font-semibold">{label}</span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-green-400 via-yellow-400 to-indigo-600 h-4 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-gray-500">{progress}% complete</p>
    </div>
  );
}
