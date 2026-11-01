"use client"

import { Navbar } from "@/components/navbar"
import { ProjectDetailsPanel } from "@/components/project-modal"
import { StickerLayer, STICKER_PATHS } from "@/components/stickers"
import { Github, Linkedin, Mail, Facebook, ArrowUpRight, MessageCircle, Pin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { translations, Language } from "@/data/translations"
import { getProjects, Project } from "@/data/projects"
import { getAssetPath } from "@/lib/assets"


export default function Home() {
  const [currentOtherLogo, setCurrentOtherLogo] = useState(0)
  const [logoKey, setLogoKey] = useState(0)
  const [activeProject, setActiveProject] = useState(1)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isProjectPanelOpen, setIsProjectPanelOpen] = useState(false)
  const [language, setLanguage] = useState<Language>('pl')
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false)
  const [preloaderGone, setPreloaderGone] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const hasLoadedRef = useRef(false)
  const projectsRef = useRef<HTMLDivElement>(null)
  
  const skyCloudsPath = getAssetPath("/sky-clouds.jfif")
  
  const otherLogos = [
    getAssetPath("/git-logo.png"), 
    getAssetPath("/express-logo.webp"), 
    getAssetPath("/bootstrap-logo.svg"), 
    getAssetPath("/docker-logo.png"), 
    getAssetPath("/mongodb-logo.svg"), 
    getAssetPath("/typescript-logo.png"), 
    getAssetPath("/mysql-logo.png"), 
    getAssetPath("/python-logo.svg"), 
    getAssetPath("/nextjs-logo.png"), 
    getAssetPath("/tailwind-logo.svg"), 
    getAssetPath("/php-logo.png"),
    getAssetPath("/postgre-logo.png")
  ]

  useEffect(() => {
    
    if (typeof window !== "undefined") {
      otherLogos.forEach((src) => {
        const img = new window.Image()
        img.src = src
      })
    }

    const interval = setInterval(() => {
      setCurrentOtherLogo((prev) => (prev + 1) % otherLogos.length)
      setLogoKey((prev) => prev + 1)
    }, 2200)

    return () => clearInterval(interval)
  }, [otherLogos.length])

  useEffect(() => {
    if (!activeSkill) return

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      if (target && !target.closest("[data-tech-card]")) {
        setActiveSkill(null)
      }
    }

    window.addEventListener("pointerdown", handlePointerDown)
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [activeSkill])

  const t = translations[language]
  const projects = getProjects(language)

  useEffect(() => {
    if (typeof window === "undefined" || hasLoadedRef.current) return
    hasLoadedRef.current = true

    
    const imagesToLoad: string[] = [
      skyCloudsPath,
      ...STICKER_PATHS,
      ...projects.map((p) => p.image),
      ...projects.map((p) => p.image.replace('.png', '-mobile.png').replace('.webp', '-mobile.webp'))
    ]

    let isMounted = true
    let loadedCount = 0
    const total = imagesToLoad.length

    const onAllDone = () => {
      if (!isMounted) return
      setLoadProgress(100)
      setTimeout(() => {
        if (!isMounted) return
        setIsAssetsLoaded(true)
        setTimeout(() => {
          if (isMounted) setPreloaderGone(true)
        }, 550)
      }, 100)
    }

    const checkItem = () => {
      loadedCount++
      if (isMounted) {
        setLoadProgress(Math.round((loadedCount / total) * 100))
      }
      if (loadedCount >= total) {
        onAllDone()
      }
    }

    imagesToLoad.forEach((src) => {
      const img = new window.Image()
      img.src = src
      if (img.complete) {
        checkItem()
      } else {
        img.onload = checkItem
        img.onerror = checkItem
      }
    })

    
    const timer = setTimeout(onAllDone, 6000)

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [skyCloudsPath])

  useEffect(() => {
    if (!isAssetsLoaded) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isAssetsLoaded])

  const skills = t.skills.map((skill, index) => ({
    ...skill,
    logo: [
      getAssetPath("/react-logo.png"),
      getAssetPath("/kotlin-logo.png"),
      getAssetPath("/js-logo.svg"),
      getAssetPath("/nodejs-logo.webp"),
      getAssetPath("/swift-logo.svg"),
      getAssetPath("/css-logo.png"),
      getAssetPath("/html-logo.png"),
      otherLogos[currentOtherLogo]
    ][index],
    background: [
      getAssetPath("/react-bg.webp"),
      getAssetPath("/kotlin-bg.webp"),
      getAssetPath("/javascript-bg.webp"),
      getAssetPath("/nodejs-bg.webp"),
      getAssetPath("/swift-bg.webp"),
      getAssetPath("/css-bg.webp"),
      getAssetPath("/html-bg.webp"),
      getAssetPath("/other-bg.webp")
    ][index]
  }))

  const handleProjectDetails = (project: Project) => {
    setSelectedProject(project)
    setIsProjectPanelOpen(true)
  }

  const handleCloseProjectPanel = () => {
    setIsProjectPanelOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
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

  
  useEffect(() => {
    const switchThresholds = [0, 8, 14, 21.5, 27, 34, 40, 47, 53.5, 60, 67, 73, 79, 86, 92]
    
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!projectsRef.current) {
            ticking = false
            return
          }

          const scrollPosition = window.scrollY
          const projectsSection = projectsRef.current
          const windowHeight = window.innerHeight
          
          const sectionTop = projectsSection.offsetTop
          const sectionHeight = projectsSection.offsetHeight
          const sectionBottom = sectionTop + sectionHeight
          const viewportCenter = scrollPosition + windowHeight / 2

          if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
            const scrollProgress = (viewportCenter - sectionTop) / sectionHeight
            const progressPercent = scrollProgress * 100
            
            let activeProjectIndex = 0
            for (let i = switchThresholds.length - 1; i >= 0; i--) {
              if (progressPercent >= switchThresholds[i]) {
                activeProjectIndex = i
                break
              }
            }

            if (activeProjectIndex >= 0 && activeProjectIndex < projects.length) {
              setActiveProject(activeProjectIndex + 1)
            }
          }

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [projects.length])

  return (
    <div className="min-h-screen bg-white text-zinc-950 font-founders selection:bg-[#d40027] selection:text-white">
      
      {!preloaderGone && (
        <div
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ease-in-out ${
            isAssetsLoaded ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
          }`}
          style={{ willChange: "opacity" }}
        >
          <div className="font-plakat text-5xl font-black text-black tracking-tight select-none">
            HJ<span className="text-[#d40027] animate-pulse">.</span>
          </div>
          <div className="mt-5 w-32 h-1 bg-zinc-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#d40027] transition-all duration-150 ease-out rounded-full"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}
      
      <Navbar 
        onLanguageChange={handleLanguageChange} 
        currentLanguage={language} 
        onVisibilityChange={setIsNavbarVisible}
      />

      <ProjectDetailsPanel
        project={selectedProject}
        isOpen={isProjectPanelOpen}
        onClose={handleCloseProjectPanel}
        language={language}
        isNavbarVisible={isNavbarVisible}
      />

      
      <section 
        id="start" 
        className="min-h-[100dvh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-20 pb-8 sm:pt-24 sm:pb-16 relative bg-white pattern-grid overflow-hidden"
      >
        
        {preloaderGone && <StickerLayer />}
        
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-red-500/5 via-rose-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center w-full">
          
          <div className="mb-4 sm:mb-8 relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-br from-[#d40027] via-rose-500 to-zinc-900 shadow-xl group-hover:scale-105 transition-transform duration-300">
              <img
                src={getAssetPath("/profile.jpg")}
                alt="Hubert Jędruchniewicz"
                className="w-full h-full rounded-full object-cover border-2 border-white"
              />
            </div>
          </div>
          
          
          <h1 className="font-plakat text-3xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-zinc-950 mb-3 sm:mb-6 text-balance leading-none">
            Hubert Jędruchniewicz<span className="text-[#d40027]">.</span>
          </h1>

          
          <p className="font-founders text-base sm:text-xl lg:text-2xl text-zinc-600 mb-6 sm:mb-10 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            {t.hero.subtitle}
          </p>

          
          <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center">
            <Button
              size="lg"
              className="font-vietnam btn-crimson rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-3 sm:px-8 sm:py-6 h-auto cursor-pointer"
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span>{t.hero.projectsButton}</span>
              <ArrowUpRight className="ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
            <Button
              size="lg"
              className="font-vietnam btn-outline-custom rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-3 sm:px-8 sm:py-6 h-auto cursor-pointer"
              variant="outline"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t.hero.contactButton}
            </Button>
          </div>

          
          <div className="mt-6 sm:mt-12 w-full max-w-3xl flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5 sm:gap-8 text-zinc-500 text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest font-vietnam">
            <div className="flex items-center gap-1.5">
              <span className="font-vietnam text-[#d40027] font-black text-xs sm:text-base">
                15+ {language === 'pl' ? 'Projektów' : 'Projects'}
              </span>
            </div>
            <span className="text-zinc-300">•</span>
            <div className="flex items-center gap-1.5">
              <span className="font-vietnam text-[#d40027] font-black text-xs sm:text-base">Full-Stack Craft</span>
            </div>
            <span className="text-zinc-300">•</span>
            <div className="flex items-center gap-1.5">
              <span className="font-vietnam text-[#d40027] font-black text-xs sm:text-base">Software Engineer</span>
            </div>
          </div>
        </div>
      </section>

      
      <section
        id="about"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 bg-zinc-50/70 border-y border-zinc-200 pattern-dots relative"
      >
        <div className="max-w-5xl mx-auto w-full">
          
          <div className="mb-12">
            <h2 className="font-plakat text-4xl sm:text-6xl font-black uppercase tracking-tight text-zinc-950">
              {t.about.title}<span className="text-[#d40027]">.</span>
            </h2>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {t.about.paragraphs.map((paragraph, index) => (
              <div 
                key={index} 
                className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-xs relative flex flex-col justify-between"
              >
                <div className="text-xs font-mono font-bold text-[#d40027] mb-4">
                  [ 0{index + 1} ]
                </div>
                <p className="font-founders text-zinc-700 text-base sm:text-lg leading-relaxed">
                  {paragraph}
                </p>
              </div>
            ))}
          </div>

          
          <div className="mb-8">
            <h3 className="font-plakat text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950">
              {t.technologies}<span className="text-[#d40027]">.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => {
              const isActive = activeSkill === skill.name
              return (
                <div
                  key={skill.name}
                  data-tech-card
                  onClick={() => setActiveSkill(isActive ? null : skill.name)}
                  className={`relative rounded-2xl p-6 overflow-hidden group flex flex-col justify-between min-h-[190px] bg-white border border-zinc-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer ${
                    isActive ? "shadow-xl -translate-y-1" : ""
                  }`}
                >
                  <div 
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out pointer-events-none ${
                      isActive 
                        ? "opacity-100 scale-100" 
                        : "opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100"
                    }`}
                    style={{
                      backgroundImage: `url('${skill.background}')`
                    }}
                  />

                  <div 
                    className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30 transition-opacity duration-500 pointer-events-none ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`} 
                  />

                  <div className="relative z-10 flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl border p-2 flex items-center justify-center transition-all duration-300 overflow-hidden ${
                      isActive 
                        ? "scale-110 bg-white border-white shadow-md" 
                        : "bg-zinc-50 border-zinc-200/80 shadow-2xs group-hover:scale-110 group-hover:bg-white group-hover:border-white group-hover:shadow-md"
                    }`}>
                      {skill.name === "Inne" || skill.name === "Other" ? (
                        <img
                          key={logoKey}
                          src={otherLogos[currentOtherLogo]}
                          alt={`${skill.name} logo`}
                          className="w-8 h-8 object-contain animate-backdrop-slide"
                        />
                      ) : (
                        <img
                          src={skill.logo}
                          alt={`${skill.name} logo`}
                          className="w-8 h-8 object-contain"
                        />
                      )}
                    </div>
                    <span className={`text-[10px] font-mono uppercase tracking-widest font-semibold transition-colors duration-300 ${
                      isActive ? "text-white/70" : "text-zinc-400 group-hover:text-white/70"
                    }`}>
                      0{index + 1}
                    </span>
                  </div>
                  
                  <div className="relative z-10">
                    <h4 className={`font-plakat text-xl font-black mb-1 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-zinc-950 group-hover:text-white"
                    }`}>
                      {skill.name}
                    </h4>
                    <p className={`font-founders text-xs leading-relaxed line-clamp-3 transition-colors duration-300 ${
                      isActive ? "text-zinc-200" : "text-zinc-500 group-hover:text-zinc-200"
                    }`}>
                      {skill.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section 
        id="projects" 
        ref={projectsRef}
        className="min-h-screen px-4 sm:px-6 lg:px-8 py-24 relative"
        style={{
          backgroundImage: `url('${skyCloudsPath}')`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="max-w-7xl mx-auto w-full relative z-20">
          
          <div className="mb-14">
            <h2 className="font-plakat text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-zinc-950 drop-shadow-2xs">
              {t.projects.title}<span className="text-[#d40027]">.</span>
            </h2>
          </div>
          
          
          <div className="hidden lg:flex flex-row gap-12 items-stretch relative">
            
            <div className="lg:w-1/2 space-y-12">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project.id)}
                  className="min-h-[70vh] flex flex-col justify-center py-6 cursor-pointer"
                >
                  <div className={`p-8 rounded-3xl backdrop-blur-md border transition-all duration-300 shadow-xl relative overflow-visible ${
                    project.id === activeProject 
                      ? 'bg-white/95 border-[#d40027]/50 ring-4 ring-[#d40027]/10 scale-[1.01]' 
                      : 'bg-white/85 border-white/80 hover:bg-white/95'
                  }`}>
                    
                    <AnimatePresence>
                      {project.id === activeProject && (
                        <motion.div
                          key={`pin-${project.id}`}
                          initial={{ 
                            opacity: 0, 
                            y: -48, 
                            x: 20,
                            scale: 1.6,
                            rotate: 60
                          }}
                          animate={{ 
                            opacity: 1, 
                            y: 0, 
                            x: 0, 
                            scale: 1, 
                            rotate: 42
                          }}
                          exit={{ 
                            opacity: 0, 
                            y: -40, 
                            x: 18, 
                            scale: 0.8, 
                            rotate: 55,
                            transition: { duration: 0.22, ease: "easeIn" }
                          }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 450, 
                            damping: 20 
                          }}
                          className="absolute -top-3 -right-3 sm:-top-3.5 sm:-right-3.5 z-20 pointer-events-none"
                        >
                          <Pin 
                            className="w-8 h-8 sm:w-9 sm:h-9 text-[#d40027] fill-[#d40027]" 
                            strokeWidth={2}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="flex items-center justify-between mb-6">
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
                          <span className="text-xs font-mono font-bold text-[#d40027] tracking-wider uppercase">
                            #{project.id < 10 ? `0${project.id}` : project.id} / 15
                          </span>
                          <h3 className="font-plakat text-3xl font-black text-zinc-950 tracking-tight">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    
                    <p className="font-founders text-zinc-600 mb-6 text-base leading-relaxed">
                      {project.description}
                    </p>

                    
                    <div className="flex gap-2 flex-wrap mb-8">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="font-vietnam text-xs font-semibold px-3.5 py-1.5 bg-white/90 rounded-full border border-zinc-200/90 flex items-center gap-2 text-zinc-800 shadow-2xs"
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

                    
                    <div className="flex gap-3 items-center pt-2 border-t border-zinc-100" onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="lg"
                        className="font-vietnam btn-crimson rounded-full text-xs font-bold uppercase tracking-wider px-6 h-11 inline-flex items-center justify-center cursor-pointer"
                        onClick={() => handleProjectDetails(project)}
                      >
                        <span>{t.projects.moreButton}</span>
                        <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                      </Button>
                      {project.githubUrl && (
                        <Button
                          size="lg"
                          className="font-vietnam btn-outline-custom rounded-full text-xs font-bold uppercase tracking-wider px-6 h-11 inline-flex items-center justify-center cursor-pointer"
                          variant="outline"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                        >
                          <Github className="mr-1.5 h-3.5 w-3.5" />
                          <span>{t.projects.githubButton}</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            
            <div className="lg:w-1/2 relative">
              <div className="sticky top-1/4 h-[500px] w-full flex items-center justify-center">
                <div className="relative w-full h-full rounded-xl overflow-visible">
                  {projects.map((project) => (
                    <img
                      key={project.id}
                      src={project.image}
                      alt={project.title}
                      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                        project.id === activeProject ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          
          <div className="lg:hidden space-y-8">
            {projects.map((project) => {
              const mobileImage = project.image.replace('.png', '-mobile.png').replace('.webp', '-mobile.webp')
              
              return (
                <div
                  key={project.id}
                  className="bg-white/95 backdrop-blur-md rounded-3xl border border-white/80 shadow-xl overflow-hidden"
                >
                  <div className="h-64 sm:h-80 w-full bg-zinc-50 p-4 flex items-center justify-center border-b border-zinc-100">
                    <img
                      src={mobileImage}
                      alt={project.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex gap-4 items-center mb-4">
                      <div className="flex-shrink-0">
                        <div className={`flex items-center justify-center transition-all ${
                          isLightLogo(project.title)
                            ? 'w-12 h-12 sm:w-14 sm:h-14 rounded-xl p-2 bg-zinc-950 border border-zinc-800 shadow-md'
                            : 'w-12 h-12 sm:w-14 sm:h-14 p-0'
                        }`}>
                          <img
                            src={project.logo}
                            alt={`${project.title} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <span className="text-[10px] font-mono font-bold text-[#d40027] tracking-wider uppercase">
                          #{project.id < 10 ? `0${project.id}` : project.id}
                        </span>
                        <h3 className="font-plakat text-2xl font-black text-zinc-950">{project.title}</h3>
                      </div>
                    </div>

                    <p className="font-founders text-zinc-600 mb-6 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex gap-2 flex-wrap mb-6">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="font-vietnam text-xs font-semibold px-3.5 py-1.5 bg-zinc-100 rounded-full border border-zinc-200 flex items-center gap-2 text-zinc-800"
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

                    <div className="flex gap-3 items-center">
                      <Button
                        size="lg"
                        className="font-vietnam btn-crimson rounded-full text-xs font-bold uppercase tracking-wider flex-1 h-11 inline-flex items-center justify-center cursor-pointer"
                        onClick={() => handleProjectDetails(project)}
                      >
                        <span>{t.projects.moreButton}</span>
                        <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                      </Button>
                      {project.githubUrl && (
                        <Button
                          size="lg"
                          className="font-vietnam btn-outline-custom rounded-full text-xs font-bold uppercase tracking-wider flex-1 h-11 inline-flex items-center justify-center cursor-pointer"
                          variant="outline"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                        >
                          <Github className="mr-1 h-3.5 w-3.5" />
                          <span>{t.projects.githubButton}</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 bg-white pattern-grid relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto text-center relative z-20 w-full">
          <h2 className="font-plakat text-5xl sm:text-7xl font-black uppercase tracking-tight text-zinc-950 mb-6">
            {t.contact.title}<span className="text-[#d40027]">.</span>
          </h2>

          <p className="font-founders text-lg sm:text-xl text-zinc-600 mb-12 max-w-xl mx-auto font-normal text-balance">
            {t.contact.description}
          </p>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-12">
            <a
              href="mailto:hubert.jedruchniewicz@interia.pl"
              className="portfolio-card p-6 rounded-2xl flex items-center gap-4 group cursor-pointer text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#d40027] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#d40027] group-hover:text-white transition-all">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <span className="font-vietnam text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Email
                </span>
                <span className="font-vietnam font-bold text-sm text-zinc-900 group-hover:text-[#d40027] transition-colors">
                  {t.contact.email}
                </span>
              </div>
            </a>

            <a
              href="https://wa.me/48883364605"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-card p-6 rounded-2xl flex items-center gap-4 group cursor-pointer text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <span className="font-vietnam text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                  WhatsApp / Tel
                </span>
                <span className="font-vietnam font-bold text-sm text-zinc-900 group-hover:text-[#d40027] transition-colors">
                  {t.contact.phone}
                </span>
              </div>
            </a>
          </div>

          
          <div className="flex gap-4 justify-center items-center">
            <a
              href="https://github.com/hadoyyo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 bg-white border border-zinc-200 rounded-full text-zinc-700 hover:text-white hover:bg-black hover:border-black transition-all shadow-xs cursor-pointer"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/hubert-j%C4%99druchniewicz-711166267/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 bg-white border border-zinc-200 rounded-full text-zinc-700 hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5] transition-all shadow-xs cursor-pointer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/hubert.jedruchniewicz"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 bg-white border border-zinc-200 rounded-full text-zinc-700 hover:text-white hover:bg-[#1877f2] hover:border-[#1877f2] transition-all shadow-xs cursor-pointer"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      
      <footer className="py-8 px-4 border-t border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-founders">
          <div className="font-plakat text-2xl font-black text-black">
            HJ<span className="text-[#d40027]">.</span>
          </div>
          <p className="text-zinc-500 text-xs text-center sm:text-right font-medium">
            {t.footer}
          </p>
        </div>
      </footer>
    </div>
  )
}
