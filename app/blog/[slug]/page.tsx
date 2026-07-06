import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPostPage() {
  return (
    <ComingSoon
      title="Blog — launching soon"
      description="This article isn't published yet. Check back soon, or browse the FAQ in the meantime."
    />
  );
}
