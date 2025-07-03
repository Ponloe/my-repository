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
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  const { repos, loading: reposLoading, error: reposError } = useGitHubRepos("Ponloe")

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
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleLoadComplete = () => {
    setIsLoaded(true)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <LoadingScreen isLoaded={isLoaded} onLoadComplete={handleLoadComplete} />
      <Navbar isLoaded={isLoaded} />
      
      <main className="pt-20">
        <HeroSection
          isLoaded={isLoaded}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          scrollToSection={scrollToSection}
          sectionRef={sectionRefs.hero}
        />
        
        <AboutSection
          isVisible={visibleSections.has("about")}
          sectionRef={sectionRefs.about}
        />
        
        <SkillsSection
          isVisible={visibleSections.has("skills")}
          sectionRef={sectionRefs.skills}
        />
        
        <ExperienceSection
          isVisible={visibleSections.has("experience")}
          sectionRef={sectionRefs.experience}
        />
        
        <WorkSection
          isVisible={visibleSections.has("work")}
          sectionRef={sectionRefs.work}
          repos={repos}
          reposLoading={reposLoading}
          reposError={reposError}
        />
        
        <EducationSection
          isVisible={visibleSections.has("education")}
          sectionRef={sectionRefs.education}
        />
        
        <ContactSection
          isVisible={visibleSections.has("contact")}
          sectionRef={sectionRefs.contact}
        />
      </main>

      <SocialLinks isLoaded={isLoaded} />
      <Footer />
    </div>
  )
}
