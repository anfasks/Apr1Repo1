"use client";

import { useState } from "react";

export default function LeadForm() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/lead", { method: "POST", body: form });
    const data = await res.json();
    setSubmitting(false);
    setMessage(data.message ?? (res.ok ? "Submitted" : "Failed"));
    if (res.ok) e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input name="name" required className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input name="email" type="email" required className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Phone</label>
          <input name="phone" className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Company</label>
          <input name="company" className="w-full rounded-md border px-3 py-2" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Package</label>
        <select name="package" className="w-full rounded-md border px-3 py-2">
          <option>BRONZE</option>
          <option>SILVER</option>
          <option>GOLD</option>
          <option>ENTERPRISE</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Message</label>
        <textarea name="message" rows={4} className="w-full rounded-md border px-3 py-2" />
      </div>
      <button disabled={submitting} className="rounded-md bg-slate-900 px-4 py-2 text-white disabled:opacity-50">
        {submitting ? "Submitting..." : "Submit"}
      </button>
      {message && <div className="text-sm text-slate-600">{message}</div>}
    </form>
  );
}
