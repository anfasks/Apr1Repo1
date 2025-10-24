export default function AuditPage() {
  const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/";
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Free 30-min AI Audit</h1>
      <p className="mb-6 text-sm text-slate-600">Pick a slot below. We&apos;ll assess automation opportunities across your workflows.</p>
      <div className="aspect-video w-full">
        <iframe
          title="Calendly"
          src={calendly}
          className="h-full w-full rounded-lg border"
        />
      </div>
    </div>
  );
}
