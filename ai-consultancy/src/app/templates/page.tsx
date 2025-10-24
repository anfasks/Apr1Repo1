import prisma from "@/lib/prisma";

export default async function TemplatesPage() {
  const templates = await prisma.template.findMany({ where: { active: true }, orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Templates Library</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((t) => (
          <div key={t.id} className="rounded-lg border p-5">
            <div className="text-xs uppercase tracking-wide text-slate-500">{t.category}</div>
            <h3 className="mt-1 text-lg font-semibold">{t.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{t.description}</p>
            <div className="mt-2 text-sm font-medium">₹{t.priceINR.toLocaleString("en-IN")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
