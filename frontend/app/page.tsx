'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState<string[]>([]); // Sample data for projects
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem('authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push('/registration/signin'); // Redirect to login if not authenticated
    }
  }, [router]);

  useEffect(() => {
    // Fetching projects data (could be from an API in a real app)
    setProjects(['Project 1', 'Project 2', 'Project 3', 'Project 4']);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {isAuthenticated ? (
        <>
          {/* Navbar */}
          <nav className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 p-6 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-white text-4xl font-semibold">SkillSync</h1>
              <ul className="flex space-x-8 text-white text-lg">
                <li>
                  <a href="/" className="hover:text-gray-200 transition-all">Home</a>
                </li>
                <li>
                  <a href="/about" className="hover:text-gray-200 transition-all">About</a>
                </li>
                <li>
                  <a href="/projects" className="hover:text-gray-200 transition-all">Projects</a>
                </li>
                <li>
                  <a href="/profile" className="hover:text-gray-200 transition-all">Profile</a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <div className="container mx-auto p-8">
            <main className="flex flex-col gap-12">
              <h1 className="text-5xl font-extrabold text-center text-gray-800">Welcome to SkillSync</h1>
              <p className="text-xl text-center text-gray-600 mb-8">Here are some amazing projects listed on the site:</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {projects.map((project, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{project}</h3>
                    <p className="text-gray-500 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                    <a href="#" className="text-blue-600 hover:text-blue-500">Learn More</a>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-screen">Loading...</div>
      )}
    </div>
  );
}
