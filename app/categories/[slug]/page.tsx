import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, FolderGit2, GitFork } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { TOOLS } from "@/data/tools";
import { WORKFLOWS } from "@/data/workflows";
import { CategoryDetailView } from "@/components/categories/CategoryDetailView";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return { title: "Category Not Found — OBSIDIAN" };
  }

  return {
    title: `${category.name} Tools — OBSIDIAN`,
    description: category.description,
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryTools = TOOLS.filter(
    (t) =>
      t.primaryCategory === category.name ||
      t.categories.includes(category.name)
  );

  const relatedCategories = CATEGORIES.filter((c) =>
    category.relatedCategorySlugs?.includes(c.slug)
  );

  const relevantWorkflows = WORKFLOWS.filter(
    (w) =>
      w.discipline.toLowerCase().includes(category.name.toLowerCase()) ||
      w.steps.some((s) => s.toolSlugs.some((ts) => categoryTools.some((ct) => ct.slug === ts)))
  );

  return (
    <CategoryDetailView
      category={category}
      categoryTools={categoryTools}
      relatedCategories={relatedCategories}
      relevantWorkflows={relevantWorkflows}
    />
  );
}
