import type { Metadata } from "next";
import site from "@/content/site.json";
import {
  servicesData,
  locationsData,
  toolsData,
  type FAQItem,
} from "@/data";
import { getPrimaryMarket } from "@/lib/market";
import { HomeContent } from "@/components/home/home-content";

const { city: PRIMARY_CITY, state: PRIMARY_STATE_ABBR } = getPrimaryMarket();

export const metadata: Metadata = {
  title: "1031 Exchange Seattle | Free Turnkey Exchange Help",
  description:
    "Free 1031 exchange guidance for Seattle property owners. Get help with QI setup, replacement properties, DST options, deadlines, and closing.",
  alternates: {
    canonical: "https://www.1031exchangeseattle.com/",
  },
  openGraph: {
    title: "1031 Exchange Seattle | Free Turnkey Exchange Help",
    description:
      "Free 1031 exchange guidance for Seattle property owners. Get help with QI setup, replacement properties, DST options, deadlines, and closing.",
    url: "https://www.1031exchangeseattle.com/",
    siteName: "1031 Exchange Seattle",
    images: ["/homepage-hero/seattle-washington-1031-exchange-1.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "1031 Exchange Seattle | Free Turnkey Exchange Help",
    description:
      "Free 1031 exchange guidance for Seattle property owners. Get help with QI setup, replacement properties, DST options, deadlines, and closing.",
    images: ["/homepage-hero/seattle-washington-1031-exchange-1.jpg"],
  },
};

const faqItems: FAQItem[] = [
  {
    question: "Can you help if my Seattle property is already under contract?",
    answer:
      "Yes. Call as soon as possible with the expected closing date and current transaction status. The immediate priority is engaging an independent qualified intermediary before the seller can receive the proceeds, then organizing the exchange calendar and replacement-property brief.",
  },
  {
    question: "What if this is my first 1031 exchange?",
    answer:
      "A first-time exchanger does not need to arrive with a complete plan. We can explain the major decisions in plain language, help identify which independent professionals are needed, and organize the replacement search around the owner’s actual goals and timeline.",
  },
  {
    question: "Can a 1031 exchange reduce my property-management responsibilities?",
    answer:
      "Potentially. A Seattle owner can compare another directly managed property with net-lease real estate and professionally managed DST interests. Each path offers different control, workload, liquidity, fee, financing, concentration, and risk tradeoffs.",
  },
  {
    question: "What is a DST and does it require active management?",
    answer:
      "A Delaware Statutory Trust gives eligible investors fractional interests in professionally managed real estate. The sponsor controls the trust and properties, so the investor does not make day-to-day landlord decisions. DSTs are securities and require careful review of offering documents, fees, leverage, sponsor risk, property risk, illiquidity, eligibility, and suitability.",
  },
  {
    question: "Can I compare direct property, net-lease property, and DST opportunities?",
    answer:
      "Yes. We help place the alternatives beside the same sale objective so control, management duties, projected income, financing, diligence, liquidity, concentration, fees, and realistic closing probability can be compared consistently.",
  },
  {
    question: "Can you help with inherited investment property?",
    answer:
      "Yes. Before the sale advances, organize the ownership history, qualifying use, basis questions, co-owner objectives, expected proceeds, and timing. Tax and legal conclusions should come from the owner’s CPA and attorney, but those questions can be made visible before the transaction limits the available choices.",
  },
  {
    question: "How do I receive a current replacement-property list?",
    answer:
      "Submit the short contact form or call 206-737-0634. Share the sale timing, expected exchange equity, debt, income goals, geographic preferences, and desired level of management so the request can be focused on relevant direct, net-lease, or DST possibilities.",
  },
];

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.company,
  url: "https://www.1031exchangeseattle.com/",
  image:
    "https://www.1031exchangeseattle.com/homepage-hero/seattle-washington-1031-exchange-1.jpg",
  description:
    "Free educational 1031 exchange guidance and replacement-property information for Seattle investment-property owners.",
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
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "1031 Exchange Seattle",
  url: "https://www.1031exchangeseattle.com/",
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
        serviceAreaCards={serviceAreaCards}
        faqItems={faqItems}
        tools={toolsData}
      />
    </>
  );
}
