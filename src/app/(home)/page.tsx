import type { Metadata } from "next";
import { PyroButton } from "@/components/ui/PyroButton";
import SafariBrowser from "@/components/ui/SafariBrowser";
import GitHubStats from "@/components/ui/GitHubStats";
import {
  BookOpenIcon,
  FireIcon,
  UserGroupIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  CubeIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/solid";

export const metadata: Metadata = {
  metadataBase: new URL('https://hydrodactyl.dev'),
  title: "Hydrodactyl",
  description: "Hydrodactyl is an open, secure, and scalable servers platform. It's the world's best Pterodactyl panel with incredible performance and unmatched features.",
  openGraph: {
    title: "Hydrodactyl",
    description: "Hydrodactyl is an open, secure, and scalable servers platform. It's the world's best Pterodactyl panel with incredible performance and unmatched features.",
    images: [{ url: "/hydrodactyl_firstlook.jpeg" }],
  },
};

const features = [
  {
    title: "Built with Vite",
    description: "Hydrodactyl is built with Vite, the fastest and most reliable build tool for JavaScript.",
    icon: <FireIcon className="w-5 h-5" />
  },
  {
    title: "Accessibility at the core",
    description: "Pyro & Hydrodactyl are committed to making our software accessible to everyone. Hydrodactyl is no exception.",
    icon: <UserGroupIcon className="w-5 h-5" />
  },
  {
    title: "Optimized to pieces",
    description: "Hydrodactyl builds in less than 150 milliseconds, and renders up to 70% faster than the original panel.",
    icon: <RocketLaunchIcon className="w-5 h-5" />
  },
  {
    title: "Modern, scalable, and secure",
    description: "The only outdated aspect of Hydrodactyl is the name. Everything else is absolutely cutting-edge.",
    icon: <ShieldCheckIcon className="w-5 h-5" />
  },
  {
    title: "Batteries included",
    description: (
      <>
        It&apos;s everything you need, out-of-the-box. There&apos;s no need to install plugins or themes.
      </>
    ),
    icon: <CubeIcon className="w-5 h-5" />
  },
  {
    title: "Open source",
    description: "Hydrodactyl is the first (and only) panel that a company has made its source publicly available.",
    icon: <CodeBracketIcon className="w-5 h-5" />
  },
];

const buildTimes = [
  { name: "Hydrodactyl", tech: "Vite + Turbo", time: "87ms", percentage: 0.22, highlight: true },
  { name: "Pterodactyl v1", tech: "Webpack 4", time: "35.3s", percentage: 88 },
  { name: "Pterodactyl v2", tech: "Webpack 4", time: "39.4s", percentage: 98 },
];

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const HydrodactylLogo = () => (
  <svg className="flex h-6 w-6 shrink-0" width="100" height="92" viewBox="0 0 100 92" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_136_35)"><path d="M35.1293 92L39.2242 59.3897L44.8276 60.4695L14.2241 81.2019L0 57.0141L32.7586 45.3521V47.7277L0 33.4742L14.2241 8.85446L45.6896 33.2582L39.2242 34.1221L34.4828 0H65.5172L61.4225 33.9061L56.681 32.8263L85.7759 8.85446L100 33.4742L66.1638 47.7277V45.5681L99.569 57.0141L85.3448 81.2019L57.5431 59.3897H61.638L66.1638 92H35.1293Z" fill="#52A9FF"></path></g><defs><clipPath id="clip0_136_35"><rect width="100" height="92" fill="white"></rect></clipPath></defs></svg>
);

const Page = () => {
  return (
    <>
      {/* hero */}
      <section className="relative min-h-[100vh] w-full bg-[#09090b]">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative container mx-auto px-6 pt-40 pb-20">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
            <h1 className="font-extrabold text-[clamp(2.5rem,8vw,5rem)] leading-[1.05] tracking-[-0.04em] text-white mb-6 font-[family-name:var(--font-display)]">
              Open, Secure, and <span className="text-brand">Powerful</span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed">
              Hydrodactyl is the world's best Pterodactyl panel. Unmatched performance and features.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <PyroButton variant="primary" size="large" href="/docs/hydrodactyl" isArrow>
                <BookOpenIcon className="w-5 h-5" /> Get Started
              </PyroButton>
              <div className="flex flex-col items-center gap-2">
                <PyroButton variant="quaternary" size="large" href="https://github.com/blueprintframework/hydrodactyl" external>
                  <GitHubIcon /> Star on GitHub
                </PyroButton>
                <GitHubStats />
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <SafariBrowser
              src="/panelscreenshots/hydrodactyl-server.png"
              width={1920}
              height={1080}
              alt="Hydrodactyl server management interface"
              url="panel.hydrodactyl.dev"
            />
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="relative z-10 w-full bg-[#09090b] border-t border-white/5 mt-[-250px]">
        <div
          className="absolute -top-24 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, #09090b 0%, rgba(9,9,11,0.95) 40%, rgba(9,9,11,0.7) 70%, rgba(9,9,11,0) 100%)'
          }}
        />
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="text-sm font-medium text-white/40 mb-6">Performance metrics</p>

              <h2 className="font-extrabold text-[clamp(3rem,7vw,6rem)] leading-[0.95] tracking-[-0.04em] mb-8 font-[family-name:var(--font-display)]">
                <span className="block text-white">170×</span>
                <span className="block text-[0.6em] text-white/40">smaller footprint</span>
              </h2>

              <h2 className="font-extrabold text-[clamp(3rem,7vw,6rem)] leading-[0.95] tracking-[-0.04em] mb-8 font-[family-name:var(--font-display)]">
                <span className="block text-brand">17×</span>
                <span className="block text-[0.6em] text-white/40">faster builds</span>
              </h2>

              <p className="text-white/50 text-lg max-w-md leading-relaxed">
                We rebuilt Pterodactyl from the ground up. The result? Unprecedented performance that no other panel can match.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-medium text-white/40 mb-8">Build time comparison</h3>

              {buildTimes.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between items-baseline mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`font-semibold ${item.highlight ? 'text-brand' : 'text-white/70'}`}>
                        {item.name}
                      </span>
                      <span className="text-xs text-white/30 font-mono">{item.tech}</span>
                    </div>
                    <span className={`font-mono text-sm ${item.highlight ? 'text-brand' : 'text-white/50'}`}>
                      {item.time}
                    </span>
                  </div>

                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.highlight ? 'bg-brand' : 'bg-white/20'}`}
                      style={{ width: `${item.percentage}%`, minWidth: item.highlight ? '4px' : undefined }}
                    />
                  </div>
                </div>
              ))}

              <p className="text-xs text-white/30 pt-4 leading-relaxed">
                Benchmarked on MacBook Pro M3 Max, 48GB RAM. Caching enabled for all builds.
                Results may vary based on configuration. Note: These benchmarks were done in 2024 and may not represent current build times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* features */}
      <section className="w-full bg-[#09090b] border-t border-white/5">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-extrabold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.03em] text-white mb-6 font-[family-name:var(--font-display)]">
              Built for the modern era
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Every aspect of Hydrodactyl has been carefully designed to deliver the best possible experience for server administrators.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 text-brand">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* easy switch */}
      <section className="w-full bg-[#09090b] border-t border-white/5">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-3 font-mono text-base lg:text-lg">
              <div>
                <span className="inline-block bg-red-500/10 rounded px-3 py-1.5 text-red-300/80">ghcr.io/pterodactyl/panel:latest</span>
              </div>
              <div>
                <span className="inline-block bg-green-500/10 rounded px-3 py-1.5 text-green-300/80">ghcr.io/blueprintframework/hydrodactyl:latest</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-white/40 mb-6">Migration made simple</p>

              <h2 className="font-extrabold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.03em] text-white mb-6 font-[family-name:var(--font-display)]">
                Switch in <span className="text-brand">one line</span>
              </h2>

              <p className="text-white/50 text-lg mb-8 leading-relaxed">
                Already running Pterodactyl with Docker? Just change the image in your compose file and run <code className="text-brand">docker compose up -d</code>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <PyroButton variant="primary" href="/docs/hydrodactyl/migrations" isArrow>Migration Guide</PyroButton>
                <PyroButton variant="quaternary" href="/docs/hydrodactyl/installation">Fresh Install</PyroButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* open source */}
      <section className="w-full bg-[#09090b] border-t border-white/5">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="text-sm font-medium text-white/40 mb-6">Transparent development</p>

              <h2 className="font-extrabold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.03em] text-white mb-6 font-[family-name:var(--font-display)]">
                Fully <span className="text-brand">open source</span>
              </h2>

              <p className="text-white/50 text-lg mb-8 leading-relaxed">
                Unlike other panels, Hydrodactyl&apos;s entire codebase is publicly available.
                Audit the code, contribute improvements, or fork it for your own needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <PyroButton variant="quaternary" href="https://github.com/blueprintframework/hydrodactyl" external>
                  <GitHubIcon /> View on GitHub
                </PyroButton>
                <PyroButton variant="quaternary" href="https://github.com/blueprintframework/hydrodactyl/blob/main/LICENSE.md" external>
                  <CodeBracketIcon className="w-5 h-5" /> Apache2.0 License
                </PyroButton>
              </div>
            </div>

            <div className="hidden lg:block">
              <pre className="text-sm font-mono text-[13px] leading-relaxed text-white/40">
                <code>
                  <span className="text-white/30">&lt;?php</span>{`

`}<span className="text-purple-400/70">namespace</span>{` Pterodactyl\\Listeners\\Auth;

`}<span className="text-purple-400/70">class</span>{` `}<span className="text-yellow-300/70">PasswordResetListener</span>{`
{
    `}<span className="text-purple-400/70">public function</span>{` `}<span className="text-blue-400/70">handle</span>{`($event): void
    {
        Activity::`}<span className="text-blue-400/70">event</span>{`(`}<span className="text-green-400/70">'password-reset'</span>{`)
            ->`}<span className="text-blue-400/70">subject</span>{`($event->user)
            ->`}<span className="text-blue-400/70">log</span>{`();
    }
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="w-full bg-[#09090b] border-t border-white/5">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-extrabold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.03em] text-white mb-6 font-[family-name:var(--font-display)]">
              Ready to get started?
            </h2>
            <p className="text-white/50 text-lg mb-10 leading-relaxed">
              Join the growing number of people using Hydrodactyl and deploy in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PyroButton variant="primary" size="large" href="/docs/hydrodactyl" isArrow>
                <BookOpenIcon className="w-5 h-5" /> Read the Docs
              </PyroButton>
              <PyroButton variant="quaternary" size="large" href="https://github.com/blueprintframework/hydrodactyl" external>
                <GitHubIcon /> View Source
              </PyroButton>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="w-full bg-[#09090b] border-t border-white/5">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <HydrodactylLogo />
              <span className="text-white/40 text-sm">© {new Date().getFullYear()} Pyro Inc and its contributors.</span>
            </div>

            <div className="flex items-center gap-6">
              <a href="/docs/hydrodactyl" className="text-white/40 hover:text-brand text-sm transition-colors">Documentation</a>
              <a href="https://github.com/blueprintframework/hydrodactyl" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-brand text-sm transition-colors">GitHub</a>
              <a href="https://github.com/blueprintframework/hydrodactyl/blob/main/LICENSE.md" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-brand text-sm transition-colors">License</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Page;
