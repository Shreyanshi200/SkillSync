'use client';

import { useEffect, useState } from 'react';

type Props = {
  userId: string;
};

type Language = {
  name: string;
  level: string;
};

type Cert = {
  title: string;
  issuer: string;
  year: string;
  link?: string;
};

export default function ProfileLanguagesCerts({ userId }: Props) {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [certs, setCerts] = useState<Cert[]>([]);
  const [newLang, setNewLang] = useState<Language>({ name: '', level: 'Beginner' });
  const [newCert, setNewCert] = useState<Cert>({ title: '', issuer: '', year: '', link: '' });

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/profile-languages-certs?user_id=${userId}`);
      const data = await res.json();
      setLanguages(data.languages || []);
      setCerts(data.certifications || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleSave = async () => {
    await fetch(`http://localhost:8080/api/profile-languages-certs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, languages, certifications: certs }),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-10 space-y-8">
      <h2 className="text-2xl font-bold text-indigo-700">Programming Languages</h2>

      {/* Display & Add Language */}
      <div className="space-y-4">
        {languages.map((lang, idx) => (
          <div key={idx} className="flex justify-between text-gray-800">
            <p>{lang.name} - <span className="italic text-sm text-gray-500">{lang.level}</span></p>
          </div>
        ))}
        <div className="flex gap-4 flex-wrap">
          <input
            placeholder="Language"
            value={newLang.name}
            onChange={(e) => setNewLang({ ...newLang, name: e.target.value })}
            className="p-2 border rounded w-48"
          />
          <select
            value={newLang.level}
            onChange={(e) => setNewLang({ ...newLang, level: e.target.value })}
            className="p-2 border rounded w-48"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Expert</option>
          </select>
          <button
            onClick={() => {
              if (newLang.name) {
                setLanguages([...languages, newLang]);
                setNewLang({ name: '', level: 'Beginner' });
              }
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Add Language
          </button>
        </div>
      </div>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold text-indigo-700">Certifications</h2>

      {/* Display & Add Certifications */}
      <div className="space-y-4">
        {certs.map((cert, idx) => (
          <div key={idx} className="text-gray-800">
            <p className="font-semibold">{cert.title}</p>
            <p className="text-sm italic">{cert.issuer} ({cert.year})</p>
            {cert.link && (
              <a href={cert.link} target="_blank" rel="noreferrer" className="text-blue-500 text-sm hover:underline">
                View Certificate
              </a>
            )}
          </div>
        ))}
        <div className="grid md:grid-cols-4 gap-4">
          <input
            placeholder="Title"
            value={newCert.title}
            onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            placeholder="Issuer"
            value={newCert.issuer}
            onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            placeholder="Year"
            value={newCert.year}
            onChange={(e) => setNewCert({ ...newCert, year: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            placeholder="Link (optional)"
            value={newCert.link}
            onChange={(e) => setNewCert({ ...newCert, link: e.target.value })}
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={() => {
            if (newCert.title && newCert.issuer && newCert.year) {
              setCerts([...certs, newCert]);
              setNewCert({ title: '', issuer: '', year: '', link: '' });
            }
          }}
          className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Certification
        </button>
      </div>

      <div className="pt-4">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save All
        </button>
      </div>
    </div>
  );
}
