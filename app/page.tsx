"use client"

import { Navbar } from "@/components/navbar"
import { ProjectDetailsPanel } from "@/components/project-modal"
import { Github, Linkedin, Mail, Facebook, ArrowUpRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import { translations, Language } from "@/data/translations"
import { getProjects, Project } from "@/data/projects"

export default function Home() {
  const [currentOtherLogo, setCurrentOtherLogo] = useState(0);
  const [logoKey, setLogoKey] = useState(0);
  const [activeProject, setActiveProject] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectPanelOpen, setIsProjectPanelOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('pl');
  const projectsRef = useRef<HTMLDivElement>(null);
  
  const otherLogos = ["/Portfolio/git-logo.png", "/Portfolio/express-logo.webp", "/Portfolio/bootstrap-logo.svg", "/Portfolio/docker-logo.png", "/Portfolio/mongodb-logo.svg", "/Portfolio/typescript-logo.png", "/Portfolio/mysql-logo.png", "/Portfolio/python-logo.svg", "/Portfolio/nextjs-logo.png", "/Portfolio/tailwind-logo.svg", "/Portfolio/php-logo.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoKey(prev => prev + 1);
      setTimeout(() => {
        setCurrentOtherLogo((prev) => (prev + 1) % otherLogos.length);
      }, 50);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const t = translations[language];
  const projects = getProjects(language);

  const skills = t.skills.map((skill, index) => ({
    ...skill,
    logo: [
      "/Portfolio/react-logo.png",
      "/Portfolio/kotlin-logo.png",
      "/Portfolio/js-logo.svg",
      "/Portfolio/nodejs-logo.webp",
      "/Portfolio/swift-logo.svg",
      "/Portfolio/css-logo.png",
      "/Portfolio/html-logo.png",
      otherLogos[currentOtherLogo]
    ][index],
    background: [
      "/Portfolio/react-bg.webp",
      "/Portfolio/kotlin-bg.webp",
      "/Portfolio/javascript-bg.webp",
      "/Portfolio/nodejs-bg.webp",
      "/Portfolio/swift-bg.webp",
      "/Portfolio/css-bg.webp",
      "/Portfolio/html-bg.webp",
      "/Portfolio/other-bg.webp"
    ][index],
    hoverBorder: [
      "hover:border-blue-400/60",
      "hover:border-pink-400/60",
      "hover:border-yellow-500/60",
      "hover:border-green-500/60",
      "hover:border-red-400/60",
      "hover:border-blue-400/60",
      "hover:border-orange-500/60",
      "hover:border-gray-600/60"
    ][index]
  }));

  const handleProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setIsProjectPanelOpen(true);
  };

  const handleCloseProjectPanel = () => {
    setIsProjectPanelOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  useEffect(() => {
    let timeoutId: number;
    
    const switchThresholds = [0, 8, 14, 21.5, 27, 34, 40, 47, 53.5, 60, 67, 73, 79, 86, 92];
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        if (!projectsRef.current) return;

        const scrollPosition = window.scrollY;
        const projectsSection = projectsRef.current;
        const windowHeight = window.innerHeight;
        
        const sectionTop = projectsSection.offsetTop;
        const sectionHeight = projectsSection.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        const viewportCenter = scrollPosition + windowHeight / 2;

        if (viewportCenter < sectionTop || viewportCenter > sectionBottom) {
          return;
        }

        const scrollProgress = (viewportCenter - sectionTop) / sectionHeight;
        const progressPercent = scrollProgress * 100;
        
        let activeProjectIndex = 0;
        for (let i = switchThresholds.length - 1; i >= 0; i--) {
          if (progressPercent >= switchThresholds[i]) {
            activeProjectIndex = i;
            break;
          }
        }

        if (activeProjectIndex >= 0 && activeProjectIndex < projects.length) {
          setActiveProject(activeProjectIndex + 1);
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [projects.length]);

  return (
    <div className="min-h-screen">
       <Navbar onLanguageChange={handleLanguageChange} currentLanguage={language} />

      {/* Project Details Panel */}
      <ProjectDetailsPanel
        project={selectedProject}
        isOpen={isProjectPanelOpen}
        onClose={handleCloseProjectPanel}
        language={language}
      />

       <section 
        id="start" 
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 relative"
      >
        <div 
          className="absolute inset-0 sm:hidden"
          style={{
            backgroundImage: 'url(/Portfolio/background-mobile.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        <div 
          className="absolute inset-0 hidden sm:block"
          style={{
            backgroundImage: 'url(/Portfolio/background-main.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="relative rounded-full p-1 bg-gradient-to-r from-blue-800 to-green-700 animate-gradient-x">
                <img
                  src="/Portfolio/profile.jpg"
                  alt="Hubert Jędruchniewicz"
                  className="w-22 h-22 sm:w-26 sm:h-26 rounded-full object-cover shadow-lg border-background"
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance">{t.hero.title}</h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 text-balance">
            {t.hero.subtitle}
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="rounded-full cursor-pointer"
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t.hero.projectsButton}
            </Button>
            <Button
              size="lg"
              className="rounded-full gray-btn cursor-pointer"
              variant="outline"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t.hero.contactButton}
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 dot-pattern"
        style={{ backgroundColor: "#18191B" }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8">{t.about.title}</h2>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            {t.about.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <h2 className="mt-12 mb-8 text-2xl sm:text-3xl font-bold">{t.technologies}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`relative rounded-lg p-6 min-h-[180px] group border-1 hover:-translate-y-2 hover:border-1 transition-all duration-300 overflow-hidden shadow-sm ${skill.hoverBorder}`}
                style={{
                  backgroundImage: `url(${skill.background})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div 
                  className="absolute top-0 left-0 w-60 h-60"
                  style={{
                    background: 'radial-gradient(circle at top left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.01) 70%, transparent 80%)'
                  }}
                >
                  <div className="relative w-full h-full flex items-start justify-start pl-4 pt-4">
                    {skill.name === "Inne" || skill.name === "Other" ? (
                      <img
                        key={logoKey}
                        src={skill.logo}
                        alt={`${skill.name} logo`}
                        className="w-10 h-10 object-contain animate-backdrop-slide"
                      />
                    ) : (
                      <img
                        src={skill.logo}
                        alt={`${skill.name} logo`}
                        className="w-10 h-10 object-contain"
                      />
                    )}
                  </div>
                </div>
                
                <div className="text-right mb-4 relative z-20">
                  <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                </div>
                
                <p className="text-white text-sm leading-relaxed mt-8 relative z-20">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
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
                              "React": "/Portfolio/react-logo.png",
                              "React Native": "/Portfolio/react-logo.png",
                              "Next.js": "/Portfolio/nextjs-logo.png",
                              "TypeScript": "/Portfolio/typescript-logo.png",
                              "Node.js": "/Portfolio/nodejs-logo.webp",
                              "MongoDB": "/Portfolio/mongodb-logo.svg",
                              "Express.js": "/Portfolio/express-logo.webp",
                              "PostgreSQL": "/Portfolio/postgresql-logo.png",
                              "MySQL": "/Portfolio/mysql-logo.png",
                              "Docker": "/Portfolio/docker-logo.png",
                              "Tailwind": "/Portfolio/tailwind-logo.svg",
                              "Kotlin": "/Portfolio/kotlin-logo.png",
                              "Swift": "/Portfolio/swift-logo.svg",
                              "JavaScript": "/Portfolio/js-logo.svg",
                              "Python": "/Portfolio/python-logo.svg",
                              "PHP": "/Portfolio/php-logo.png",
                              "HTML": "/Portfolio/html-logo.png",
                              "CSS": "/Portfolio/css-logo.png",
                              "Bootstrap": "/Portfolio/bootstrap-logo.svg",
                              "Expo": "/Portfolio/expo-logo.png"
                            };
                            return logoMap[techName] || "/Portfolio/other-bg.png";
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

          {/* Mobile Layout */}
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
                            "React": "/Portfolio/react-logo.png",
                            "React Native": "/Portfolio/react-logo.png",
                            "Next.js": "/Portfolio/nextjs-logo.png",
                            "TypeScript": "/Portfolio/typescript-logo.png",
                            "Node.js": "/Portfolio/nodejs-logo.webp",
                            "MongoDB": "/Portfolio/mongodb-logo.svg",
                            "Express.js": "/Portfolio/express-logo.webp",
                            "PostgreSQL": "/Portfolio/postgresql-logo.png",
                            "MySQL": "/Portfolio/mysql-logo.png",
                            "Docker": "/Portfolio/docker-logo.png",
                            "Tailwind": "/Portfolio/tailwind-logo.svg",
                            "Kotlin": "/Portfolio/kotlin-logo.png",
                            "Swift": "/Portfolio/swift-logo.svg",
                            "JavaScript": "/Portfolio/js-logo.svg",
                            "Python": "/Portfolio/python-logo.svg",
                            "PHP": "/Portfolio/php-logo.png",
                            "HTML": "/Portfolio/html-logo.png",
                            "CSS": "/Portfolio/css-logo.png",
                            "Bootstrap": "/Portfolio/bootstrap-logo.svg",
                            "Expo": "/Portfolio/expo-logo.png"
                          };
                          return logoMap[techName] || "/Portfolio/other-bg.png";
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

      {/* Contact Section */}
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

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-muted-foreground border-t border-border">
        <p>{t.footer}</p>
      </footer>
    </div>
  )
}
