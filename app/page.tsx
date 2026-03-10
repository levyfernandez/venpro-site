"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type Section = {
  id: string
  label: string
  title: string
  eyebrow: string
  description: string
}

export default function VenproGroupSite() {
  const sections: Section[] = useMemo(
    () => [
      {
        id: "home",
        label: "Home",
        title: "Multichannel commerce with international reach.",
        eyebrow: "VENPRO GROUP",
        description:
          "Venpro Group is a company specialized in the commercialization and distribution of consumer products through e-commerce channels, connecting brands with strategic markets across the United States and Latin America.",
      },
      {
        id: "company",
        label: "Company",
        title: "A strategic partner for digital commerce growth.",
        eyebrow: "ABOUT US · SERVICES",
        description:
          "Based in the United States, we provide integrated solutions for distribution, commercial management, and product positioning, working with manufacturers and authorized distributors through efficient, transparent, and scalable processes.",
      },
      {
        id: "vision",
        label: "Contact",
        title: "Clear vision, efficient execution, long-term relationships.",
        eyebrow: "MISSION · VISION · CONTACT",
        description:
          "We empower brands in strategic markets through strong commercial structures, market analysis, and operations designed for professional growth across the United States and Latin America.",
      },
    ],
    []
  )

  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const shellRef = useRef<HTMLElement | null>(null)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    const handleScroll = () => {
      setScrolled(shell.scrollTop > 24)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        root: shell,
        threshold: [0.35, 0.55, 0.75],
        rootMargin: "-8% 0px -8% 0px",
      }
    )

    sections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    })

    shell.addEventListener("scroll", handleScroll)

    return () => {
      observer.disconnect()
      shell.removeEventListener("scroll", handleScroll)
    }
  }, [sections])

  return (
    <div className="bg-[#f7f7f4] text-[#565757] [font-family:var(--font-inter)] selection:bg-[#d5b647]/25">
      <style>{`
        html, body {
          background: #f7f7f4;
        }

        .snap-shell {
          height: 100vh;
          overflow-y: auto;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .snap-shell::-webkit-scrollbar {
          display: none;
        }

        .snap-section {
          min-height: 100vh;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          position: relative;
        }

        .grid-overlay {
          background-image:
            linear-gradient(rgba(86,87,87,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(86,87,87,0.035) 1px, transparent 1px);
          background-size: 56px 56px;
          background-position: center center;
        }

        .glass {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .section-enter {
          opacity: 0;
          transform: translateY(24px);
          animation: sectionEnter .9s cubic-bezier(.22,1,.36,1) forwards;
        }

        .section-enter-delay {
          opacity: 0;
          transform: translateY(28px);
          animation: sectionEnter 1.1s cubic-bezier(.22,1,.36,1) forwards;
        }

        .float-card {
          animation: floatCard 7s ease-in-out infinite;
          transform-style: preserve-3d;
        }

        .pulse-dot {
          animation: pulseDot 3.2s ease-in-out infinite;
        }

        @keyframes sectionEnter {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatCard {
          0%, 100% {
            transform: translateY(0px) rotateX(0deg) rotateY(0deg);
          }
          50% {
            transform: translateY(-10px) rotateX(1deg) rotateY(-1deg);
          }
        }

        @keyframes pulseDot {
          0%, 100% {
            opacity: .75;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="grid-overlay absolute inset-0 opacity-35" />
        <div className="absolute left-[-10rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#4092b7]/10 blur-3xl" />
        <div className="absolute right-[-8rem] top-[20%] h-[18rem] w-[18rem] rounded-full bg-white/80 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-6rem] h-[26rem] w-[26rem] rounded-full bg-[#d5b647]/10 blur-3xl" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`mx-auto mt-4 flex w-[min(1180px,92%)] items-center justify-between rounded-full border transition-all duration-500 ${
            scrolled
              ? "border-white/85 bg-white/82 px-4 py-2.5 shadow-[0_16px_50px_rgba(0,0,0,0.09)] backdrop-blur-2xl md:px-5"
              : "border-white/70 bg-white/62 px-5 py-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.05)] backdrop-blur-xl md:px-6"
          }`}
        >
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 text-left transition hover:opacity-90"
          >
            <div
              className={`relative transition-all duration-500 ${
                scrolled ? "h-7 w-7" : "h-8 w-8"
              }`}
            >
              <div className="absolute left-0 top-0 h-full w-1/2 -skew-x-[28deg] rounded-[1px] bg-[#4092b7]" />
              <div className="absolute left-1/2 top-0 h-[42%] w-[30%] -skew-x-[28deg] rounded-[1px] bg-[#d5b647]" />
            </div>

            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#9a9a9a]">
                Venpro
              </div>
              <div
                className={`font-semibold tracking-[0.24em] text-[#565757] transition-all duration-500 ${
                  scrolled ? "text-xs" : "text-sm"
                }`}
              >
                GROUP
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {sections.map((section) => {
              const active = activeSection === section.id

              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                    active
                      ? "bg-[#565757] text-white shadow-[0_10px_30px_rgba(86,87,87,0.18)]"
                      : "text-[#6f6f6f] hover:bg-white hover:text-[#565757]"
                  }`}
                >
                  {section.label}
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        {sections.map((section) => {
          const active = activeSection === section.id
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              aria-label={section.label}
              className={`h-3.5 w-3.5 rounded-full border transition-all duration-300 ${
                active
                  ? "scale-125 border-[#4092b7] bg-[#4092b7] shadow-[0_0_0_6px_rgba(64,146,183,0.12)]"
                  : "border-[#565757]/20 bg-white/90 hover:scale-110 hover:border-[#4092b7]/45"
              }`}
            />
          )
        })}
      </div>

      <main ref={shellRef} className="snap-shell">
        <section
          id="home"
          className="snap-section flex items-center px-6 pb-10 pt-28 md:px-10 lg:px-16"
        >
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="max-w-3xl">
              <div className="section-enter mb-6 inline-flex items-center gap-3 rounded-full border border-[#565757]/10 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#7f7f7f] shadow-sm backdrop-blur-xl">
                <span className="pulse-dot h-2 w-2 rounded-full bg-[#d5b647]" />
                {sections[0].eyebrow}
              </div>

              <h1 className="section-enter max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.065em] text-[#565757] md:text-7xl lg:text-[5.9rem]">
                {sections[0].title}
              </h1>

              <p className="section-enter-delay mt-8 max-w-2xl text-lg leading-8 text-[#6f6f6f] md:text-xl">
                {sections[0].description}
              </p>

              <p className="section-enter-delay mt-5 max-w-2xl text-base leading-8 text-[#8a8a8a]">
                We collaborate with manufacturers and authorized distributors to
                bring quality products to thousands of end customers through
                efficient logistics processes, market analysis, and a strong
                commercial structure.
              </p>

              <div className="section-enter-delay mt-10 flex flex-wrap gap-3">
                <button
                  onClick={() => scrollToSection("company")}
                  className="rounded-full bg-[#565757] px-6 py-3 text-sm font-medium text-white shadow-[0_14px_35px_rgba(86,87,87,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(86,87,87,0.22)]"
                >
                  Learn about the company
                </button>

                <button
                  onClick={() => scrollToSection("vision")}
                  className="rounded-full border border-[#565757]/12 bg-white/90 px-6 py-3 text-sm font-medium text-[#565757] transition duration-300 hover:-translate-y-0.5 hover:border-[#565757]/30 hover:bg-white"
                >
                  Contact us
                </button>
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-xl items-center justify-center [perspective:1600px]">
              <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_top,rgba(64,146,183,0.16),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(213,182,71,0.16),transparent_36%)] blur-2xl" />
              <div className="glass float-card relative w-full rounded-[2.7rem] border border-white/85 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.08)] md:p-10">
                <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9a9a9a]">
                      Presence
                    </div>
                    <div className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[#565757]">
                      United States
                    </div>
                    <div className="mt-1 text-lg text-[#7c7c7c]">
                      and Latin America
                    </div>
                  </div>

                  <div className="relative h-20 w-20 shrink-0">
                    <div className="absolute left-1 top-0 h-20 w-10 -skew-x-[28deg] rounded-sm bg-[#4092b7]" />
                    <div className="absolute right-3 top-0 h-7 w-6 -skew-x-[28deg] rounded-sm bg-[#d5b647]" />
                  </div>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {[
                    "E-commerce company",
                    "Consumer product distribution",
                    "Multichannel commercialization",
                    "Connecting brands with international markets",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-3xl border border-[#565757]/8 bg-[#fafaf8]/92 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.05)]"
                    >
                      <div className="mb-3 h-1.5 w-10 rounded-full bg-[#4092b7]" />
                      <p className="text-sm leading-6 text-[#666]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="company"
          className="snap-section flex items-center px-6 py-20 md:px-10 lg:px-16"
        >
          <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="glass rounded-[2.4rem] border border-white/85 p-8 shadow-[0_22px_70px_rgba(0,0,0,0.06)] md:p-10">
              <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8e8e8e]">
                {sections[1].eyebrow}
              </div>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] text-[#565757] md:text-5xl">
                {sections[1].title}
              </h2>

              <p className="mt-6 text-base leading-8 text-[#707070] md:text-lg">
                Venpro Group was founded with the vision of becoming a strategic
                partner for brands and distributors seeking to expand their reach
                in digital commerce.
              </p>

              <p className="mt-5 text-base leading-8 text-[#8a8a8a]">
                Our approach is based on long-term relationships, operational
                efficiency, and respect for each brand’s policies.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Product distribution",
                  text: "We manage the commercialization of consumer products across digital channels through structured and scalable processes.",
                },
                {
                  title: "Brand expansion",
                  text: "We help brands enter or strengthen their presence in new markets, especially across the United States and Latin America.",
                },
                {
                  title: "Logistics and commercial management",
                  text: "We oversee the full flow: sourcing from authorized distributors, storage, inventory management, and final sale execution.",
                },
                {
                  title: "Market analysis",
                  text: "We evaluate demand, turnover, and positioning to maximize results and protect long-term brand value.",
                },
              ].map((service, index) => (
                <div
                  key={service.title}
                  className="glass rounded-[2rem] border border-white/85 p-7 shadow-[0_18px_55px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9c9c9c]">
                      0{index + 1}
                    </div>
                    <div className="h-2 w-10 rounded-full bg-[#d5b647]" />
                  </div>

                  <h3 className="mt-7 text-2xl font-semibold tracking-[-0.035em] text-[#565757]">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#747474] md:text-base">
                    {service.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="vision"
          className="snap-section flex items-center px-6 py-20 md:px-10 lg:px-16"
        >
          <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="grid gap-6">
              <div className="glass rounded-[2.4rem] border border-white/85 p-8 shadow-[0_22px_70px_rgba(0,0,0,0.06)] md:p-10">
                <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8e8e8e]">
                  MISSION
                </div>

                <p className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#565757] md:text-3xl">
                  Connecting brands and distributors with strategic digital
                  markets.
                </p>

                <p className="mt-5 max-w-3xl text-base leading-8 text-[#777] md:text-lg">
                  Our mission is to connect brands and distributors with
                  strategic digital markets through efficient, transparent, and
                  sustainable commercialization solutions that create mutual
                  growth and long-term business relationships.
                </p>
              </div>

              <div className="glass rounded-[2.4rem] border border-white/85 p-8 shadow-[0_22px_70px_rgba(0,0,0,0.06)] md:p-10">
                <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8e8e8e]">
                  VISION
                </div>

                <p className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#565757] md:text-3xl">
                  To lead distribution and e-commerce across the United States
                  and Latin America.
                </p>

                <p className="mt-5 max-w-3xl text-base leading-8 text-[#777] md:text-lg">
                  To be recognized as a leading distribution and e-commerce
                  company in the United States and Latin America, known for
                  professionalism, reliability, and the ability to scale brands
                  in global digital commerce.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2.7rem] border border-[#565757]/8 bg-[#565757] p-8 text-white shadow-[0_26px_80px_rgba(0,0,0,0.1)] md:p-10">
              <div className="absolute right-[-4rem] top-[-3rem] h-36 w-36 rounded-full bg-white/5 blur-2xl" />
              <div className="absolute bottom-[-3rem] left-[-3rem] h-32 w-32 rounded-full bg-[#4092b7]/20 blur-2xl" />

              <div className="relative">
                <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/60">
                  CONTACT
                </div>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
                  Let&apos;s talk.
                </h2>

                <p className="mt-5 max-w-lg text-base leading-8 text-white/75 md:text-lg">
                  Tell us about your brand, distribution needs, or expansion
                  goals. We build strong, efficient, and sustainable commercial
                  relationships.
                </p>

                <div className="mt-8 grid gap-4 text-sm md:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                    <div className="text-white/50">Corporate Email</div>
                    <div className="mt-2 text-base font-medium">
                      info@venprogroup.com
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                    <div className="text-white/50">Location</div>
                    <div className="mt-2 text-base font-medium">
                      Miami, Florida, USA
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:col-span-2">
                    <div className="text-white/50">Business Hours</div>
                    <div className="mt-2 text-base font-medium">
                      Monday – Friday · 9:00 AM – 6:00 PM
                    </div>
                  </div>
                </div>

                <form className="mt-8 space-y-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none transition focus:border-[#4092b7] focus:bg-white/15"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none transition focus:border-[#4092b7] focus:bg-white/15"
                  />
                  <textarea
                    rows={5}
                    placeholder="Message"
                    className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none transition focus:border-[#4092b7] focus:bg-white/15"
                  />
                  <button
                    type="button"
                    className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#565757] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(255,255,255,0.12)]"
                  >
                    Send inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}