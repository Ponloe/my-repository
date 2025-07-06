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
      title: "Build Clean.",
      description: "Build cleanly. Everyone's happy. Both you, your team and future you will thank you.",
      delay: 200
    },
    {
      icon: Users,
      title: "Collaborative.",
      description: "Let's all learn Git together. Team collaboration is the key to all things needed to be done.",
      delay: 400
    },
    {
      icon: Zap,
      title: "Innovation.",
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
          description="Anything problems you throw at me, I'm ready to tackle it. Bring it on!"
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
