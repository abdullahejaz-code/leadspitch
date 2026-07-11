import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComingSoon from "@/components/ComingSoon";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { categories } from "@/lib/categories";
import { products } from "@/lib/products";

interface LeadsCategoryPageProps {
  params: Promise<{ category: string }>;
}

function findCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: LeadsCategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = findCategory(slug);
  if (!category) return { title: "Lead Lists" };
  return {
    title: `${category.name} Leads`,
    description: category.description,
  };
}

export default async function LeadsCategoryPage({
  params,
}: LeadsCategoryPageProps) {
  const { category: slug } = await params;
  const category = findCategory(slug);
  if (!category) notFound();

  if (category.status === "soon") {
    return (
      <ComingSoon
        title={`${category.name} leads — launching soon`}
        description="This category isn't open for purchase yet. Reach out and we'll let you know the moment it goes live."
      />
    );
  }

  const categoryProducts = products.filter(
    (product) => product.categorySlug === category.slug
  );

  return (
    <article className="mx-auto max-w-4xl px-6 py-section">
      <Reveal>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          {category.name} Leads
        </h1>
        <p className="mt-4 max-w-prose text-ink-secondary">
          {category.description}
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {categoryProducts.map((product, index) => (
          <Reveal key={product.id} variant="zoom" delay={(index % 2) * 90}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </article>
  );
}
