"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas, useThree } from "@react-three/fiber"
import { useGLTF, Html, Environment, OrbitControls, Float } from "@react-three/drei"
import { NeonButton } from "@/components/ui/neon-button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

// 3D Model for the tutorial
function PhoneModel({ rotation = [0, 0, 0] }) {
  const { scene } = useGLTF("/assets/3d/duck.glb")
  const { viewport } = useThree()

  // Adjust scale based on viewport
  const scale = Math.min(0.5, viewport.width / 10)

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <primitive object={scene} scale={[scale, scale, scale]} rotation={rotation} position={[0, -0.5, 0]} />
    </Float>
  )
}

// Feature highlight component
function FeatureHighlight({ position, children, color = "#4299e1" }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.7} />
      </mesh>
      <Html position={[0.2, 0, 0]} transform>
        <div className="bg-black/80 backdrop-blur-md p-3 rounded-lg border border-white/10 text-white w-48">
          {children}
        </div>
      </Html>
    </group>
  )
}

// Tutorial steps
const tutorialSteps = [
  {
    title: "Welcome to StudentSocial",
    description: "This interactive tutorial will guide you through the key features of your dashboard.",
    modelRotation: [0, 0, 0],
    highlights: [],
  },
  {
    title: "Navigation",
    description: "Access the curved edge navigation by tapping the blue indicator on the side of your screen.",
    modelRotation: [0, Math.PI / 4, 0],
    highlights: [
      {
        position: [1, 0, 0],
        content: "Tap the blue edge indicator to open the navigation menu",
        color: "#4299e1",
      },
    ],
  },
  {
    title: "Dashboard",
    description: "Your home screen shows your personalized feed and recommendations.",
    modelRotation: [0, Math.PI / 2, 0],
    highlights: [
      {
        position: [0, 0.5, 1],
        content: "View your feed and stay updated with your connections",
        color: "#4299e1",
      },
    ],
  },
  {
    title: "Journal",
    description: "Keep track of your thoughts, ideas, and academic progress.",
    modelRotation: [0, Math.PI, 0],
    highlights: [
      {
        position: [0, 0, 1],
        content: "Create journal entries with different categories and moods",
        color: "#9f7aea",
      },
    ],
  },
  {
    title: "Resume Builder",
    description: "Create and manage your professional resume with our intuitive tools.",
    modelRotation: [0, -Math.PI / 2, 0],
    highlights: [
      {
        position: [-1, 0.5, 0],
        content: "Build your resume and export it as a PDF",
        color: "#48bb78",
      },
    ],
  },
  {
    title: "Referrals",
    description: "Discover and share opportunities with your fellow students.",
    modelRotation: [0, 0, 0],
    highlights: [
      {
        position: [0, -0.5, 1],
        content: "Find internships, jobs, scholarships, and events",
        color: "#ecc94b",
      },
    ],
  },
]

export function DashboardTutorial() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  // Listen for custom event to open tutorial
  useEffect(() => {
    const handleOpenTutorial = () => setIsOpen(true)
    document.addEventListener("open-tutorial", handleOpenTutorial)
    return () => document.removeEventListener("open-tutorial", handleOpenTutorial)
  }, [])

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsOpen(false)
      setCurrentStep(0)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentTutorialStep = tutorialSteps[currentStep]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full h-full max-w-4xl max-h-[80vh] rounded-xl overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            {/* 3D Canvas */}
            <div className="absolute inset-0">
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <PhoneModel rotation={currentTutorialStep.modelRotation} />

                {currentTutorialStep.highlights.map((highlight, index) => (
                  <FeatureHighlight key={index} position={highlight.position} color={highlight.color}>
                    {highlight.content}
                  </FeatureHighlight>
                ))}

                <Environment preset="city" />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={0.5} />
              </Canvas>
            </div>

            {/* Tutorial content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-gray-200">
              <h2 className="text-2xl font-bold mb-2 neon-text-blue">{currentTutorialStep.title}</h2>
              <p className="text-gray-300 mb-4">{currentTutorialStep.description}</p>

              <div className="flex justify-between items-center">
                <NeonButton
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  variant="ghost"
                  neonColor="blue"
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </NeonButton>

                <div className="flex gap-1">
                  {tutorialSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full ${index === currentStep ? "bg-neon-blue" : "bg-gray-600"}`}
                    />
                  ))}
                </div>

                <NeonButton onClick={nextStep} variant="neon" neonColor="blue" className="gap-2">
                  {currentStep === tutorialSteps.length - 1 ? "Finish" : "Next"}
                  {currentStep === tutorialSteps.length - 1 ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </NeonButton>
              </div>
            </div>

            {/* Close button */}
            <NeonButton
              className="absolute top-4 right-4"
              variant="ghost"
              neonColor="pink"
              size="icon"
              onClick={() => {
                setIsOpen(false)
                setCurrentStep(0)
              }}
            >
              <X className="h-5 w-5" />
            </NeonButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
