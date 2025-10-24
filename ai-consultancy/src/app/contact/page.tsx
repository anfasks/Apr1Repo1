import LeadForm from "./ui/LeadForm";

export default function ContactPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold">Talk to Sales</h1>
      <p className="mb-6 text-sm text-slate-600">Tell us about your company and the package you’re considering.</p>
      <LeadForm />
    </div>
  );
}
