import Link from "next/link";

interface ComingSoonProps {
  title: string;
  description: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center border-t border-hairline px-6 py-section text-center">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-prose text-ink-secondary">{description}</p>
      <div className="mt-8 flex items-center gap-6">
        <Link
          href="/"
          className="rounded-sm bg-ink px-5 py-2.5 text-sm font-medium text-surface transition duration-fast ease-out-expo hover:bg-ink-hover active:scale-[0.98]"
        >
          Back to home
        </Link>
        <Link
          href="/contact"
          className="text-sm text-ink-secondary transition-colors duration-fast hover:text-ink"
        >
          Contact us
        </Link>
      </div>
    </section>
  );
}
