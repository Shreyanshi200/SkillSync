'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Toast from '@/components/Toast';


type Skill = {
  skill_id: string;
  name: string;
};

export default function AdminActions() {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [projectData, setProjectData] = useState({ title: '', description: '' });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  

  // Fetch all skills from backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/skills');
        if (!res.ok) throw new Error('Failed to fetch skills');
        const data = await res.json();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  // Add new project
  const handleAddProject = async () => {
    try {
      // Check for duplicate project title
      const checkRes = await fetch('http://localhost:8080/api/projects');
      const existing = await checkRes.json();
      const duplicate = existing.find(
        (p: any) => p.title.toLowerCase() === projectData.title.toLowerCase()
      );

      if (duplicate) {
        alert('A project with this title already exists!');
        return;
      }

      const payload = {
        title: projectData.title,
        description: projectData.description,
        skills: selectedSkillIds, // array of skill_id
      };

      const res = await fetch('http://localhost:8080/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setToast({ message: 'Project added!', type: 'success' });
        setShowProjectModal(false);
        window.location.reload();
      } else {
        alert('Failed to add project.');
      }
    } catch (error) {
      console.error(error);
      alert('Error adding project.');
    }
  };

  const handleSkillSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedSkillIds(options);
  };

  const getSkillName = (id: string) => {
    const skill = skills.find((s) => s.skill_id === id);
    return skill ? skill.name : '';
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-end mb-6">
        <button
          onClick={() => setShowProjectModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Project
        </button>
        <Link
          href="/admin/skills"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Manage Skills
        </Link>
      </div>

      {/* Add Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Add Project</h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border rounded mb-2"
              value={projectData.title}
              onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 border rounded mb-4"
              value={projectData.description}
              onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
            />

            <div className="mb-4">
              <label className="block font-medium mb-1">Select Skills</label>
              <select
                multiple
                className="w-full border border-gray-300 rounded p-2"
                value={selectedSkillIds}
                onChange={handleSkillSelect}
              >
                {skills.map((skill) => (
                  <option key={skill.skill_id} value={skill.skill_id}>
                    {skill.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Skill Chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedSkillIds.map((id) => (
                <span
                  key={id}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                >
                  {getSkillName(id)}
                </span>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleAddProject}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
              <button
                onClick={() => setShowProjectModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
