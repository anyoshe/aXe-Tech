// components/CTA.tsx
export default function CTA() {
  return (
    <section id="contact" className="py-20 px-6 bg-black text-white text-center">
      <h2 className="text-4xl font-bold mb-6">Ready to Elevate Your Brand?</h2>
      <p className="mb-8 max-w-xl mx-auto">
        Let’s collaborate and bring your business to the next level. We’re ready when you are.
      </p>
      <a
        href="mailto:youremail@example.com"
        className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition"
      >
        Contact Us
      </a>
    </section>
  )
}
