import { RefObject } from "react"

interface SectionHeaderProps {
  subtitle: string
  title: string
  highlightedWord: string
  description?: string
  isVisible: boolean
  className?: string
}

export default function SectionHeader({ 
  subtitle, 
  title, 
  highlightedWord, 
  description, 
  isVisible, 
  className = "" 
}: SectionHeaderProps) {
  return (
    <div
      className={`text-center mb-16 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      <p className="text-yellow-400 text-sm font-medium tracking-wider uppercase mb-4">— {subtitle}</p>
      <h2 className="text-4xl lg:text-6xl font-bold mb-6">
        {title.split(highlightedWord)[0]}
        <span className="text-yellow-400">{highlightedWord}</span>
        {title.split(highlightedWord)[1]}
      </h2>
      {description && (
        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  )
}
