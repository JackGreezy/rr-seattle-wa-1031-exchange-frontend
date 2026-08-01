import type { Metadata } from "next";
import site from "@/content/site.json";
import {
  servicesData,
  propertyTypesData,
  locationsData,
  resources,
  toolsData,
  type FAQItem,
} from "@/data";
import { getPrimaryMarket } from "@/lib/market";
import { HomeContent } from "@/components/home/home-content";

const { city: PRIMARY_CITY, state: PRIMARY_STATE_ABBR } = getPrimaryMarket();

export const metadata: Metadata = {
  title:
    "1031 Exchange Seattle | Property Sale Solutions",
  description:
    "Selling Seattle investment real estate? Put the QI, timing, financing, and replacement search in order, then request current options.",
  alternates: {
    canonical: "https://www.1031exchangeseattle.com/",
  },
  openGraph: {
    title: "1031 Exchange Seattle | Property Sale Solutions",
    description:
      "Selling Seattle investment real estate? Put the QI, timing, financing, and replacement search in order, then request current options.",
    url: "https://www.1031exchangeseattle.com/",
    siteName: "1031 Exchange Seattle",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "1031 Exchange Seattle | Property Sale Solutions",
    description:
      "Selling Seattle investment real estate? Put the QI, timing, financing, and replacement search in order, then request current options.",
    images: ["/og-image.png"],
  },
};

const faqItems: FAQItem[] = [
  {
    question: "What is the 45-day identification rule?",
    answer:
      "The Internal Revenue Service requires investors to identify potential replacement properties within forty-five calendar days of selling the relinquished asset. We prepare a formal identification letter, document timestamps, and verify that each property satisfies like-kind criteria for Seattle, WA investors.",
  },
  {
    question: "What properties qualify as like-kind?",
    answer:
      "Real property held for investment or productive use in a trade or business qualifies as like-kind, including single tenant NNN retail, shopping centers, logistics facilities, medical offices, and ground leases in Seattle, WA and beyond. Personal residences, dealer inventory, or fix-and-flip assets do not qualify.",
  },
  {
    question: "How does the 180-day closing rule work?",
    answer:
      "You must close on one or more identified replacements within one hundred eighty days of the relinquished closing date or before the due date of your tax return. We track milestones with your intermediary, lender, and counsel so Seattle, WA exchanges stay compliant.",
  },
  {
    question: "How is boot treated in Washington?",
    answer:
      "Any cash boot or debt imbalance received is taxable as capital gains income. Washington does not impose a capital gains tax on qualifying exchanges, yet federal taxation still applies to boot. We model replacement equity targets to minimize exposure for Seattle, WA taxpayers.",
  },
  {
    question: "What are excise taxes and how do they apply?",
    answer:
      "Washington collects Real Estate Excise Tax when you transfer property, even during a compliant 1031 exchange. We align your intermediary, escrow officer, and attorney so the excise tax is disclosed and remitted correctly for Seattle, WA transactions.",
  },
  {
    question: "How do you report on Form 8824?",
    answer:
      "You must file IRS Form 8824 with your federal tax return for the year of the exchange. The form outlines dates, property descriptions, fair market values, related party involvement, and any recognized gain. We organize the data package so your CPA can submit an accurate filing on time.",
  },
];

const timelineLinks = resources.filter((resource) =>
  ["irs-like-kind", "irs-form-8824", "rev-proc-2008-16"].includes(resource.key)
);

const waTransfer = resources.find(
  (resource) => resource.key === "washington-transfer-tax"
);

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.company,
  url: "https://www.1031exchangeseattle.com/",
  image: "https://www.1031exchangeseattle.com/og-image.png",
  description:
    "Seattle 1031 exchange specialists providing replacement property identification, underwriting, and deadline management.",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressLocality: site.mainCity,
    addressRegion: site.state,
    addressCountry: "US",
  },
  telephone: site.phone,
  email: site.email,
  areaServed: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
  serviceType: servicesData.map((service) => service.name),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    telephone: site.phone,
    email: site.email,
    areaServed: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
    availableLanguage: ["English"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.company,
  url: "https://www.1031exchangeseattle.com/",
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressLocality: site.mainCity,
    addressRegion: site.state,
    addressCountry: "US",
  },
  sameAs: [
    "https://www.linkedin.com",
    "https://www.irs.gov",
    "https://www.1031exchangeseattle.com/",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "1031 Exchange Seattle",
  url: "https://www.1031exchangeseattle.com/",
  potentialAction: {
    "@type": "SearchAction",
    target:
      "https://www.1031exchangeseattle.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const jsonSafe = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");

export default function Page() {
  const serviceAreaCards = locationsData.map((location) => ({
    name: location.name,
    route: location.route,
    image: location.image,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonSafe(professionalServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonSafe(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonSafe(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonSafe(faqJsonLd) }}
      />
      <HomeContent
        services={servicesData}
        propertyTypes={propertyTypesData}
        serviceAreaCards={serviceAreaCards}
        faqItems={faqItems}
        timelineLinks={timelineLinks}
        waTaxHref={waTransfer?.href || "#"}
        tools={toolsData}
      />
    </>
  );
}
