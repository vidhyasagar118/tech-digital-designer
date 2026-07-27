export const SITE_URL =
  "https://tech-digital-designer.vercel.app";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Tech Digital Designers",
  alternateName: [
    "Tech Digital Designer",
    "Tech Digital Designers Digital Growth Studio",
  ],
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "Tech Digital Designers is a digital growth studio offering website development, app development, SEO, digital marketing, social media promotion, poster design, branding and advertising services.",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  knowsAbout: [
    "Website Development",
    "Web Designing",
    "Mobile App Development",
    "Search Engine Optimization",
    "Digital Marketing",
    "Social Media Marketing",
    "Instagram Promotion",
    "Facebook Promotion",
    "WhatsApp Marketing",
    "Google Ads",
    "Social Media Management",
    "Poster Design",
    "Graphic Design",
    "Brand Identity Design",
    "Resume Design",
    "Ecommerce Development",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Tech Digital Designers",
  alternateName: "Tech Digital Designer",
  url: SITE_URL,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: ["en-IN", "hi-IN"],
};

export const homeServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: "Tech Digital Designers",
  alternateName: "Tech Digital Designer",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  priceRange: "₹₹",
  description:
    "Professional website development, mobile app development, SEO, digital marketing, social media marketing, graphic design and business promotion services in India.",
  areaServed: [
    {
      "@type": "Country",
      name: "India",
    },
    {
      "@type": "City",
      name: "Chittorgarh",
    },
    {
      "@type": "City",
      name: "Motihari",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Website Development",
      },
      {
        "@type": "OfferCatalog",
        name: "Mobile App Development",
      },
      {
        "@type": "OfferCatalog",
        name: "Digital Marketing",
      },
      {
        "@type": "OfferCatalog",
        name: "SEO Services",
      },
      {
        "@type": "OfferCatalog",
        name: "Social Media Marketing",
      },
      {
        "@type": "OfferCatalog",
        name: "Graphic and Poster Design",
      },
    ],
  },
};

export function createServiceSchema({
  name,
  description,
  path,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: name,
  };
}

export function createBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(
      (item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
      })
    ),
  };
}