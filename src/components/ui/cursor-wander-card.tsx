import * as React from "react"
import { useState, useEffect, useRef } from "react"
// import Image from "next/image"
// import logo from "/assets/logo.png"

interface CosmicNebulaMastercardProps {
  cardholderName?: string
  className?: string
  theme?: {
    primaryColor?: string
    secondaryColor?: string
    glowColor?: string
  }
  logoText?: {
    topText?: string
    bottomText?: string
  }
  height?: string | number
  width?: string | number
  phoneNumber?: string
  email?: string
  address?: string
  website?: string
  logoSrc?: string
}

const CosmicNebulaMastercard: React.FC<CosmicNebulaMastercardProps> = ({
  cardholderName = "Faizal Vahora",
  className = "",
  theme = {
    primaryColor: "#FFD700", // Bright gold/yellow
    secondaryColor: "#000", // Dark black
    glowColor: "rgba(255, 215, 0, 0.7)", // Gold/yellow glow
  },
  logoText = { topText: "The One Branding", bottomText: "Lets Make Your Business A Brand" },
  height = "310px",
  width = "480px",
  phoneNumber = "+91 81609 21279",
  email = "info@theonebranding.com",
  address = "T-3, Central hub, Indira Gandhi Marg, 100 Feet Rd, Near Jio Petrol Pump, Anand, Gujarat - 388001",
  website = "https://theonebranding.com",
  logoSrc = "/assets/blacklogo.png",

}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [time, setTime] = useState(0)
  const [imageError, setImageError] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const timeAnimationRef = useRef<number>(0)
  const rotationRef = useRef({ x: 15, y: 20, z: 5 })
  const rotationSpeedRef = useRef({ x: 0.2, y: 0.3, z: 0.05 })

  // Animation loop for continuous rotation when not hovered
  const animate = () => {
    if (!cardRef.current || isHovered) return

    rotationRef.current.x += rotationSpeedRef.current.x
    rotationRef.current.y += rotationSpeedRef.current.y
    rotationRef.current.z += rotationSpeedRef.current.z

    // Limit rotation angles to create a nice swaying effect
    if (Math.abs(rotationRef.current.x) > 15) rotationSpeedRef.current.x *= -1
    if (Math.abs(rotationRef.current.y) > 15) rotationSpeedRef.current.y *= -1
    if (Math.abs(rotationRef.current.z) > 5) rotationSpeedRef.current.z *= -1

    cardRef.current.style.transform = `
      rotateX(${rotationRef.current.x}deg) 
      rotateY(${rotationRef.current.y}deg) 
      rotateZ(${rotationRef.current.z}deg)
    `

    animationRef.current = requestAnimationFrame(animate)
  }

  // Animation for time-based effects
  const animateTime = () => {
    setTime((prev) => prev + 0.01)
    timeAnimationRef.current = requestAnimationFrame(animateTime)
  }

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()

      // Calculate mouse position relative to the center of the card
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate the angle between mouse and card center
      const angleX = ((e.clientY - centerY) / (rect.height / 2)) * 50 // Increased rotation range
      const angleY = (-(e.clientX - centerX) / (rect.width / 2)) * 50 // Increased rotation range

      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })

      // Apply the rotation directly for smoother movement
      if (card) {
        card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) rotateZ(${Math.min(Math.abs(angleX) + Math.abs(angleY), 20) / 10}deg)`
      }
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
      cancelAnimationFrame(animationRef.current)
    }

    const handleMouseLeave = () => {
      // Reset the card position and restart the animation
      setIsHovered(false)
      animationRef.current = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (card) {
        setDimensions({
          width: card.offsetWidth,
          height: card.offsetHeight,
        })
      }
    }

    handleResize()
    animationRef.current = requestAnimationFrame(animate)
    timeAnimationRef.current = requestAnimationFrame(animateTime)

    // Using document for tracking mouse movement for a more fluid experience
    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationRef.current)
      cancelAnimationFrame(timeAnimationRef.current)
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("resize", handleResize)
    }
  }, [isHovered])

  // Handle logo image loading error
  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div ref={containerRef} className={`perspective-3000 ${className}`} style={{ perspective: "3000px" }}>
      <div
        ref={cardRef}
        className="relative"
        style={{
          transition: "transform 0.1s ease-out",
          transformStyle: "preserve-3d",
          width: width,
          height: height,
        }}
      >
        {/* Card with yellow and black cosmic design */}
        <div
          className="absolute w-full h-full rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: "linear-gradient(15deg, #222222 0%, #000000 50%, #222222 100%)",
            boxShadow: `0 25px 50px -12px ${theme.glowColor}`,
          }}
        >
          {/* Enhanced cosmic background with dynamic nebula effect - yellow/gold tones */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at ${50 + Math.sin(time * 0.5) * 30}% ${50 + Math.cos(time * 0.7) * 30}%, ${theme.glowColor} 0%, transparent 70%),
                radial-gradient(circle at ${50 + Math.cos(time * 0.3) * 40}% ${50 + Math.sin(time * 0.4) * 40}%, rgba(255, 215, 0, 0.5) 0%, transparent 60%),
                radial-gradient(circle at ${50 + Math.sin(time * 0.6) * 35}% ${50 + Math.cos(time * 0.5) * 35}%, rgba(255, 235, 59, 0.5) 0%, transparent 55%)
              `,
              opacity: 0.9,
            }}
          />

          {/* Enhanced dynamic aurora effect with gold/yellow tones */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at ${80 + Math.sin(time * 0.4) * 20}% ${20 + Math.cos(time * 0.3) * 20}%, rgba(255, 255, 0, 0.3) 0%, transparent 90%),
                radial-gradient(ellipse at ${20 + Math.cos(time * 0.5) * 20}% ${70 + Math.sin(time * 0.6) * 20}%, rgba(255, 255, 59, 0.4) 0%, transparent 90%),
                radial-gradient(ellipse at ${60 + Math.sin(time * 0.7) * 30}% ${40 + Math.cos(time * 0.8) * 30}%, rgba(255, 253, 7, 0.5) 0%, transparent 90%)
              `,
              mixBlendMode: "screen",
            }}
          />

          {/* Enhanced particle effect with more cosmic dust */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="particles-container"></div>
          </div>

          {/* Enhanced card holographic effect with gold */}
          <div
            className="absolute inset-0 animate-holographicShift"
            style={{
              background:
                "linear-gradient(105deg, transparent 0%, rgba(255, 255, 0, 0.2)  0%, rgba(255, 215, 0, 0.5) 100%, rgba(255, 215, 0, 0.5) 100%, transparent 100%)",
              backgroundSize: "200% 200%",
            }}
          />

          {/* Enhanced star field effect with cosmic depth */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="stars-small"></div>
            <div className="stars-medium"></div>
            <div className="stars-large"></div>
            <div className="stars-twinkle"></div>
          </div>

          
          {/* Logo in top left with enhanced cosmic design */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center">
            <div className="text-white text-xs sm:text-sm font-bold">
              <div className="flex items-center gap-4 md:gap-2 sm:gap-3">               
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm text-brand-black">{logoText.topText}</span>                 
                  <span className="text-xs sm:text-sm text-brand-black">{logoText.bottomText}</span>
                </div>
                <div className="flex flex-col ml-12 md:ml-24">
                  <span className="text-xs sm:text-sm text-brand-black">{cardholderName}</span>                 
                  <span className="text-xs sm:text-sm text-brand-black">{phoneNumber}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-24 md:left-24 top-2 md:-top-6">
              {!imageError ? (
                  <img
                    src={logoSrc || "/assets/blacklogo.png"}
                    alt="Logo"
                    className="w-72 h-72 md:h-80 md:w-80 rounded-full"
                    onError={handleImageError}
                    width={40}
                    height={40}
                  />
                ) : (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-yellow-600 text-black font-bold">
                    TOB
                  </div>
                )}
          </div>
         
          {/* Card holder name, phone number, email, address, and website */}          
          <div className="absolute bottom-4 sm:bottom-4 left-0 w-full px-6 sm:px-6">
            <div className="text-brand-black tracking-wider text-xs font-bold sm:text-sm">{cardholderName}</div>            
            <div className="text-brand-black tracking-wider text-xs font-bold sm:text-sm">Ph. Number: {phoneNumber}</div>
            <div className="text-brand-black tracking-wider font-bold text-xs sm:text-sm">Email: {email}</div>
            <div className="text-brand-black tracking-wider text-xs font-bold sm:text-sm">Address: {address}</div>
            {/* <div className="text-brand-black tracking-wider text-xs font-bold sm:text-sm">Website: {website}</div> */}
          </div>
         
        </div>
      </div>

      <style>
        {`
        @keyframes holographicShift {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        
        @keyframes aurora {
          0% { transform: translate(5%, 5%) scale(1.0); opacity: 0.7; }
          50% { transform: translate(-5%, -5%) scale(1.2); opacity: 0.9; }
          100% { transform: translate(5%, 5%) scale(1.0); opacity: 0.7; }
        }
        
        @keyframes pulse-slow {
          0% { opacity: 0.6; }
          50% { opacity: 0.9; }
          100% { opacity: 0.6; }
        }

        @keyframes pulse-glow {
          0% { filter: blur(5px) brightness(1); }
          50% { filter: blur(7px) brightness(1.3); }
          100% { filter: blur(5px) brightness(1); }
        }
        
        .stars-small, .stars-medium, .stars-large, .stars-twinkle {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .stars-small {
          background-image: radial-gradient(1px 1px at 20px 30px, #FFD700, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 40px 70px, #FFD700, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 50px 160px, #FFD700, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 90px 40px, #FFD700, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 130px 80px, #FFD700, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 160px 120px, #FFD700, rgba(0,0,0,0));
          background-size: 200px 200px;
          opacity: 0.4;
        }
        
        .stars-medium {
          background-image: radial-gradient(1.5px 1.5px at 150px 150px, #FFD700, rgba(0,0,0,0)),
                          radial-gradient(1.5px 1.5px at 220px 220px, #FFD700, rgba(0,0,0,0)),
                          radial-gradient(1.5px 1.5px at 80px 250px, #FFD700, rgba(0,0,0,0)),
                          radial-gradient(1.5px 1.5px at 180px 80px, #FFD700, rgba(0,0,0,0));
          background-size: 300px 300px;
          opacity: 0.4;
        }
        
        .stars-large {
          background-image: radial-gradient(2px 2px at 100px 100px, #FFD700, rgba(0,0,0,0)),
                          radial-gradient(2px 2px at 200px 200px, #FFD700, rgba(0,0,0,0)),
                          radial-gradient(2px 2px at 300px 300px, #FFD700, rgba(0,0,0,0));
          background-size: 400px 400px;
          opacity: 0.5;
          animation: stars-move 100s linear infinite;
        }

        .stars-twinkle {
          background-image: radial-gradient(2px 2px at 50px 50px, rgba(255,215,0,0.8), rgba(0,0,0,0)),
                          radial-gradient(2px 2px at 150px 150px, rgba(255,215,0,0.8), rgba(0,0,0,0)),
                          radial-gradient(2px 2px at 250px 250px, rgba(255,215,0,0.8), rgba(0,0,0,0));
          background-size: 300px 300px;
          opacity: 0;
          animation: twinkle 4s ease-in-out infinite alternate;
        }

        .particles-container {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(1px 1px at 10% 10%, rgba(255,215,0,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 15% 15%, rgba(255,215,0,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 20% 20%, rgba(255,235,59,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 25% 25%, rgba(255,215,0,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 30% 30%, rgba(255,235,59,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 35% 35%, rgba(255,215,0,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 40% 40%, rgba(255,235,59,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 45% 45%, rgba(255,215,0,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 50% 50%, rgba(255,235,59,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 55% 55%, rgba(255,215,0,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 60% 60%, rgba(255,235,59,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 65% 65%, rgba(255,215,0,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 70% 70%, rgba(255,235,59,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 75% 75%, rgba(255,215,0,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 80% 80%, rgba(255,235,59,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 85% 85%, rgba(255,215,0,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 90% 90%, rgba(255,235,59,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 95% 95%, rgba(255,215,0,0.8), rgba(0,0,0,0));
          background-size: 150% 150%;
          animation: particles-float 20s ease infinite;
          opacity: 0.6;
        }
        
        @keyframes stars-move {
          0% { background-position: 0px 0px, 0px 0px, 0px 0px; }
          100% { background-position: 400px 400px, 300px 300px, 200px 200px; }
        }

        @keyframes twinkle {
          0% { opacity: 0.1; }
          50% { opacity: 0.7; }
          100% { opacity: 0.3; }
        }

        @keyframes particles-float {
          0% { background-position: 0% 0%; }
          50% { background-position: 75% 75%; }
          100% { background-position: 0% 0%; }
        }
        
        .animate-holographicShift {
          animation: holographicShift 5s ease infinite;
        }
        
        .animate-aurora {
          animation: aurora 15s ease infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .perspective-3000 {
          perspective: 3000px;
        }
        
      `}
      </style>
    </div>
  )
}

export default CosmicNebulaMastercard