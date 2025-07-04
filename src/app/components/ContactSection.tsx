import { Mail, Send, Linkedin, Download } from "lucide-react"
import SectionHeader from "./SectionHeader"
import { RefObject } from "react"

interface ContactSectionProps {
  isVisible: boolean
  sectionRef: RefObject<HTMLDivElement | null>
}

export default function ContactSection({ isVisible, sectionRef }: ContactSectionProps) {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "sovannsoponloe@gmail.com",
      href: "mailto:sovannsoponloe@gmail.com"
    },
    {
      icon: Send,
      label: "Telegram",
      value: "@Ponleur",
      href: "https://t.me/Ponleur"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/soponloe",
      href: "https://linkedin.com/in/soponloe"
    }
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-6 bg-gray-900/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          subtitle="GET IN TOUCH"
          title="LET'S CONNECT"
          highlightedWord="CONNECT"
          description="Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing together."
          isVisible={isVisible}
        />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div
              className={`transition-all duration-800 ease-out delay-200 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Contact Information</h3>
              
              {contactMethods.map((method, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors group">
                  <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400 rounded-full flex items-center justify-center group-hover:bg-yellow-400/20 transition-colors">
                    <method.icon className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{method.label}</p>
                    <a 
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-white hover:text-yellow-400 transition-colors font-medium"
                    >
                      {method.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resume Download Section */}
          <div className="space-y-8">
            <div
              className={`transition-all duration-800 ease-out delay-400 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Download Resume</h3>
              
              <div className="bg-gray-800/50 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-yellow-400/10 border border-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-yellow-400" />
                </div>
                <h4 className="text-xl font-bold mb-2">My Resume</h4>
                <p className="text-gray-400 mb-6">
                  Download my resume to learn more about my background, skills, and experience.
                </p>
                <a
                  href="/resume.pdf"
                  download="Soponloe_Sovann_Resume.pdf"
                  className="inline-flex items-center space-x-2 bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors font-medium"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Resume</span>
                </a>
              </div>

              {/* Quick Contact */}
              <div className="bg-gray-800/50 rounded-lg p-6">
                <h4 className="text-xl font-bold mb-4">Quick Contact</h4>
                <p className="text-gray-400 mb-4">
                  Prefer to reach out directly? Choose your preferred method:
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="mailto:sovannsoponloe@gmail.com"
                    className="flex items-center space-x-2 bg-yellow-400/10 border border-yellow-400 text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Me</span>
                  </a>
                  <a
                    href="https://t.me/Ponleur" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-yellow-400/10 border border-yellow-400 text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Telegram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-16 transition-all duration-800 ease-out delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 border border-yellow-400/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Start a Project?</h3>
            <p className="text-gray-300 mb-6">
              I&apos;m currently available for new opportunities and exciting projects. Let&apos;s discuss how we can work together.
            </p>
            <a
              href="mailto:sovannsoponloe@gmail.com?subject=Let's%20Work%20Together"
              className="inline-flex items-center space-x-2 bg-yellow-400 text-black px-8 py-3 rounded-lg hover:bg-yellow-300 transition-colors font-medium"
            >
              <Mail className="w-5 h-5" />
              <span>Start a Conversation</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
