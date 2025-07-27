'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image';



export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setOpen(!open)


  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, []);


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
          <div className="relative h-8 md:h-10 w-[120px]">
            <Image
              src="/getaxelogobkgd.svg"
              alt="GetAxe.Tech logo"
              fill
              className="object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
              priority
            />
          </div>


          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-6 text-sm font-medium">
            {['branding', 'content', 'designing', 'development', 'marketing', 'buy Leads'].map((item) => (
              <li key={item}>
                <a
                  // href={`/${item}`}
                  href={item.toLowerCase() === 'buy leads' ? '/lead-gen' : `/${item}`}

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
              {['branding', 'content', 'designing', 'development', 'marketing', 'buy Leads'].map((item) => (
                <li key={item}>
                  <a
                    // href={`/${item}`}
                    href={item.toLowerCase() === 'buy leads' ? '/lead-gen' : `/${item}`}

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
