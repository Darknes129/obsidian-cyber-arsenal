import { notFound } from "next/navigation";
import { TOOLS } from "@/data/tools";
import { ToolDetailView } from "./ToolDetailView";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);

  if (!tool) {
    return {
      title: "Tool Not Found — OBSIDIAN",
    };
  }

  return {
    title: `${tool.name} — OBSIDIAN`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} — OBSIDIAN Cyber Intelligence Arsenal`,
      description: tool.tagline,
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  return <ToolDetailView tool={tool} />;
}
