'use client';

import Navbar from '@/components/Navbar';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileEducation from '@/components/Profile/ProfileEducation';
import ProfileExperience from '@/components/Profile/ProfileExperience';
import ProfileSkills from '@/components/Profile/ProfileSkills';
import ProfileSocialLinks from '@/components/Profile/ProfileSocialLinks';
import PublicProfileToggle from '@/components/Profile/PublicProfileToggle';
import ProfileAchievements from '@/components/Profile/ProfileAchievements';
import GitHubRepoShowcase from '@/components/Profile/GitHubRepoShowcase';
import ProfileLanguagesCerts from '@/components/Profile/ProfileLanguagesCerts';
import ProfileCompletenessMeter from '@/components/Profile/ProfileCompletenessMeter';

export default function ProfilePage() {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') || '' : '';
  const roleType = typeof window !== 'undefined' ? localStorage.getItem('role_type') || '' : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Main Profile Header */}
        <ProfileHeader userId={userId} roleType={roleType} />
        <ProfileCompletenessMeter userId={userId} />

        {/* Badges & GitHub */}
        <ProfileAchievements userId={userId} />
        <GitHubRepoShowcase userId={userId} />

        {/* Professional Background */}
        <div className="border-b border-gray-300 pb-2 mb-4">
          <h2 className="text-2xl font-bold text-indigo-800">Professional Background</h2>
        </div>

        <PublicProfileToggle userId={userId} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProfileEducation userId={userId} />
          <ProfileExperience userId={userId} />
        </div>

        {/* Skills & Social */}
        <div className="border-b border-gray-300 pb-2 mb-4 mt-12">
          <h2 className="text-2xl font-bold text-indigo-800">Skills & Presence</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProfileSkills userId={userId} />
          <ProfileSocialLinks userId={userId} />
        </div>

        {/* Programming Languages & Certifications */}
        <ProfileLanguagesCerts userId={userId} />
      </div>
    </div>
  );
}
