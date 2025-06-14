'use client'; // Ensure this component is treated as a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter();

  const handleNextStep = () => {
    setError('');
    if (step === 1) {
      if (password !== confirmPassword) {
        setError("Passwords don't match");
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      education,
      skills,
      role,
    };

    try {
      const response = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        localStorage.setItem('authenticated', 'true');
        router.push('/'); // Redirect to the home page after sign-up
      } else {
        setError('Sign up failed, please try again!');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 p-6">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full sm:w-96">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500 mb-6">
          SkillSync - Sign Up
        </h2>

        {step === 1 && (
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Confirm your password"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-indigo-700"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700">Education</label>
              <input
                type="text"
                id="education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                required
                className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your educational background"
              />
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
              <input
                type="text"
                id="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                required
                className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your skills (comma separated)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={role === 'developer'}
                    onChange={() => setRole(role === 'developer' ? '' : 'developer')}
                    className="mr-2"
                  />
                  Developer
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={role === 'employer'}
                    onChange={() => setRole(role === 'employer' ? '' : 'employer')}
                    className="mr-2"
                  />
                  Employer
                </label>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="w-full bg-gray-300 text-gray-700 p-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-400"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-indigo-700"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-indigo-700"
              >
                Complete Sign Up
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
