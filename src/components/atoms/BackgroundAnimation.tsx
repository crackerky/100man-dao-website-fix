import { useMemo, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

interface LineSegment {
  id: number
  startX: number
  startY: number
  endX: number
  endY: number
  finalStartX: number
  finalStartY: number
  finalEndX: number
  finalEndY: number
  length: number
  angle: number
}

// Generate scattered line segments across the screen
function generateScatteredLines(count: number, screenWidth: number, screenHeight: number): LineSegment[] {
  const segments: LineSegment[] = []
  
  for (let i = 0; i < count; i++) {
    // Random position across the screen
    const centerX = Math.random() * (screenWidth - 200) + 100
    const centerY = Math.random() * (screenHeight - 200) + 100
    
    // Random angle and length for each line
    const angle = Math.random() * Math.PI * 2
    const length = 15 + Math.random() * 30 // Slightly smaller for background
    
    const startX = centerX - Math.cos(angle) * length / 2
    const startY = centerY - Math.sin(angle) * length / 2
    const endX = centerX + Math.cos(angle) * length / 2
    const endY = centerY + Math.sin(angle) * length / 2
    
    segments.push({
      id: i,
      startX,
      startY,
      endX,
      endY,
      finalStartX: startX,
      finalStartY: startY,
      finalEndX: endX,
      finalEndY: endY,
      length,
      angle
    })
  }
  
  return segments
}

// Calculate final positions to form a large circle
function calculateCirclePositions(segments: LineSegment[], centerX: number, centerY: number, radius: number): LineSegment[] {
  const totalSegments = segments.length
  const angleStep = (Math.PI * 2) / totalSegments
  
  return segments.map((segment, index) => {
    const circleAngle = index * angleStep
    const nextAngle = ((index + 1) % totalSegments) * angleStep
    
    const finalStartX = centerX + Math.cos(circleAngle) * radius
    const finalStartY = centerY + Math.sin(circleAngle) * radius
    const finalEndX = centerX + Math.cos(nextAngle) * radius
    const finalEndY = centerY + Math.sin(nextAngle) * radius
    
    return {
      ...segment,
      finalStartX,
      finalStartY,
      finalEndX,
      finalEndY
    }
  })
}

// Animated line component for background
function BackgroundLine({ segment, scrollProgress }: { segment: LineSegment, scrollProgress: any }) {
  // Interpolate positions smoothly
  const x1 = useTransform(
    scrollProgress,
    [0, 1],
    [segment.startX, segment.finalStartX]
  )
  const y1 = useTransform(
    scrollProgress,
    [0, 1],
    [segment.startY, segment.finalStartY]
  )
  const x2 = useTransform(
    scrollProgress,
    [0, 1],
    [segment.endX, segment.finalEndX]
  )
  const y2 = useTransform(
    scrollProgress,
    [0, 1],
    [segment.endY, segment.finalEndY]
  )
  
  // Background-optimized opacity (lower for readability)
  const opacity = useTransform(
    scrollProgress,
    [0, 0.3, 0.7, 1],
    [0.15, 0.25, 0.3, 0.35]
  )
  
  // Subtle stroke width for background
  const strokeWidth = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [1, 1.5, 2]
  )

  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="white"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      style={{
        opacity,
        filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.2))"
      }}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ 
        duration: 3,
        delay: segment.id * 0.03,
        ease: "easeOut"
      }}
    />
  )
}

interface BackgroundAnimationProps {
  className?: string
  opacity?: number
  autoPlay?: boolean
}

export default function BackgroundAnimation({ 
  className = "", 
  opacity = 0.4,
  autoPlay = false 
}: BackgroundAnimationProps) {
  const [screenDimensions, setScreenDimensions] = useState({ width: 1920, height: 1080 })
  const { scrollYProgress } = useScroll()
  
  // Update screen dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setScreenDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])
  
  // Smooth spring animation
  const springProgress = useSpring(scrollYProgress, { 
    stiffness: 40, 
    damping: 20,
    mass: 0.5
  })

  // Generate the scattered lines and their final positions
  const lineSegments = useMemo(() => {
    const lineCount = 48 // Optimized for background performance
    
    // Generate scattered lines
    const scattered = generateScatteredLines(lineCount, screenDimensions.width, screenDimensions.height)
    
    // Calculate final circle positions - screen center
    const finalCenterX = screenDimensions.width / 2
    const finalCenterY = screenDimensions.height / 2
    const finalRadius = Math.min(screenDimensions.width, screenDimensions.height) * 0.2 // Responsive radius
    
    return calculateCirclePositions(scattered, finalCenterX, finalCenterY, finalRadius)
  }, [screenDimensions])

  // Background-optimized phase transitions
  const unityPhase = useTransform(springProgress, [0.4, 0.7], [0, 1])
  const wavePhase = useTransform(springProgress, [0.65, 1], [0, 1])

  // Background effects (subtle)
  const backgroundIntensity = useTransform(springProgress, [0, 0.7, 1], [0.01, 0.04, 0.02])

  // Circle completion effect (subtle for background)
  const circleOpacity = useTransform(springProgress, [0.6, 0.75], [0, opacity * 0.6])
  const circleScale = useTransform(springProgress, [0.6, 0.75], [0.8, 1])
  
  // Wave ripple effects (subtle)
  const wave1Scale = useTransform(springProgress, [0.7, 0.85], [0, 2.5])
  const wave1Opacity = useTransform(springProgress, [0.7, 0.85], [opacity * 0.4, 0])
  const wave2Scale = useTransform(springProgress, [0.75, 0.9], [0, 3.5])
  const wave2Opacity = useTransform(springProgress, [0.75, 0.9], [opacity * 0.3, 0])
  const wave3Scale = useTransform(springProgress, [0.8, 0.95], [0, 4.5])
  const wave3Opacity = useTransform(springProgress, [0.8, 0.95], [opacity * 0.2, 0])

  const { width: screenWidth, height: screenHeight } = screenDimensions
  const centerX = screenWidth / 2
  const centerY = screenHeight / 2
  const finalRadius = Math.min(screenWidth, screenHeight) * 0.2

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`} style={{ opacity }}>
      {/* Subtle background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent"
        style={{ opacity: backgroundIntensity }}
      />
      
      {/* Main SVG Animation */}
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <filter id="bgGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Subtle grid pattern */}
          <pattern id="bgGrid" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="60" cy="60" r="0.5" fill="rgba(255, 255, 255, 0.02)" />
            <path d="M 120 0 L 0 0 0 120" fill="none" stroke="rgba(255, 255, 255, 0.005)" strokeWidth="0.5"/>
          </pattern>
          
          {/* Subtle center gradient */}
          <radialGradient id="bgCenterLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: "rgba(255, 255, 255, 0.1)", stopOpacity: 1 }} />
            <stop offset="70%" style={{ stopColor: "rgba(255, 255, 255, 0.02)", stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: "rgba(255, 255, 255, 0)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#bgGrid)" />
        
        {/* Render moving line segments */}
        <g filter="url(#bgGlow)">
          {lineSegments.map((segment) => (
            <BackgroundLine 
              key={segment.id}
              segment={segment} 
              scrollProgress={springProgress}
            />
          ))}
        </g>
        
        {/* Subtle circle overlay for completion */}
        <motion.g style={{ opacity: circleOpacity, scale: circleScale }}>
          <motion.circle
            cx={centerX}
            cy={centerY}
            r={finalRadius}
            fill="none"
            stroke="white"
            strokeWidth={2}
            style={{
              filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))"
            }}
            animate={{
              scale: [1, 1.005, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Inner subtle ring */}
          <motion.circle
            cx={centerX}
            cy={centerY}
            r={finalRadius * 0.7}
            fill="none"
            stroke="white"
            strokeWidth={1}
            opacity={0.4}
            style={{
              filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.2))"
            }}
            animate={{
              scale: [1, 1.01, 1],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.g>
        
        {/* Subtle water ripple wave effects */}
        <motion.g style={{ opacity: wavePhase }}>
          {/* Wave 1 */}
          <motion.circle
            cx={centerX}
            cy={centerY}
            r={finalRadius}
            fill="none"
            stroke="white"
            strokeWidth={1.5}
            style={{
              scale: wave1Scale,
              opacity: wave1Opacity,
              filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.2))"
            }}
          />
          
          {/* Wave 2 */}
          <motion.circle
            cx={centerX}
            cy={centerY}
            r={finalRadius}
            fill="none"
            stroke="white"
            strokeWidth={1}
            style={{
              scale: wave2Scale,
              opacity: wave2Opacity,
              filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.15))"
            }}
          />
          
          {/* Wave 3 */}
          <motion.circle
            cx={centerX}
            cy={centerY}
            r={finalRadius}
            fill="none"
            stroke="white"
            strokeWidth={0.5}
            style={{
              scale: wave3Scale,
              opacity: wave3Opacity,
              filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.1))"
            }}
          />
        </motion.g>
        
        {/* Subtle central core */}
        <motion.g style={{ opacity: unityPhase }}>
          <motion.circle
            cx={centerX}
            cy={centerY}
            r={3}
            fill="url(#bgCenterLight)"
            style={{
              filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))"
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.g>
      </svg>
    </div>
  )
}