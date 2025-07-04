import { useState, useEffect } from 'react'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  language: string | null
  stargazers_count: number
  forks_count: number
  created_at: string
  updated_at: string
  pushed_at: string
}

interface UseGitHubReposReturn {
  repos: GitHubRepo[]
  loading: boolean
  error: string | null
}

const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: "srok-sart-client",
    description: "Frontend client for Srok Sart, built with TypeScript. This application provides the user interface and client-side logic for the Srok Sart platform.",
    html_url: "https://github.com/Srok-Sart/srok-sart-client",
    homepage: null,
    topics: [],
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    created_at: "2025-02-01T00:00:00Z",
    updated_at: "2025-03-24T11:03:12Z",
    pushed_at: "2025-03-24T11:03:12Z"
  },
  {
    id: 2,
    name: "srok-sart-api",
    description: "Backend API for Srok Sart, implemented in TypeScript. This service handles all server-side logic and data management for the Srok Sart platform.",
    html_url: "https://github.com/Srok-Sart/srok-sart-api",
    homepage: null,
    topics: [],
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    created_at: "2025-02-01T00:00:00Z",
    updated_at: "2025-03-22T02:41:33Z",
    pushed_at: "2025-03-22T02:41:33Z"
  },
  {
    id: 3,
    name: "ApsaraPOS",
    description: "A point-of-sale system built with CSS, PHP, Blade, and JavaScript. Designed for retail and restaurant businesses to manage sales, inventory, and customer transactions.",
    html_url: "https://github.com/Ponloe/ApsaraPOS",
    homepage: null,
    topics: [],
    language: "Blade, CSS",
    stargazers_count: 0,
    forks_count: 0,
    created_at: "2024-08-07T00:00:00Z",
    updated_at: "2025-04-11T00:00:00Z",
    pushed_at: "2025-01-04T16:27:20Z"
  },
  {
    id: 4,
    name: "Shrnp-hub-backend",
    description: "Backend service for Shrnp Hub, developed primarily with Blade and PHP. Provides the core logic and data handling for the Shrnp Hub platform.",
    html_url: "https://github.com/Lykuoyhay/Shrnp-hub-backend",
    homepage: null,
    topics: [],
    language: "Blade, PHP",
    stargazers_count: 0,
    forks_count: 0,
    created_at: "", 
    updated_at: "", 
    pushed_at: "2025-07-04T04:21:25Z"
  },
  {
    id: 5,
    name: "Shrnp-Hub",
    description: "Frontend web application for Shrnp Hub, implemented with Blade and PHP. Manages user interface and client-side experience for the Shrnp Hub ecosystem.",
    html_url: "https://github.com/Lykuoyhay/Shrnp-Hub",
    homepage: null,
    topics: [],
    language: "Blade, PHP",
    stargazers_count: 1,
    forks_count: 0,
    created_at: "", 
    updated_at: "", 
    pushed_at: "2025-07-04T04:57:09Z"
  },
  {
    id: 6,
    name: "ai-customer-support",
    description: "AI-powered customer support tool built with TypeScript and Python. Designed to automate responses and assist users through intelligent chat and ticketing.",
    html_url: "https://github.com/Ponloe/ai-customer-support",
    homepage: null,
    topics: [],
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    created_at: "2025-04-29T00:00:00Z",
    updated_at: "2025-06-02T08:38:37Z",
    pushed_at: "2025-06-02T08:38:37Z"
  }
]

export function useGitHubRepos(username: string): UseGitHubReposReturn {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
        
        if (!response.ok) {
          throw new Error('API request failed')
        }
        
        const data: GitHubRepo[] = await response.json()
        
        // Filter out forks and sort by last updated
        const filteredRepos = data
          .filter(repo => !repo.name.includes('fork'))
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        
        setRepos(filteredRepos)
      } catch {
        console.log('Using fallback data for projects')
        
        setRepos(FALLBACK_REPOS)
        setError(null)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [username])

  return { repos, loading, error }
}