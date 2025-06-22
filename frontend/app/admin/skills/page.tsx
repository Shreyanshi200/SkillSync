'use client';

import { useState } from 'react';
import Toast from '@/components/Toast';

export default function AdminSkillPage() {
  const [skillName, setSkillName] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleAddSkill = async () => {
    if (!skillName.trim()) {
      setToast({ message: 'Skill name is required.', type: 'error' });
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: skillName.trim() }),
      });

      if (res.ok) {
        setToast({ message: 'Skill added successfully!', type: 'success' });
        setSkillName('');
      } else {
        setToast({ message: 'Failed to add skill.', type: 'error' });
      }
    } catch (error) {
      console.error(error);
      setToast({ message: 'Error while adding skill.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Skill</h2>
        <input
          type="text"
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter skill name"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
        />
        <button
          onClick={handleAddSkill}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Skill
        </button>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
