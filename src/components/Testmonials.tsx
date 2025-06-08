export default function Testimonials() {
  return (
    <section className="py-24 bg-black bg-opacity-90 text-center text-white">
      <div className="max-w-3xl mx-auto px-4 mb-12">
        <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
        <p className="text-[var(--color-text-muted)] text-lg">
          Real feedback from real results.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <blockquote className="bg-[var(--color-primary)] p-6 rounded-xl shadow">
          <p className="text-md italic">
            “aXe-Tech totally transformed our online presence. We’ve seen a 40% increase in leads!”
          </p>
          <footer className="mt-4 text-[var(--color-text-subtle)]">— Amanda T., Startup Founder</footer>
        </blockquote>
        <blockquote className="bg-[var(--color-primary)] p-6 rounded-xl shadow">
          <p className="text-md italic">
            “Their design and dev team feels like an extension of ours. Fast, reliable, and strategic.”
          </p>
          <footer className="mt-4 text-[var(--color-text-subtle)]">— James R., Product Manager</footer>
        </blockquote>
        <blockquote className="bg-[var(--color-primary)] p-6 rounded-xl shadow">
          <p className="text-md italic">
            “Finally an agency that delivers on results, not just promises. Our ROI tripled in 3 months.”
          </p>
          <footer className="mt-4 text-[var(--color-text-subtle)]">— Priya S., Marketing Lead</footer>
        </blockquote>
      </div>
    </section>
  );
}
