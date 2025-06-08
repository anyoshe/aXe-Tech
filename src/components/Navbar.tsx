'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'


export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setOpen(!open)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0 }
    )

    if (triggerRef.current) observer.observe(triggerRef.current)

    return () => {
      if (triggerRef.current) observer.unobserve(triggerRef.current)
    }
  }, [])

  return (
    <>
      {/* Invisible trigger just below Hero */}
      <div ref={triggerRef} className="h-[1px]" />

      <nav
        className={clsx(
          'w-full bg-[var(--color-bg-dark)]/80 backdrop-blur text-[var(--color-text-main)] shadow transition-all duration-300 z-50',
          isSticky ? 'sticky top-0' : 'relative'
        )}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <img
            src="/axe-Tech.svg"
            alt="aXe-Tech logo"
            className="h-8 md:h-10 w-auto object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-6 text-sm font-medium">
            {['branding', 'content', 'designing', 'development', 'marketing'].map((item) => (
              <li key={item}>
                <a
                  href={`/${item}`}
                  className="hover:text-[var(--color-accent)] transition-colors duration-200"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Animated Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden px-4 pb-4 space-y-3 text-sm font-medium bg-[var(--color-bg-dark)] text-[var(--color-text-main)]"
            >
              {['branding', 'content', 'designing', 'development', 'marketing'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    onClick={toggleMenu}
                    className="block py-1 hover:text-[var(--color-accent)] transition-colors duration-200"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
