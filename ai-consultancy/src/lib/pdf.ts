import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export type ProposalInput = {
  clientName: string;
  company?: string;
  packageTier: "BRONZE" | "SILVER" | "GOLD" | "ENTERPRISE";
  email: string;
  phone?: string;
  notes?: string;
};

const PACKAGE_PRICES: Record<ProposalInput["packageTier"], number> = {
  BRONZE: 50000,
  SILVER: 200000,
  GOLD: 1000000,
  ENTERPRISE: 5000000,
};

export async function generateProposalPdf(input: ProposalInput): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const title = "AI Consultancy Proposal";
  page.drawText(title, { x: 50, y: height - 80, size: 24, font, color: rgb(0.1, 0.2, 0.6) });

  const brand = process.env.NEXT_PUBLIC_BRAND_NAME ?? "AI Ops Consultancy";
  page.drawText(brand, { x: 50, y: height - 110, size: 14, font, color: rgb(0.2, 0.2, 0.2) });

  const lines = [
    `Client: ${input.clientName}${input.company ? " (" + input.company + ")" : ""}`,
    `Email: ${input.email}${input.phone ? " | " + input.phone : ""}`,
    `Package: ${input.packageTier}`,
    `Price (INR): B${PACKAGE_PRICES[input.packageTier].toLocaleString("en-IN")}`,
    "",
    "Scope Summary:",
    ...(input.packageTier === "BRONZE"
      ? ["- Basic website chatbot", "- Lead capture and email alerts", "- Setup and handover"]
      : input.packageTier === "SILVER"
      ? ["- Multi-department automation", "- 2-3 RPA workflows", "- Support SLAs"]
      : input.packageTier === "GOLD"
      ? ["- Full AI Ops automation", "- Custom integrations", "- Quarterly AI roadmap"]
      : ["- Custom AI infrastructure", "- Data strategy and governance", "- Security and compliance"]),
    "",
    "Notes:",
    input.notes ?? "(none)",
  ];

  let y = height - 150;
  for (const line of lines) {
    page.drawText(line, { x: 50, y, size: 12, font, color: rgb(0, 0, 0) });
    y -= 20;
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
