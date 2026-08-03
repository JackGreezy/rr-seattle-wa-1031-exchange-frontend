import Link from "next/link";
import site from "@/content/site.json";

export const StickyCta = () => {
  return (
    <div className="fixed bottom-3 right-3 z-40">
      {/* Desktop */}
      <div className="hidden lg:block">
        <Link
          href="/contact"
          className="px-6 py-3 bg-[#b8a074] text-white text-xs tracking-[0.15em] uppercase shadow-lg hover:bg-[#a08960] transition-colors"
        >
          Contact Us
        </Link>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <a
          href={`tel:${site.phoneDigits}`}
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/50 bg-[#b8a074] text-white shadow-xl transition-transform active:scale-95"
          aria-label={`Call ${site.phone}`}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
      </div>
    </div>
  );
};
