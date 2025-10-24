import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { sendLeadNotification } from "@/lib/email";

const LeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  package: z.enum(["BRONZE", "SILVER", "GOLD", "ENTERPRISE"]).default("BRONZE"),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  let data: any;
  if (contentType.includes("application/json")) {
    data = await req.json();
  } else {
    const form = await req.formData();
    data = Object.fromEntries(form.entries());
  }
  const parsed = LeadSchema.safeParse({ ...data, package: data.package ?? "BRONZE" });
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }
  const { name, email, phone, company, message } = parsed.data;
  const pkg = parsed.data.package as any;

  try {
    const lead = await prisma.lead.create({
      data: { name, email, phone, company, message, package: pkg, status: "NEW", source: "website" },
    });

    void sendLeadNotification(
      `New Lead: ${name} (${pkg})`,
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone ?? "-"}\nCompany: ${company ?? "-"}\nPackage: ${pkg}\nMessage: ${message ?? "-"}`,
    );

    return NextResponse.json({ message: "Thanks! We will contact you shortly.", id: lead.id });
  } catch (e: any) {
    if (e.code === "P2002") {
      return NextResponse.json({ message: "We already have this email. We'll be in touch soon." }, { status: 200 });
    }
    console.error(e);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
