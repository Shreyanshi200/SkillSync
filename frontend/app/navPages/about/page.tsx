'use client';

import Navbar from '@/components/Navbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden py-24 sm:py-32 bg-white">
        {/* Decorative blurred circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-300 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-300 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-800 leading-tight drop-shadow-lg">
            <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
              SkillSync
            </span>{' '}
            – Empowering Developers
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Revolutionizing how internal teams connect talent with opportunities. SkillSync ensures the
            right developers work on the right projects — every time.
          </p>
          <p className="mt-3 text-sm text-gray-400 italic">Built by developers, for developers.</p>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">
        {/* Mission */}
        <section className="text-center">
          <h2 className="text-4xl font-bold text-indigo-700 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            At SkillSync, we believe your skills deserve a platform. We aim to maximize team efficiency
            by smartly syncing developers with projects that match their strengths and passions — with
            full transparency and zero micromanagement.
          </p>
        </section>

        {/* How It Works */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-indigo-600 mb-4">How It Works</h2>
            <ul className="list-disc list-inside text-gray-700 text-lg space-y-3">
              <li>Admins add projects and required skills.</li>
              <li>Developers are auto-mapped or assigned based on their skill profiles.</li>
              <li>Each user can view and manage their current project workload.</li>
              <li>Admins maintain project visibility across all contributors.</li>
            </ul>
          </div>
          <div className="relative">
            <img
              src="https://illustrations.popsy.co/gray/workflow.svg"
              alt="How SkillSync Works"
              className="w-full max-w-md mx-auto"
            />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-4">For Developers</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✔️ Get matched with relevant projects.</li>
              <li>✔️ Track your contributions and growth.</li>
              <li>✔️ Build a reputation internally.</li>
              <li>✔️ Say goodbye to random assignments.</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-4">For Admins</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✔️ Central dashboard for all projects.</li>
              <li>✔️ View who is assigned where and why.</li>
              <li>✔️ No more manual coordination chaos.</li>
              <li>✔️ Smart filtering by skills and roles.</li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-4xl font-bold text-indigo-700 mb-4">Ready to Get in Sync?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Discover how SkillSync can help you unleash your team’s potential.
          </p>
          <a
            href="/projects"
            className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow hover:bg-indigo-700 transition"
          >
            Explore Projects
          </a>
        </section>
      </div>
    </div>
  );
}
