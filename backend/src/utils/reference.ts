import { prisma } from "../config/database";
export async function generateEnquiryReference(): Promise<string> {
  const year = new Date().getFullYear();
  const count = await prisma.enquiry.count({ where: { referenceId: { startsWith: `MBRC-${year}-` } } });
  return `MBRC-${year}-${String(count + 101).padStart(3, "0")}`;
}
