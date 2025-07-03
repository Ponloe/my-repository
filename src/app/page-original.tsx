"use client"

import { useState, useEffect, useRef } from "react"
import Navbar from "./components/navbar"
import LoadingScreen from "./components/LoadingScreen"
import HeroSection from "./components/HeroSection"
import AboutSection from "./components/AboutSection"
import SkillsSection from "./components/SkillsSection"
import ExperienceSection from "./components/ExperienceSection"
import WorkSection from "./components/WorkSection"
import EducationSection from "./components/EducationSection"
import ContactSection from "./components/ContactSection"
import SocialLinks from "./components/SocialLinks"
import Footer from "./components/Footer"
import { useGitHubRepos } from "./hooks/useGitHubRepos"

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentHello, setCurrentHello] = useState(0)
  const [showInitials, setShowInitials] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  const { repos, loading: reposLoading, error: reposError } = useGitHubRepos("Ponloe")

  const hellos = [
    { text: "Hello", lang: "English" },
    { text: "Bonjour", lang: "French" },
    { text: "Hola", lang: "Spanish" },
    { text: "Hallo", lang: "German" },
    { text: "Ciao", lang: "Italian" },
    { text: "こんにちは", lang: "Japanese" },
    { text: "안녕하세요", lang: "Korean" },
    { text: "你好", lang: "Chinese" },
    { text: "Привет", lang: "Russian" },
    { text: "مرحبا", lang: "Arabic" },
    { text: "Namaste", lang: "Hindi" },
    { text: "Sawadee", lang: "Thai" },
    { text: "Chào", lang: "Vietnamese" },
    { text: "សួស្តី", lang: "Khmer" },
  ]

  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    work: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  }


  useEffect(() => {
    // Animate through hellos first
    const helloInterval = setInterval(() => {
      setCurrentHello((prev) => {
        if (prev < hellos.length - 1) {
          return prev + 1
        } else {
          clearInterval(helloInterval)
          // Show initials after all hellos
          setTimeout(() => {
            setShowInitials(true)
          }, 300)
          // Then fade out the loading screen
          setTimeout(() => {
            setIsLoaded(true)
          }, 1500)
          return prev
        }
      })
    }, 150) 

    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.2, rootMargin: "-50px" },
    )

    // Observe all sections
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      clearInterval(helloInterval)
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Loading Overlay with Animated Hellos */}
      <div
        className={`fixed inset-0 bg-black z-[100] transition-all duration-1000 ease-out ${
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            {!showInitials ? (
              <div className="space-y-2">
                <div 
                  key={currentHello}
                  className="text-3xl lg:text-4xl font-bold text-yellow-400 animate-pulse"
                >
                  {hellos[currentHello]?.text}
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-400 animate-scale-up">
                  SP.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navbar Component */}
      <Navbar isLoaded={isLoaded} />

      {/* Main Content - Add padding-top to account for fixed navbar */}
      <main className="pt-20">
        {/* Hero Section */}
        <section id="hero" ref={sectionRefs.hero} className="relative min-h-screen flex items-center">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 lg:pr-12">
              <div className="space-y-2">
                <p
                  className={`text-yellow-400 text-sm font-medium tracking-wider uppercase transition-all duration-800 ease-out delay-400 ${
                    isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                >
                  — HELLO, I AM Ponloe
                </p>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight overflow-hidden">
                  <span
                    className={`block transition-all duration-1000 ease-out delay-600 ${
                      isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
                    }`}
                  >
                    I'M A <span className="text-yellow-400">FULL-STACK</span>
                  </span>
                  <span
                    className={`block transition-all duration-1000 ease-out delay-800 ${
                      isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
                    }`}
                  >
                    DEVELOPER
                  </span>
                </h1>
              </div>

              <p
                className={`text-gray-300 text-lg max-w-md leading-relaxed transition-all duration-800 ease-out delay-1000 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Let's Code.
              </p>

              <div
                className={`flex items-center space-x-4 pt-4 transition-all duration-800 ease-out delay-1200 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center justify-center w-12 h-12 bg-yellow-400 text-black rounded-full hover:bg-yellow-300 transition-colors transform hover:scale-105"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-0.5 bg-yellow-400"></div>
                  <Volume2 className="w-4 h-4 text-gray-400" />
                  <div className="w-8 h-0.5 bg-gray-600"></div>
                </div>
              </div>

              <button
                onClick={() => scrollToSection("about")}
                className={`inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-all group mt-8 duration-800 ease-out delay-1400 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Discover More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Content - Image with Frame */}
            <div className="relative">
              <div
                className={`absolute inset-0 border-2 border-yellow-400 transform rotate-3 scale-105 transition-all duration-1200 ease-out delay-700 ${
                  isLoaded ? "opacity-100 rotate-3 scale-105" : "opacity-0 rotate-12 scale-75"
                }`}
              ></div>
              <div
                className={`absolute inset-0 border border-yellow-400/30 transform -rotate-2 scale-110 transition-all duration-1200 ease-out delay-900 ${
                  isLoaded ? "opacity-100 -rotate-2 scale-110" : "opacity-0 rotate-6 scale-90"
                }`}
              ></div>

              <div
                className={`relative aspect-[3/4] overflow-hidden bg-gray-900 transition-all duration-1000 ease-out delay-1100 ${
                  isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                <Image
                  src="/profile.png"
                  alt="Profile"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              <div
                className={`absolute -top-4 -right-4 w-3 h-3 bg-yellow-400 rounded-full transition-all duration-600 ease-out delay-1300 ${
                  isLoaded ? "opacity-100 scale-100 animate-pulse" : "opacity-0 scale-0"
                }`}
              ></div>
              <div
                className={`absolute top-1/3 -left-2 w-2 h-2 bg-yellow-400 rounded-full transition-all duration-600 ease-out delay-1500 ${
                  isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
              ></div>
              <div
                className={`absolute bottom-1/4 -right-6 w-4 h-4 border border-yellow-400 rotate-45 transition-all duration-600 ease-out delay-1700 ${
                  isLoaded ? "opacity-100 scale-100 rotate-45" : "opacity-0 scale-0 rotate-0"
                }`}
              ></div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-800 ease-out delay-2000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <button
              onClick={() => scrollToSection("about")}
              className="flex flex-col items-center text-gray-400 hover:text-yellow-400 transition-colors group"
            >
              <span className="text-xs uppercase tracking-wider mb-2">Scroll</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" ref={sectionRefs.about} className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-1000 ease-out ${
                visibleSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-yellow-400 text-sm font-medium tracking-wider uppercase mb-4">— ABOUT ME</p>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                PROBLEM <span className="text-yellow-400">SOLVER</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                I'm passionate about building applications that solve real-world problems, combining technical expertise with a focus on user experience.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              <div
                className={`space-y-6 transition-all duration-800 ease-out delay-200 ${
                  visibleSections.has("about") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              >
                <div className="w-16 h-16 bg-yellow-400/10 border border-yellow-400 flex items-center justify-center">
                  <Code className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold">Development Philosophy</h3>
                <p className="text-gray-300 leading-relaxed">
                  I believe great code is clean and efficient. Every line has a purpose, every function tells a story.
                </p>
              </div>

              <div
                className={`space-y-6 transition-all duration-800 ease-out delay-400 ${
                  visibleSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="w-16 h-16 bg-yellow-400/10 border border-yellow-400 flex items-center justify-center">
                  <Users className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold">Collaborative</h3>
                <p className="text-gray-300 leading-relaxed">
                  Understanding team needs and collaborating effectively is at the core of my development process.
                </p>
              </div>

              <div
                className={`space-y-6 transition-all duration-800 ease-out delay-600 ${
                  visibleSections.has("about") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
              >
                <div className="w-16 h-16 bg-yellow-400/10 border border-yellow-400 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold">Innovation</h3>
                <p className="text-gray-300 leading-relaxed">
                  I stay at the forefront of technology trends, constantly experimenting with new tools and techniques to push creative boundaries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={sectionRefs.skills} className="py-20 px-6 bg-gray-900/30">
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-1000 ease-out ${
                visibleSections.has("skills") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-yellow-400 text-sm font-medium tracking-wider uppercase mb-4">— EXPERTISE</p>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                SKILLS & <span className="text-yellow-400">TECHNOLOGIES</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  category: "Programming Languages",
                  skills: ["C++", "Python", "Java", "JavaScript", "TypeScript", "PHP", "SQL"],
                  delay: 0,
                },
                {
                  category: "Frameworks/Libraries",
                  skills: ["React", "Laravel", "Bootstrap", "NextJS", "NestJS"],
                  delay: 200,
                },
                {
                  category: "Tools",
                  skills: ["Git", "GitHub", "MySQL", "Google Apps Script", "LATEX"],
                  delay: 400,
                },
              ].map((group, index) => (
                <div
                  key={group.category}
                  className={`space-y-6 transition-all duration-800 ease-out ${
                    visibleSections.has("skills") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${group.delay}ms` }}
                >
                  <h3 className="text-xl font-bold text-yellow-400 border-b border-yellow-400/30 pb-2">
                    {group.category}
                  </h3>
                  <ul className="space-y-3">
                    {group.skills.map((skill) => (
                      <li key={skill} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" ref={sectionRefs.experience} className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-1000 ease-out ${
                visibleSections.has("experience") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-yellow-400 text-sm font-medium tracking-wider uppercase mb-4">— JOURNEY</p>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                MY <span className="text-yellow-400">EXPERIENCE</span>
              </h2>
            </div>

            <div className="space-y-12">
              {[
                {
                  year: "Nov 2024 - Feb 2025",
                  role: "Software Engineer Intern",
                  company: "SQUEEEZE",
                  description: [
                    "Contributed to backend development with a primary focus on Django, ensuring scalable and maintainable solutions.",
                    "Engaged in system analysis, gathered requirements, and created efficient technical designs for software solutions.",
                    "Designed and implemented robust relational database schemas.",
                    "Successfully developed a Shift Management System for streamlined scheduling.",
                  ],
                },
                {
                  year: "Jun 2024 - Apr 2025",
                  role: "Techpreneur Bootcamp",
                  company: "DICHI Academy & ELIX",
                  description: [
                    "Enrolled in a 9-month intensive bootcamp focused on mastering full-stack development and entrepreneurial skills.",
                    "Participated in hands-on workshops, ideation challenges, and MVP development.",
                  ],
                },
              ].map((exp, index) => (
                <div
                  key={index}
                  className={`grid lg:grid-cols-4 gap-8 items-start transition-all duration-800 ease-out ${
                    visibleSections.has("experience") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="text-yellow-400 font-bold text-lg">{exp.year}</div>
                  <div className="lg:col-span-3">
                    <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
                    <p className="text-yellow-400 mb-4">{exp.company}</p>
                    <ul className="list-disc list-inside text-gray-300 leading-relaxed">
                      {exp.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Work Section - Updated with GitHub API */}
        <section id="work" ref={sectionRefs.work} className="py-20 px-6 bg-gray-900/30">
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-1000 ease-out ${
                visibleSections.has("work") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-yellow-400 text-sm font-medium tracking-wider uppercase mb-4">— PORTFOLIO</p>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                FEATURED <span className="text-yellow-400">PROJECTS</span>
              </h2>
            </div>

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
                  <div
                    key={repo.id}
                    className={`group cursor-pointer transition-all duration-800 ease-out ${
                      visibleSections.has("work") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
                                  className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded"
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
                              className="flex items-center space-x-1 text-gray-400 hover:text-yellow-400 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github className="w-4 h-4" />
                              <span className="text-xs">Code</span>
                            </a>
                            {repo.homepage && (
                              <a
                                href={repo.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-gray-400 hover:text-yellow-400 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="w-4 h-4" />
                                <span className="text-xs">Live</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div
              className={`text-center mt-12 transition-all duration-800 ease-out delay-600 ${
                visibleSections.has("work") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
        {/* Education Section */}
        <section id="education" ref={sectionRefs.education} className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className={`transition-all duration-1000 ease-out ${
                visibleSections.has("education") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-yellow-400 text-sm font-medium tracking-wider uppercase mb-4">— EDUCATION</p>
              <h2 className="text-4xl lg:text-6xl font-bold mb-8">
                ACADEMIC <span className="text-yellow-400">BACKGROUND</span>
              </h2>
              <blockquote className="text-2xl text-gray-300 leading-relaxed mb-8 italic">
                Bachelor of Science in Computer Science
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <Award className="w-6 h-6 text-yellow-400" />
                <span className="text-gray-400">Paragon International University | Expected Graduation: 2026</span>
              </div>
            </div>
          </div>
        </section>


                {/* Contact Section */}
        <section id="contact" ref={sectionRefs.contact} className="py-20 px-6 bg-gray-900/30">
          <div className="max-w-4xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-1000 ease-out ${
                visibleSections.has("contact") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-yellow-400 text-sm font-medium tracking-wider uppercase mb-4">— GET IN TOUCH</p>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                LET'S <span className="text-yellow-400">CONNECT</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing together.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div
                  className={`transition-all duration-800 ease-out delay-200 ${
                    visibleSections.has("contact") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-6 text-yellow-400">Contact Information</h3>
                  
                  {/* Email */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors group">
                    <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400 rounded-full flex items-center justify-center group-hover:bg-yellow-400/20 transition-colors">
                      <Mail className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <a 
                        href="mailto:sovannsoponloe@gmail.com" 
                        className="text-white hover:text-yellow-400 transition-colors font-medium"
                      >
                        sovannsoponloe@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Telegram */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors group">
                    <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400 rounded-full flex items-center justify-center group-hover:bg-yellow-400/20 transition-colors">
                      <Send className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Telegram</p>
                      <a 
                        href="https://t.me/Ponleur" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-yellow-400 transition-colors font-medium"
                      >
                        @Ponleur
                      </a>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors group">
                    <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400 rounded-full flex items-center justify-center group-hover:bg-yellow-400/20 transition-colors">
                      <Linkedin className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">LinkedIn</p>
                      <a 
                        href="https://linkedin.com/in/soponloe" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-yellow-400 transition-colors font-medium"
                      >
                        linkedin.com/in/soponloe
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Download Section */}
              <div className="space-y-8">
                <div
                  className={`transition-all duration-800 ease-out delay-400 ${
                    visibleSections.has("contact") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-6 text-yellow-400">Download Resume</h3>
                  
                  <div className="bg-gray-800/50 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-yellow-400/10 border border-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-yellow-400" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">My Resume</h4>
                    <p className="text-gray-400 mb-6">
                      Download my resume to learn more about my background, skills, and experience.
                    </p>
                    <a
                      href="/resume.pdf"
                      download="Soponloe_Sovann_Resume.pdf"
                      className="inline-flex items-center space-x-2 bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors font-medium"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Resume</span>
                    </a>
                  </div>

                  {/* Quick Contact */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h4 className="text-xl font-bold mb-4">Quick Contact</h4>
                    <p className="text-gray-400 mb-4">
                      Prefer to reach out directly? Choose your preferred method:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="mailto:sovannsoponloe@gmail.com"
                        className="flex items-center space-x-2 bg-yellow-400/10 border border-yellow-400 text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Email Me</span>
                      </a>
                      <a
                        href="https://t.me/Ponleur" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-yellow-400/10 border border-yellow-400 text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        <span>Telegram</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div
              className={`text-center mt-16 transition-all duration-800 ease-out delay-600 ${
                visibleSections.has("contact") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 border border-yellow-400/20 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Start a Project?</h3>
                <p className="text-gray-300 mb-6">
                  I'm currently available for new opportunities and exciting projects. Let's discuss how we can work together.
                </p>
                <a
                  href="mailto:sovannsoponloe@gmail.com?subject=Let's%20Work%20Together"
                  className="inline-flex items-center space-x-2 bg-yellow-400 text-black px-8 py-3 rounded-lg hover:bg-yellow-300 transition-colors font-medium"
                >
                  <Mail className="w-5 h-5" />
                  <span>Start a Conversation</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Social Links - Right Side */}
      <div
        className={`fixed right-6 top-1/2 transform -translate-y-1/2 space-y-6 z-30 transition-all duration-800 ease-out delay-1600 ${
          isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        }`}
      >
        <a href="https://github.com/Ponloe" target="_blank" className="block text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110">
          <Github className="w-5 h-5" />
        </a>
        <a href="https://linkedin.com/in/soponloe" target="_blank" className="block text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="mailto:sovannsoponloe@gmail.com" className="block text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110">
          <Mail className="w-5 h-5" />
        </a>
        <div className="w-px h-16 bg-gray-600 mx-auto"></div>
      </div>

      {/* Copyright */}
      <footer className="py-8 px-6 text-center">
        <p className="text-gray-500 text-sm">© 2025 Soponloe Sovann | All Rights Reserved</p>
      </footer>
    </div>
  )
}