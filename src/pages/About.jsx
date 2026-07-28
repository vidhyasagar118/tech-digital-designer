import React from "react";

import {
  Link,
} from "react-router-dom";

import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  Code2,
  Headphones,
  HeartHandshake,
  Lightbulb,
  Megaphone,
  MonitorSmartphone,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";

import PageHero from "../components/PageHero";
import SEO from "../components/SEO";

import "./About.css";

const values = [
  {
    icon: Lightbulb,
    title: "Creative Thinking",
    description:
      "We combine creativity and technology to produce digital solutions that look attractive and solve real business problems.",
  },
  {
    icon: ShieldCheck,
    title: "Honest & Transparent",
    description:
      "We explain the project scope, pricing, timeline and development process clearly before beginning the work.",
  },
  {
    icon: Target,
    title: "Result Focused",
    description:
      "Every design, feature and campaign is created according to your business goals and target customers.",
  },
  {
    icon: HeartHandshake,
    title: "Long-Term Support",
    description:
      "Our relationship does not end after delivery. We provide continued technical guidance and support.",
  },
];

const capabilities = [
  {
    icon: Code2,
    title: "Website Development",
    text:
      "Modern, responsive and SEO-friendly business websites.",
  },
  {
    icon: MonitorSmartphone,
    title: "App Development",
    text:
      "Useful and user-friendly mobile and web applications.",
  },
  {
    icon: Megaphone,
    title: "Digital Promotion",
    text:
      "Campaigns created to increase your online business reach.",
  },
  {
    icon: Palette,
    title: "Creative Design",
    text:
      "Posters, social posts, advertisements and branded creatives.",
  },
  {
    icon: Search,
    title: "SEO Support",
    text:
      "Search-friendly structure and content for better visibility.",
  },
  {
    icon: BarChart3,
    title: "Growth Strategy",
    text:
      "Practical digital strategies based on your business objectives.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We understand your business, audience, requirements, budget and long-term goals.",
  },
  {
    number: "02",
    title: "Planning",
    description:
      "We define pages, features, technology, content structure and project timeline.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "We create a modern interface that represents your brand professionally.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "The approved design is converted into a fast, secure and responsive product.",
  },
  {
    number: "05",
    title: "Testing",
    description:
      "We carefully test functionality, performance and responsiveness before launch.",
  },
  {
    number: "06",
    title: "Launch & Support",
    description:
      "After approval, we launch the project and provide continued assistance.",
  },
];

const advantages = [
  "Modern and professional designs",
  "Mobile, tablet and desktop responsive",
  "SEO-friendly website structure",
  "Fast-loading optimized pages",
  "Secure database and authentication",
  "Admin panel according to requirements",
  "WhatsApp, call and payment integration",
  "Affordable solutions for Indian businesses",
  "Clear communication throughout the project",
  "Post-delivery guidance and support",
];

const technologies = [
  "React.js",
  "JavaScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "AWS S3",
  "Cloudinary",
  "Vercel",
  "Render",
  "Razorpay",
];

export default function About() {
  return (
    <>
      <SEO
        title="About Tech Digital Designers Digital Growth Studio"
        description="Learn about Tech Digital Designers, a digital growth studio helping startups, local businesses and professionals grow through technology, design, SEO and digital promotion."
        keywords="about Tech Digital Designers, Tech Digital Designer, digital growth studio, website development company India, app development team, digital marketing company, graphic design studio"
        path="/about"
      />

      <main className="about-page">
        <PageHero
          eyebrow="About Tech Digital Designers"
          title="Creative ideas, useful technology and real business growth"
          text="Tech Digital Designers is a Next Generation Digital Agency helping businesses, professionals and startups build trust, attract customers and grow through websites, applications, marketing and creative design."
        />

        {/* Introduction */}
        <section className="section about-introduction">
          <div className="container about-intro-layout">
            <div className="about-intro-content">
              <span className="eyebrow">
                Who We Are
              </span>

              <h2>
                Your complete digital growth
                partner
              </h2>

              <p>
                Tech Digital Designers helps
                businesses create a powerful and
                trustworthy digital presence. We
                provide website development,
                application development, digital
                marketing, social media
                promotion, branding, poster
                design, advertising creatives
                and other digital services.
              </p>

              <p>
                Our purpose is not limited to
                creating attractive designs. We
                first understand your business,
                customers and objectives, then
                develop a practical solution
                that supports your long-term
                growth.
              </p>

              <div className="about-intro-points">
                <div>
                  <CheckCircle2
                    size={20}
                    aria-hidden="true"
                  />

                  <span>
                    Business-focused solutions
                  </span>
                </div>

                <div>
                  <CheckCircle2
                    size={20}
                    aria-hidden="true"
                  />

                  <span>
                    Modern technology
                  </span>
                </div>

                <div>
                  <CheckCircle2
                    size={20}
                    aria-hidden="true"
                  />

                  <span>
                    Transparent process
                  </span>
                </div>

                <div>
                  <CheckCircle2
                    size={20}
                    aria-hidden="true"
                  />

                  <span>
                    Continued support
                  </span>
                </div>
              </div>

              <Link
                className="btn about-primary-button"
                to="/contact"
              >
                Discuss Your Project

                <ArrowRight
                  size={18}
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="about-visual">
              <div className="about-visual-main">
                <div className="about-brand-logo">
                  <img
                    src="/tech-digital-designers-logo.png"
                    alt="Tech Digital Designers"
                  />
                </div>

                <span>
                  Tech Digital Designers
                </span>

                <h3>
                  Vision + Digital Intelligence
                </h3>

                <p>
                  We transform business ideas
                  into useful, attractive and
                  growth-focused digital
                  experiences.
                </p>

                <div className="about-visual-services">
                  <span>
                    Design
                  </span>

                  <span>
                    Development
                  </span>

                  <span>
                    Promotion
                  </span>
                </div>
              </div>

              <div className="about-floating-card about-floating-one">
                <Rocket
                  size={19}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    Growth Focused
                  </strong>

                  <small>
                    Built for results
                  </small>
                </div>
              </div>

              <div className="about-floating-card about-floating-two">
                <Zap
                  size={19}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    Modern Technology
                  </strong>

                  <small>
                    Fast and reliable
                  </small>
                </div>
              </div>

              <div className="about-visual-shape about-shape-one" />
              <div className="about-visual-shape about-shape-two" />
            </div>
          </div>
        </section>

        {/* Mission and vision */}
        <section className="section about-mission-section">
          <div className="container">
            <div className="about-mission-grid">
              <article className="about-mission-card">
                <div className="about-mission-icon">
                  <Target
                    size={28}
                    aria-hidden="true"
                  />
                </div>

                <span>
                  Our Mission
                </span>

                <h2>
                  Make professional digital
                  services accessible
                </h2>

                <p>
                  Our mission is to provide
                  reliable, affordable and
                  result-focused digital services
                  to startups, professionals and
                  businesses of every size.
                </p>
              </article>

              <article className="about-mission-card about-vision-card">
                <div className="about-mission-icon">
                  <Sparkles
                    size={28}
                    aria-hidden="true"
                  />
                </div>

                <span>
                  Our Vision
                </span>

                <h2>
                  Help every business grow
                  confidently online
                </h2>

                <p>
                  Our vision is to become a
                  trusted digital partner that
                  converts business ideas into
                  modern and valuable online
                  experiences.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="section about-capabilities-section">
          <div className="container">
            <div className="about-center-heading">
              <span className="eyebrow">
                What We Do
              </span>

              <h2>
                Complete services under one
                digital studio
              </h2>

              <p>
                You do not need separate
                developers, designers and
                marketers. Tech Digital
                Designers provides complete
                digital support in one place.
              </p>
            </div>

            <div className="about-capabilities-grid">
              {capabilities.map(
                (capability) => {
                  const Icon =
                    capability.icon;

                  return (
                    <article
                      className="about-capability-card"
                      key={
                        capability.title
                      }
                    >
                      <div className="about-capability-icon">
                        <Icon
                          size={24}
                          aria-hidden="true"
                        />
                      </div>

                      <h3>
                        {capability.title}
                      </h3>

                      <p>
                        {capability.text}
                      </p>
                    </article>
                  );
                }
              )}
            </div>

            <div className="about-services-link">
              <Link to="/services">
                Explore all services

                <ArrowRight
                  size={17}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </section>

        {/* Core values */}
        <section className="section about-values-section">
          <div className="container">
            <div className="about-section-heading">
              <div>
                <span className="eyebrow">
                  Our Core Values
                </span>

                <h2>
                  Principles behind everything
                  we create
                </h2>

                <p>
                  Our values guide how we
                  communicate, design, develop
                  and support every client
                  project.
                </p>
              </div>
            </div>

            <div className="about-values-grid">
              {values.map((value) => {
                const Icon =
                  value.icon;

                return (
                  <article
                    className="about-value-card"
                    key={value.title}
                  >
                    <div className="about-value-top">
                      <div className="about-value-icon">
                        <Icon
                          size={23}
                          aria-hidden="true"
                        />
                      </div>

                      <span>
                        Tech Digital Designers
                        Value
                      </span>
                    </div>

                    <h3>
                      {value.title}
                    </h3>

                    <p>
                      {value.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="section about-advantages-section">
          <div className="container about-advantages-layout">
            <div className="about-advantages-content">
              <span className="eyebrow">
                Why Choose Tech Digital
                Designers?
              </span>

              <h2>
                Digital services created around
                your business
              </h2>

              <p>
                We balance visual design,
                performance, security, user
                experience and business
                objectives to deliver a complete
                solution.
              </p>

              <div className="about-advantages-list">
                {advantages.map(
                  (advantage) => (
                    <div
                      className="about-advantage-item"
                      key={advantage}
                    >
                      <BadgeCheck
                        size={20}
                        aria-hidden="true"
                      />

                      <span>
                        {advantage}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="about-advantages-panel">
              <div className="about-advantages-panel-icon">
                <Users
                  size={34}
                  aria-hidden="true"
                />
              </div>

              <span className="about-panel-label">
                Built Around Your Goals
              </span>

              <h3>
                We work like a digital partner,
                not just a service provider
              </h3>

              <p>
                From initial planning and
                development to launch and
                maintenance, we keep the complete
                process clear and understandable.
              </p>

              <div className="about-panel-features">
                <div>
                  <strong>
                    Clear
                  </strong>

                  <span>
                    Communication
                  </span>
                </div>

                <div>
                  <strong>
                    Smart
                  </strong>

                  <span>
                    Solutions
                  </span>
                </div>

                <div>
                  <strong>
                    Reliable
                  </strong>

                  <span>
                    Support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Working process */}
        <section className="section about-process-section">
          <div className="container">
            <div className="about-center-heading">
              <span className="eyebrow">
                How We Work
              </span>

              <h2>
                A transparent process from idea
                to launch
              </h2>

              <p>
                Every project follows an
                organized process so you always
                know what is being created and
                what comes next.
              </p>
            </div>

            <div className="about-process-grid">
              {processSteps.map(
                (step) => (
                  <article
                    className="about-process-card"
                    key={step.number}
                  >
                    <span className="about-process-number">
                      {step.number}
                    </span>

                    <h3>
                      {step.title}
                    </h3>

                    <p>
                      {step.description}
                    </p>
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="about-technologies">
          <div className="container">
            <div className="about-technologies-heading">
              <div>
                <span>
                  Modern Technology
                </span>

                <h2>
                  Tools we use to create
                  reliable digital products
                </h2>
              </div>

              <Code2
                size={36}
                aria-hidden="true"
              />
            </div>

            <div className="about-technologies-list">
              {technologies.map(
                (technology) => (
                  <span key={technology}>
                    {technology}
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="section about-support-section">
          <div className="container about-support-card">
            <div className="about-support-icon">
              <Headphones
                size={32}
                aria-hidden="true"
              />
            </div>

            <div className="about-support-content">
              <span>
                Support After Delivery
              </span>

              <h2>
                Your project continues to receive
                the support it needs
              </h2>

              <p>
                We provide post-launch guidance,
                maintenance and technical support
                according to your selected
                service or plan.
              </p>
            </div>

            <Link
              className="btn about-support-button"
              to="/contact"
            >
              Contact Support
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="about-final-cta">
          <div className="container about-final-cta-content">
            <div>
              <span>
                Start Your Digital Journey
              </span>

              <h2>
                Have an idea? Let’s turn it into
                something valuable.
              </h2>

              <p>
                Tell us about your business,
                budget and requirements. We will
                help you choose the right digital
                solution.
              </p>
            </div>

            <div className="about-final-actions">
              <Link
                className="btn"
                to="/contact"
              >
                Start Your Project

                <ArrowRight
                  size={18}
                  aria-hidden="true"
                />
              </Link>

              <Link
                className="about-outline-button"
                to="/services"
              >
                View Services
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}