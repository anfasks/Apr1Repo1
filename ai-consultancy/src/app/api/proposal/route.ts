import { NextResponse } from "next/server";
import { z } from "zod";
import { generateProposalPdf } from "@/lib/pdf";

const Schema = z.object({
  clientName: z.string().min(2),
  company: z.string().optional(),
  packageTier: z.enum(["BRONZE", "SILVER", "GOLD", "ENTERPRISE"]),
  email: z.string().email(),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = Schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: "Invalid input" }, { status: 400 });

  const pdf = await generateProposalPdf(parsed.data);
  return new NextResponse(Buffer.from(pdf), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=proposal-${Date.now()}.pdf`,
    },
  });
}
