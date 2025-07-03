import SectionHeader from "./SectionHeader"
import { RefObject } from "react"

interface ExperienceSectionProps {
  isVisible: boolean
  sectionRef: RefObject<HTMLDivElement | null>
}

export default function ExperienceSection({ isVisible, sectionRef }: ExperienceSectionProps) {
  const experiences = [
    {
      year: "Nov 2024 - Feb 2025",
      role: "Software Engineer Intern",
      company: "SQUEEEZE",
      description: [
        "Contributed to backend development with a primary focus on Django, ensuring scalable and maintainable solutions.",
        "Engaged in system analysis, gathered requirements, and created efficient technical designs for software solutions.",
        "Designed and implemented robust relational database schemas.",
        "Successfully developed a Shift Management System for streamlined scheduling.",
      ],
    },
    {
      year: "Jun 2024 - Apr 2025",
      role: "Techpreneur Bootcamp",
      company: "DICHI Academy & ELIX",
      description: [
        "Enrolled in a 9-month intensive bootcamp focused on mastering full-stack development and entrepreneurial skills.",
        "Participated in hands-on workshops, ideation challenges, and MVP development.",
      ],
    },
  ]

  return (
    <section id="experience" ref={sectionRef} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          subtitle="JOURNEY"
          title="MY EXPERIENCE"
          highlightedWord="EXPERIENCE"
          isVisible={isVisible}
        />

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-4 gap-8 items-start transition-all duration-800 ease-out ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="text-yellow-400 font-bold text-lg">{exp.year}</div>
              <div className="lg:col-span-3">
                <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
                <p className="text-yellow-400 mb-4">{exp.company}</p>
                <ul className="list-disc list-inside text-gray-300 leading-relaxed">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
