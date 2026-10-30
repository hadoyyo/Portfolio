"use client"

import { Navbar } from "@/components/navbar"
import { ProjectDetailsPanel } from "@/components/project-modal"
import { Github, Linkedin, Mail, Facebook, ArrowUpRight, MessageCircle } from "lucide-react"
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
  const projectsRef = useRef<HTMLDivElement>(null)
  
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

  const t = translations[language]
  const projects = getProjects(language)



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
      

      
      <Navbar onLanguageChange={handleLanguageChange} currentLanguage={language} />

      
      <ProjectDetailsPanel
        project={selectedProject}
        isOpen={isProjectPanelOpen}
        onClose={handleCloseProjectPanel}
        language={language}
      />

      
      <section 
        id="start" 
        className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative bg-white pattern-grid overflow-hidden"
      >
        
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-red-500/5 via-rose-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          
          <div className="mb-8 relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-br from-[#d40027] via-rose-500 to-zinc-900 shadow-xl group-hover:scale-105 transition-transform duration-300">
              <img
                src={getAssetPath("/profile.jpg")}
                alt="Hubert Jędruchniewicz"
                className="w-full h-full rounded-full object-cover border-2 border-white"
              />
            </div>
          </div>
          
          
          <h1 className="font-plakat text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-zinc-950 mb-6 text-balance leading-none">
            Hubert Jędruchniewicz<span className="text-[#d40027]">.</span>
          </h1>

          
          <p className="font-founders text-xl sm:text-2xl text-zinc-600 mb-10 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            {t.hero.subtitle}
          </p>

          
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Button
              size="lg"
              className="btn-crimson rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-6 h-auto cursor-pointer"
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span>{t.hero.projectsButton}</span>
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              className="btn-outline-custom rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-6 h-auto cursor-pointer"
              variant="outline"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t.hero.contactButton}
            </Button>
          </div>

          
          <div className="mt-14 w-full max-w-3xl flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-zinc-500 text-xs font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="text-[#d40027] font-black text-base">
                15+ {language === 'pl' ? 'Projektów' : 'Projects'}
              </span>
            </div>
            <span className="text-zinc-300">•</span>
            <div className="flex items-center gap-2">
              <span className="text-[#d40027] font-black text-base">Full-Stack Craft</span>
            </div>
            <span className="text-zinc-300">•</span>
            <div className="flex items-center gap-2">
              <span className="text-[#d40027] font-black text-base">Software Engineer</span>
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
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="relative rounded-2xl p-6 overflow-hidden group flex flex-col justify-between min-h-[190px] bg-white border border-zinc-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
              >
                
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 pointer-events-none"
                  style={{
                    backgroundImage: `url('${skill.background}')`
                  }}
                />

                
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-200/80 p-2 flex items-center justify-center shadow-2xs group-hover:scale-110 group-hover:bg-white group-hover:border-white group-hover:shadow-md transition-all duration-300 overflow-hidden">
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
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 group-hover:text-white/70 font-semibold transition-colors duration-300">
                    0{index + 1}
                  </span>
                </div>
                
                <div className="relative z-10">
                  <h4 className="font-plakat text-xl font-black text-zinc-950 group-hover:text-white mb-1 transition-colors duration-300">
                    {skill.name}
                  </h4>
                  <p className="font-founders text-zinc-500 group-hover:text-zinc-200 text-xs leading-relaxed line-clamp-3 transition-colors duration-300">
                    {skill.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section 
        id="projects" 
        ref={projectsRef}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative"
      >
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10"></div>
        
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12">{t.projects.title}</h2>
          
          <div className="hidden lg:flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2 space-y-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="min-h-[70vh] flex flex-col justify-center py-8"
                >
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-background/50 flex items-center justify-center">
                        <img
                          src={project.logo}
                          alt={`${project.title} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold mb-1">{project.title}</h3>
                      <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {project.technologies.map((tech) => {
                          const getTechLogo = (techName: string) => {
                            const logoMap: { [key: string]: string } = {
                              "React": "/react-logo.png",
                              "React Native": "/react-logo.png",
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
                              "Expo": "/expo-logo.png"
                            };
                            return logoMap[techName] || "/other-bg.png";
                          };

                          return (
                            <span 
                              key={tech}
                              className="text-xs px-4 py-2 bg-accent/20 rounded-full border border-border flex items-center gap-2"
                            >
                              <img
                                src={getTechLogo(tech)}
                                alt={`${tech} logo`}
                                className="w-4 h-4 object-contain"
                              />
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                      <div className="pt-6 inline-flex gap-4 items-center">
                        <Button
                          size="lg"
                          className="rounded-lg cursor-pointer"
                          variant="default"
                          onClick={() => handleProjectDetails(project)}
                        >
                          {t.projects.moreButton} <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button
                          size="lg"
                          className="rounded-lg gray-btn cursor-pointer"
                          variant="outline"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                        >
                          <Github className="mr-2 h-4 w-4" />
                          {t.projects.githubButton}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:w-1/2 sticky top-1/4 h-[500px]">
              <div className="relative w-full h-full rounded-xl overflow-visible">
                {projects.map((project) => (
                  <img
                    key={project.id}
                    src={project.image}
                    alt={project.title}
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                      project.id === activeProject ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          
          <div className="lg:hidden space-y-8">
            {projects.map((project) => {
              const mobileImage = project.image.replace('.png', '-mobile.png').replace('.webp', '-mobile.webp');
              
              return (
                <div
                  key={project.id}
                  className="overflow-hidden"
                >
                  <div className="h-64 sm:h-80 w-full">
                    <img
                      src={mobileImage}
                      alt={project.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="p-6 border border-border rounded-xl">
                    <div className="flex gap-4 items-start mb-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-lg bg-background/50 flex items-center justify-center">
                          <img
                            src={project.logo}
                            alt={`${project.title} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground mb-4 text-base leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap mb-6">
                      {project.technologies.map((tech) => {
                        const getTechLogo = (techName: string) => {
                          const logoMap: { [key: string]: string } = {
                            "React": "/react-logo.png",
                            "React Native": "/react-logo.png",
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
                            "Expo": "/expo-logo.png"
                          };
                          return logoMap[techName] || "/other-bg.png";
                        };

                        return (
                          <span 
                            key={tech}
                            className="text-xs px-3 py-1 bg-accent/20 rounded-full border border-border flex items-center gap-2"
                          >
                            <img
                              src={getTechLogo(tech)}
                              alt={`${tech} logo`}
                              className="w-4 h-4 object-contain"
                            />
                            {tech}
                          </span>
                        );
                      })}
                    </div>

                    <div className="flex flex-col flex-row gap-3">
                      <Button
                        size="lg"
                        className="rounded-lg cursor-pointer flex-1"
                        variant="default"
                        onClick={() => handleProjectDetails(project)}
                      >
                        {t.projects.moreButton} <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        size="lg"
                        className="rounded-lg gray-btn cursor-pointer flex-1"
                        variant="outline"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        {t.projects.githubButton}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      <section
        id="contact"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 dot-pattern relative"
      >
        <div className="absolute top-0 left-0 right-0 h-90 bg-gradient-to-b from-[#0A0A0A] to-transparent z-10"></div>
        
        <div 
          className="absolute inset-0 sm:hidden"
          style={{
            backgroundImage: 'url(/Portfolio/background-contact-mobile.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: "#18191B"
          }}
        ></div>
        
        <div 
          className="absolute inset-0 hidden sm:block"
          style={{
            backgroundImage: 'url(/Portfolio/background-contact.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: "#18191B"
          }}
        ></div>
        
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8">{t.contact.title}</h2>
          <p className="text-xl text-muted-foreground mb-12 text-balance">
            {t.contact.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <a
              href="mailto:hubert.jedruchniewicz@interia.pl"
              className="flex items-center gap-3 px-6 py-3 bg-background/50 backdrop-blur-sm border border-border rounded-lg hover:border-accent transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>{t.contact.email}</span>
            </a>
            <a
              href="https://wa.me/48883364605"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-background/50 backdrop-blur-sm border border-border rounded-lg hover:border-accent transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{t.contact.phone}</span>
            </a>
          </div>

          <div className="flex gap-6 justify-center">
            <a
              href="https://github.com/hadoyyo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-background/50 backdrop-blur-sm border border-border rounded-lg hover:border-accent transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/hubert-j%C4%99druchniewicz-711166267/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-background/50 backdrop-blur-sm border border-border rounded-lg hover:border-accent transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://www.facebook.com/hubert.jedruchniewicz"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-background/50 backdrop-blur-sm border border-border rounded-lg hover:border-accent transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </a>
          </div>
        </div>
      </section>

      
      <footer className="py-8 px-4 text-center text-muted-foreground border-t border-border">
        <p>{t.footer}</p>
      </footer>

    </div>
  )
}
