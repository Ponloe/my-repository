import { Github, Linkedin, Mail } from "lucide-react"

interface SocialLinksProps {
  isLoaded: boolean
}

export default function SocialLinks({ isLoaded }: SocialLinksProps) {
  return (
    <div
      className={`fixed right-6 top-1/2 transform -translate-y-1/2 space-y-6 z-30 transition-all duration-800 ease-out delay-1600 ${
        isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      }`}
    >
      <a href="https://github.com/Ponloe" target="_blank" className="block text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110">
        <Github className="w-5 h-5" />
      </a>
      <a href="https://linkedin.com/in/soponloe" target="_blank" className="block text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110">
        <Linkedin className="w-5 h-5" />
      </a>
      <a href="mailto:sovannsoponloe@gmail.com" className="block text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110">
        <Mail className="w-5 h-5" />
      </a>
      <div className="w-px h-16 bg-gray-600 mx-auto"></div>
    </div>
  )
}
