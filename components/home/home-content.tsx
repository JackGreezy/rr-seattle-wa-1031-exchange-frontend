"use client";

import type { JSX } from "react";
import React, { useMemo, useState, useRef, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import site from "@/content/site.json";
import { ContactForm } from "@/components/forms/contact-form";

import type { FAQItem, PropertyTypeItem, ServiceItem } from "@/data";
import type { ToolInfo } from "@/data/tools";

interface HomeContentProps {
  services: ServiceItem[];
  propertyTypes: PropertyTypeItem[];
  serviceAreaCards: { name: string; route: string; image?: string; type?: string }[];
  faqItems: FAQItem[];
  timelineLinks: { label: string; href: string }[];
  waTaxHref: string;
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

// Animated Counter Component
const AnimatedCounter: React.FC<{
  value: number;
  suffix?: string;
  duration?: number;
}> = ({ value, suffix = "", duration = 2 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
};

// Tool icons with improved design
const CalculatorIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
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
  <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
    <path d="M24 8V40" stroke="currentColor" strokeWidth={1.5} />
    <path d="M8 16L24 12L40 16" stroke="currentColor" strokeWidth={1.5} />
    <path d="M8 16L4 28H12L8 16Z" stroke="currentColor" strokeWidth={1.5} />
    <path d="M40 16L36 28H44L40 16Z" stroke="currentColor" strokeWidth={1.5} />
    <rect x="18" y="38" width="12" height="4" stroke="currentColor" strokeWidth={1} />
  </svg>
);

const ChecklistIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
    <rect x="8" y="4" width="32" height="40" stroke="currentColor" strokeWidth={1.5} />
    <path d="M14 16L18 20L26 12" stroke="currentColor" strokeWidth={1.5} />
    <line x1="30" y1="16" x2="36" y2="16" stroke="currentColor" strokeWidth={1} />
    <path d="M14 28L18 32L26 24" stroke="currentColor" strokeWidth={1.5} />
    <line x1="30" y1="28" x2="36" y2="28" stroke="currentColor" strokeWidth={1} />
    <circle cx="18" cy="40" r="2" stroke="currentColor" strokeWidth={1} />
    <line x1="30" y1="40" x2="36" y2="40" stroke="currentColor" strokeWidth={1} />
  </svg>
);

const toolIconMap: Record<ToolInfo["icon"], JSX.Element> = {
  calculator: <CalculatorIcon />,
  scale: <ScaleIcon />,
  identification: <ChecklistIcon />,
};

// Exchange types data
const exchangeTypes = [
  {
    name: "Delayed Exchange",
    description: "The most common 1031 structure. Sell first, then identify and acquire replacement property within IRS deadlines.",
    route: "/services/seattle-45-day-identification-strategy",
    image: "/homepage-hero/seattle-washington-1031-exchange-1.jpg",
  },
  {
    name: "Reverse Exchange",
    description: "Acquire replacement property before selling. Requires an exchange accommodation titleholder.",
    route: "/services/seattle-reverse-exchange-execution",
    image: "/homepage-hero/seattle-washington-1031-exchange-2.jpg",
  },
  {
    name: "Improvement Exchange",
    description: "Build equity through construction or improvements on replacement property during the exchange period.",
    route: "/services/seattle-improvement-exchange-oversight",
    image: "/homepage-hero/seattle-washington-1031-exchange-3.jpg",
  },
  {
    name: "DST Exchange",
    description: "Fractional ownership in institutional-quality real estate through Delaware Statutory Trusts.",
    route: "/services/seattle-dst-placement-advisory",
    image: "/homepage-hero/seattle-washington-1031-exchange-4.jpg",
  },
];

export const HomeContent = ({
  services,
  propertyTypes,
  serviceAreaCards,
  faqItems,
  tools,
}: HomeContentProps) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const neighborhoods = useMemo(() => serviceAreaCards.slice(0, 15), [serviceAreaCards]);
  
  // Auto-rotating carousel state
  const [carouselOffset, setCarouselOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll carousel
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCarouselOffset((prev) => {
        const cardWidth = 354; // 350px card + 4px gap
        const maxOffset = cardWidth * neighborhoods.length - (typeof window !== 'undefined' ? window.innerWidth : 1200);
        const newOffset = prev + 1;
        
        // Reset to beginning when we've scrolled through all
        if (newOffset >= maxOffset) {
          return 0;
        }
        return newOffset;
      });
    }, 30); // Smooth scrolling speed

    return () => clearInterval(interval);
  }, [isPaused, neighborhoods.length]);

  return (
    <div className="bg-white">
      {/* Hero Section - Full viewport with video background */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden bg-black">
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
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-xs tracking-[0.4em] uppercase mb-8 text-white/80">
              Trusted 1031 Exchange Guidance
            </p>
            <h1 className="font-heading text-5xl md:text-7xl tracking-[0.2em] mb-4">
              1031 EXCHANGE
            </h1>
            <div className="flex items-center justify-center gap-8 my-6">
              <span className="h-px w-16 bg-[#b8a074]" />
              <span className="font-heading text-3xl md:text-4xl tracking-[0.25em]">SEATTLE</span>
              <span className="h-px w-16 bg-[#b8a074]" />
            </div>
            <p className="text-lg md:text-xl font-light tracking-wide mt-8 text-white/90 max-w-2xl mx-auto">
              Expert coordination for tax-deferred exchanges across Washington State
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="px-10 py-4 bg-white text-[#2c3e50] text-xs tracking-[0.25em] uppercase hover:bg-[#b8a074] hover:text-white transition-all"
              >Talk Through the Seattle Sale</a>
              <a
                href={`tel:${site.phoneDigits}`}
                className="px-10 py-4 border border-white/60 text-white text-xs tracking-[0.25em] uppercase hover:bg-white hover:text-[#2c3e50] transition-all"
              >
                {site.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seattle Markets Section - Auto-Rotating Carousel (moved up) */}
      <section className="py-24 bg-[#1a3a52] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <Reveal className="flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.35em] uppercase text-[#b8a074] mb-4">
                Serving the Puget Sound Region
              </p>
              <h2 className="font-heading text-4xl md:text-5xl tracking-[0.12em] text-white">
                Seattle Markets
              </h2>
            </div>
            <Link
              href="/locations"
              className="hidden md:inline-block px-8 py-3 border border-white/40 text-xs tracking-[0.2em] uppercase text-white hover:bg-white hover:text-[#1a3a52] transition-all"
            >
              View All
            </Link>
          </Reveal>
        </div>
        
        {/* Auto-Rotating Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div 
            ref={carouselRef}
            className="flex gap-4 px-6"
            animate={{ x: -carouselOffset }}
            transition={{ duration: 0, ease: "linear" }}
          >
            {/* Duplicate neighborhoods for infinite scroll effect */}
            {[...neighborhoods, ...neighborhoods].map((location, index) => (
              <Link
                key={`${location.route}-${index}`}
                href={location.route}
                className="group relative block w-[300px] md:w-[350px] aspect-[3/4] overflow-hidden flex-shrink-0"
              >
                <Image
                  src={location.image || "/homepage-hero/seattle-washington-1031-exchange-1.jpg"}
                  alt={location.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#b8a074] mb-2">
                    {location.type}
                  </p>
                  <h3 className="font-heading text-2xl tracking-[0.1em] text-white mb-3">
                    {location.name}
                  </h3>
                  <span className="inline-block text-xs tracking-[0.15em] uppercase text-white/70 border-b border-white/30 pb-1 group-hover:text-[#b8a074] group-hover:border-[#b8a074] transition-colors">
                    Explore Market
                  </span>
                </div>
              </Link>
            ))}
          </motion.div>
          
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#1a3a52] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#1a3a52] to-transparent pointer-events-none" />
        </div>
        
        {/* Pause indicator */}
        <div className="max-w-7xl mx-auto px-6 mt-8">
          <p className="text-xs text-white/40 text-center">
            {isPaused ? "Paused - hover to browse" : "Auto-scrolling - hover to pause"}
          </p>
        </div>
        
        <div className="md:hidden px-6 mt-8 text-center">
          <Link
            href="/locations"
            className="inline-block px-8 py-3 border border-white/40 text-xs tracking-[0.2em] uppercase text-white hover:bg-white hover:text-[#1a3a52] transition-all"
          >
            View All Markets
          </Link>
        </div>
      </section>

      {/* Planning Tools Section - Redesigned */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Header */}
          <Reveal>
              <div className="lg:sticky lg:top-32">
                <p className="text-xs tracking-[0.35em] uppercase text-[#b8a074] mb-4">
                  Interactive Resources
                </p>
                <h2 className="font-heading text-4xl md:text-5xl tracking-[0.1em] text-[#2c3e50] mb-6">
                  Planning Tools
              </h2>
                <p className="text-[#6b7c8a] leading-relaxed mb-8 text-lg">
                  Calculate deadlines, estimate costs, and verify identification rules with our suite of interactive exchange planning tools.
                </p>
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/homepage-hero/seattle-washington-1031-exchange-4.jpg"
                    alt="Seattle 1031 Exchange Planning"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a52]/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-white/90 text-sm leading-relaxed">
                      Our tools help you stay compliant with IRS regulations while maximizing your tax deferral benefits.
                    </p>
                  </div>
              </div>
            </div>
          </Reveal>

            {/* Right Column - Tools */}
            <div className="space-y-6">
            {tools.map((tool, index) => (
                <Reveal key={tool.slug} delay={index * 0.15}>
                <Link
                  href={`/tools/${tool.slug}`}
                    className="group flex gap-6 p-8 bg-[#f7f6f4] hover:bg-[#1a3a52] transition-all duration-500"
                >
                    <div className="flex-shrink-0 text-[#b8a074] group-hover:text-[#b8a074] transition-colors">
                    {toolIconMap[tool.icon]}
                  </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="font-heading text-xl tracking-[0.08em] text-[#2c3e50] group-hover:text-white transition-colors">
                    {tool.name}
                  </h3>
                        <span className="text-[#2c3e50] group-hover:text-white opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </span>
                      </div>
                      <p className="mt-3 text-[#6b7c8a] group-hover:text-white/70 text-sm leading-relaxed transition-colors">
                        {tool.summary}
                      </p>
                      <span className="inline-block mt-4 text-xs tracking-[0.2em] uppercase text-[#b8a074] group-hover:text-[#b8a074] border-b border-transparent group-hover:border-[#b8a074] pb-1 transition-all">
                        Launch Tool
                      </span>
                    </div>
                </Link>
              </Reveal>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-[#f7f6f4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="relative aspect-[4/5]">
                <Image
                  src="/homepage-hero/seattle-washington-1031-exchange-2.jpg"
                  alt="Seattle 1031 Exchange"
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div>
                <p className="text-xs tracking-[0.35em] uppercase text-[#b8a074] mb-4">
                  About
                </p>
                <h2 className="font-heading text-4xl md:text-5xl tracking-[0.1em] text-[#2c3e50] mb-6">
                  1031 Exchange Seattle
                </h2>
                <p className="text-sm tracking-[0.15em] uppercase text-[#2c3e50] mb-8">
                  Expert Exchange Solutions for Washington Investors
                </p>
                <div className="space-y-6 text-[#6b7c8a] leading-relaxed">
                  <p>A Seattle owner may be selling because regulation, repairs, tenant demands, inherited ownership, or concentrated equity has changed the investment’s fit. We organize a 1031 exchange solution around sale proceeds, debt, desired income, control, workload, replacement markets, and backup candidates.</p>
                  <p>DST ownership can give Seattle sellers fractional access to professionally managed, institutional-quality real estate with no day-to-day landlord role. Offerings may include minimums near $100,000, while current availability, projected income, fees, leverage, sponsor and asset risk, transfer restrictions, eligibility, and suitability differ.</p>
                </div>
                <div className="mt-10">
                  <Link
                    href="/about"
                    className="text-xs tracking-[0.2em] uppercase text-[#2c3e50] border-b border-[#2c3e50] pb-1 hover:text-[#b8a074] hover:border-[#b8a074] transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Exchange Types Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-xs tracking-[0.35em] uppercase text-[#b8a074] mb-4">
              Exchange Structures
            </p>
            <h2 className="font-heading text-4xl md:text-5xl tracking-[0.12em] text-[#2c3e50]">
              Exchange Into Property Without Daily Management
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {exchangeTypes.map((type, index) => (
              <Reveal key={type.name} delay={index * 0.1}>
                <Link
                  href={type.route}
                  className="group block relative overflow-hidden"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={type.image}
                      alt={type.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="font-heading text-2xl md:text-3xl tracking-[0.1em] text-white mb-3">
                        {type.name}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {type.description}
                      </p>
              </div>
          </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/contact?request=guide"
              className="inline-block px-10 py-4 border border-[#2c3e50] text-xs tracking-[0.25em] uppercase text-[#2c3e50] hover:bg-[#2c3e50] hover:text-white transition-all"
            >Get Free Seattle 1031 Information</Link>
          </div>
        </div>
      </section>

      {/* Key Deadlines Section - Clean Professional Design (moved down) */}
      <section className="py-20 bg-[#1a3a52]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.35em] uppercase text-[#b8a074] mb-4">
              Critical Timelines
            </p>
            <h2 className="font-heading text-4xl md:text-5xl tracking-[0.12em] text-white">
              Key Deadlines
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center md:divide-x md:divide-white/20">
            {/* 45 Days */}
            <div className="text-center px-8 md:px-16 py-8 md:py-0">
              <p className="font-heading text-7xl md:text-8xl lg:text-9xl text-white tracking-tight">
                <AnimatedCounter value={45} duration={2} />
              </p>
              <p className="mt-4 text-xs tracking-[0.3em] uppercase text-[#b8a074]">Days to Identify</p>
            </div>
            
            {/* 180 Days */}
            <div className="text-center px-8 md:px-16 py-8 md:py-0">
              <p className="font-heading text-7xl md:text-8xl lg:text-9xl text-white tracking-tight">
                <AnimatedCounter value={180} duration={2.5} />
              </p>
              <p className="mt-4 text-xs tracking-[0.3em] uppercase text-[#b8a074]">Days to Close</p>
            </div>
            
            {/* 100% */}
            <div className="text-center px-8 md:px-16 py-8 md:py-0">
              <p className="font-heading text-7xl md:text-8xl lg:text-9xl text-white tracking-tight">
                <AnimatedCounter value={100} suffix="%" duration={2} />
              </p>
              <p className="mt-4 text-xs tracking-[0.3em] uppercase text-[#b8a074]">Tax Deferred</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview - Refined Professional Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-xs tracking-[0.35em] uppercase text-[#b8a074] mb-4">
              Our Expertise
            </p>
            <h2 className="font-heading text-4xl md:text-5xl tracking-[0.12em] text-[#2c3e50] mb-6">Seattle 1031 Exchange Solutions</h2>
            <p className="text-[#6b7c8a] leading-relaxed max-w-2xl mx-auto">
              From initial strategy through closing, we coordinate every aspect of your 1031 exchange with precision and transparency.
            </p>
          </Reveal>
          
          {/* Services Grid - Elegant Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
            {services.slice(0, 6).map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.05}>
                <Link
                  href={service.route}
                  className="group block bg-white p-10 h-full relative overflow-hidden"
                >
                  {/* Hover background effect */}
                  <div className="absolute inset-0 bg-[#1a3a52] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-px bg-[#b8a074]" />
                      <p className="text-[10px] tracking-[0.3em] uppercase text-[#b8a074]">
                        {service.category}
                      </p>
              </div>
                    <h3 className="font-heading text-2xl tracking-[0.05em] text-[#2c3e50] mb-4 group-hover:text-white transition-colors duration-500">
                      {service.name}
                    </h3>
                    <p className="text-[#6b7c8a] text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-500 mb-6">
                      {service.short}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#2c3e50] group-hover:text-[#b8a074] transition-colors duration-500">
                      Learn More
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 transform group-hover:translate-x-1 transition-transform">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/contact?request=properties"
              className="inline-block px-10 py-4 border border-[#2c3e50] text-xs tracking-[0.25em] uppercase text-[#2c3e50] hover:bg-[#2c3e50] hover:text-white transition-all"
            >Request the Seattle Property List</Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-xs tracking-[0.35em] uppercase text-[#b8a074] mb-4">
              Common Questions
            </p>
            <h2 className="font-heading text-4xl md:text-5xl tracking-[0.12em] text-[#2c3e50]">
              FAQ
            </h2>
          </Reveal>
          <div className="space-y-0">
            {faqItems.slice(0, 5).map((faq, index) => (
              <Reveal key={faq.question} delay={index * 0.05}>
                <details className="group border-b border-gray-200">
                  <summary className="cursor-pointer py-6 text-[#2c3e50] font-medium flex items-center justify-between">
                    <span className="pr-8 font-heading text-lg">{faq.question}</span>
                    <span className="text-[#b8a074] text-2xl transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="pb-6 text-[#6b7c8a] text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="relative min-h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/homepage-hero/seattle-washington-1031-exchange-3.jpg"
            alt="Seattle"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-24 text-center">
          <Reveal>
            <h2 className="font-heading text-4xl md:text-5xl tracking-[0.15em] text-white mb-6">
              Connect With Us
            </h2>
            <p className="text-white/80 mb-12 leading-relaxed">
              Share your exchange requirements and a senior advisor will respond 
              within one business day with replacement property options and timeline guidance.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            {formSubmitted ? (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-10 text-white">
                <p className="text-xl tracking-wide mb-4">Thank you.</p>
                <p className="text-white/80 text-sm">
                  Expect a response within one business day.
                </p>
                <a
                  href={`tel:${site.phoneDigits}`}
                  className="inline-block mt-8 px-8 py-3 border border-white/60 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[#2c3e50] transition-all"
                >
                  Call {site.phone}
                </a>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-10">
                <ContactForm
                  source="Homepage CTA"
                  onSuccess={() => setFormSubmitted(true)}
                  variant="dark"
                />
              </div>
            )}
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
              <a href={`tel:${site.phoneDigits}`} className="hover:text-white transition-colors">
                {site.phone}
              </a>
              <span className="hidden sm:block">|</span>
              <a href={`mailto:${site.email}`} className="hover:text-white transition-colors">
                {site.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
