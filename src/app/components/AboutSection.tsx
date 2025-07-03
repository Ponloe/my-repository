import { Code, Users, Zap } from "lucide-react"
import SectionHeader from "./SectionHeader"
import { RefObject } from "react"

interface AboutSectionProps {
  isVisible: boolean
  sectionRef: RefObject<HTMLDivElement | null>
}

export default function AboutSection({ isVisible, sectionRef }: AboutSectionProps) {
  const features = [
    {
      icon: Code,
      title: "Development Philosophy",
      description: "I believe great code is clean and efficient. Every line has a purpose, every function tells a story.",
      delay: 200
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "Understanding team needs and collaborating effectively is at the core of my development process.",
      delay: 400
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "I stay at the forefront of technology trends, constantly experimenting with new tools and techniques to push creative boundaries.",
      delay: 600
    }
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          subtitle="ABOUT ME"
          title="PROBLEM SOLVER"
          highlightedWord="SOLVER"
          description="I'm passionate about building applications that solve real-world problems, combining technical expertise with a focus on user experience."
          isVisible={isVisible}
        />

        <div className="grid lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`space-y-6 transition-all duration-800 ease-out delay-${feature.delay} ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="w-16 h-16 bg-yellow-400/10 border border-yellow-400 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
