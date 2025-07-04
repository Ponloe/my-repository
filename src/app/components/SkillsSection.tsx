import SectionHeader from "./SectionHeader"
import { RefObject, useState, useEffect, useRef, useMemo } from "react"
import { 
  Code2, 
  Database, 
  Brackets, 
  FileCode, 
  Braces,
  AtSign,
  Atom,
  Flame,
  Grid3x3,
  ArrowRight,
  Zap,
  GitBranch,
  Github,
  Cylinder,
  FileText,
  Code
} from "lucide-react"

interface SkillsSectionProps {
  isVisible: boolean
  sectionRef: RefObject<HTMLDivElement | null>
}

interface Skill {
  name: string
  level: number
  color: string
  particleType: string
  syntax: string
}

export default function SkillsSection({ isVisible, sectionRef }: SkillsSectionProps) {
  const [typingStates, setTypingStates] = useState<{ [key: string]: { displayText: string; isComplete: boolean } }>({})
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [skillPositions, setSkillPositions] = useState<{ [key: string]: { x: number; y: number } }>({})
  const skillRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Get icon component for each skill
  const getSkillIcon = (skillName: string) => {
    const iconMap = {
      "C++": Code2,
      "Python": Code,
      "Java": FileCode,
      "JavaScript": Braces,
      "TypeScript": Brackets,
      "PHP": AtSign,
      "SQL": Database,
      "React": Atom,
      "Laravel": Flame,
      "Bootstrap": Grid3x3,
      "NextJS": ArrowRight,
      "NestJS": Zap,
      "Git": GitBranch,
      "GitHub": Github,
      "MySQL": Cylinder,
      "Google Apps Script": Code,
      "LATEX": FileText
    }
    return iconMap[skillName as keyof typeof iconMap] || Code2
  }

  // Define skill relationships for constellation connections
  const skillConnections = useMemo(() => ({
    "React": ["NextJS", "TypeScript", "JavaScript"],
    "NextJS": ["React", "TypeScript", "JavaScript"],
    "TypeScript": ["JavaScript", "React", "NextJS", "NestJS"],
    "JavaScript": ["React", "NextJS", "TypeScript", "PHP", "Python"],
    "Laravel": ["PHP", "MySQL"],
    "PHP": ["Laravel", "MySQL", "JavaScript"],
    "MySQL": ["SQL", "PHP", "Laravel"],
    "SQL": ["MySQL", "Database"],
    "Python": ["JavaScript", "C++"],
    "Java": ["C++", "SQL"],
    "C++": ["Python", "Java"],
    "NestJS": ["TypeScript", "JavaScript"],
    "Bootstrap": ["CSS", "JavaScript"],
    "Git": ["GitHub"],
    "GitHub": ["Git"]
  }), [])

  const skillGroups = useMemo(() => [
    {
      category: "Programming Languages",
      skills: [
        { name: "C++", level: 85, color: "#00599C", particleType: "hexagon", syntax: "cpp" },
        { name: "Python", level: 90, color: "#3776AB", particleType: "snake", syntax: "python" },
        { name: "Java", level: 80, color: "#ED8B00", particleType: "circle", syntax: "java" },
        { name: "JavaScript", level: 95, color: "#F7DF1E", particleType: "square", syntax: "javascript" },
        { name: "TypeScript", level: 90, color: "#3178C6", particleType: "triangle", syntax: "typescript" },
        { name: "PHP", level: 75, color: "#777BB4", particleType: "diamond", syntax: "php" },
        { name: "SQL", level: 85, color: "#4479A1", particleType: "database", syntax: "sql" }
      ],
      delay: 0,
    },
    {
      category: "Frameworks/Libraries",
      skills: [
        { name: "React", level: 95, color: "#61DAFB", particleType: "atom", syntax: "jsx" },
        { name: "Laravel", level: 80, color: "#FF2D20", particleType: "blade", syntax: "php" },
        { name: "Bootstrap", level: 85, color: "#7952B3", particleType: "grid", syntax: "css" },
        { name: "NextJS", level: 90, color: "#000000", particleType: "arrow", syntax: "jsx" },
        { name: "NestJS", level: 75, color: "#E0234E", particleType: "nest", syntax: "typescript" }
      ],
      delay: 200,
    },
    {
      category: "Tools & Technologies",
      skills: [
        { name: "Git", level: 90, color: "#F05032", particleType: "branch", syntax: "bash" },
        { name: "GitHub", level: 85, color: "#181717", particleType: "star", syntax: "bash" },
        { name: "MySQL", level: 80, color: "#4479A1", particleType: "cylinder", syntax: "sql" },
        { name: "Google Apps Script", level: 75, color: "#4285F4", particleType: "script", syntax: "javascript" },
        { name: "LATEX", level: 70, color: "#008080", particleType: "document", syntax: "latex" }
      ],
      delay: 400,
    },
  ], [])

  // Calculate skill positions for constellation effect
  useEffect(() => {
    const updatePositions = () => {
      const positions: { [key: string]: { x: number; y: number } } = {}
      
      Object.entries(skillRefs.current).forEach(([skillName, ref]) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          const containerRect = sectionRef.current?.getBoundingClientRect()
          if (containerRect) {
            positions[skillName] = {
              x: rect.left + rect.width / 2 - containerRect.left,
              y: rect.top + rect.height / 2 - containerRect.top
            }
          }
        }
      })
      
      setSkillPositions(positions)
    }

    if (isVisible) {
      // Wait for animations to complete
      setTimeout(updatePositions, 1500)
      window.addEventListener('resize', updatePositions)
      return () => window.removeEventListener('resize', updatePositions)
    }
  }, [isVisible, sectionRef])

  // Typing animation effect
  useEffect(() => {
    if (!isVisible) return

    const allSkills = skillGroups.flatMap(group => group.skills)
    
    allSkills.forEach((skill, index) => {
      const delay = index * 150 + 500
      
      setTimeout(() => {
        let currentIndex = 0
        const typingInterval = setInterval(() => {
          if (currentIndex <= skill.name.length) {
            setTypingStates(prev => ({
              ...prev,
              [skill.name]: {
                displayText: skill.name.slice(0, currentIndex),
                isComplete: currentIndex === skill.name.length
              }
            }))
            currentIndex++
          } else {
            clearInterval(typingInterval)
          }
        }, 50)
      }, delay)
    })
  }, [isVisible, skillGroups])

  // Get progress bar shape based on skill type
  const getProgressBarShape = (skill: Skill) => {
    const shapes = {
      cpp: "linear-gradient(45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%)",
      python: "repeating-linear-gradient(45deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)",
      java: "linear-gradient(90deg, currentColor 50%, transparent 50%)",
      javascript: "radial-gradient(circle at 25% 50%, currentColor 30%, transparent 30%)",
      typescript: "linear-gradient(135deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%)",
      php: "linear-gradient(90deg, currentColor 33%, transparent 33%, transparent 66%, currentColor 66%)",
      sql: "repeating-linear-gradient(90deg, currentColor 0px, currentColor 10px, transparent 10px, transparent 20px)",
      jsx: "conic-gradient(from 45deg, currentColor 0deg, transparent 90deg, currentColor 180deg, transparent 270deg)",
      css: "linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%)",
      bash: "linear-gradient(90deg, currentColor 20%, transparent 20%, transparent 40%, currentColor 40%, currentColor 60%, transparent 60%, transparent 80%, currentColor 80%)",
      latex: "linear-gradient(0deg, currentColor 50%, transparent 50%)"
    }
    return shapes[skill.syntax as keyof typeof shapes] || "linear-gradient(90deg, currentColor 100%)"
  }

  // Particle component
  const Particle = ({ type, color, style }: { type: string; color: string; style: React.CSSProperties }) => {
    const particleShapes = {
      atom: "50%",
      snake: "2px 10px",
      hexagon: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      circle: "50%",
      square: "0%",
      triangle: "polygon(50% 0%, 0% 100%, 100% 100%)",
      diamond: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      database: "ellipse(50% 25%)",
      blade: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
      grid: "0%",
      arrow: "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)",
      nest: "50%",
      branch: "polygon(40% 0%, 60% 0%, 100% 40%, 100% 60%, 60% 100%, 40% 100%, 0% 60%, 0% 40%)",
      star: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
      cylinder: "ellipse(50% 25%)",
      script: "polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%)",
      document: "polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)"
    }

    return (
      <div
        className="absolute w-2 h-2 opacity-70 animate-pulse"
        style={{
          backgroundColor: color,
          borderRadius: type === 'snake' ? '2px 10px' : undefined,
          clipPath: particleShapes[type as keyof typeof particleShapes] || '50%',
          ...style
        }}
      />
    )
  }

  // Constellation connection lines
  const ConstellationLines = () => {
    if (!hoveredSkill || !skillPositions[hoveredSkill]) return null

    const connections = skillConnections[hoveredSkill as keyof typeof skillConnections] || []
    const hoveredSkillData = skillGroups.flatMap(g => g.skills).find(s => s.name === hoveredSkill)

    return (
      <svg 
        className="absolute inset-0 pointer-events-none z-10"
        style={{ width: '100%', height: '100%' }}
      >
        {connections.map((connectedSkill, index) => {
          const connectedPos = skillPositions[connectedSkill]
          const hoveredPos = skillPositions[hoveredSkill]
          
          if (!connectedPos || !hoveredPos) return null

          const connectedSkillData = skillGroups.flatMap(g => g.skills).find(s => s.name === connectedSkill)
          
          return (
            <g key={connectedSkill}>
              {/* Animated connection line */}
              <line
                x1={hoveredPos.x}
                y1={hoveredPos.y}
                x2={connectedPos.x}
                y2={connectedPos.y}
                stroke={hoveredSkillData?.color || '#61DAFB'}
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.6"
                className="animate-pulse"
                style={{
                  animation: `drawLine 1s ease-in-out ${index * 0.1}s both, pulse 2s ease-in-out infinite`
                }}
              />
              
              {/* Flowing particles along the line */}
              <circle
                r="3"
                fill={connectedSkillData?.color || '#61DAFB'}
                opacity="0.8"
              >
                <animateMotion
                  dur="2s"
                  repeatCount="indefinite"
                  path={`M ${hoveredPos.x} ${hoveredPos.y} L ${connectedPos.x} ${connectedPos.y}`}
                />
              </circle>
              
              {/* Connection nodes */}
              <circle
                cx={connectedPos.x}
                cy={connectedPos.y}
                r="4"
                fill={connectedSkillData?.color || '#61DAFB'}
                opacity="0.7"
                className="animate-ping"
              />
            </g>
          )
        })}
        
        {/* Central hover node */}
        <circle
          cx={skillPositions[hoveredSkill]?.x}
          cy={skillPositions[hoveredSkill]?.y}
          r="6"
          fill={hoveredSkillData?.color || '#61DAFB'}
          opacity="0.9"
          className="animate-pulse"
        />
      </svg>
    )
  }

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-6 bg-gray-900/30 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <SectionHeader
          subtitle="EXPERTISE"
          title="SKILLS & TECHNOLOGIES"
          highlightedWord="TECHNOLOGIES"
          isVisible={isVisible}
        />

        {/* Constellation background effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="constellation-bg"></div>
        </div>

        {/* Constellation connection lines */}
        <ConstellationLines />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className={`space-y-6 transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${group.delay}ms` }}
            >
              <div className="relative">
                <h3 className="text-xl font-bold text-yellow-400 mb-6 text-center">
                  {group.category}
                </h3>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                {group.skills.map((skill, skillIndex) => {
                  const typingState = typingStates[skill.name] || { displayText: '', isComplete: false }
                  const IconComponent = getSkillIcon(skill.name)
                  const isConnected = hoveredSkill && skillConnections[hoveredSkill as keyof typeof skillConnections]?.includes(skill.name)
                  
                  return (
                    <div
                      key={skill.name}
                      ref={el => { skillRefs.current[skill.name] = el }}
                      className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border transition-all duration-500 hover:transform hover:scale-105 hover:shadow-lg overflow-hidden ${
                        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                      } ${
                        hoveredSkill === skill.name 
                          ? "border-yellow-400 shadow-yellow-400/30 scale-105 z-30" 
                          : isConnected 
                          ? "border-blue-400/60 shadow-blue-400/20 scale-102 z-20" 
                          : "border-gray-700/50 hover:border-yellow-400/50 hover:shadow-yellow-400/20"
                      }`}
                      style={{ 
                        transitionDelay: `${group.delay + skillIndex * 100}ms`,
                        animation: isVisible ? `slideInScale 0.8s ease-out ${group.delay + skillIndex * 100}ms both` : 'none',
                        boxShadow: hoveredSkill === skill.name ? `0 0 20px ${skill.color}40` : undefined
                      }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div 
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                              hoveredSkill === skill.name ? "scale-125 rotate-12" : "group-hover:scale-110"
                            }`}
                            style={{ 
                              backgroundColor: `${skill.color}20`, 
                              border: `2px solid ${skill.color}`,
                              boxShadow: hoveredSkill === skill.name ? `0 0 15px ${skill.color}60` : undefined
                            }}
                          >
                            <IconComponent 
                              size={16} 
                              style={{ color: skill.color }}
                              className={`transition-transform duration-300 ${
                                hoveredSkill === skill.name ? "rotate-180" : "group-hover:rotate-6"
                              }`}
                            />
                          </div>
                          <span className="text-gray-200 font-medium font-mono">
                            <span className="syntax-highlight" data-language={skill.syntax}>
                              {typingState.displayText}
                            </span>
                            {!typingState.isComplete && <span className="animate-pulse">|</span>}
                          </span>
                        </div>
                        <span className="text-yellow-400 text-sm font-semibold">{skill.level}%</span>
                      </div>
                      
                      {/* Morphing progress bar */}
                      <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden relative">
                        <div 
                          className="h-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: isVisible ? `${skill.level}%` : '0%',
                            background: getProgressBarShape(skill),
                            color: skill.color,
                            transitionDelay: `${group.delay + skillIndex * 100 + 300}ms`
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-end pr-2 text-xs font-mono text-gray-400">
                          {skill.syntax === 'javascript' && '{;}'}
                          {skill.syntax === 'python' && ':'}
                          {skill.syntax === 'java' && '();'}
                          {skill.syntax === 'cpp' && '};'}
                          {skill.syntax === 'php' && '?>'}
                          {skill.syntax === 'sql' && ';'}
                        </div>
                      </div>
                      
                      {/* Enhanced particle system */}
                      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                        hoveredSkill === skill.name ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}>
                        <Particle 
                          type={skill.particleType} 
                          color={skill.color} 
                          style={{ 
                            top: '10%', 
                            right: '10%', 
                            animationDelay: '0s',
                            animation: 'constellation-float 3s ease-in-out infinite'
                          }} 
                        />
                        <Particle 
                          type={skill.particleType} 
                          color={skill.color} 
                          style={{ 
                            bottom: '10%', 
                            left: '10%', 
                            animationDelay: '1s',
                            animation: 'constellation-float 3s ease-in-out infinite reverse'
                          }} 
                        />
                        <Particle 
                          type={skill.particleType} 
                          color={skill.color} 
                          style={{ 
                            top: '50%', 
                            left: '50%', 
                            animationDelay: '0.5s',
                            animation: 'constellation-float 3s ease-in-out infinite'
                          }} 
                        />
                        
                        {/* Special constellation effects */}
                        {skill.name === 'React' && (
                          <>
                            <Particle type="atom" color="#61DAFB" style={{ top: '20%', left: '20%', animation: 'orbit 2s linear infinite' }} />
                            <Particle type="atom" color="#61DAFB" style={{ top: '60%', right: '20%', animation: 'orbit 2s linear infinite reverse' }} />
                          </>
                        )}
                        {skill.name === 'Python' && (
                          <Particle type="snake" color="#3776AB" style={{ top: '30%', right: '30%', animation: 'snake 4s ease-in-out infinite' }} />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slideInScale {
          0% {
            opacity: 0;
            transform: translateX(30px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes constellation-float {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-15px) rotate(180deg) scale(1.2); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(25px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(25px) rotate(-360deg); }
        }
        
        @keyframes snake {
          0%, 100% { transform: translateX(0) scaleX(1); }
          25% { transform: translateX(8px) scaleX(1.3); }
          50% { transform: translateX(-8px) scaleX(0.7); }
          75% { transform: translateX(5px) scaleX(1.1); }
        }
        
        @keyframes drawLine {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        
        .constellation-bg {
          background: radial-gradient(circle at 25% 25%, rgba(97, 218, 251, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 75% 75%, rgba(255, 193, 7, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 50% 50%, rgba(55, 118, 171, 0.1) 0%, transparent 50%);
          animation: constellation-bg 10s ease-in-out infinite;
        }
        
        @keyframes constellation-bg {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
        }
        
        .syntax-highlight[data-language="javascript"] { color: #f7df1e; }
        .syntax-highlight[data-language="python"] { color: #3776ab; }
        .syntax-highlight[data-language="java"] { color: #ed8b00; }
        .syntax-highlight[data-language="cpp"] { color: #00599c; }
        .syntax-highlight[data-language="typescript"] { color: #3178c6; }
        .syntax-highlight[data-language="php"] { color: #777bb4; }
        .syntax-highlight[data-language="sql"] { color: #4479a1; }
        .syntax-highlight[data-language="jsx"] { color: #61dafb; }
        .syntax-highlight[data-language="css"] { color: #7952b3; }
        .syntax-highlight[data-language="bash"] { color: #f05032; }
        .syntax-highlight[data-language="latex"] { color: #008080; }
      `}</style>
    </section>
  )
}