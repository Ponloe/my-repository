import Link from "next/link"
import { ArrowRight } from "lucide-react"
import SectionHeader from "./SectionHeader"
import ProjectCard from "./ProjectCard"
import { RefObject } from "react"

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

interface WorkSectionProps {
  isVisible: boolean
  sectionRef: RefObject<HTMLDivElement | null>
  repos: GitHubRepo[]
  reposLoading: boolean
  reposError: string | null
}

export default function WorkSection({ isVisible, sectionRef, repos, reposLoading, reposError }: WorkSectionProps) {
  return (
    <section id="work" ref={sectionRef} className="py-20 px-6 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          subtitle="PORTFOLIO"
          title="FEATURED PROJECTS"
          highlightedWord="PROJECTS"
          isVisible={isVisible}
        />

        {reposLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
            <span className="ml-3 text-gray-400">Loading projects...</span>
          </div>
        ) : reposError ? (
          <div className="text-center py-12">
            <p className="text-red-400">Error loading projects: {reposError}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.slice(0, 6).map((repo, index) => (
              <ProjectCard
                key={repo.id}
                repo={repo}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        )}

        <div
          className={`text-center mt-12 transition-all duration-800 ease-out delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href="https://github.com/Ponloe"
            target="_blank"
            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors group"
          >
            View All Projects
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
