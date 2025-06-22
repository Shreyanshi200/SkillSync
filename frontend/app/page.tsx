'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProjectList from '@/components/ProjectList';
import AdminActions from '@/components/AdminActions';

type Project = {
  projectId: string;
  title: string;
  description: string;
  skills: string[];
};

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roleType, setRoleType] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem('authenticated');
    const role = localStorage.getItem('role_type');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setRoleType(role || '');
    } else {
      router.push('/registration/signin');
    }
  }, [router]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  if (!isAuthenticated) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div className="container mx-auto p-8">
        <main className="flex flex-col gap-12">
          <h1 className="text-5xl font-extrabold text-center text-gray-800">Welcome to SkillSync</h1>
          <p className="text-xl text-center text-gray-600 mb-8">Explore our available projects:</p>

          { <AdminActions />}
          <ProjectList projects={projects} />
        </main>
      </div>
    </div>
  );
}
