import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "@/theme/ThemeRegistry";

export const metadata: Metadata = {
  title: "PaperReady — Know What to Carry Before You Go",
  description:
    "Interactive document checklists for Indian government applications. Never get turned away again — passports, driving licences, vital certificates, and more.",
  keywords: [
    "government documents India",
    "passport checklist",
    "driving licence documents",
    "PaperReady",
    "document checklist",
  ],
  openGraph: {
    title: "PaperReady — Know What to Carry Before You Go",
    description:
      "Interactive checklists for all your government office visits. Verified, clear, and offline-ready.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
