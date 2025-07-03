"use client"

import { useState, useEffect } from "react"

interface LoadingScreenProps {
  isLoaded: boolean
  onLoadComplete: () => void
}

export default function LoadingScreen({ isLoaded, onLoadComplete }: LoadingScreenProps) {
  const [currentHello, setCurrentHello] = useState(0)
  const [showInitials, setShowInitials] = useState(false)

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

  useEffect(() => {
    const helloInterval = setInterval(() => {
      setCurrentHello((prev) => {
        if (prev < hellos.length - 1) {
          return prev + 1
        } else {
          clearInterval(helloInterval)
          setTimeout(() => {
            setShowInitials(true)
          }, 300)
          setTimeout(() => {
            onLoadComplete()
          }, 1500)
          return prev
        }
      })
    }, 150)

    return () => clearInterval(helloInterval)
  }, [onLoadComplete])

  return (
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
  )
}
