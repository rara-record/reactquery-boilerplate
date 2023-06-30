import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl">Welcome to my Cat Filter App! 😎</h1>
      <div className="relative flex place-items-center">
        <div className="relative">
          <iframe
            title="my site"
            src="https://giphy.com/embed/maNB0qAiRVAty"
            width="300"
            height="300"
            allowFullScreen
          />
        </div>
        <p className="hidden">
          <a href="https://giphy.com/gifs/maNB0qAiRVAty">via GIPHY</a>
        </p>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
        <Link href="/test">
          <h2 className="mb-3 text-2xl font-semibold">
            Test
            {' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Let&apos;s test your level.
          </p>
        </Link>

        <Link href="/cat" className="ml-10">
          <h2 className="mb-3 text-2xl font-semibold">
            Cat Filter
            {' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about filter!
          </p>
        </Link>
      </div>
    </main>
  );
}
