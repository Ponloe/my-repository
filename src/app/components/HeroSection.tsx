import Image from "next/image"
import { ArrowRight } from "lucide-react"
import ScrollIndicator from "./ScrollIndicator"
import { RefObject, useState, useEffect, useMemo } from "react"
import SpotifyCurrentlyPlaying from "./SpotifyCurrentlyPlaying"
import SpotifyProfile from "./SpotifyProfile"

interface HeroSectionProps {
  isLoaded: boolean
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
  scrollToSection: (sectionId: string) => void
  sectionRef: RefObject<HTMLDivElement | null>
}

export default function HeroSection({ 
  isLoaded, 
  scrollToSection, 
  sectionRef 
}: HeroSectionProps) {

  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const commands = useMemo(() => [
    "npm run dev",
    "git add .",
    "git commit -m 'feat: wow this guy so handsome'",
    "npm run build",
    "npm test -- --coverage",
    "docker build -t portfolio .",
    "git push origin main",
    "npm run deploy"
  ], [])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    
    if (isTyping) {
      const currentCommand = commands[currentCommandIndex]
      if (displayText.length < currentCommand.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentCommand.slice(0, displayText.length + 1))
        }, 100)
      } else {
        setTimeout(() => {
          setIsTyping(false)
        }, 1500)
      }
    } else {
      timeout = setTimeout(() => {
        setDisplayText("")
        setCurrentCommandIndex((prev) => (prev + 1) % commands.length)
        setIsTyping(true)
      }, 500)
    }

    return () => clearTimeout(timeout)
  }, [currentCommandIndex, displayText, isTyping, commands])

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
                <div className="space-y-8 lg:pr-12">
          <div className="space-y-4">
            <p
              className={`text-xs uppercase tracking-widest text-gray-400 transition-opacity duration-700 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              Soponloe Sovann
            </p>

            <h1
              className={`text-5xl lg:text-7xl font-bold leading-tight transition-opacity duration-700 delay-100 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              Software Engineer<span className="text-yellow-400">.</span>
            </h1>

          </div>

          <div className="mt-6 space-y-3">
            <SpotifyProfile />
            <SpotifyCurrentlyPlaying isLoaded={isLoaded} />
          </div>
          
            <div className="p-3 sm:p-4 bg-gray-900 border border-gray-700 rounded-lg font-mono text-xs sm:text-sm shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center justify-between mb-2 sm:mb-3 pb-2 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-xs ml-2 hidden sm:inline">Terminal</span>
                </div>
                <div className="text-gray-500 text-xs hidden sm:inline">zsh</div>
              </div>
              
              {/* Command Line */}
              <div className="space-y-2">
                {/* Current command with input on same line */}
                <div className="flex items-start sm:items-center space-x-1 sm:space-x-2 min-h-[20px]">
                  <div className="flex items-center space-x-1 flex-shrink-0 text-xs">
                    <span className="text-cyan-400 font-semibold">➜</span>
                    <span className="text-blue-400 font-semibold hidden sm:inline">portfolio</span>
                    <span className="text-blue-400 font-semibold sm:hidden">~</span>
                    <span className="text-yellow-400 font-semibold hidden sm:inline">git:(</span>
                    <span className="text-red-400 font-semibold hidden sm:inline">main</span>
                    <span className="text-yellow-400 font-semibold hidden sm:inline">)</span>
                  </div>
                  
                  {/* Command input that adapts to screen size */}
                  <div className="flex items-center min-h-[20px] flex-1 min-w-0">
                    <span className="text-white font-mono break-all">
                      {displayText}
                    </span>
                    <span className="text-green-400 animate-pulse font-bold ml-1 flex-shrink-0">▊</span>
                  </div>
                </div>
              </div>
            </div>

          <button
            onClick={() => scrollToSection("about")}
            className={`inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-all group mt-8 duration-800 ease-out delay-1400 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Let&apos;s get started
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

      <ScrollIndicator isLoaded={isLoaded} scrollToSection={scrollToSection} />
    </section>
  )
}