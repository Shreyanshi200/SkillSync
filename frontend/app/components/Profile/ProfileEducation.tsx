'use client';

import { useEffect, useState } from 'react';

type EducationEntry = {
  id?: string;
  institution: string;
  degree: string;
  field: string;
  year: string;
};

type Props = {
  userId: string;
};

export default function ProfileEducation({ userId }: Props) {
  const [educationList, setEducationList] = useState<EducationEntry[]>([]);
  const [newEntry, setNewEntry] = useState<EducationEntry>({
    institution: '',
    degree: '',
    field: '',
    year: '',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/profile-education?user_id=${userId}`);
        const data = await res.json();
        setEducationList(data.education || []);
      } catch (err) {
        console.error('Error fetching education:', err);
      }
    };
    fetchEducation();
  }, [userId]);

  const handleAddEducation = async () => {
    if (!newEntry.institution || !newEntry.degree || !newEntry.field || !newEntry.year) {
      alert('All fields are required');
      return;
    }

    const updatedList = [...educationList, newEntry];
    setEducationList(updatedList);
    setIsAdding(false);
    setNewEntry({ institution: '', degree: '', field: '', year: '' });

    await fetch('http://localhost:8080/api/profile-education', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, education: updatedList }),
    });
  };

  const handleEditSave = async (index: number) => {
    setEditingIndex(null);
    await fetch('http://localhost:8080/api/profile-education', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, education: educationList }),
    });
  };

  const handleDelete = async (index: number) => {
    const updated = [...educationList];
    updated.splice(index, 1);
    setEducationList(updated);
    await fetch('http://localhost:8080/api/profile-education', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, education: updated }),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-10">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Education</h2>

      {/* Education List */}
      {educationList.length > 0 ? (
        <ul className="space-y-4">
          {educationList.map((edu, index) => (
            <li key={index} className="border p-4 rounded-lg bg-gray-50 relative">
              {editingIndex === index ? (
                <>
                  <input
                    className="mb-2 w-full border rounded p-1"
                    value={edu.institution}
                    onChange={(e) =>
                      setEducationList((prev) =>
                        prev.map((item, i) => i === index ? { ...item, institution: e.target.value } : item
                      ))
                    }
                  />
                  <input
                    className="mb-2 w-full border rounded p-1"
                    value={edu.degree}
                    onChange={(e) =>
                      setEducationList((prev) =>
                        prev.map((item, i) => i === index ? { ...item, degree: e.target.value } : item
                      ))
                    }
                  />
                  <input
                    className="mb-2 w-full border rounded p-1"
                    value={edu.field}
                    onChange={(e) =>
                      setEducationList((prev) =>
                        prev.map((item, i) => i === index ? { ...item, field: e.target.value } : item
                      ))
                    }
                  />
                  <input
                    className="mb-2 w-full border rounded p-1"
                    value={edu.year}
                    onChange={(e) =>
                      setEducationList((prev) =>
                        prev.map((item, i) => i === index ? { ...item, year: e.target.value } : item
                      ))
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
                  <p><strong>{edu.institution}</strong> – {edu.degree} in {edu.field} ({edu.year})</p>
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
        <p className="text-gray-500">No education added yet.</p>
      )}

      {/* Add New Entry Form */}
      {isAdding ? (
        <div className="mt-6 space-y-3">
          <input
            placeholder="Institution"
            className="w-full border rounded p-2"
            value={newEntry.institution}
            onChange={(e) => setNewEntry({ ...newEntry, institution: e.target.value })}
          />
          <input
            placeholder="Degree"
            className="w-full border rounded p-2"
            value={newEntry.degree}
            onChange={(e) => setNewEntry({ ...newEntry, degree: e.target.value })}
          />
          <input
            placeholder="Field of Study"
            className="w-full border rounded p-2"
            value={newEntry.field}
            onChange={(e) => setNewEntry({ ...newEntry, field: e.target.value })}
          />
          <input
            placeholder="Year or Duration"
            className="w-full border rounded p-2"
            value={newEntry.year}
            onChange={(e) => setNewEntry({ ...newEntry, year: e.target.value })}
          />
          <button
            onClick={handleAddEducation}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Education
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Education
        </button>
      )}
    </div>
  );
}
