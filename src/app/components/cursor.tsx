"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Add event listeners for mouse movement
    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    // Function to add hover listeners to elements
    const addHoverListeners = () => {
      const hoverElements = document.querySelectorAll("a, button, [role='button'], input, textarea, select")
      hoverElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter)
        el.addEventListener("mouseleave", handleMouseLeave)
      })
    }

    // Add listeners initially
    addHoverListeners()

    // Re-add listeners when DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
      addHoverListeners()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        className="cursor-dot"
        style={{
          left: `${mousePosition.x - 4}px`,
          top: `${mousePosition.y - 4}px`,
          transform: isClicking ? "scale(0.8)" : isHovering ? "scale(2)" : "scale(1)",
          backgroundColor: isHovering ? "#fbbf24" : "#facc15", // yellow-300 on hover
        }}
      />
      <div
        className="cursor-outline"
        style={{
          left: `${mousePosition.x - 16}px`,
          top: `${mousePosition.y - 16}px`,
          transform: isClicking ? "scale(0.8)" : isHovering ? "scale(1.5)" : "scale(1)",
          opacity: isHovering ? 0.8 : 0.3,
          borderColor: isHovering ? "#fbbf24" : "#facc15", // yellow-300 on hover
        }}
      />
    </>
  )
}