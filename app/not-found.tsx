import Link from "next/link";

export default function NotFound() {
  return (
    <article className="mx-auto flex min-h-[60vh] flex-col items-center justify-center px-6 py-section text-center">
      <p className="font-mono text-sm tracking-[0.1em] text-ink-faint uppercase">
        404
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-4 max-w-prose text-ink-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-sm bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
      >
        Back to home
      </Link>
    </article>
  );
}
