"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const PolandFlag = () => (
  <svg viewBox="0 0 640 480" width="18" height="14" className="rounded-2xs shadow-2xs border border-zinc-300/80">
    <g fillRule="evenodd">
      <path fill="#ffffff" d="M640 480H0V0h640z"/>
      <path fill="#dc143c" d="M640 480H0V240h640z"/>
    </g>
  </svg>
)

const USFlag = () => (
  <svg viewBox="0 0 640 480" width="18" height="14" className="rounded-2xs shadow-2xs border border-zinc-300/80">
    <path fill="#bd3d44" d="M0 0h640v480H0"/>
    <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/>
    <path fill="#192f5d" d="M0 0h364.8v258.5H0"/>
  </svg>
)

interface NavbarProps {
  onLanguageChange: (language: 'pl' | 'en') => void;
  currentLanguage: 'pl' | 'en';
}

const navItems = {
  pl: [
    { name: "Start", href: "#start" },
    { name: "O mnie", href: "#about" },
    { name: "Projekty", href: "#projects" },
    { name: "Kontakt", href: "#contact" },
  ],
  en: [
    { name: "Home", href: "#start" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]
}

export function Navbar({ onLanguageChange, currentLanguage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  
  const languageMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setIsScrolled(currentScrollY > 30)

      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
        setIsOpen(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false)
      }
    }

    const handleScrollClose = () => {
      setIsLanguageMenuOpen(false)
    }

    if (isLanguageMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('scroll', handleScrollClose, { passive: true })
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('scroll', handleScrollClose)
    }
  }, [isLanguageMenuOpen])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    setIsLanguageMenuOpen(false)
    
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleLanguageSelect = (lang: 'pl' | 'en') => {
    onLanguageChange(lang)
    setIsLanguageMenuOpen(false)
    setIsOpen(false)
  }

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md border-b border-zinc-200/90 shadow-xs" 
            : "bg-white/70 backdrop-blur-xs border-b border-zinc-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            <a 
              href="#start" 
              onClick={(e) => { e.preventDefault(); handleNavClick("#start") }}
              className="flex items-center gap-1 group cursor-pointer"
              aria-label="Start"
            >
              <div className="font-plakat text-3xl sm:text-4xl tracking-tight text-zinc-950 font-black">
                HJ<span className="text-[#d40027] group-hover:scale-125 inline-block transition-transform">.</span>
              </div>
            </a>

            
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              <div className="flex items-center gap-1 bg-zinc-100/80 p-1 rounded-full border border-zinc-200/70 shadow-2xs">
                {navItems[currentLanguage].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="text-zinc-800 hover:text-[#d40027] px-4 py-1.5 rounded-full transition-all duration-200 text-xs font-bold uppercase tracking-wider hover:bg-white cursor-pointer"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            
            <div className="hidden md:flex items-center gap-3">
              
              <div className="relative" ref={languageMenuRef}>
                <button
                  onClick={toggleLanguageMenu}
                  className="bg-zinc-100/80 hover:bg-zinc-200/80 border border-zinc-200/80 text-zinc-800 px-3.5 py-1.5 rounded-full transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-2xs"
                  aria-label="Wybierz język"
                >
                  {currentLanguage === 'pl' ? <PolandFlag /> : <USFlag />}
                  <span className="font-bold text-zinc-800 tracking-wide">{currentLanguage === 'pl' ? 'PL' : 'EN'}</span>
                </button>
                
                {isLanguageMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-36 rounded-xl bg-white/95 backdrop-blur-md border border-zinc-200 shadow-xl overflow-hidden z-50 p-1.5 animate-in fade-in zoom-in-95 duration-150">
                    <button
                      onClick={() => handleLanguageSelect('pl')}
                      className={`w-full px-3 py-2 text-left text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer ${
                        currentLanguage === 'pl' 
                          ? 'bg-[#d40027] text-white' 
                          : 'text-zinc-800 hover:bg-zinc-100'
                      }`}
                    >
                      <PolandFlag />
                      <span>Polski</span>
                    </button>
                    <button
                      onClick={() => handleLanguageSelect('en')}
                      className={`w-full px-3 py-2 text-left text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer mt-0.5 ${
                        currentLanguage === 'en' 
                          ? 'bg-[#d40027] text-white' 
                          : 'text-zinc-800 hover:bg-zinc-100'
                      }`}
                    >
                      <USFlag />
                      <span>English</span>
                    </button>
                  </div>
                )}
              </div>

              
              <Button
                onClick={() => handleNavClick("#contact")}
                className="btn-crimson rounded-full text-xs font-bold uppercase tracking-wider px-5 py-2.5 flex items-center gap-1.5 cursor-pointer"
              >
                <span>{currentLanguage === 'pl' ? "Kontakt" : "Let's talk"}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </div>

            
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="text-zinc-900 hover:text-[#d40027] hover:bg-zinc-100 rounded-full cursor-pointer"
                aria-label="Menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        onClick={() => setIsOpen(false)}
      />

      
      <div
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 md:hidden transition-transform duration-300 border-l border-zinc-200 shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
            <div className="font-plakat text-3xl font-black text-black">
              HJ<span className="text-[#d40027]">.</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-zinc-700 hover:text-black hover:bg-zinc-100 rounded-full cursor-pointer"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <nav className="flex flex-col gap-2 py-8 flex-1">
            {navItems[currentLanguage].map((item, index) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="flex items-center justify-between text-left py-3 px-4 rounded-xl hover:bg-zinc-50 transition-colors cursor-pointer group"
              >
                <span className="font-plakat text-2xl font-black text-zinc-900 group-hover:text-[#d40027] transition-colors">
                  {item.name}
                </span>
                <span className="text-xs font-mono text-zinc-400 group-hover:text-[#d40027]">
                  0{index + 1}
                </span>
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-zinc-100 space-y-4">
            <Button
              onClick={() => handleNavClick("#contact")}
              className="btn-crimson w-full rounded-xl py-3 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{currentLanguage === 'pl' ? 'Napisz do mnie' : 'Contact me'}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              <button
                onClick={() => handleLanguageSelect('pl')}
                className={`flex-1 py-2.5 px-3 rounded-lg border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  currentLanguage === 'pl' 
                    ? 'bg-[#d40027] text-white border-[#d40027]' 
                    : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                }`}
              >
                <PolandFlag />
                <span>Polski</span>
              </button>
              <button
                onClick={() => handleLanguageSelect('en')}
                className={`flex-1 py-2.5 px-3 rounded-lg border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  currentLanguage === 'en' 
                    ? 'bg-[#d40027] text-white border-[#d40027]' 
                    : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                }`}
              >
                <USFlag />
                <span>English</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
