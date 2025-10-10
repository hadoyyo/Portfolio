"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Start", href: "#start" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Sprawdzanie czy użytkownik przewinął stronę
      setIsScrolled(currentScrollY > 50)

      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        // Scrolling up or at top
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false)
        setIsOpen(false) // Close mobile menu when hiding navbar
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    // Smooth scroll to section
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
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
            {/* Logo or empty space on left */}
            <div className="flex-shrink-0">
              {/* Możesz tutaj dodać logo w przyszłości */}
            </div>

            {/* Desktop Navigation - wyśrodkowany z tłem na dużych ekranach tylko przy scrollu */}
            <div className={`hidden md:flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-2xl transition-all duration-500 ${
              isScrolled 
                ? "bg-black/40 backdrop-blur-sm border border-white/10 shadow-lg" 
                : "bg-black/0 backdrop-blur-none border-transparent"
            }`}>
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium hover:bg-white/10 cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button - po prawej stronie, ukrywany gdy menu jest otwarte */}
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

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm md:hidden transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "#111113" }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-white/80 hover:bg-white/10 cursor-pointer"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex flex-col gap-2 px-4 py-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-white px-4 py-4 rounded-lg hover:bg-white/10 transition-colors text-2xl font-medium text-left cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}