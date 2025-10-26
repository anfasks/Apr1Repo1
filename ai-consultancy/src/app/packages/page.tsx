export default function PackagesPage() {
  const tiers = [
    { name: "Bronze", price: "₹50k/month", features: ["Basic chatbot", "Process automation", "Setup & handover"] },
    { name: "Silver", price: "₹2–5L/month", features: ["Multi-department automation", "2-3 RPA workflows", "SLAs"] },
    { name: "Gold", price: "₹10L+/month", features: ["Full AI Ops", "Custom integrations", "Quarterly roadmap"] },
    { name: "Enterprise", price: "₹50L+/year", features: ["Custom AI infra", "Data strategy", "Compliance"] },
  ];
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Productized Packages</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tiers.map((t) => (
          <div key={t.name} className="rounded-lg border p-5">
            <h3 className="text-lg font-semibold">{t.name}</h3>
            <p className="mt-1 text-2xl font-bold">{t.price}</p>
            <ul className="mt-3 space-y-1 text-sm text-slate-600">
              {t.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <a href="/contact" className="mt-4 inline-block text-sm text-slate-700 hover:underline">Talk to Sales →</a>
          </div>
        ))}
      </div>
    </div>
  );
}
