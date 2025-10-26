import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          AI at Scale for SMEs and Enterprises
        </h1>
        <p className="mt-3 text-base text-slate-600">
          Productized AI consultancy. Automate operations. Grow revenue. Control costs.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/audit" className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700">
            Get Free AI Audit
          </Link>
          <Link href="/packages" className="rounded-md border px-4 py-2 text-slate-700 hover:bg-slate-50">
            View Packages
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          { title: "Bronze", price: "₹50k/mo", desc: "Basic chatbot + process automation" },
          { title: "Silver", price: "₹2–5L/mo", desc: "Multi-department automation" },
          { title: "Gold", price: "₹10L+/mo", desc: "Full AI Ops automation" },
        ].map((p) => (
          <div key={p.title} className="rounded-lg border p-5">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-sm text-slate-500">{p.desc}</p>
            <p className="mt-2 text-2xl font-bold">{p.price}</p>
            <Link href="/contact" className="mt-3 inline-block text-sm text-slate-700 hover:underline">
              Talk to Sales →
            </Link>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold">Ready-to-deploy templates</h2>
        <p className="text-sm text-slate-600">Chatbots, RPA workflows, OCR pipelines, email triage, FAQ bots.</p>
        <Link href="/templates" className="mt-3 inline-block text-sm text-slate-700 hover:underline">
          Explore templates →
        </Link>
      </section>
    </div>
  );
}
