"use client"

import { Navbar } from "@/components/navbar"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"

export default function Home() {
  const [currentOtherLogo, setCurrentOtherLogo] = useState(0);
  const [logoKey, setLogoKey] = useState(0);
  const [activeProject, setActiveProject] = useState(1);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  const otherLogos = ["/git-logo.png", "/express-logo.webp", "bootstrap-logo.svg", "/docker-logo.png", "/mongodb-logo.svg", "/typescript-logo.png", "/mysql-logo.png", "/python-logo.svg", "/nextjs-logo.png", "/tailwind-logo.svg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoKey(prev => prev + 1);
      setTimeout(() => {
        setCurrentOtherLogo((prev) => (prev + 1) % otherLogos.length);
      }, 50);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const skills = [
    {
      name: "React",
      description: "Tworzenie nowoczesnych interfejsów użytkownika z wykorzystaniem komponentów funkcyjnych i hooks.",
      logo: "/react-logo.png",
      background: "/react-bg.png",
      hoverBorder: "hover:border-blue-400/60"
    },
    {
      name: "Kotlin",
      description: "Budowanie wydajnych aplikacji na Androida z wykorzystaniem nowoczesnych funkcji języka Kotlin.",
      logo: "/kotlin-logo.png",
      background: "/kotlin-bg.png",
      hoverBorder: "hover:border-pink-400/60"
    },
    {
      name: "JavaScript",
      description: "Wszechstronny język programowania do tworzenia dynamicznych aplikacji webowych i interaktywnych stron internetowych.",
      logo: "/js-logo.svg",
      background: "/javascript-bg.png",
      hoverBorder: "hover:border-yellow-500/60"
    },
    {
      name: "Node.js",
      description: "Tworzenie skalowalnych aplikacji backendowych i API z wykorzystaniem środowiska uruchomieniowego Node.js.",
      logo: "/nodejs-logo.webp",
      background: "/nodejs-bg.png",
      hoverBorder: "hover:border-green-500/60"
    },
    {
      name: "Swift",
      description: "Programowanie aplikacji na iOS z wykorzystaniem języka Swift i frameworku SwiftUI.",
      logo: "/swift-logo.svg",
      background: "/swift-bg.png",
      hoverBorder: "hover:border-red-400/60"
    },
    {
      name: "CSS",
      description: "Stylizowanie stron internetowych z wykorzystaniem nowoczesnych frameworków CSS i technik responsywnego designu.",
      logo: "/css-logo.png",
      background: "/css-bg.png",
      hoverBorder: "hover:border-blue-400/60"
    },
    {
      name: "HTML",
      description: "Strukturyzowanie treści stron internetowych z wykorzystaniem semantycznego HTML5.",
      logo: "/html-logo.png",
      background: "/html-bg.png",
      hoverBorder: "hover:border-orange-500/60"
    },
    {
      name: "Inne",
      description: "TypeScript, Next.js, Tailwind, MongoDB, Git, Docker i wiele innych.",
      logo: otherLogos[currentOtherLogo],
      background: "/other-bg.png",
      hoverBorder: "hover:border-gray-600/60"
    }
  ];

  const projects = [
    {
      id: 1,
      title: "Aplikacja E-commerce",
      description: "Pełnofunkcyjna platforma e-commerce z systemem płatności, koszykiem zakupowym i panelem administracyjnym. Zintegrowana z wieloma bramkami płatności i systemem zarządzania zamówieniami.",
      technologies: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Stripe"],
      image: "/project1.png"
    },
    {
      id: 2,
      title: "Aplikacja Mobilna Fitness",
      description: "Aplikacja do śledzenia treningów i diety z funkcjami społecznościowymi. Użytkownicy mogą tworzyć plany treningowe, śledzić postępy i łączyć się z trenerami.",
      technologies: ["React Native", "Expo", "TypeScript", "Firebase", "Redux"],
      image: "/project2.png"
    },
    {
      id: 3,
      title: "System Zarządzania Projektami",
      description: "Kompleksowy system do zarządzania projektami z tablicami Kanban, śledzeniem czasu, czatem zespołowym i raportowaniem. Zoptymalizowany dla zespołów zdalnych.",
      technologies: ["Vue.js", "Express.js", "PostgreSQL", "Socket.io", "JWT"],
      image: "/project3.png"
    },
    {
      id: 4,
      title: "Platforma Edukacyjna",
      description: "Interaktywna platforma do nauki online z kursami wideo, quizami i systemem certyfikacji. Zawiera funkcje śledzenia postępów i społeczności uczniowskiej.",
      technologies: ["Angular", "NestJS", "MySQL", "AWS S3", "Redis"],
      image: "/project4.png"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!projectsRef.current) return;

      const scrollPosition = window.scrollY;
      const projectsSection = projectsRef.current;
      const sectionTop = projectsSection.offsetTop - 200; // offest
      const sectionHeight = projectsSection.offsetHeight;

      const scrollProgress = (scrollPosition - sectionTop) / sectionHeight;
      
      const acceleratedProgress = Math.pow(scrollProgress, 0.8);
      const projectIndex = Math.floor(acceleratedProgress * projects.length);

      if (projectIndex >= 0 && projectIndex < projects.length) {
        setActiveProject(projectIndex + 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section 
        id="start" 
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 relative"
      >
        <div 
          className="absolute inset-0 sm:hidden"
          style={{
            backgroundImage: 'url(/background-mobile.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        <div 
          className="absolute inset-0 hidden sm:block"
          style={{
            backgroundImage: 'url(/background-main.png)',
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
                  src="/profile.jpg"
                  alt="Hubert Jędruchniewicz"
                  className="w-22 h-22 sm:w-26 sm:h-26 rounded-full object-cover shadow-lg border-background"
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance">Hubert Jędruchniewicz</h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 text-balance">
            Aplikacje webowe i mobilne
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="rounded-full cursor-pointer"
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              Zobacz projekty
            </Button>
            <Button
              size="lg"
              className="rounded-full gray-btn cursor-pointer"
              variant="outline"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Kontakt
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
          <h2 className="text-4xl sm:text-5xl font-bold mb-8">O mnie</h2>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Jestem pasjonatem tworzenia aplikacji webowych i mobilnych. Specjalizuję się w budowaniu responsywnych
              interfejsów użytkownika oraz wydajnych aplikacji full-stack.
            </p>
            <p>
               Moje doświadczenie obejmuje pracę z nowoczesnymi technologiami takimi jak React, Next.js, TypeScript, Kotlin i Swift.
            </p>
            <p>
              W wolnym czasie eksperymentuję z nowymi technologiami, tworzę proste gry komputerowe lub eksperymentuje w kuchni.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    {skill.name === "Inne" ? (
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
        {/* Gradientowy na dole */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10"></div>
        
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12">Projekty</h2>
          
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Lewa strona - Tekst projektów */}
            <div className="lg:w-1/2 space-y-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="min-h-[70vh] flex flex-col justify-center py-8"
                >
                  <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                  <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="text-xs px-4 py-2 bg-accent/20 text-accent rounded-full border border-accent/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="pt-6">
                    <Button
                      size="lg"
                      className="rounded-full cursor-pointer mr-4"
                      variant="default"
                    >
                      Zobacz demo
                    </Button>
                    <Button
                      size="lg"
                      className="rounded-full cursor-pointer"
                      variant="outline"
                    >
                      Kod źródłowy
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Prawa strona - zdjęcie */}
            <div className="lg:w-1/2 sticky top-1/4 h-[500px]">
            <div className="relative w-full h-full rounded-xl overflow-visible shadow-2xl">
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
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 dot-pattern relative"
      >
        {/* Gradientowy na górze */}
        <div className="absolute top-0 left-0 right-0 h-90 bg-gradient-to-b from-[#0A0A0A] to-transparent z-10"></div>
        
        {/* Tło dla mobilnych */}
        <div 
          className="absolute inset-0 sm:hidden"
          style={{
            backgroundImage: 'url(/background-contact-mobile.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: "#18191B"
          }}
        ></div>
        
        {/* Tło desktop */}
        <div 
          className="absolute inset-0 hidden sm:block"
          style={{
            backgroundImage: 'url(/background-contact.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: "#18191B"
          }}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8">Kontakt</h2>
          <p className="text-xl text-muted-foreground mb-12 text-balance">
            Masz pytania lub chcesz porozmawiać o projekcie? Skontaktuj się ze mną!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <a
              href="mailto:kontakt@example.com"
              className="flex items-center gap-3 px-6 py-3 bg-background/50 backdrop-blur-sm border border-border rounded-lg hover:border-accent transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>kontakt@example.com</span>
            </a>
          </div>

          <div className="flex gap-6 justify-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-background/50 backdrop-blur-sm border border-border rounded-lg hover:border-accent transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-background/50 backdrop-blur-sm border border-border rounded-lg hover:border-accent transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-background/50 backdrop-blur-sm border border-border rounded-lg hover:border-accent transition-colors"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-muted-foreground border-t border-border">
        <p>© 2025 Portfolio. Wszystkie prawa zastrzeżone.</p>
      </footer>
    </div>
  )
}