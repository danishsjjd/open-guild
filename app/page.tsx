import Image from "next/image"

const featureCards = [
  {
    title: "Guild-first workspaces",
    body: "Create focused homes for teams, communities, launches, and long-running projects without losing the shared context.",
  },
  {
    title: "Fast channels",
    body: "Move from announcements to deep work with clean channel lists, persistent threads, and low-friction search.",
  },
  {
    title: "Voice when it matters",
    body: "Spin up huddles, live rooms, and drop-in calls directly from the conversation that started them.",
  },
  {
    title: "Controls for scale",
    body: "Role-based access, moderation queues, audit history, and member states are designed in from the start.",
  },
]

const workflowItems = [
  "Invite a guild",
  "Open dedicated channels",
  "Chat, huddle, and ship",
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#171a1f]">
      <header className="sticky top-0 z-30 border-b border-[#dfe3dc] bg-[#f7f8f5]/90 backdrop-blur">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#"
            className="flex items-center gap-3"
            aria-label="OpenGuild home"
          >
            <span className="grid size-9 place-items-center rounded-md bg-[#173b35] text-sm font-bold text-white">
              OG
            </span>
            <span className="text-lg font-semibold tracking-normal">
              OpenGuild
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-medium text-[#5d665f] md:flex">
            <a className="transition hover:text-[#171a1f]" href="#product">
              Product
            </a>
            <a className="transition hover:text-[#171a1f]" href="#features">
              Features
            </a>
            <a className="transition hover:text-[#171a1f]" href="#workflow">
              Workflow
            </a>
          </div>

          <a
            href="#waitlist"
            className="rounded-md bg-[#173b35] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0f2b27] focus:ring-4 focus:ring-[#173b35]/20 focus:outline-none"
          >
            Join waitlist
          </a>
        </nav>
      </header>

      <section
        id="product"
        className="relative isolate flex min-h-[78svh] items-center overflow-hidden"
      >
        <Image
          src="/openguild-hero.png"
          alt="OpenGuild team chat product preview"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#111816]/70" />
        <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,#111816_0%,rgba(17,24,22,0.88)_34%,rgba(17,24,22,0.3)_70%,rgba(17,24,22,0.05)_100%)]" />

        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold tracking-[0.16em] text-[#f0b35a] uppercase">
              Open-source guild communication
            </p>
            <h1 className="text-5xl leading-[1.02] font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
              OpenGuild
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#d7ddd8]">
              A community and team chat platform for organized channels, live
              voice rooms, threaded decisions, and member controls that feel
              built for serious collaboration.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#waitlist"
                className="rounded-md bg-[#e9774f] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#d85f3a] focus:ring-4 focus:ring-[#e9774f]/25 focus:outline-none"
              >
                Start a guild
              </a>
              <a
                href="#features"
                className="rounded-md border border-white/30 bg-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/15 focus:ring-4 focus:ring-white/20 focus:outline-none"
              >
                Explore features
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dfe3dc] bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            ["Channels", "Topic spaces that stay readable"],
            ["Threads", "Decisions separated from noise"],
            ["Voice", "Live rooms attached to context"],
          ].map(([label, text]) => (
            <div key={label} className="flex items-center gap-4">
              <div className="h-12 w-1 rounded-full bg-[#2f7d71]" />
              <div>
                <p className="text-sm font-semibold tracking-[0.12em] text-[#687169] uppercase">
                  {label}
                </p>
                <p className="mt-1 text-base font-medium text-[#171a1f]">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="bg-[#f7f8f5] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.16em] text-[#2f7d71] uppercase">
              Built for the next guild
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-[#171a1f] sm:text-4xl">
              The familiar speed of chat with stronger structure underneath.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((feature) => (
              <article
                key={feature.title}
                className="rounded-lg border border-[#dfe3dc] bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-[#171a1f]">
                  {feature.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#626b64]">
                  {feature.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="bg-[#17201d] py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold tracking-[0.16em] text-[#f0b35a] uppercase">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
              Bring the right people into the right room.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#c7d0ca]">
              OpenGuild keeps project context, member presence, and live
              discussion in one place so communities can move from idea to
              execution without scattering across tools.
            </p>
          </div>

          <ol className="grid gap-4 sm:grid-cols-3">
            {workflowItems.map((item, index) => (
              <li
                key={item}
                className="rounded-lg border border-white/12 bg-white/[0.06] p-5"
              >
                <span className="grid size-10 place-items-center rounded-md bg-[#e9774f] text-sm font-bold">
                  {index + 1}
                </span>
                <p className="mt-5 text-lg font-semibold">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="waitlist" className="bg-white py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-normal text-[#171a1f]">
              Build the guild chat stack in the open.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#626b64]">
              OpenGuild is the new project identity for the app. The next step
              is turning this landing page into the real chat experience.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
