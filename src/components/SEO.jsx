import React from "react";

import {
  Helmet,
} from "react-helmet-async";

const SITE_URL =
  "https://tech-digital-designer.vercel.app";

const DEFAULT_IMAGE =
  `${SITE_URL}/og-image.jpg`;

export default function SEO({
  title =
    "Tech Digital Designers - Website, App & Digital Marketing Company",

  description =
    "Tech Digital Designers provides website development, mobile app development, SEO, digital marketing, social media promotion, poster design, graphic design and business branding services across India.",

  keywords = "",
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noIndex = false,
  schema = null,
}) {
  const canonicalUrl =
    `${SITE_URL}${path}`;

  const completeTitle =
    title.includes(
      "Tech Digital Designers"
    )
      ? title
      : `${title} | Tech Digital Designers`;

  const robotsContent =
    noIndex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return (
    <Helmet>
      <title>
        {completeTitle}
      </title>

      <meta
        name="description"
        content={description}
      />

      {keywords && (
        <meta
          name="keywords"
          content={keywords}
        />
      )}

      <meta
        name="robots"
        content={robotsContent}
      />

      <meta
        name="googlebot"
        content={robotsContent}
      />

      <link
        rel="canonical"
        href={canonicalUrl}
      />

      <meta
        property="og:type"
        content={type}
      />

      <meta
        property="og:site_name"
        content="Tech Digital Designers"
      />

      <meta
        property="og:title"
        content={completeTitle}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={canonicalUrl}
      />

      <meta
        property="og:image"
        content={image}
      />

      <meta
        property="og:locale"
        content="en_IN"
      />

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={completeTitle}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={image}
      />

      <meta
        name="author"
        content="Tech Digital Designers"
      />

      <meta
        name="publisher"
        content="Tech Digital Designers"
      />

      <meta
        name="theme-color"
        content="#e11d2e"
      />

      {schema && (
        <script
          type="application/ld+json"
        >
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}