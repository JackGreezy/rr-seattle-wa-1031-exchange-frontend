import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import site from "@/content/site.json";
import { ContactForm } from "@/components/forms/contact-form";
import { buildBreadcrumbJsonLd } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "About 1031 Exchange Seattle | Turnkey Exchange Help",
  description:
    "Learn how 1031 Exchange Seattle helps property owners organize a sale, understand replacement paths, and connect with the independent professionals an exchange requires.",
  alternates: {
    canonical: "https://www.1031exchangeseattle.com/about",
  },
};

const breadcrumbItems = [
  { label: "Home", href: "https://www.1031exchangeseattle.com/" },
  { label: "About", href: "https://www.1031exchangeseattle.com/about" },
];

const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbItems);

const waysWeHelp = [
  {
    title: "Begin With the Owner’s Priorities",
    copy: "The sale reason, timing, equity, debt, income goals, desired control, and tolerance for continued management define what a useful replacement search should look like.",
  },
  {
    title: "Put the Exchange Team in Place",
    copy: "We help make the independent QI, CPA, attorney, brokers, lenders, inspectors, and licensed securities professionals visible before their decisions become urgent.",
  },
  {
    title: "Compare Replacement Paths",
    copy: "Direct property, net-lease real estate, and DST interests can be compared against the same objectives for control, workload, income, risk, financing, and closing probability.",
  },
  {
    title: "Keep the Transaction Moving",
    copy: "A clear calendar, written property brief, primary candidates, backup choices, diligence questions, and professional handoffs reduce avoidable surprises as closing approaches.",
  },
];

const saleReasons = [
  "A Seattle rental now requires more management than the owner wants",
  "An inherited investment property no longer fits the family’s objectives",
  "The property is already under contract and the exchange must be addressed quickly",
  "A concentrated holding needs a broader replacement-property discussion",
  "A preferred acquisition appeared before the current property could be sold",
  "The owner wants professionally managed real estate instead of another landlord job",
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="relative flex min-h-[560px] items-end">
        <div className="absolute inset-0">
          <Image
            src="/homepage-hero/seattle-washington-1031-exchange-2.jpg"
            alt="About 1031 Exchange Seattle"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-20">
          <nav className="mb-8 text-sm">
            <ol className="flex items-center gap-2 text-white/60">
              <li><Link href="/" className="hover:text-[#b8a074]">Home</Link></li>
              <li>/</li>
              <li className="text-white/90">About</li>
            </ol>
          </nav>
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#b8a074]">A Clear Starting Point for a Complex Sale</p>
          <h1 className="max-w-4xl font-heading text-4xl leading-tight tracking-[0.08em] text-white md:text-6xl">
            Turnkey 1031 Exchange Help for Seattle Property Owners
          </h1>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#b8a074]">Why We Are Here</p>
            <h2 className="font-heading text-4xl leading-tight tracking-[0.08em] text-[#2c3e50] md:text-5xl">
              You do not need to know every exchange rule before calling.
            </h2>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-[#6b7c8a]">
              <p>
                {site.company} gives investment-property owners a practical place to begin. The first job is understanding what is being sold, why it is being sold, where the transaction stands, and what the next investment should accomplish.
              </p>
              <p>
                From there, the moving pieces can be organized: independent qualified intermediary engagement, timing, expected exchange equity and debt, replacement-property criteria, direct real estate, net-lease possibilities, passive DST options, financing, diligence, and closing questions.
              </p>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={`tel:${site.phoneDigits}`} className="bg-[#2c3e50] px-8 py-4 text-center text-xs uppercase tracking-[0.2em] text-white hover:bg-[#1a3a52]">Call {site.phone}</a>
              <Link href="/contact" className="border border-[#2c3e50] px-8 py-4 text-center text-xs uppercase tracking-[0.2em] text-[#2c3e50] hover:bg-[#2c3e50] hover:text-white">Start My Exchange</Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src="/homepage-hero/seattle-washington-1031-exchange-4.jpg" alt="Seattle investment property replacement planning" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-[#f7f6f4] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#b8a074]">The Sale Has a Reason</p>
              <h2 className="font-heading text-4xl leading-tight tracking-[0.08em] text-[#2c3e50]">Tell us what changed.</h2>
              <p className="mt-6 leading-relaxed text-[#6b7c8a]">The replacement strategy should answer the owner’s actual problem, not simply repeat the ownership experience that prompted the sale.</p>
            </div>
            <div className="grid gap-px bg-[#1a3a52]/15 sm:grid-cols-2">
              {saleReasons.map((reason) => (
                <div key={reason} className="bg-white p-7">
                  <span className="mb-5 block h-px w-8 bg-[#b8a074]" />
                  <p className="leading-relaxed text-[#2c3e50]">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1a3a52] py-20 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#b8a074]">How We Help</p>
            <h2 className="font-heading text-4xl leading-tight tracking-[0.08em] md:text-5xl">A connected solution from the planned sale through replacement closing.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {waysWeHelp.map((item) => (
              <div key={item.title} className="border border-white/15 bg-white/[0.06] p-8 md:p-10">
                <h3 className="font-heading text-2xl tracking-[0.05em]">{item.title}</h3>
                <p className="mt-4 leading-relaxed text-white/70">{item.copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact?request=properties" className="bg-[#b8a074] px-8 py-4 text-center text-xs uppercase tracking-[0.2em] text-white hover:bg-[#a08960]">Get a Free Property List</Link>
            <a href={`tel:${site.phoneDigits}`} className="border border-white/40 px-8 py-4 text-center text-xs uppercase tracking-[0.2em] text-white hover:bg-white hover:text-[#1a3a52]">Talk to a 1031 Exchange Guide</a>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src="/homepage-hero/seattle-washington-1031-exchange-5.jpg" alt="Passive 1031 exchange replacement options" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a52]/70 to-transparent" />
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#b8a074]">When Less Management Matters</p>
            <h2 className="font-heading text-4xl leading-tight tracking-[0.08em] text-[#2c3e50] md:text-5xl">Explore property ownership without another day-to-day landlord role.</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#6b7c8a]">A DST may give an eligible investor access to professionally managed, institutional-quality real estate. Some offerings may begin near $100,000, and an exchange may be divided among multiple offerings when appropriate.</p>
            <p className="mt-5 text-sm leading-relaxed text-[#6b7c8a]">DST interests are securities. Availability, fees, leverage, illiquidity, sponsor and property risk, investor eligibility, and suitability must be reviewed through appropriately licensed professionals and the applicable offering documents.</p>
            <Link href="/contact?request=properties" className="mt-8 inline-block bg-[#2c3e50] px-8 py-4 text-center text-xs uppercase tracking-[0.2em] text-white hover:bg-[#1a3a52]">See Current Property Possibilities</Link>
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="absolute inset-0">
          <Image src="/homepage-hero/seattle-washington-1031-exchange-3.jpg" alt="Free Seattle 1031 exchange consultation" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0f2738]/90" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 md:px-10">
          <div className="mb-10 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#b8a074]">Free 1031 Exchange Guidance</p>
            <h2 className="font-heading text-4xl tracking-[0.08em] text-white md:text-5xl">Tell us where the sale stands.</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/70">Use the short form or call {site.phone}. Tax, legal, QI, brokerage, lending, and securities work remains with the appropriate independent professionals.</p>
          </div>
          <div className="border border-white/20 bg-white/10 p-7 backdrop-blur-sm md:p-10">
            <ContactForm source="About page" id="about-intake" variant="dark" />
          </div>
        </div>
      </section>
    </>
  );
}
