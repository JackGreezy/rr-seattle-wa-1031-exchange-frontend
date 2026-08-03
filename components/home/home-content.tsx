"use client";

import type { JSX } from "react";
import React, { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import site from "@/content/site.json";
import { ContactForm } from "@/components/forms/contact-form";
import type { FAQItem, ServiceItem } from "@/data";
import type { ToolInfo } from "@/data/tools";

interface HomeContentProps {
  services: ServiceItem[];
  serviceAreaCards: { name: string; route: string; image?: string; type?: string }[];
  faqItems: FAQItem[];
  tools: ToolInfo[];
}

const Reveal: React.FC<{
  delay?: number;
  className?: string;
  children: React.ReactNode;
}> = ({ delay = 0, className, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const CalculatorIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
    <rect x="8" y="4" width="32" height="40" stroke="currentColor" strokeWidth={1.5} />
    <rect x="12" y="10" width="24" height="8" stroke="currentColor" strokeWidth={1} />
    <circle cx="16" cy="26" r="2" fill="currentColor" />
    <circle cx="24" cy="26" r="2" fill="currentColor" />
    <circle cx="32" cy="26" r="2" fill="currentColor" />
    <circle cx="16" cy="34" r="2" fill="currentColor" />
    <circle cx="24" cy="34" r="2" fill="currentColor" />
    <circle cx="32" cy="34" r="2" fill="currentColor" />
  </svg>
);

const ScaleIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
    <path d="M24 8V40" stroke="currentColor" strokeWidth={1.5} />
    <path d="M8 16L24 12L40 16" stroke="currentColor" strokeWidth={1.5} />
    <path d="M8 16L4 28H12L8 16Z" stroke="currentColor" strokeWidth={1.5} />
    <path d="M40 16L36 28H44L40 16Z" stroke="currentColor" strokeWidth={1.5} />
    <rect x="18" y="38" width="12" height="4" stroke="currentColor" strokeWidth={1} />
  </svg>
);

const ChecklistIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
    <rect x="8" y="4" width="32" height="40" stroke="currentColor" strokeWidth={1.5} />
    <path d="M14 16L18 20L26 12" stroke="currentColor" strokeWidth={1.5} />
    <line x1="30" y1="16" x2="36" y2="16" stroke="currentColor" strokeWidth={1} />
    <path d="M14 28L18 32L26 24" stroke="currentColor" strokeWidth={1.5} />
    <line x1="30" y1="28" x2="36" y2="28" stroke="currentColor" strokeWidth={1} />
  </svg>
);

const toolIconMap: Record<ToolInfo["icon"], JSX.Element> = {
  calculator: <CalculatorIcon />,
  scale: <ScaleIcon />,
  identification: <ChecklistIcon />,
};

const ownerSituations = [
  {
    title: "Planning a Sale",
    copy: "Start before the listing or closing so the exchange structure, independent QI, expected equity, debt, and replacement criteria can be discussed early.",
  },
  {
    title: "Already Under Contract",
    copy: "Bring the closing date and contract status. The immediate priority is protecting the exchange option before proceeds could reach the seller.",
  },
  {
    title: "Inherited Investment Property",
    copy: "Organize ownership, basis questions, qualifying use, co-owner goals, and the reason for selling before choosing a replacement path.",
  },
  {
    title: "Landlord Fatigue",
    copy: "Compare another actively managed asset with net-lease and professionally managed DST possibilities when tenants, repairs, and regulation no longer fit.",
  },
  {
    title: "Replacement Property Search",
    copy: "Build the search around equity, debt, income goals, control, management capacity, diligence, financing, and a realistic ability to close.",
  },
  {
    title: "Buying Before You Sell",
    copy: "Discuss reverse-exchange and financing questions when the preferred replacement opportunity appears before the Seattle property sale is complete.",
  },
];

const solutionCards = [
  {
    title: "Exchange Setup",
    copy: "Clarify the transaction, timeline, ownership, expected proceeds, existing advisors, and the independent qualified intermediary the exchange requires.",
  },
  {
    title: "Replacement Strategy",
    copy: "Compare direct real estate, net-lease opportunities, and passive DST possibilities against the same income, control, risk, and workload goals.",
  },
  {
    title: "Current Property Information",
    copy: "Request replacement-property information based on investment amount, debt, timing, geographic preferences, and desired level of management.",
  },
  {
    title: "Professional Handoffs",
    copy: "Keep open questions visible for the QI, CPA, attorney, brokers, lenders, inspectors, and licensed securities professionals responsible for their work.",
  },
];

const ownershipPaths = [
  {
    name: "Direct Property",
    control: "The owner directs leasing, financing, improvements, and disposition.",
    management: "The owner or a hired manager operates the asset.",
    review: "Title, leases, condition, operations, market, financing, and closing feasibility.",
  },
  {
    name: "Net-Lease Property",
    control: "The owner controls the real estate subject to the tenant and lease.",
    management: "The lease assigns specific obligations to the tenant; exposure varies by lease.",
    review: "Tenant, guaranty, lease terms, condition, residual value, and reletting market.",
  },
  {
    name: "DST Interest",
    control: "The sponsor controls the trust and underlying property.",
    management: "Professional management removes day-to-day landlord decisions.",
    review: "Offering documents, sponsor, fees, conflicts, leverage, property risks, and suitability.",
  },
];

const exchangeStages = [
  {
    title: "Before the Sale",
    copy: "Clarify ownership, qualifying use, basis questions, debt, expected equity, management goals, and who is already on the transaction team.",
  },
  {
    title: "While Under Contract",
    copy: "Engage the independent QI, confirm closing instructions, review the calendar, and prepare a written replacement-property brief.",
  },
  {
    title: "During the Search",
    copy: "Compare primary and backup candidates for diligence, financing, workload, risk, control, and realistic closing probability.",
  },
  {
    title: "Through Closing",
    copy: "Keep title, inspections, environmental review, insurance, entity documents, funding directions, and advisor questions moving.",
  },
];

export const HomeContent = ({
  services,
  serviceAreaCards,
  faqItems,
  tools,
}: HomeContentProps) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const neighborhoods = useMemo(() => serviceAreaCards.slice(0, 6), [serviceAreaCards]);

  return (
    <div className="bg-white">
      <section className="relative flex min-h-[760px] items-center justify-center overflow-hidden py-28 md:min-h-screen">
        <div className="absolute inset-0 bg-black">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/homepage-hero/seattle-washington-1031-exchange-1.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/seattle-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-[#0f2738]/75" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="mb-7 text-[10px] uppercase tracking-[0.32em] text-white/80 sm:text-xs sm:tracking-[0.4em]">
              Free 1031 Exchange Guidance for Seattle Property Owners
            </p>
            <h1 className="font-heading text-4xl leading-tight tracking-[0.08em] sm:text-5xl md:text-7xl md:tracking-[0.1em]">
              Turnkey 1031 Exchange Solutions in Seattle, WA
            </h1>
            <div className="mx-auto my-7 h-px w-20 bg-[#b8a074]" />
            <p className="mx-auto max-w-3xl text-base font-light leading-relaxed text-white/90 sm:text-lg md:text-xl">
              Selling a rental, inherited investment property, apartment building, or commercial asset? Get help understanding the exchange, engaging the right independent professionals, and comparing direct real estate, net-lease, and passive DST replacement possibilities.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 pb-20 sm:flex-row sm:flex-wrap sm:pb-0">
              <a
                href={`tel:${site.phoneDigits}`}
                className="w-full bg-white px-7 py-4 text-xs uppercase tracking-[0.16em] text-[#2c3e50] transition-all hover:bg-[#b8a074] hover:text-white sm:w-auto"
              >
                Call {site.phone} — Free Consultation
              </a>
              <Link
                href="/contact"
                className="w-full border border-white/60 px-7 py-4 text-xs uppercase tracking-[0.18em] text-white transition-all hover:bg-white hover:text-[#2c3e50] sm:w-auto"
              >
                Start My Exchange
              </Link>
              <Link
                href="/contact?request=properties"
                className="w-full border border-[#b8a074] bg-[#b8a074]/15 px-7 py-4 text-xs uppercase tracking-[0.18em] text-white transition-all hover:bg-[#b8a074] sm:w-auto"
              >
                Get a Free Property List
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[#1a3a52]/10 bg-white">
        <div className="mx-auto grid max-w-6xl md:grid-cols-3">
          {[
            ["Selling Soon", "Build the exchange plan before the closing clock begins."],
            ["Already Under Contract", "Call now to protect the exchange option before closing."],
            ["Want Less Management", "Compare direct, net-lease, and passive DST paths."],
          ].map(([title, copy]) => (
            <Link
              key={title}
              href="/contact"
              className="group border-b border-[#1a3a52]/10 px-8 py-7 transition-colors hover:bg-[#f7f6f4] md:border-b-0 md:border-r last:md:border-r-0"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-[#b8a074]">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#6b7c8a] group-hover:text-[#2c3e50]">{copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#f7f6f4] py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/homepage-hero/seattle-washington-1031-exchange-2.jpg"
                alt="Seattle investment property and 1031 exchange planning"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a52]/45 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#b8a074]">Start With the Sale</p>
            <h2 className="font-heading text-4xl leading-tight tracking-[0.08em] text-[#2c3e50] md:text-5xl">
              The reason you are selling should shape what comes next.
            </h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-[#6b7c8a] md:text-lg">
              <p>
                Seattle ownership can become a different investment than the one originally purchased. Regulation, repairs, tenant demands, renovations, inherited ownership, or concentrated equity may make another path more attractive.
              </p>
              <p>
                The first conversation should cover the actual property, expected sale timing, ownership, debt, anticipated equity, income needs, desired control, and how much management responsibility should remain after closing.
              </p>
              <p>
                From there, the exchange can be organized around the owner’s objectives—not around the first property listing or product that happens to appear.
              </p>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={`tel:${site.phoneDigits}`} className="bg-[#2c3e50] px-7 py-4 text-center text-xs uppercase tracking-[0.2em] text-white hover:bg-[#1a3a52]">
                Talk Through the Sale
              </a>
              <Link href="/about" className="border border-[#2c3e50] px-7 py-4 text-center text-xs uppercase tracking-[0.2em] text-[#2c3e50] hover:bg-[#2c3e50] hover:text-white">
                How We Help
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#b8a074]">Whatever Stage You Are In</p>
            <h2 className="font-heading text-4xl tracking-[0.08em] text-[#2c3e50] md:text-5xl">Bring us the situation—not a perfect plan.</h2>
            <p className="mt-6 leading-relaxed text-[#6b7c8a]">A first-time exchanger, experienced investor, family co-owner, and tired landlord may need very different answers. The conversation begins with what is happening now.</p>
          </Reveal>
          <div className="grid gap-px bg-[#1a3a52]/15 md:grid-cols-2 lg:grid-cols-3">
            {ownerSituations.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="h-full bg-white p-8 transition-colors hover:bg-[#f7f6f4] md:p-10">
                  <div className="mb-6 h-px w-10 bg-[#b8a074]" />
                  <h3 className="font-heading text-2xl tracking-[0.05em] text-[#2c3e50]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#6b7c8a]">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={`tel:${site.phoneDigits}`} className="inline-block border border-[#2c3e50] px-9 py-4 text-xs uppercase tracking-[0.22em] text-[#2c3e50] hover:bg-[#2c3e50] hover:text-white">
              Not Sure Where to Start? Call {site.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#1a3a52] py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-14 max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#b8a074]">Turnkey 1031 Exchange Solutions</p>
            <h2 className="font-heading text-4xl leading-tight tracking-[0.08em] md:text-5xl">One call to organize the moving pieces.</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70">Get free guidance from the planned sale through replacement closing, with the appropriate independent professionals responsible for tax, legal, intermediary, lending, brokerage, and securities work.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {solutionCards.map((item) => (
              <div key={item.title} className="border border-white/15 bg-white/[0.06] p-8 md:p-10">
                <h3 className="font-heading text-2xl tracking-[0.05em] text-white">{item.title}</h3>
                <p className="mt-4 leading-relaxed text-white/70">{item.copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="bg-[#b8a074] px-8 py-4 text-center text-xs uppercase tracking-[0.2em] text-white hover:bg-[#a08960]">Start My Exchange</Link>
            <a href={`tel:${site.phoneDigits}`} className="border border-white/45 px-8 py-4 text-center text-xs uppercase tracking-[0.2em] text-white hover:bg-white hover:text-[#1a3a52]">Call {site.phone}</a>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f6f4] py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#b8a074]">A More Passive Replacement Path</p>
            <h2 className="font-heading text-4xl leading-tight tracking-[0.08em] text-[#2c3e50] md:text-5xl">Leave Seattle property management behind.</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#6b7c8a]">
              A Delaware Statutory Trust may give eligible investors fractional access to professionally managed, institutional-quality real estate without personally handling tenants, maintenance, or renovations.
            </p>
            <ul className="mt-8 space-y-4 text-[#2c3e50]">
              {[
                "No day-to-day landlord or property-management decisions",
                "Professionally managed real estate across multiple property sectors",
                "Some offerings may accept investments near $100,000",
                "A potential way to diversify exchange equity across more than one property",
              ].map((item) => (
                <li key={item} className="flex gap-4 border-b border-[#1a3a52]/10 pb-4">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#b8a074]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-[#6b7c8a]">
              DST interests are securities. Availability, projected income, fees, leverage, sponsor and property risk, transfer restrictions, investor eligibility, and suitability vary. Review the offering documents with appropriately licensed professionals before investing.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact?request=properties" className="bg-[#2c3e50] px-7 py-4 text-center text-xs uppercase tracking-[0.2em] text-white hover:bg-[#1a3a52]">Get a Free Property List</Link>
              <a href={`tel:${site.phoneDigits}`} className="border border-[#2c3e50] px-7 py-4 text-center text-xs uppercase tracking-[0.2em] text-[#2c3e50] hover:bg-[#2c3e50] hover:text-white">Discuss Passive Options</a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src="/homepage-hero/seattle-washington-1031-exchange-4.jpg" alt="Professionally managed 1031 exchange replacement property" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a52]/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-8 text-white md:p-10">
                <p className="text-xs uppercase tracking-[0.3em] text-[#b8a074]">Tenants. Toilets. Trash.</p>
                <p className="mt-3 font-heading text-3xl tracking-[0.06em]">The next investment does not have to create another management job.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#b8a074]">Compare the Ownership Experience</p>
            <h2 className="font-heading text-4xl tracking-[0.08em] text-[#2c3e50] md:text-5xl">Different paths for the same Seattle sale.</h2>
            <p className="mt-6 leading-relaxed text-[#6b7c8a]">Control, management, liquidity, risk, and diligence change depending on how the replacement investment is owned.</p>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {ownershipPaths.map((path) => (
              <div key={path.name} className="border border-[#1a3a52]/15 p-8 md:p-9">
                <h3 className="font-heading text-2xl tracking-[0.05em] text-[#2c3e50]">{path.name}</h3>
                <dl className="mt-7 space-y-6 text-sm leading-relaxed">
                  <div><dt className="mb-2 text-xs uppercase tracking-[0.22em] text-[#b8a074]">Control</dt><dd className="text-[#6b7c8a]">{path.control}</dd></div>
                  <div><dt className="mb-2 text-xs uppercase tracking-[0.22em] text-[#b8a074]">Management</dt><dd className="text-[#6b7c8a]">{path.management}</dd></div>
                  <div><dt className="mb-2 text-xs uppercase tracking-[0.22em] text-[#b8a074]">Primary Review</dt><dd className="text-[#6b7c8a]">{path.review}</dd></div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0f2738] py-20 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-12 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#b8a074]">From Sale Planning to Replacement Closing</p>
            <h2 className="font-heading text-4xl tracking-[0.08em] md:text-5xl">Know what needs attention now.</h2>
          </Reveal>
          <div className="grid gap-px bg-white/15 md:grid-cols-2 lg:grid-cols-4">
            {exchangeStages.map((stage) => (
              <div key={stage.title} className="bg-[#0f2738] p-8">
                <h3 className="font-heading text-xl tracking-[0.05em] text-white">{stage.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/65">{stage.copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={`tel:${site.phoneDigits}`} className="bg-[#b8a074] px-8 py-4 text-center text-xs uppercase tracking-[0.2em] text-white hover:bg-[#a08960]">First Exchange? Call {site.phone}</a>
            <Link href="/contact?request=guide" className="border border-white/40 px-8 py-4 text-center text-xs uppercase tracking-[0.2em] text-white hover:bg-white hover:text-[#0f2738]">Get Free 1031 Information</Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f6f4] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-12 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#b8a074]">Serving the Puget Sound Region</p>
              <h2 className="font-heading text-4xl tracking-[0.08em] text-[#2c3e50] md:text-5xl">Seattle-area exchange help with nationwide property possibilities.</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/locations" className="border border-[#2c3e50] px-7 py-4 text-center text-xs uppercase tracking-[0.2em] text-[#2c3e50] hover:bg-[#2c3e50] hover:text-white">View All Markets</Link>
              <Link href="/contact?request=properties" className="bg-[#2c3e50] px-7 py-4 text-center text-xs uppercase tracking-[0.2em] text-white hover:bg-[#1a3a52]">Get a Free Property List</Link>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {neighborhoods.map((location) => (
              <Link key={location.route} href={location.route} className="group relative aspect-[4/3] overflow-hidden">
                <Image src={location.image || "/homepage-hero/seattle-washington-1031-exchange-1.jpg"} alt={location.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-heading text-2xl tracking-[0.07em] text-white">{location.name}</p>
                  <span className="mt-2 inline-block text-xs uppercase tracking-[0.18em] text-[#b8a074]">Explore Market</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#b8a074]">Explore the Details</p>
            <h2 className="font-heading text-4xl tracking-[0.08em] text-[#2c3e50] md:text-5xl">Seattle 1031 exchange resources.</h2>
            <p className="mt-6 leading-relaxed text-[#6b7c8a]">Use the detailed service pages and planning tools after the sale objective and immediate deadline are clear.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((service) => (
              <Link key={service.slug} href={service.route} className="group border border-[#1a3a52]/15 p-8 transition-colors hover:bg-[#1a3a52]">
                <p className="text-xs uppercase tracking-[0.22em] text-[#b8a074]">{service.category}</p>
                <h3 className="mt-4 font-heading text-2xl tracking-[0.05em] text-[#2c3e50] group-hover:text-white">{service.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#6b7c8a] group-hover:text-white/70">{service.short}</p>
              </Link>
            ))}
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {tools.map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group flex items-start gap-5 bg-[#f7f6f4] p-7 hover:bg-[#1a3a52]">
                <div className="text-[#b8a074]">{toolIconMap[tool.icon]}</div>
                <div><h3 className="font-heading text-xl tracking-[0.04em] text-[#2c3e50] group-hover:text-white">{tool.name}</h3><p className="mt-2 text-sm leading-relaxed text-[#6b7c8a] group-hover:text-white/70">{tool.summary}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f6f4] py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal className="mb-12 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#b8a074]">Questions Seattle Owners Ask Before Calling</p>
            <h2 className="font-heading text-4xl tracking-[0.08em] text-[#2c3e50] md:text-5xl">1031 Exchange FAQ</h2>
          </Reveal>
          <div>
            {faqItems.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 0.04}>
                <details className="group border-b border-[#1a3a52]/15">
                  <summary className="flex cursor-pointer items-center justify-between py-6 text-[#2c3e50]">
                    <span className="pr-8 font-heading text-lg tracking-[0.03em]">{faq.question}</span>
                    <span className="text-2xl text-[#b8a074] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-6 text-sm leading-relaxed text-[#6b7c8a]">{faq.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative flex min-h-[80vh] items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/homepage-hero/seattle-washington-1031-exchange-3.jpg" alt="Seattle 1031 exchange guidance" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0f2738]/90" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-2xl px-6 py-24 text-center">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#b8a074]">Free Guidance. No Perfect Plan Required.</p>
            <h2 className="font-heading text-4xl tracking-[0.1em] text-white md:text-5xl">Start With Your Seattle Property Sale</h2>
            <p className="mt-6 leading-relaxed text-white/75">Tell us where the transaction stands and what you want the next investment to accomplish. Use the short form or call now for free 1031 exchange guidance.</p>
            <a href={`tel:${site.phoneDigits}`} className="mt-7 inline-block border border-[#b8a074] px-7 py-3 text-xs uppercase tracking-[0.2em] text-[#b8a074] hover:bg-[#b8a074] hover:text-white">Call {site.phone}</a>
          </Reveal>
          <Reveal delay={0.15}>
            {formSubmitted ? (
              <div className="mt-10 border border-white/20 bg-white/10 p-10 text-white backdrop-blur-sm">
                <p className="font-heading text-2xl tracking-wide">Thank you.</p>
                <p className="mt-3 text-sm text-white/75">Expect a response within one business day.</p>
                <a href={`tel:${site.phoneDigits}`} className="mt-7 inline-block border border-white/60 px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-[#2c3e50]">Call {site.phone}</a>
              </div>
            ) : (
              <div className="mt-10 border border-white/20 bg-white/10 p-7 backdrop-blur-sm md:p-10">
                <ContactForm source="Homepage CTA" onSuccess={() => setFormSubmitted(true)} variant="dark" />
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
};
