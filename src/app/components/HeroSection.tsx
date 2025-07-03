import Image from "next/image"
import { Play, Pause, Volume2, ArrowRight } from "lucide-react"
import ScrollIndicator from "./ScrollIndicator"
import { RefObject } from "react"

interface HeroSectionProps {
  isLoaded: boolean
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
  scrollToSection: (sectionId: string) => void
  sectionRef: RefObject<HTMLDivElement | null>
}

export default function HeroSection({ 
  isLoaded, 
  isPlaying, 
  setIsPlaying, 
  scrollToSection, 
  sectionRef 
}: HeroSectionProps) {
  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center">
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
                <span className="text-yellow-400">FULL-STACK</span>
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

      <ScrollIndicator isLoaded={isLoaded} scrollToSection={scrollToSection} />
    </section>
  )
}
