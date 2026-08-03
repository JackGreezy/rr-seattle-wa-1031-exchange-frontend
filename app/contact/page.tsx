import { ContactFormWrapper } from "./contact-form";

export const metadata = {
  title: "Free 1031 Exchange Guidance in Seattle | Contact Us",
  description: "Call or submit the short form for free Seattle 1031 exchange guidance, replacement-property information, and help organizing the next step.",
};

export default function ContactPage() {
  return (
    <main className="bg-brand-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="mb-16 text-center">
          <span className="subheading mb-4 block">Call or Use the Short Form</span>
          <h1 className="heading-display text-white">
            Free 1031 Exchange Guidance in Seattle
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85">
            Tell us whether you are planning a sale, already under contract, looking for replacement property, or exploring a more passive DST path. No perfect plan is required.
          </p>
          <a
            href="tel:2067370634"
            className="mt-8 inline-block border border-[#b8a074] bg-[#b8a074] px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#a08960]"
          >
            Call 206-737-0634 — Free Consultation
          </a>
        </div>
        <ContactFormWrapper />
      </div>
    </main>
  );
}
