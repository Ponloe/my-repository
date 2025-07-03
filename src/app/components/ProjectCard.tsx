import { Code, Star, GitFork, ExternalLink } from "lucide-react"

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  html_url: string
  topics: string[]
}

interface ProjectCardProps {
  repo: GitHubRepo
  index: number
  isVisible: boolean
}

export default function ProjectCard({ repo, index, isVisible }: ProjectCardProps) {
  return (
    <div
      className={`group cursor-pointer transition-all duration-800 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 border border-yellow-400/30 transform rotate-1 group-hover:rotate-2 transition-transform"></div>
        <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden p-4 flex flex-col justify-between">
          <div className="absolute inset-0 bg-yellow-400/10 group-hover:bg-yellow-400/20 transition-colors"></div>
          
          {/* Header */}
          <div className="flex justify-between items-start relative z-10">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-yellow-400" />
              {repo.language && (
                <span className="text-xs text-gray-400">{repo.language}</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-400">{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center space-x-1">
                <GitFork className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-400">{repo.forks_count}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors mb-2">
              {repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {repo.description || "No description available"}
            </p>
            
            {/* Topics */}
            {repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {repo.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="text-xs bg-yellow-400/10 text-yellow-400 px-2 py-1 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}

            {/* Links */}
            <div className="flex items-center space-x-4">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xs text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                View Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
