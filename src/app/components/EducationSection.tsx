import { Award } from "lucide-react"
import { RefObject } from "react"

interface EducationSectionProps {
  isVisible: boolean
  sectionRef: RefObject<HTMLDivElement | null>
}

export default function EducationSection({ isVisible, sectionRef }: EducationSectionProps) {
  return (
    <section id="education" ref={sectionRef} className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
  )
}
