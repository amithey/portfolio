import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="readout text-muted">404</p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
        That page isn&rsquo;t here.
      </h1>
      <p className="mt-3 text-muted">The projects are, though.</p>
      <p className="mt-6">
        <Link href="/projects" className="font-semibold text-signal hover:underline">
          Browse all projects →
        </Link>
      </p>
    </div>
  );
}
