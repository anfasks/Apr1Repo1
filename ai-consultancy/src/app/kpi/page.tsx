import prisma from "@/lib/prisma";

function formatINR(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default async function KPIPage() {
  const data = await prisma.kPI.findMany({ orderBy: { date: "asc" } });
  const last = data[data.length - 1];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">KPI Dashboard</h1>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-4"><div className="text-xs text-slate-500">Leads</div><div className="text-2xl font-bold">{last?.leads ?? 0}</div></div>
        <div className="rounded-lg border p-4"><div className="text-xs text-slate-500">Customers</div><div className="text-2xl font-bold">{last?.customers ?? 0}</div></div>
        <div className="rounded-lg border p-4"><div className="text-xs text-slate-500">ARR</div><div className="text-2xl font-bold">{formatINR(last?.arrINR ?? 0)}</div></div>
        <div className="rounded-lg border p-4"><div className="text-xs text-slate-500">Monthly Revenue</div><div className="text-2xl font-bold">{formatINR(last?.revenueINR ?? 0)}</div></div>
      </section>
      <p className="text-sm text-slate-600">Charts can be added using react-chartjs-2 if needed. Data is stored in the database for trend tracking.</p>
    </div>
  );
}
