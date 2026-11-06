"use client"

import { useState, useEffect, useRef } from "react"
import { X, ExternalLink, Github, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { getAssetPath } from "@/lib/assets"

interface Project {
  id: number
  title: string
  year?: string
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
  isNavbarVisible?: boolean
}

export function ProjectDetailsPanel({ project, isOpen, onClose, language, isNavbarVisible = true }: ProjectDetailsPanelProps) {
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

  const isLightLogo = (projectTitle: string) => {
    const title = projectTitle.toLowerCase()
    return title.includes('petstaytion') || title.includes('serwolift')
  }

  const getTechLogo = (techName: string) => {
    const logoMap: { [key: string]: string } = {
      "React": "/react-logo.png",
      "React Native": "/react-logo.png",
      "Next.js": "/nextjs-logo.png",
      "TypeScript": "/typescript-logo.png",
      "Node.js": "/nodejs-logo.webp",
      "MongoDB": "/mongodb-logo.svg",
      "Express.js": "/express-logo.webp",
      "PostgreSQL": "/postgre-logo.png",
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
      "Expo": "/expo-logo.png"
    }
    return getAssetPath(logoMap[techName] || "/other-bg.webp")
  }

  return (
    <>
      
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      
      <div className={`
        fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-zinc-200 shadow-2xl rounded-t-3xl overflow-hidden
        transition-all duration-300 ease-in-out
        ${isNavbarVisible ? 'h-[calc(100dvh-4.25rem)] sm:h-[95vh]' : 'h-[calc(100dvh-2.5rem)] sm:h-[95vh]'}
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}
      `}>
        <div className="flex flex-col h-full">
          
          <div className="flex items-center justify-between py-4 px-6 sm:px-8 border-b border-zinc-100">
            <div className="flex items-center gap-4">
              <div className={`flex items-center justify-center flex-shrink-0 transition-all ${
                isLightLogo(project.title)
                  ? 'w-14 h-14 sm:w-16 sm:h-16 rounded-xl p-2 bg-zinc-950 border border-zinc-800 shadow-md'
                  : 'w-14 h-14 sm:w-16 sm:h-16 p-0'
              }`}>
                <img
                  src={project.logo}
                  alt={`${project.title} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                {project.year && (
                  <span className="text-xs font-mono font-bold text-[#d40027] tracking-wider uppercase block">
                    # {project.year}
                  </span>
                )}
                <h2 className="font-plakat text-2xl sm:text-3xl font-black text-black tracking-tight">{project.title}</h2>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-full cursor-pointer h-10 w-10"
              aria-label="Zamknij"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8">
              
              <div className="space-y-4">
                
                <div className="relative rounded-xl overflow-hidden flex items-center justify-center min-h-[220px] sm:min-h-[300px] max-h-[50dvh] sm:max-h-[65vh] lg:max-h-[70vh]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={galleryImages[currentImageIndex]}
                      src={galleryImages[currentImageIndex]}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="max-w-full max-h-[50dvh] sm:max-h-[65vh] lg:max-h-[70vh] w-auto h-auto object-contain rounded-xl"
                    />
                  </AnimatePresence>

                  
                  {hasMultipleImages && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-zinc-900 border border-zinc-200/80 rounded-full shadow-md cursor-pointer h-10 w-10 hover:text-[#d40027]"
                        aria-label="Poprzednie zdjęcie"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-zinc-900 border border-zinc-200/80 rounded-full shadow-md cursor-pointer h-10 w-10 hover:text-[#d40027]"
                        aria-label="Następne zdjęcie"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </>
                  )}
                </div>

                
                {hasMultipleImages && (
                  <div className="relative pt-2">
                    <div className="flex justify-between items-center mb-2 px-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => scrollThumbnails('left')}
                        disabled={!canScrollLeft()}
                        className="h-8 w-8 text-zinc-600 hover:text-black hover:bg-zinc-100 rounded-full disabled:opacity-30 cursor-pointer"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      <div className="text-xs font-mono font-bold text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full">
                        {currentImageIndex + 1} / {galleryImages.length}
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => scrollThumbnails('right')}
                        disabled={!canScrollRight()}
                        className="h-8 w-8 text-zinc-600 hover:text-black hover:bg-zinc-100 rounded-full disabled:opacity-30 cursor-pointer"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>

                    <div
                      ref={thumbnailsContainerRef}
                      className="flex gap-3 overflow-x-hidden scroll-smooth pb-2"
                    >
                      {galleryImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative rounded-xl overflow-hidden aspect-video w-28 sm:w-32 flex-shrink-0 transition-all cursor-pointer ${
                            index === currentImageIndex 
                              ? 'border-2 border-[#d40027] ring-2 ring-red-100 scale-102' 
                              : 'border border-zinc-200 hover:border-zinc-400 opacity-70 hover:opacity-100'
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

              
              <div className="space-y-6">
                
                <div>
                  <h3 className="font-plakat text-lg uppercase tracking-tight text-zinc-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#d40027]"></span>
                    {t.projectDescription}
                  </h3>
                  <p className="font-founders text-zinc-600 text-base leading-relaxed bg-zinc-50/70 p-5 rounded-2xl border border-zinc-100">
                    {project.longDescription}
                  </p>
                </div>

                
                <div>
                  <h3 className="font-plakat text-lg uppercase tracking-tight text-zinc-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#d40027]"></span>
                    {t.technologies}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="font-vietnam text-xs font-semibold px-3.5 py-1.5 bg-white rounded-full border border-zinc-200 flex items-center gap-2 text-zinc-800 shadow-2xs hover:border-[#d40027] transition-colors"
                      >
                        <img
                          src={getTechLogo(tech)}
                          alt={`${tech} logo`}
                          className="w-4.5 h-4.5 object-contain"
                        />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                
                <div className="flex flex-wrap gap-3 pt-4 border-t border-zinc-100 items-center">
                  {project.websiteUrl != null && (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-vietnam btn-crimson h-11 px-6 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>{t.website}</span>
                    </a>
                  )}
                  
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-vietnam btn-outline-custom h-11 px-6 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                    >
                      <Github className="h-4 w-4" />
                      <span>{t.github}</span>
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
