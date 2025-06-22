'use client';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-4xl font-semibold">SkillSync</h1>
        <ul className="flex space-x-8 text-white text-lg">
          <li><a href="/" className="hover:text-gray-200">Home</a></li>
          <li><a href="/about" className="hover:text-gray-200">About</a></li>
          <li><a href="/projects" className="hover:text-gray-200">Projects</a></li>
          <li><a href="/profile" className="hover:text-gray-200">Profile</a></li>
        </ul>
      </div>
    </nav>
  );
}
