import prisma from "@/lib/prisma";

export default async function AdminPage() {
  const [leads, kpi] = await Promise.all([
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    prisma.kPI.findMany({ orderBy: { date: "desc" }, take: 30 }),
  ]);
  const arrINR = kpi[0]?.arrINR ?? 0;
  const revenueINR = kpi[0]?.revenueINR ?? 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin</h1>
      <section className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border p-4">
          <div className="text-xs text-slate-500">ARR (INR)</div>
          <div className="text-2xl font-bold">₹{arrINR.toLocaleString("en-IN")}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-xs text-slate-500">Monthly Revenue (INR)</div>
          <div className="text-2xl font-bold">₹{revenueINR.toLocaleString("en-IN")}</div>
        </div>
      </section>
      <section>
        <h2 className="mb-2 text-lg font-semibold">Recent Leads</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Company</th>
                <th className="p-2">Package</th>
                <th className="p-2">Status</th>
                <th className="p-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-t">
                  <td className="p-2">{l.name}</td>
                  <td className="p-2">{l.email}</td>
                  <td className="p-2">{l.company ?? "-"}</td>
                  <td className="p-2">{l.package}</td>
                  <td className="p-2">{l.status}</td>
                  <td className="p-2">{new Date(l.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
