"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

interface NavbarProps {
  isLoaded: boolean
}

export default function Navbar({ isLoaded }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/90 backdrop-blur-sm border-b border-gray-800/30">
        <div
          className={`flex items-center justify-between transition-all duration-800 ease-out delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <Link href="/" className="text-2xl font-bold text-yellow-400">
            SP.
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-400 hover:text-yellow-400 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-gray-400 hover:text-yellow-400 transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("work")}
              className="text-gray-400 hover:text-yellow-400 transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-400 hover:text-yellow-400 transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsMenuOpen(!isMenuOpen)
            }}
            className="text-white hover:text-yellow-400 transition-colors md:hidden"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-40 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center space-y-8">
            <button
              onClick={() => {
                scrollToSection("about")
                setIsMenuOpen(false)
              }}
              className="block text-3xl font-light hover:text-yellow-400 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => {
                scrollToSection("skills")
                setIsMenuOpen(false)
              }}
              className="block text-3xl font-light hover:text-yellow-400 transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => {
                scrollToSection("work")
                setIsMenuOpen(false)
              }}
              className="block text-3xl font-light hover:text-yellow-400 transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => {
                scrollToSection("contact")
                setIsMenuOpen(false)
              }}
              className="block text-3xl font-light hover:text-yellow-400 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </>
  )
}