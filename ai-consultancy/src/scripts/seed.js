const { PrismaClient, PackageTier, LeadStatus } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const templates = [
    { slug: "chatbot-basic", title: "Website Chatbot (Basic)", category: "Chatbots", description: "Bronze: Basic website chatbot for FAQs and lead capture.", priceINR: 50000 },
    { slug: "hr-automation", title: "HR Automation (Leave/Claims)", category: "RPA", description: "Silver: Automates leave requests and expense approvals via forms and email.", priceINR: 200000 },
    { slug: "invoice-ocr", title: "Invoice OCR + Reconciliation", category: "Finance", description: "Silver: OCR pipeline for invoices and ledger reconciliation.", priceINR: 250000 },
    { slug: "email-ai", title: "Email AI Triage", category: "Productivity", description: "Gold: Auto-categorize and summarize inbound emails with suggested replies.", priceINR: 400000 },
    { slug: "faq-bot", title: "Internal FAQ Bot", category: "Knowledge", description: "Gold: Private knowledge bot using company docs.", priceINR: 500000 },
  ];

  for (const tpl of templates) {
    await prisma.template.upsert({ where: { slug: tpl.slug }, update: tpl, create: tpl });
  }

  await prisma.lead.createMany({
    data: [
      { name: "Rohit Sharma", email: "rohit@example.com", phone: "+91-9000000001", company: "Acme Retail", package: PackageTier.BRONZE, message: "Looking for a basic chatbot", status: LeadStatus.NEW, source: "seed" },
      { name: "Anita Rao", email: "anita@fintech.io", phone: "+91-9000000002", company: "FinTech IO", package: PackageTier.SILVER, message: "Invoice OCR for finance team", status: LeadStatus.CONTACTED, source: "seed" },
    ],
  });

  const today = new Date();
  const date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  await prisma.kPI.upsert({ where: { date }, update: { leads: 2, customers: 0, arrINR: 0, revenueINR: 0 }, create: { date, leads: 2, customers: 0, arrINR: 0, revenueINR: 0 } });
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
