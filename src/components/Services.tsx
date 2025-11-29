"use client";

import { motion, Variants } from "framer-motion";
import {
  Laptop,
  Network,
  Server,
  Layers,
  Wrench,
  // Palette,
  // PenTool,
  // Code2,
  // Megaphone,
} from "lucide-react";
import Image from "next/image";

// -------------------------------------
// PRIMARY ICT SOLUTIONS
// -------------------------------------
const ictSolutions = [
  {
    id: "ict-hardware",
    title: "ICT Hardware Supply",
    icon: <Laptop size={32} className="text-[var(--color-accent)]" />,
    description:
      "Laptops, computers, tablets, printers, projectors, and essential ICT hardware for schools, SMEs, NGOs, and enterprises.",
    image: "/samples/hardwaredisplay.jpg",
  },
  {
    id: "mobile-labs",
    title: "Mobile Computer Labs",
    icon: <Layers size={32} className="text-[var(--color-accent)]" />,
    description:
      "Fully equipped mobile ICT labs for schools and training centers — portable, affordable, and ready for deployment.",
    image: "/samples/mobilecomputerlab.jpg",
  },
  {
    id: "networking",
    title: "Networking & Infrastructure",
    icon: <Network size={32} className="text-[var(--color-accent)]" />,
    description:
      "Structured cabling, WiFi setup, server installation, security systems, switches, routers, and complete network infrastructure.",
    image: "/samples/network.jpg",
  },
  {
    id: "software-erp",
    title: "Software & ERP Deployment",
    icon: <Server size={32} className="text-[var(--color-accent)]" />,
    description:
      "Affordable ERPs, HRM, accounting systems, POS, cloud services, device management, and custom software deployment.",
    image: "/samples/ERp.jpg",
  },
  {
    id: "it-support",
    title: "IT Maintenance & Support",
    icon: <Wrench size={32} className="text-[var(--color-accent)]" />,
    description:
      "Device repairs, software setup, infrastructure troubleshooting, optimization, and long-term ICT support service.",
    image: "/samples/computer repair.jpg",
  },
];

// -------------------------------------
// DIGITAL SUITE AS ONE ICT CARD (6th)
// -------------------------------------
const digitalSuite = {
  id: "digital-services",
  title: "Digital Services Suite",
  icon: <Layers size={32} className="text-[var(--color-accent)]" />,
  image: "/samples/ui-ux-representations-with-laptop.jpg",
  description:
    "Branding, UI/UX, graphic design, websites, apps, marketing and creative services — bundled for complete digital transformation.",
};

// -------------------------------------
// ANIMATIONS
// -------------------------------------
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

// -------------------------------------
// CARD COMPONENT
// -------------------------------------
// const ServiceCard = ({ service, index }: any) => {
//   return (
//     <motion.div
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true }}
//       variants={fadeInUp}
//       custom={index}
//       className="bg-[var(--color-primary)] rounded-2xl overflow-hidden 
//       shadow-xl hover:shadow-2xl transition-all duration-300 group"
//     >
//       <div className="relative w-full h-48">
//         <Image
//           src={service.image}
//           alt={service.title}
//           fill
//           className="object-cover"
//         />
//       </div>

//       <div className="p-6 flex flex-col gap-4">
//         <div className="flex items-center gap-3">
//           {service.icon}
//           <h3
//             className="text-xl font-semibold text-[var(--color-text-main)] 
//           group-hover:text-[var(--color-accent)] transition"
//           >
//             {service.title}
//           </h3>
//         </div>

//         <p className="text-sm text-white/80 leading-relaxed">
//           {service.description}
//         </p>

//         {service.bullets && (
//           <ul className="text-white/70 text-xs leading-relaxed space-y-1">
//             {service.bullets.map((b: string, i: number) => (
//               <li key={i}>• {b}</li>
//             ))}
//           </ul>
//         )}

//         <a
//           href={`/${service.id}`}
//           className="text-sm text-[var(--color-accent)] font-semibold opacity-0 
//           group-hover:opacity-100 transition-opacity duration-300"
//         >
//           Learn more →
//         </a>
//       </div>
//     </motion.div>
//   );
// };
type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  icon?: React.ReactNode;
  bullets?: string[];
};

type ServiceCardProps = {
  service: Service;
  index: number;
};

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      custom={index}
      className="bg-[var(--color-primary)] rounded-2xl overflow-hidden 
        shadow-xl hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="relative w-full h-48">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          {service.icon}
          <h3 className="text-xl font-semibold text-[var(--color-text-main)] 
            group-hover:text-[var(--color-accent)] transition"
          >
            {service.title}
          </h3>
        </div>

        <p className="text-sm text-white/80 leading-relaxed">
          {service.description}
        </p>

        {service.bullets && (
          <ul className="text-white/70 text-xs leading-relaxed space-y-1">
            {service.bullets.map((b, i) => (
              <li key={i}>• {b}</li>
            ))}
          </ul>
        )}

        <a
          href={`/${service.id}`}
          className="text-sm text-[var(--color-accent)] font-semibold opacity-0 
            group-hover:opacity-100 transition-opacity duration-300"
        >
          Learn more →
        </a>
      </div>
    </motion.div>
  );
};


// -------------------------------------
// PAGE
// -------------------------------------
export default function Services() {
  return (
    <section
      id="services"
      className="py-24 bg-[var(--color-bg-dark)] text-center relative"
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br 
        from-[var(--color-primary)] via-transparent to-[var(--color-bg-dark)] 
        opacity-10 pointer-events-none"
      ></div>

      {/* HEADER */}
      <div className="max-w-4xl mx-auto px-4 mb-16 relative z-10">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={0}
          className="text-4xl md:text-5xl font-bold text-[var(--color-text-main)] mb-6"
        >
          Core ICT Solutions & Digital Services
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={1}
          className="text-lg md:text-xl text-[var(--color-text-subtle)] leading-relaxed"
        >
          Technology supply, networking, software, and digital services designed
          to help organizations operate efficiently and scale sustainably.
        </motion.p>
      </div>

      {/* ---------------------------------- */}
      {/* ICT SOLUTIONS GRID (Now 6 Cards) */}
      {/* ---------------------------------- */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 relative z-10">
        {ictSolutions.map((service, i) => (
          <ServiceCard service={service} index={i + 2} key={i} />
        ))}

        {/* Digital Suite as the 6th card */}
        <ServiceCard service={digitalSuite} index={ictSolutions.length + 3} />
      </div>
    </section>
  );
}
