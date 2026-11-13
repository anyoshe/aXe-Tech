export default function BuyingAssurance() {
  const items = [
    {
      title: "Configuration transparency",
      text: "You receive the exact processor, RAM, storage, display and operating-system details of the offered unit.",
    },
    {
      title: "Condition disclosure",
      text: "Cosmetic grade and physical condition of the actual offered unit are communicated before purchase.",
    },
    {
      title: "Functional verification",
      text: "Relevant hardware checks are disclosed before delivery according to the unit offered.",
    },
    {
      title: "Battery condition",
      text: "Battery condition is assessed and communicated for the actual unit where applicable.",
    },
    {
      title: "Written quotations",
      text: "You receive a written quotation identifying the selected configuration, price and agreed terms.",
    },
    {
      title: "Clear warranty",
      text: "Warranty duration, coverage and exclusions are communicated before purchase.",
    },
    {
      title: "After-sales ICT support",
      text: "Agreed technical assistance, installation and configuration services are available when scoped.",
    },
  ];

  return (
    <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
      <h2 className="text-xl font-bold text-white">GetAxe buying assurance</h2>
      <p className="mt-2 text-sm text-white/60 max-w-2xl">
        Transparent ICT supply for schools and businesses — we do not invent stock or hide configuration details.
      </p>
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.title} className="rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="text-sm font-semibold text-emerald-200/90">{item.title}</h3>
            <p className="mt-1.5 text-sm text-white/55 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
