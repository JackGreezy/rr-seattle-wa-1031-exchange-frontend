"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import site from "@/content/site.json";
import { servicesData, locationsData, toolsData } from "@/data";

type MenuKey = "services" | "locations" | "tools";

const DROPDOWNS: { key: MenuKey; label: string }[] = [
  { key: "services", label: "Services" },
  { key: "locations", label: "Locations" },
  { key: "tools", label: "Tools" },
];

const staticNav = [
  { label: "About", href: "/about" },
  { label: "Property Types", href: "/property-types" },
  { label: "Blog", href: "/blog" },
];

const topServices = servicesData.slice(0, 8);
const locationList = locationsData.slice(0, 10);

export const SiteHeader = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRefs = useRef<Record<MenuKey, HTMLDivElement | null>>({
    services: null,
    locations: null,
    tools: null,
  });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  // Close mobile menu and dropdowns when navigating to new page
  useEffect(() => {
    // The route transition is the event that closes persistent navigation UI.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  const handleMouseEnter = (key: MenuKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
  };

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || mobileOpen ? "bg-white shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-8 py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/1031-exchange-seattle-wa-logo.png"
            alt={site.company}
            width={120}
            height={60}
            className="h-14 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {DROPDOWNS.map((dropdown) => (
            <div
              key={dropdown.key}
              className="relative"
              onMouseEnter={() => handleMouseEnter(dropdown.key)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={clsx(
                  "flex items-center gap-1 text-xs tracking-[0.15em] uppercase transition-colors",
                  scrolled || mobileOpen
                    ? "text-[#2c3e50] hover:text-[#b8a074]"
                    : "text-white hover:text-[#b8a074]",
                  openMenu === dropdown.key && "text-[#b8a074]"
                )}
              >
                {dropdown.label}
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openMenu === dropdown.key && (
                <div
                  ref={(el) => { dropdownRefs.current[dropdown.key] = el; }}
                  className="absolute top-full left-0 mt-4 min-w-[280px] bg-white shadow-xl border border-gray-100 py-4"
                  onMouseEnter={() => handleMouseEnter(dropdown.key)}
                  onMouseLeave={handleMouseLeave}
                >
                  {dropdown.key === "services" && (
                    <div className="px-6">
                      {topServices.map((s) => (
                        <Link
                          key={s.slug}
                          href={s.route}
                          className="block py-2 text-sm text-[#2c3e50] hover:text-[#b8a074] transition-colors"
                        >
                          {s.name}
                        </Link>
                      ))}
                      <Link
                        href="/services"
                        className="block pt-4 mt-4 border-t border-gray-100 text-xs tracking-[0.15em] uppercase text-[#b8a074] hover:text-[#2c3e50]"
                      >
                        View All Services
                      </Link>
                    </div>
                  )}
                  {dropdown.key === "locations" && (
                    <div className="px-6">
                      {locationList.map((l) => (
                        <Link
                          key={l.slug}
                          href={l.route}
                          className="block py-2 text-sm text-[#2c3e50] hover:text-[#b8a074] transition-colors"
                        >
                          {l.name}
                        </Link>
                      ))}
                      <Link
                        href="/locations"
                        className="block pt-4 mt-4 border-t border-gray-100 text-xs tracking-[0.15em] uppercase text-[#b8a074] hover:text-[#2c3e50]"
                      >
                        View All Locations
                      </Link>
                    </div>
                  )}
                  {dropdown.key === "tools" && (
                    <div className="px-6">
                      {toolsData.map((t) => (
                        <Link
                          key={t.slug}
                          href={`/tools/${t.slug}`}
                          className="block py-2 text-sm text-[#2c3e50] hover:text-[#b8a074] transition-colors"
                        >
                          {t.name}
                        </Link>
                      ))}
                      <Link
                        href="/tools"
                        className="block pt-4 mt-4 border-t border-gray-100 text-xs tracking-[0.15em] uppercase text-[#b8a074] hover:text-[#2c3e50]"
                      >
                        View All Tools
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {staticNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "text-xs tracking-[0.15em] uppercase transition-colors",
                scrolled || mobileOpen
                  ? "text-[#2c3e50] hover:text-[#b8a074]"
                  : "text-white hover:text-[#b8a074]",
                pathname === item.href && "text-[#b8a074]"
              )}
            >
              {item.label}
            </Link>
          ))}

          <a
            href={`tel:${site.phoneDigits}`}
            className={clsx(
              "whitespace-nowrap border px-4 py-2 text-xs uppercase tracking-[0.12em] transition-all",
              scrolled
                ? "border-[#b8a074] bg-[#b8a074] text-white hover:bg-[#a08960]"
                : "border-[#b8a074] bg-[#b8a074]/90 text-white hover:bg-[#b8a074]"
            )}
          >
            Call {site.phone}
          </a>

          <Link
            href="/contact"
            className={clsx(
              "px-6 py-2 text-xs tracking-[0.15em] uppercase transition-all",
              scrolled
                ? "border border-[#2c3e50] text-[#2c3e50] hover:bg-[#2c3e50] hover:text-white"
                : "border border-white text-white hover:bg-white hover:text-[#2c3e50]"
            )}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          <div className="space-y-1.5">
            <span className={clsx("block w-6 h-0.5 transition-all", scrolled || mobileOpen ? "bg-[#2c3e50]" : "bg-white", mobileOpen && "rotate-45 translate-y-2")} />
            <span className={clsx("block w-6 h-0.5 transition-all", scrolled || mobileOpen ? "bg-[#2c3e50]" : "bg-white", mobileOpen && "opacity-0")} />
            <span className={clsx("block w-6 h-0.5 transition-all", scrolled || mobileOpen ? "bg-[#2c3e50]" : "bg-white", mobileOpen && "-rotate-45 -translate-y-2")} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-navigation"
        className={clsx(
          "fixed inset-x-0 bottom-0 top-[96px] overflow-y-auto border-t border-gray-100 bg-white transition-all duration-300 lg:hidden",
          mobileOpen ? "visible translate-x-0 opacity-100" : "invisible translate-x-full opacity-0"
        )}
      >
        <div className="mx-auto max-w-xl space-y-5 px-8 py-7 pb-12">
          {DROPDOWNS.map((dropdown) => (
            <div key={dropdown.key}>
              <button
                type="button"
                className="w-full flex items-center justify-between text-xs tracking-[0.15em] uppercase text-[#2c3e50] py-2"
                onClick={() => setOpenMenu(openMenu === dropdown.key ? null : dropdown.key)}
              >
                {dropdown.label}
                <span className="text-[#b8a074]">{openMenu === dropdown.key ? "−" : "+"}</span>
              </button>
              {openMenu === dropdown.key && (
                <div className="pl-4 pt-2 space-y-2">
                  {dropdown.key === "services" && topServices.map((s) => (
                    <Link key={s.slug} href={s.route} className="block text-sm text-[#6b7c8a] py-1">{s.name}</Link>
                  ))}
                  {dropdown.key === "locations" && locationList.map((l) => (
                    <Link key={l.slug} href={l.route} className="block text-sm text-[#6b7c8a] py-1">{l.name}</Link>
                  ))}
                  {dropdown.key === "tools" && toolsData.map((t) => (
                    <Link key={t.slug} href={`/tools/${t.slug}`} className="block text-sm text-[#6b7c8a] py-1">{t.name}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {staticNav.map((item) => (
            <Link key={item.href} href={item.href} className="block text-xs tracking-[0.15em] uppercase text-[#2c3e50] py-2">
              {item.label}
            </Link>
          ))}
          <div className="grid gap-3 pt-2">
            <a href={`tel:${site.phoneDigits}`} className="block w-full bg-[#b8a074] py-4 text-center text-xs uppercase tracking-[0.15em] text-white">
              Call {site.phone}
            </a>
            <Link href="/contact" className="block w-full border border-[#2c3e50] py-4 text-center text-xs uppercase tracking-[0.15em] text-[#2c3e50]">
              Start My Exchange
            </Link>
            <Link href="/contact?request=properties" className="block w-full border border-[#b8a074] py-4 text-center text-xs uppercase tracking-[0.15em] text-[#8d764d]">
              Get a Free Property List
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
