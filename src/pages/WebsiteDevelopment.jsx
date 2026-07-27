import SEO from "../components/SEO";

import {
  createBreadcrumbSchema,
  createServiceSchema,
} from "../seo/schemas";

export default function WebsiteDevelopment() {
  const serviceSchema =
    createServiceSchema({
      name: "Website Development Services",
      description:
        "Professional, responsive, secure and SEO-friendly website development services for startups, local businesses, professionals, schools, hotels, restaurants and ecommerce brands across India.",
      path: "/services/website-development",
    });

  const breadcrumbSchema =
    createBreadcrumbSchema([
      {
        name: "Home",
        path: "/",
      },
      {
        name: "Services",
        path: "/services",
      },
      {
        name: "Website Development",
        path: "/services/website-development",
      },
    ]);

  return (
    <>
      <SEO
        title="Professional Website Development Services in India"
        description="Tech Digital Designers develops fast, responsive and SEO-friendly business, ecommerce, education, hotel, restaurant, portfolio, rental and custom websites across India."
        keywords="Tech Digital Designers, website development India, website developer near me, business website development, ecommerce website developer, React website development, affordable website design, website developer Chittorgarh, website developer Motihari"
        path="/services/website-development"
        schema={{
          "@context":
            "https://schema.org",
          "@graph": [
            serviceSchema,
            breadcrumbSchema,
          ],
        }}
      />

      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">
            Website Development
          </p>

          <h1>
            Professional websites designed to
            grow your business
          </h1>

          <p>
            Tech Digital Designers creates
            modern, responsive, secure and
            search-engine-friendly websites for
            startups, local businesses,
            professionals, schools, hotels,
            restaurants and ecommerce brands.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>
            Website development services for
            every type of business
          </h2>

          <p>
            Your website is often the first
            place where customers evaluate your
            business. We create professional
            digital experiences that clearly
            explain your products and services,
            establish trust and make it easier
            for customers to contact, book or
            purchase from your business.
          </p>

          <p>
            Every website is designed according
            to the requirements of the business.
            We focus on clean design, mobile
            responsiveness, fast performance,
            simple navigation and meaningful
            calls to action.
          </p>

          <h2>
            Types of websites we develop
          </h2>

          <div className="service-details-grid">
            <article>
              <h3>
                Business Websites
              </h3>

              <p>
                Professional company websites
                that present your services,
                portfolio, achievements,
                contact information and business
                identity.
              </p>
            </article>

            <article>
              <h3>
                Ecommerce Websites
              </h3>

              <p>
                Online stores with products,
                categories, cart, checkout,
                payment integration, order
                management and administrative
                controls.
              </p>
            </article>

            <article>
              <h3>
                Hotel and Restaurant Websites
              </h3>

              <p>
                Attractive websites featuring
                rooms, menus, galleries,
                locations, enquiry forms,
                WhatsApp contact and booking
                functionality.
              </p>
            </article>

            <article>
              <h3>
                School and Education Websites
              </h3>

              <p>
                Informational and learning
                websites with notices, courses,
                admission information, study
                resources and administrative
                management.
              </p>
            </article>

            <article>
              <h3>
                Portfolio Websites
              </h3>

              <p>
                Personal websites for students,
                developers, designers,
                freelancers and professionals
                who want to showcase their work.
              </p>
            </article>

            <article>
              <h3>
                Rental and Booking Websites
              </h3>

              <p>
                Car, bike, taxi, hotel and
                service-booking platforms with
                availability, booking forms,
                customer accounts and payment
                options.
              </p>
            </article>
          </div>

          <h2>
            Website features we provide
          </h2>

          <ul>
            <li>
              Responsive mobile, tablet and
              desktop design
            </li>

            <li>
              Search-engine-friendly page
              structure
            </li>

            <li>
              Professional homepage and service
              pages
            </li>

            <li>
              Secure user registration and login
            </li>

            <li>
              Custom admin dashboard
            </li>

            <li>
              Contact and enquiry forms
            </li>

            <li>
              WhatsApp and phone integration
            </li>

            <li>
              Online payment integration
            </li>

            <li>
              Google Maps and business location
            </li>

            <li>
              Image and content management
            </li>

            <li>
              Website analytics integration
            </li>

            <li>
              Sitemap, robots.txt and structured
              data
            </li>

            <li>
              Social media profile integration
            </li>

            <li>
              Performance and security
              improvements
            </li>
          </ul>

          <h2>
            Technologies used by Tech Digital
            Designers
          </h2>

          <p>
            Depending on project requirements,
            we use technologies such as React,
            Vite, JavaScript, HTML, CSS, Node.js,
            Express.js and MongoDB. We also
            integrate cloud storage, secure
            authentication, payment gateways,
            email services, analytics, social
            media links and custom APIs.
          </p>

          <h2>
            SEO-friendly website development
          </h2>

          <p>
            Our website development process
            includes descriptive page titles,
            relevant meta descriptions, heading
            structure, clean URLs, internal
            links, image alternative text,
            canonical URLs, sitemap creation and
            structured data wherever relevant.
          </p>

          <p>
            SEO is a continuing process.
            Rankings depend on content quality,
            competition, website authority,
            performance, backlinks, user
            experience and regular updates.
            Therefore, we build a strong
            technical foundation and can also
            provide ongoing SEO and content
            services.
          </p>

          <h2>
            Website development for local
            businesses
          </h2>

          <p>
            Tech Digital Designers helps local
            shops, restaurants, hotels, rental
            businesses, schools, service
            providers and professionals create
            a credible online presence. Our
            services are available for
            businesses in Chittorgarh, Motihari,
            Rajasthan, Bihar and throughout
            India.
          </p>

          <h2>
            Why choose Tech Digital Designers?
          </h2>

          <ul>
            <li>
              Professional and business-focused
              design
            </li>

            <li>
              Solutions based on actual business
              requirements
            </li>

            <li>
              Mobile-friendly development
            </li>

            <li>
              Clear communication throughout the
              project
            </li>

            <li>
              Scalable frontend and backend
              technologies
            </li>

            <li>
              SEO and digital marketing support
            </li>

            <li>
              Affordable plans for startups and
              local businesses
            </li>

            <li>
              Long-term maintenance options
            </li>
          </ul>

          <div className="service-cta">
            <h2>
              Ready to build your website?
            </h2>

            <p>
              Contact Tech Digital Designers to
              discuss your business website,
              ecommerce store, booking platform,
              portfolio or custom web
              application.
            </p>

            <a
              className="btn btn-primary"
              href="/contact"
            >
              Request a quotation
            </a>
          </div>
        </div>
      </section>
    </>
  );
}