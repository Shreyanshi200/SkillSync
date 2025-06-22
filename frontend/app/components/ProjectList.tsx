'use client';

type Project = {
  projectId: string;
  title: string;
  description: string;
  skills: string[];
};

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {projects.map((project) => (
        <div key={project.projectId} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
          <p className="text-gray-600 mb-2">{project.description}</p>
          <p className="text-sm text-gray-500 mb-4">
            Skills: {project.skills.join(', ')}
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-500">Learn More</a>
        </div>
      ))}
    </div>
  );
}
