'use client';

import { useEffect, useState } from 'react';
import { Star, GitFork, Github } from 'lucide-react';

type Props = {
  userId: string;
};

type Repo = {
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
};

export default function GitHubRepoShowcase({ userId }: Props) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/profile-social?user_id=${userId}`);
        const data = await res.json();

        const githubUrl = data?.github || '';
        const extractedUsername = githubUrl?.split('github.com/')[1]?.replace('/', '');

        if (!extractedUsername) {
          setLoading(false);
          return;
        }

        setUsername(extractedUsername);

        const repoRes = await fetch(`https://api.github.com/users/${extractedUsername}/repos?per_page=100`);
        const reposData: Repo[] = await repoRes.json();

        const sorted = reposData
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 3);

        setRepos(sorted);
      } catch (err) {
        console.error('GitHub repo fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubRepos();
  }, [userId]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-10">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
        <Github className="text-indigo-600" /> GitHub Projects
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading repositories...</p>
      ) : repos.length === 0 ? (
        <p className="text-gray-500">No public GitHub repositories found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <a
              key={repo.html_url}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="block bg-gray-50 border hover:shadow-lg transition-all duration-200 rounded p-4"
            >
              <h3 className="text-lg font-semibold text-indigo-700">{repo.name}</h3>
              <p className="text-sm text-gray-600 mt-1 mb-2 line-clamp-2">{repo.description}</p>
              <div className="flex gap-4 text-gray-500 text-sm mt-2">
                <span className="flex items-center gap-1"><Star size={16} /> {repo.stargazers_count}</span>
                <span className="flex items-center gap-1"><GitFork size={16} /> {repo.forks_count}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
