import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { I18nProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "OBSIDIAN — Cyber Intelligence Arsenal",
  description:
    "Security intelligence, tools, workflows, and knowledge — unified. A high-precision cybersecurity intelligence platform and toolkit.",
  openGraph: {
    title: "OBSIDIAN — Cyber Intelligence Arsenal",
    description:
      "Security intelligence, tools, workflows, and knowledge — unified. A high-precision cybersecurity intelligence platform and toolkit.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OBSIDIAN — Cyber Intelligence Arsenal",
    description:
      "Security intelligence, tools, workflows, and knowledge — unified. A high-precision cybersecurity intelligence platform and toolkit.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning className="bg-[#07070A] text-[#F4F4F6] antialiased selection:bg-violet-600/30 selection:text-violet-200">
        <I18nProvider>
          <AppShell>{children}</AppShell>
        </I18nProvider>
      </body>
    </html>
  );
}
