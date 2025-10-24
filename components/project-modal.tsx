"use client"

import { useState, useEffect, useRef } from "react"
import { X, ExternalLink, Github, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  technologies: string[]
  image: string
  logo: string
  websiteUrl: string | null
  githubUrl?: string
  galleryImages?: string[]
}

interface ProjectDetailsPanelProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
  language: 'pl' | 'en'
}

export function ProjectDetailsPanel({ project, isOpen, onClose, language }: ProjectDetailsPanelProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null)

  const translations = {
    pl: {
      projectDescription: "Opis projektu",
      technologies: "Technologie",
      website: "Strona internetowa",
      github: "GitHub"
    },
    en: {
      projectDescription: "Project Description",
      technologies: "Technologies",
      website: "Website",
      github: "GitHub"
    }
  }

  const t = translations[language]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setCurrentImageIndex(0)
      setIsClosing(false)
      setTimeout(() => setIsVisible(true), 10)
    } else {
      setIsVisible(false)
      setTimeout(() => {
        document.body.style.overflow = 'unset'
      }, 300)
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!thumbnailsContainerRef.current || !project?.galleryImages) return

    const container = thumbnailsContainerRef.current
    const thumbnailWidth = 128
    const gap = 12
    const totalWidth = thumbnailWidth + gap
    
    const scrollPosition = currentImageIndex * totalWidth - (container.clientWidth / 2) + (thumbnailWidth / 2)
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    })
  }, [currentImageIndex, project?.galleryImages])

  const handleClose = () => {
    setIsClosing(true)
    setIsVisible(false)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 300)
  }

  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (!thumbnailsContainerRef.current) return

    const container = thumbnailsContainerRef.current
    const scrollAmount = 200

    if (direction === 'left') {
      container.scrollLeft -= scrollAmount
    } else {
      container.scrollLeft += scrollAmount
    }
  }

  const canScrollLeft = () => {
    if (!thumbnailsContainerRef.current) return false
    return thumbnailsContainerRef.current.scrollLeft > 0
  }

  const canScrollRight = () => {
    if (!thumbnailsContainerRef.current) return false
    const container = thumbnailsContainerRef.current
    return container.scrollLeft < container.scrollWidth - container.clientWidth
  }

  if (!project || (!isOpen && !isClosing)) return null

  const galleryImages = project.galleryImages || [project.image]
  const hasMultipleImages = galleryImages.length > 1

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    )
  }

  const getTechLogo = (techName: string) => {
    const logoMap: { [key: string]: string } = {
      "React": "/react-logo.png",
      "Next.js": "/nextjs-logo.png",
      "TypeScript": "/typescript-logo.png",
      "Node.js": "/nodejs-logo.webp",
      "MongoDB": "/mongodb-logo.svg",
      "Express.js": "/express-logo.webp",
      "PostgreSQL": "/postgresql-logo.png",
      "MySQL": "/mysql-logo.png",
      "Docker": "/docker-logo.png",
      "Tailwind": "/tailwind-logo.svg",
      "Kotlin": "/kotlin-logo.png",
      "Swift": "/swift-logo.svg",
      "JavaScript": "/js-logo.svg",
      "Python": "/python-logo.svg",
      "PHP": "/php-logo.png",
      "HTML": "/html-logo.png",
      "CSS": "/css-logo.png",
      "Bootstrap": "/bootstrap-logo.svg",
    }
    return logoMap[techName] || "/other-bg.png"
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Panel */}
      <div className={`
        fixed bottom-0 left-0 right-0 z-50 bg-[#111113] border-t border-border rounded-t-2xl h-[95vh] overflow-hidden
        transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between py-3 px-3 sm:px-6 border-border">
            <div className="flex items-center gap-1">
              <div className="w-24 h-24 rounded-lg flex items-center justify-center">
                <img
                  src={project.logo}
                  alt={`${project.title} logo`}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mr-2">{project.title}</h2>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-white hover:text-white/80 hover:bg-white/10 cursor-pointer"
            >
              <X className="h-8 w-8" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              {/* Left Column - Gallery */}
              <div className="space-y-6">
                {/* Main Image */}
                  <div className="relative rounded-xl overflow-hidden flex items-center justify-center min-h-[300px] max-h-[60vh]">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={galleryImages[currentImageIndex]}
                        src={galleryImages[currentImageIndex]}
                        alt={`${project.title} - Image ${currentImageIndex + 1}`}
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="max-w-full max-h-[60vh] w-auto h-auto object-contain rounded-xl"
                      />
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    {hasMultipleImages && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={prevImage}
                          className="absolute left-1 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white cursor-pointer"
                        >
                          <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={nextImage}
                          className="absolute right-1 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white cursor-pointer"
                        >
                          <ArrowRight className="h-5 w-5" />
                        </Button>
                      </>
                    )}
                  </div>

                {/* Thumbnails */}
                {hasMultipleImages && (
                <div className="relative">

                    <div className="flex justify-between items-center mb-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => scrollThumbnails('left')}
                        disabled={!canScrollLeft()}
                        className="h-8 w-8 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    <div className="text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {galleryImages.length}
                    </div>
                    
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => scrollThumbnails('right')}
                        disabled={!canScrollRight()}
                        className="h-8 w-8 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    </div>

                    <div
                    ref={thumbnailsContainerRef}
                    className="flex gap-3 overflow-x-hidden scroll-smooth"
                    >
                    {galleryImages.map((image, index) => (
                        <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative rounded-lg overflow-hidden aspect-video w-32 flex-shrink-0 border-2 transition-all cursor-pointer ${
                            index === currentImageIndex 
                            ? 'border-2 border-white' 
                            : 'border-transparent hover:border-white/10'
                        }`}
                        >
                        <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        </button>
                    ))}
                    </div>
                </div>
                )}
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                {/* Long Description */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">{t.projectDescription}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">{t.technologies}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="text-sm px-3 py-2 bg-accent/20 rounded-full border border-border flex items-center gap-2 text-white"
                      >
                        <img
                          src={getTechLogo(tech)}
                          alt={`${tech} logo`}
                          className="w-4 h-4 object-contain"
                        />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4">
                  {project.websiteUrl != null && (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {t.website}
                    </a>
                  )}
                  
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-accent/20 border border-border rounded-lg hover:bg-accent/30 transition-colors cursor-pointer text-white gray-btn"
                    >
                      <Github className="h-4 w-4" />
                      {t.github}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}