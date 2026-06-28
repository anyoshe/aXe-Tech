'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, Phone, Briefcase } from 'lucide-react'
import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// -----------------------------
// Type Definitions
// -----------------------------
type MenuItem = {
  label: string
  href: string
  description?: string
  icon?: string
}

type MenuGroup = {
  title: string
  items?: MenuItem[]
  href?: string
  featured?: boolean
}

// -----------------------------
// Navbar Component
// -----------------------------
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const toggleMenu = () => setOpen(!open)

  const handleDropdownEnter = (group: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(group)
  }

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 200)
  }

  useEffect(() => {
    const el = triggerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    )

    observer.observe(el)
    return () => observer.unobserve(el)
  }, [])

  // -----------------------------
  // Enhanced Menu Groups with Projects
  // -----------------------------
  const menuGroups: MenuGroup[] = [
    {
      title: 'ICT Solutions',
      items: [
        { 
          label: 'ICT Products', 
          href: '/shop',
          description: 'Hardware & Equipment',
          icon: '💻'
        },
        { 
          label: 'Mobile Labs', 
          href: '/mobile-lab',
          description: 'Portable ICT Solutions',
          icon: '🚀'
        },
        { 
          label: 'Networking', 
          href: '/networking',
          description: 'Infrastructure & Setup',
          icon: '🌐'
        },
        { 
          label: 'School ERP', 
          href: '/school-erp',
          description: 'Management Systems',
          icon: '📊'
        },
        { 
          label: 'IT Support', 
          href: '/it-support',
          description: 'Maintenance & Services',
          icon: '🔧'
        },
      ],
    },
    {
      title: 'Digital Services',
      items: [
        { 
          label: 'Branding', 
          href: '/branding',
          description: 'Identity & Strategy',
          icon: '🎨'
        },
        { 
          label: 'UI/UX Design', 
          href: '/designing',
          description: 'User Experience',
          icon: '✨'
        },
        { 
          label: 'Web Development', 
          href: '/development',
          description: 'Custom Solutions',
          icon: '💻'
        },
        { 
          label: 'Digital Marketing', 
          href: '/marketing',
          description: 'Growth & Visibility',
          icon: '📈'
        },
      ],
    },
    { 
      title: 'Projects', 
      href: '/portfolios',
      featured: true
    },
    { 
      title: 'Blog', 
      href: '/digital-talk'
    },
    { 
      title: 'Contact', 
      href: '/contactus' 
    },
  ]

  return (
    <>
      {/* Invisible trigger for sticky effect */}
      <div ref={triggerRef} className="h-[1px]" />

      <nav
        className={clsx(
          'w-full bg-[var(--color-bg-dark)]/95 backdrop-blur-xl border-b border-white/10 transition-all duration-500 z-50',
          isSticky 
            ? 'sticky top-0 shadow-2xl shadow-black/30' 
            : 'relative'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Retained Your Original */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative h-8 md:h-10 w-[120px]">
                <Image
                  src="/getaxelogobkgd.svg"
                  alt="getaxekenya.com logo"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  style={{ filter: 'brightness(0) invert(1)' }}
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuGroups.map((group) =>
                group.items ? (
                  <div
                    key={group.title}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(group.title)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button className="flex items-center space-x-1 px-4 py-2 text-[15px] font-semibold text-gray-200 hover:text-white transition-all duration-200 rounded-lg hover:bg-white/5 group/nav-item">
                      <span className="font-semibold">{group.title}</span>
                      <ChevronDown 
                        size={16} 
                        className={clsx(
                          'transition-transform duration-200',
                          activeDropdown === group.title && 'rotate-180'
                        )} 
                      />
                    </button>

                    {/* Enhanced Dropdown */}
                    <AnimatePresence>
                      {activeDropdown === group.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute top-full left-0 mt-2 w-80 bg-gray-900/95 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl shadow-black/50 p-4 z-50"
                          onMouseEnter={() => handleDropdownEnter(group.title)}
                          onMouseLeave={handleDropdownLeave}
                        >
                          <div className="space-y-2">
                            {group.items.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-200 group/item"
                              >
                                <span className="text-lg">{item.icon}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="text-white font-semibold text-[15px] group-hover/item:text-[var(--color-accent)] transition-colors">
                                    {item.label}
                                  </div>
                                  {item.description && (
                                    <div className="text-gray-400 text-xs mt-0.5 font-medium">
                                      {item.description}
                                    </div>
                                  )}
                                </div>
                                <div className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                                  <div className="w-1 h-1 bg-[var(--color-accent)] rounded-full"></div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={group.title}
                    href={group.href!}
                    className={clsx(
                      'flex items-center space-x-2 px-4 py-2 text-[15px] font-semibold transition-all duration-200 rounded-lg group/nav-link',
                      group.featured
                        ? 'bg-gradient-to-r from-[var(--color-accent)] to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-105 font-bold'
                        : 'text-gray-200 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {group.featured && <Briefcase size={16} className="group-hover/nav-link:scale-110 transition-transform" />}
                    <span className="group-hover/nav-link:translate-x-0.5 transition-transform">
                      {group.title}
                    </span>
                  </Link>
                )
              )}

              {/* CTA Button */}
              <Link
                href="/contactus"
                className="ml-4 flex items-center space-x-2 bg-white text-gray-900 px-6 py-2.5 rounded-full text-[15px] font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group/cta"
              >
                <Phone size={16} className="group-hover/cta:scale-110 transition-transform" />
                <span>Get Quote</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {open ? (
                  <X size={20} className="text-white" />
                ) : (
                  <Menu size={20} className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden bg-gray-900/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="px-4 py-6 space-y-4">
                {menuGroups.map((group) =>
                  group.items ? (
                    <div key={group.title} className="space-y-2">
                      <div className="text-[15px] font-bold text-gray-300 uppercase tracking-wide px-2">
                        {group.title}
                      </div>
                      <div className="space-y-1">
                        {group.items.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all duration-200 group"
                          >
                            <span className="text-lg">{item.icon}</span>
                            <div>
                              <div className="text-white font-semibold text-[15px] group-hover:text-[var(--color-accent)]">
                                {item.label}
                              </div>
                              {item.description && (
                                <div className="text-gray-400 text-xs mt-0.5 font-medium">
                                  {item.description}
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={group.title}
                      href={group.href!}
                      onClick={() => setOpen(false)}
                      className={clsx(
                        'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                        group.featured
                          ? 'bg-gradient-to-r from-[var(--color-accent)] to-purple-500 text-white shadow-lg font-bold'
                          : 'text-white hover:bg-white/5 font-semibold'
                      )}
                    >
                      {group.featured && <Briefcase size={16} className="group-hover:scale-110 transition-transform" />}
                      <span className="group-hover:translate-x-1 transition-transform">
                        {group.title}
                      </span>
                    </Link>
                  )
                )}

                {/* Mobile CTA */}
                <div className="pt-4 border-t border-white/10">
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full bg-white text-gray-900 px-6 py-3 rounded-xl text-[15px] font-bold hover:bg-gray-100 transition-all duration-200 shadow-lg group/cta-mobile"
                  >
                    <Phone size={16} className="group-hover/cta-mobile:scale-110 transition-transform" />
                    <span>Get Free Quote</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}