import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComingSoon from "@/components/ComingSoon";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/lib/categories";
import { products } from "@/lib/products";

interface LeadsCategoryPageProps {
  params: { category: string };
}

function findCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function generateMetadata({
  params,
}: LeadsCategoryPageProps): Metadata {
  const category = findCategory(params.category);
  if (!category) return { title: "Lead Lists" };
  return {
    title: `${category.name} Leads`,
    description: category.description,
  };
}

export default function LeadsCategoryPage({
  params,
}: LeadsCategoryPageProps) {
  const category = findCategory(params.category);
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
    <article className="mx-auto max-w-3xl px-6 py-section">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
        {category.name} Leads
      </h1>
      <p className="mt-4 max-w-prose text-ink-secondary">
        {category.description}
      </p>

      <div className="mt-12 flex flex-col gap-6">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </article>
  );
}
