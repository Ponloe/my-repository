import { ChevronDown } from "lucide-react"

interface ScrollIndicatorProps {
  isLoaded: boolean
  scrollToSection: (sectionId: string) => void
}

export default function ScrollIndicator({ isLoaded, scrollToSection }: ScrollIndicatorProps) {
  return (
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
  )
}
