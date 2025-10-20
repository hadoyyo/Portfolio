"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// flags
const PolandFlag = () => (
  <svg viewBox="0 0 640 480" width="20" height="16">
    <g fillRule="evenodd">
      <path fill="#fff" d="M640 480H0V0h640z"/>
      <path fill="#dc143c" d="M640 480H0V240h640z"/>
    </g>
  </svg>
)

const USFlag = () => (
  <svg viewBox="0 0 640 480" width="20" height="16">
    <path fill="#bd3d44" d="M0 0h640v480H0"/>
    <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/>
    <path fill="#192f5d" d="M0 0h364.8v258.5H0"/>
    <marker id="us-a" markerHeight="30" markerWidth="30">
      <path fill="#fff" d="m15 0 9.3 28.6L0 11h30L5.7 28.6"/>
    </marker>
    <path fill="none" markerMid="url(#us-a)" d="m0 0 16 11h61 61 61 61 60L47 37h61 61 60 61L16 63h61 61 61 61 60L47 89h61 61 60 61L16 115h61 61 61 61 60L47 141h61 61 60 61L16 166h61 61 61 61 60L47 192h61 61 60 61L16 218h61 61 61 61 60L0 0"/>
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

      setIsScrolled(currentScrollY > 50)

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
    onLanguageChange(lang);
    setIsLanguageMenuOpen(false);
    setIsOpen(false);
  }

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
            </div>

            {/* Desktop Navigation */}
            <div className={`hidden md:flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-2xl transition-all duration-500 whitespace-nowrap ${
              isScrolled 
                ? "bg-black/40 backdrop-blur-sm border border-white/10 shadow-lg" 
                : "bg-black/0 backdrop-blur-none border-transparent"
            }`}>
              {navItems[currentLanguage].map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium hover:bg-white/10 cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
              
              <div className="relative" ref={languageMenuRef}>
                <button
                  onClick={toggleLanguageMenu}
                  className="text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium hover:bg-white/10 cursor-pointer flex items-center gap-2"
                >
                  {currentLanguage === 'pl' ? <PolandFlag /> : <USFlag />}
                  <span className="text-sm font-medium">
                    {currentLanguage === 'pl' ? 'PL' : 'EN'}
                  </span>
                </button>
                
                {/* Language Dropdown Menu */}
                {isLanguageMenuOpen && (
                  <div className="absolute left-0 top-full mt-2 w-40 rounded-lg bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden z-50">
                    <button
                      onClick={() => handleLanguageSelect('pl')}
                      className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center gap-3 backdrop-blur-sm ${
                        currentLanguage === 'pl' 
                          ? 'bg-white/20 text-white' 
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <PolandFlag />
                      <div className="flex flex-col">
                        <span className="font-medium">Polski</span>
                      </div>
                    </button>
                    <button
                      onClick={() => handleLanguageSelect('en')}
                      className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center gap-3 backdrop-blur-sm ${
                        currentLanguage === 'en' 
                          ? 'bg-white/20 text-white' 
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <USFlag />
                      <div className="flex flex-col">
                        <span className="font-medium">English</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className={`md:hidden ml-auto transition-opacity duration-300 ${
              isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className={`text-white hover:text-white/80 transition-all duration-500 cursor-pointer ${
                  isScrolled 
                    ? "bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60" 
                    : "bg-black/0 backdrop-blur-none border-transparent hover:bg-white/10"
                }`}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Sidebar*/}
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 z-50 md:hidden transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "#111113" }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-end p-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-white/80 hover:bg-white/10 cursor-pointer"
            >
              <X className="h-8 w-8" />
            </Button>
          </div>
          
          <nav className="flex flex-col gap-4 px-6 py-8 flex-1">
            {navItems[currentLanguage].map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-white px-6 py-4 rounded-lg hover:bg-white/10 transition-colors text-3xl font-medium text-left cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="p-6">
            <h3 className="text-white text-lg font-medium mb-4 tracking-wider text-center">
              {currentLanguage === 'pl' ? 'Wybierz język' : 'Select Language'}
            </h3>
            <div className="flex gap-3">
              <button
                onClick={() => handleLanguageSelect('pl')}
                className={`flex-1 flex flex-col items-center justify-center gap-2 py-3 rounded-lg border transition-all cursor-pointer ${
                  currentLanguage === 'pl' 
                    ? 'bg-white/10 text-white border-white/30' 
                    : 'text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                <PolandFlag />
                <span className="font-semibold">Polski</span>
              </button>
              <button
                onClick={() => handleLanguageSelect('en')}
                className={`flex-1 flex flex-col items-center justify-center gap-2 py-3 rounded-lg border transition-all cursor-pointer ${
                  currentLanguage === 'en' 
                    ? 'bg-white/10 text-white border-white/30' 
                    : 'text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                <USFlag />
                <span className="font-semibold">English</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}