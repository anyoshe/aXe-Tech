/**
 * Sample ICT products for seeding into Supabase.
 * Image paths point at files in /public/samples (served as /samples/...).
 */
export const sampleProducts = [
  {
    id: "lap-hp-840",
    title: "HP EliteBook 840 G6 — Core i5, 8GB, 256GB SSD",
    price: 48000,
    category: "Laptops",
    images: ["/samples/HP-eliteboo-840-g6.jpeg", "/samples/ui-ux-nxt-with-laptop.jpg"],
    short: "Business laptop for office work, teaching, and light development.",
    description:
      "Reliable HP EliteBook 840 G6. Solid build, good keyboard, suitable for schools and SMEs. Tested and ready for deployment.",
    features: [
      "Intel Core i5",
      "8GB RAM",
      "256GB SSD",
      "14-inch display",
      "Windows 11 ready",
    ],
    videos: [],
  },
  {
    id: "lap-dell-7400",
    title: "Dell Latitude 7400 — Core i5/i7, SSD",
    price: 52000,
    category: "Laptops",
    images: ["/samples/dell7400.jpeg", "/samples/office-with-computer-glass-table.jpg"],
    short: "Premium ultrabook for professionals and managers.",
    description:
      "Dell Latitude 7400 — portable, durable, strong battery life. Ideal for field officers and office staff.",
    features: ["Intel Core i5/i7 options", "SSD storage", "Lightweight", "Business-grade security"],
    videos: [],
  },
  {
    id: "lab-desktop-setup",
    title: "Computer Lab Workstation Package",
    price: 35000,
    category: "Lab Equipment",
    images: ["/samples/computerlab.jpg", "/samples/mobilecomputerlab.jpg"],
    short: "Desktop/workstation package for school computer labs.",
    description:
      "Complete workstation setup for digital literacy labs. Can be bundled with networking and lab installation.",
    features: ["Lab-ready PC", "Monitor options", "Keyboard & mouse", "Installation support available"],
    videos: ["/samples/computertech.mp4"],
  },
  {
    id: "net-router-office",
    title: "Office / School Networking Kit",
    price: 18500,
    category: "Networking",
    images: ["/samples/network.jpg", "/samples/hardwaredisplay.jpg"],
    short: "Router, switch, and cabling essentials for small networks.",
    description:
      "Starter networking package for offices and schools. Structured cabling and access points available on request.",
    features: ["Router", "Switch options", "Cat6 cabling support", "Site survey available"],
    videos: [],
  },
  {
    id: "repair-service",
    title: "Laptop & PC Repair / Upgrade Service",
    price: 2500,
    category: "Services",
    images: [
      "/samples/computer repair.jpg",
      "/samples/close-up-man-repairing-computer-chips.jpg",
    ],
    short: "Diagnosis, repair, SSD upgrades, and maintenance.",
    description:
      "Hardware diagnosis, component replacement, SSD upgrades, OS install, and preventive maintenance for laptops and desktops.",
    features: ["Diagnosis", "SSD upgrade", "RAM upgrade", "OS installation", "Cleaning & thermal service"],
    videos: [],
  },
  {
    id: "erp-school",
    title: "School ERP / Management System",
    price: 150000,
    category: "Software",
    images: ["/samples/ERp.jpg", "/samples/Saas.jpg"],
    short: "Digital school management — students, fees, staff, reports.",
    description:
      "Custom school ERP covering admissions, fees, academics, and reporting. Deployed for Kenyan schools with training included.",
    features: ["Students & staff", "Fees & invoices", "Reports", "Multi-school ready", "Training & support"],
    videos: ["/samples/schoolvideo.mp4"],
  },
  {
    id: "web-business",
    title: "Business Website & Landing Pages",
    price: 45000,
    category: "Software",
    images: ["/samples/webdevelopment.jpg", "/samples/landing1.jpg", "/samples/landpage.jpg"],
    short: "Modern marketing site for SMEs and institutions.",
    description:
      "Responsive website or landing pages with contact forms, SEO basics, and optional CMS. Hosted and maintained on request.",
    features: ["Responsive design", "Contact forms", "SEO basics", "Hosting options"],
    videos: [],
  },
  {
    id: "ecommerce-starter",
    title: "E-commerce Starter Store",
    price: 85000,
    category: "Software",
    images: ["/samples/ecommerce.jpg", "/samples/ecommerce1.jpg"],
    short: "Online shop to sell products with payments and catalog.",
    description:
      "Starter e-commerce setup: product catalog, cart, checkout flow, and admin for managing stock and orders.",
    features: ["Product catalog", "Cart & checkout", "Admin panel", "Mobile friendly"],
    videos: [],
  },
  {
    id: "brand-pack",
    title: "Brand Identity Pack",
    price: 25000,
    category: "Design",
    images: ["/samples/branding.jpg", "/samples/brand2.jpg", "/samples/brand3.jpg"],
    short: "Logo, brand colors, and basic brand kit for your business.",
    description:
      "Logo design, color palette, typography, and simple brand guidelines so your ICT or SME brand looks consistent.",
    features: ["Logo", "Color system", "Social templates", "Brand guide PDF"],
    videos: ["/samples/branding.mp4"],
  },
  {
    id: "print-hp-laser",
    title: "Office Laser Printer Package",
    price: 24000,
    category: "Printers",
    images: ["/samples/post1.jpg", "/samples/post2.jpg"],
    short: "Monochrome laser printer for offices and school admin.",
    description:
      "Reliable laser printing for invoices, letters, and reports. Network options and toner supply available.",
    features: ["Laser print", "Office duty cycle", "Toner available", "Setup support"],
    videos: [],
  },
];
