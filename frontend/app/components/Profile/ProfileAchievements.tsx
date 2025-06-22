'use client';

import { useEffect, useState } from 'react';

type Props = {
  userId: string;
};

export default function ProfileAchievements({ userId }: Props) {
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    const fetchProfileStats = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/profile-stats?user_id=${userId}`);
        const data = await res.json();

        const newBadges: string[] = [];

        if (data.skills?.length >= 5) newBadges.push('🎯 Skill Master');
        if (data.experience?.length >= 1 && data.experience.some((exp: any) => exp.years >= 3))
          newBadges.push('🧠 Experienced Pro');
        if (data.education?.length >= 2) newBadges.push('📚 Lifelong Learner');
        if (data.projects?.length >= 3) newBadges.push('💼 Project Contributor');
        if (data.github_repo_count >= 3) newBadges.push('🐙 GitHub Enthusiast');

        setBadges(newBadges);
      } catch (err) {
        console.error('Failed to load badges:', err);
      }
    };

    fetchProfileStats();
  }, [userId]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-10">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">🏅 Achievements</h2>

      {badges.length === 0 ? (
        <p className="text-gray-500">No badges earned yet. Start building your profile!</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {badges.map((badge, idx) => (
            <span
              key={idx}
              className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-medium shadow-sm text-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
