import { siteConfig } from "@/lib/content";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/logos/eagle-automation-logo-white.png`,
      width: 400,
      height: 90,
    },
    image: `${siteConfig.url}/logos/eagle-automation-logo-white.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1009 Commercial Blvd. North",
      addressLocality: "Arlington",
      addressRegion: "TX",
      postalCode: "76001",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.6637,
      longitude: -97.1081,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
    ],
    priceRange: "$$$$",
    areaServed: {
      "@type": "State",
      name: "Texas",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Eagle Machine, Inc.",
      url: "https://eaglemachine.net",
    },
    knowsAbout: [
      "CNC Automation",
      "FANUC Robotics",
      "FANUC CRX Collaborative Robots",
      "Machine Tending",
      "Industrial Automation",
      "Turnkey Integration",
    ],
    sameAs: [siteConfig.social.linkedin],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
