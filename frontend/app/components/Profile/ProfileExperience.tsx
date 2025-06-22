'use client';

import { useEffect, useState } from 'react';

type ExperienceEntry = {
  company: string;
  role: string;
  duration: string;
  description: string;
};

type Props = {
  userId: string;
};

export default function ProfileExperience({ userId }: Props) {
  const [experienceList, setExperienceList] = useState<ExperienceEntry[]>([]);
  const [newEntry, setNewEntry] = useState<ExperienceEntry>({
    company: '',
    role: '',
    duration: '',
    description: '',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/profile-experience?user_id=${userId}`);
        const data = await res.json();
        setExperienceList(data.experience || []);
      } catch (err) {
        console.error('Error fetching experience:', err);
      }
    };
    fetchExperience();
  }, [userId]);

  const saveToBackend = async (data: ExperienceEntry[]) => {
    await fetch('http://localhost:8080/api/profile-experience', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, experience: data }),
    });
  };

  const handleAdd = async () => {
    if (!newEntry.company || !newEntry.role || !newEntry.duration) {
      alert('All required fields must be filled');
      return;
    }

    const updated = [...experienceList, newEntry];
    setExperienceList(updated);
    setNewEntry({ company: '', role: '', duration: '', description: '' });
    setIsAdding(false);
    await saveToBackend(updated);
  };

  const handleEditSave = async (index: number) => {
    setEditingIndex(null);
    await saveToBackend(experienceList);
  };

  const handleDelete = async (index: number) => {
    const updated = [...experienceList];
    updated.splice(index, 1);
    setExperienceList(updated);
    await saveToBackend(updated);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-10">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Experience</h2>

      {experienceList.length > 0 ? (
        <ul className="space-y-4">
          {experienceList.map((exp, index) => (
            <li key={index} className="border p-4 rounded-lg bg-gray-50 relative">
              {editingIndex === index ? (
                <>
                  <input
                    className="mb-2 w-full border rounded p-1"
                    value={exp.company}
                    placeholder="Company"
                    onChange={(e) =>
                      setExperienceList((prev) =>
                        prev.map((item, i) => (i === index ? { ...item, company: e.target.value } : item))
                      )
                    }
                  />
                  <input
                    className="mb-2 w-full border rounded p-1"
                    value={exp.role}
                    placeholder="Role"
                    onChange={(e) =>
                      setExperienceList((prev) =>
                        prev.map((item, i) => (i === index ? { ...item, role: e.target.value } : item))
                      )
                    }
                  />
                  <input
                    className="mb-2 w-full border rounded p-1"
                    value={exp.duration}
                    placeholder="Duration"
                    onChange={(e) =>
                      setExperienceList((prev) =>
                        prev.map((item, i) => (i === index ? { ...item, duration: e.target.value } : item))
                      )
                    }
                  />
                  <textarea
                    className="mb-2 w-full border rounded p-1"
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) =>
                      setExperienceList((prev) =>
                        prev.map((item, i) => (i === index ? { ...item, description: e.target.value } : item))
                      )
                    }
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEditSave(index)}
                      className="bg-green-600 text-white px-4 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="bg-gray-400 text-white px-4 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold">{exp.role} @ {exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.duration}</p>
                  <p className="mt-1 text-gray-700">{exp.description}</p>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => setEditingIndex(index)}
                      className="text-sm bg-indigo-600 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-sm bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No experience added yet.</p>
      )}

      {isAdding ? (
        <div className="mt-6 space-y-3">
          <input
            placeholder="Company"
            className="w-full border rounded p-2"
            value={newEntry.company}
            onChange={(e) => setNewEntry({ ...newEntry, company: e.target.value })}
          />
          <input
            placeholder="Role"
            className="w-full border rounded p-2"
            value={newEntry.role}
            onChange={(e) => setNewEntry({ ...newEntry, role: e.target.value })}
          />
          <input
            placeholder="Duration"
            className="w-full border rounded p-2"
            value={newEntry.duration}
            onChange={(e) => setNewEntry({ ...newEntry, duration: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="w-full border rounded p-2"
            value={newEntry.description}
            onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
          />
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Experience
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Experience
        </button>
      )}
    </div>
  );
}
