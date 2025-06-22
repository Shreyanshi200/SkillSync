'use client';

import { useEffect, useState } from 'react';

type Props = {
  userId: string;
};

type Skill = {
  skill_id: string;
  name: string;
};

export default function ProfileSkills({ userId }: Props) {
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [selectedSkillId, setSelectedSkillId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resSkills = await fetch('http://localhost:8080/api/skills');
        const skillsData = await resSkills.json();
        setAllSkills(skillsData);

        const resUser = await fetch(`http://localhost:8080/api/profile-skills?user_id=${userId}`);
        const userData = await resUser.json();
        setUserSkills(userData.skills || []);
      } catch (err) {
        console.error('Error loading skills:', err);
      }
    };

    fetchData();
  }, [userId]);

  const handleAddSkill = async () => {
    if (!selectedSkillId || userSkills.includes(selectedSkillId)) return;

    const updatedSkills = [...userSkills, selectedSkillId];
    setUserSkills(updatedSkills);
    setSelectedSkillId('');

    await fetch('http://localhost:8080/api/profile-skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, skills: updatedSkills }),
    });
  };

  const handleRemoveSkill = async (id: string) => {
    const updated = userSkills.filter((sid) => sid !== id);
    setUserSkills(updated);

    await fetch('http://localhost:8080/api/profile-skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, skills: updated }),
    });
  };

  const getSkillName = (id: string) => {
    return allSkills.find((s) => s.skill_id === id)?.name || 'Unknown';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-10">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Skills</h2>

      {/* Skill Chips */}
      {userSkills.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {userSkills.map((sid) => (
            <span
              key={sid}
              className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {getSkillName(sid)}
              <button
                onClick={() => handleRemoveSkill(sid)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-4">No skills added yet.</p>
      )}

      {/* Add Skill Dropdown */}
      <div className="flex gap-4">
        <select
          value={selectedSkillId}
          onChange={(e) => setSelectedSkillId(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">-- Select a skill --</option>
          {allSkills.map((skill) => (
            <option key={skill.skill_id} value={skill.skill_id}>
              {skill.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddSkill}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Skill
        </button>
      </div>
    </div>
  );
}
