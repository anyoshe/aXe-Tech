// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 text-center">
      <p className="text-sm mb-2">© {new Date().getFullYear()} MyAgency. All rights reserved.</p>
      <div className="space-x-4">
        <a href="#" className="hover:text-gray-400">LinkedIn</a>
        <a href="#" className="hover:text-gray-400">Instagram</a>
        <a href="#" className="hover:text-gray-400">X/Twitter</a>
      </div>
    </footer>
  )
}
