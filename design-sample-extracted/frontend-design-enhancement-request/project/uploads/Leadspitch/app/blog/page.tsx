import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <ComingSoon
      title="Blog — launching soon"
      description="We're writing guides on lead sourcing, cold outreach, and compliance for niche B2B lists. Check back soon, or browse the FAQ in the meantime."
    />
  );
}
