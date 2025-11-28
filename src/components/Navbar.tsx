// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import { Menu, X } from 'lucide-react'
// import clsx from 'clsx'
// import { motion, AnimatePresence } from 'framer-motion'
// import Image from 'next/image';



// export default function Navbar() {
//   const [open, setOpen] = useState(false)
//   const [isSticky, setIsSticky] = useState(false)
//   const triggerRef = useRef<HTMLDivElement>(null)

//   const toggleMenu = () => setOpen(!open)


//   useEffect(() => {
//     const el = triggerRef.current;
//     if (!el) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => setIsSticky(!entry.isIntersecting),
//       { threshold: 0 }
//     );

//     observer.observe(el);

//     return () => {
//       observer.unobserve(el);
//     };
//   }, []);


//   return (
//     <>
//       {/* Invisible trigger just below Hero */}
//       <div ref={triggerRef} className="h-[1px]" />

//       <nav
//         className={clsx(
//           'w-full bg-[var(--color-bg-dark)]/80 backdrop-blur text-[var(--color-text-main)] shadow transition-all duration-300 z-50',
//           isSticky ? 'sticky top-0' : 'relative'
//         )}
//       >
//         <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
//           <div className="relative h-8 md:h-10 w-[120px]">
//             <Image
//               src="/getaxelogobkgd.svg"
//               alt="GetAxe.Tech logo"
//               fill
//               className="object-contain"
//               style={{ filter: 'brightness(0) invert(1)' }}
//               priority
//             />
//           </div>


//           {/* Mobile Toggle Button */}
//           <div className="md:hidden">
//             <button onClick={toggleMenu} aria-label="Toggle menu">
//               {open ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>

//           {/* Desktop Nav */}
//           <ul className="hidden md:flex gap-6 text-sm font-medium">
//             {['ICT-Solutions', 'branding', 'content', 'designing', 'development', 'marketing', 'buy Leads'].map((item) => (
//               <li key={item}>
//                 <a
//                   // href={`/${item}`}
//                   href={item.toLowerCase() === 'buy leads' ? '/lead-gen' : `/${item}`}

//                   className="hover:text-[var(--color-accent)] transition-colors duration-200"
//                 >
//                   {item.charAt(0).toUpperCase() + item.slice(1)}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Animated Mobile Menu */}
//         <AnimatePresence>
//           {open && (
//             <motion.ul
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.25, ease: 'easeInOut' }}
//               className="md:hidden px-4 pb-4 space-y-3 text-sm font-medium bg-[var(--color-bg-dark)] text-[var(--color-text-main)]"
//             >
//               {['branding', 'content', 'designing', 'development', 'marketing', 'buy Leads'].map((item) => (
//                 <li key={item}>
//                   <a
//                     // href={`/${item}`}
//                     href={item.toLowerCase() === 'buy leads' ? '/lead-gen' : `/${item}`}

//                     onClick={toggleMenu}
//                     className="block py-1 hover:text-[var(--color-accent)] transition-colors duration-200"
//                   >
//                     {item.charAt(0).toUpperCase() + item.slice(1)}
//                   </a>
//                 </li>
//               ))}
//             </motion.ul>
//           )}
//         </AnimatePresence>
//       </nav>
//     </>
//   )
// }

'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setOpen(!open)
  const toggleDropdown = (group: string) =>
    setOpenDropdown(openDropdown === group ? null : group)

  useEffect(() => {
    const el = triggerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0 }
    )

    observer.observe(el)
    return () => observer.unobserve(el)
  }, [])

  // -----------------------------------------
  // Define menu groups
  // -----------------------------------------
  const menuGroups = [
    {
      title: 'ICT Solutions',
      items: [
        { label: 'ICT Hardware', href: '/ict-hardware' },
        { label: 'Mobile Labs', href: '/mobile-labs' },
        { label: 'Networking', href: '/networking' },
        { label: 'School ICT Setup', href: '/school-ict-setup' },
        { label: 'ERPs & Software', href: '/software-erp' },
        { label: 'IT Support', href: '/it-support' },
      ],
    },
    {
      title: 'Digital Services',
      items: [
        { label: 'Branding', href: '/branding' },
        { label: 'UI/UX & Graphics', href: '/designing' },
        { label: 'Web Development', href: '/development' },
        { label: 'Digital Marketing', href: '/marketing' },
      ],
    },
    { title: 'Buy Leads', href: '/lead-gen' },
  ]

  return (
    <>
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

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-6 text-sm font-medium items-center">
            {menuGroups.map((group: any) =>
              'items' in group ? (
                <li key={group.title} className="relative group">
                  <button
                    className="flex items-center gap-1 hover:text-[var(--color-accent)] transition-colors duration-200"
                    onClick={() => toggleDropdown(group.title)}
                  >
                    {group.title} <ChevronDown size={16} />
                  </button>

                  {/* Dropdown */}
                  <ul className="absolute top-full left-0 mt-2 min-w-[180px] bg-[var(--color-bg-dark)] border border-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-50">
                    {group.items.map((item: any) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="block px-4 py-2 text-sm hover:bg-[var(--color-accent)]/20 transition-colors duration-200"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={group.title}>
                  <a
                    href={group.href}
                    className="hover:text-[var(--color-accent)] transition-colors duration-200"
                  >
                    {group.title}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden px-4 pb-4 space-y-3 text-sm font-medium bg-[var(--color-bg-dark)] text-[var(--color-text-main)]"
            >
              {menuGroups.map((group: any) =>
                'items' in group ? (
                  <li key={group.title}>
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex justify-between items-center px-2 py-2 hover:text-[var(--color-accent)] cursor-pointer">
                        {group.title} <ChevronDown size={16} />
                      </summary>
                      <ul className="pl-4 mt-1 space-y-1">
                        {group.items.map((item: any) => (
                          <li key={item.label}>
                            <a
                              href={item.href}
                              onClick={toggleMenu}
                              className="block py-1 hover:text-[var(--color-accent)] transition-colors duration-200"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ) : (
                  <li key={group.title}>
                    <a
                      href={group.href}
                      onClick={toggleMenu}
                      className="block py-1 hover:text-[var(--color-accent)] transition-colors duration-200"
                    >
                      {group.title}
                    </a>
                  </li>
                )
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
