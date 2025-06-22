'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-4xl font-semibold">SkillSync</h1>
        <ul className="flex space-x-8 text-white text-lg">
          <li><Link href="/" className="hover:text-gray-200">Home</Link></li>
          <li><Link href="/navPages/about" className="hover:text-gray-200">About</Link></li>
          <li><Link href="/navPages/project" className="hover:text-gray-200">Projects</Link></li>
          <li><Link href="/navPages/profile" className="hover:text-gray-200">Profile</Link></li>
        </ul>
      </div>
    </nav>
  );
}
