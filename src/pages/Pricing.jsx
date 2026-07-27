import React from "react";
import "./Pricing.css";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

import API from "../api";
import PageHero from "../components/PageHero";

export default function Pricing() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPricing() {
      try {
        const response = await API.get(
          "/content/pricing"
        );

        setPlans(response.data);
      } catch (error) {
        console.error(
          "Pricing load error:",
          error
        );
      }
    }

    loadPricing();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Basic and advanced pricing plans"
        text="The admin can change prices, features, images and plan names."
      />

      <section className="section">
        <div className="container pricing-grid">
          {plans.map((plan) => (
            <article
              className={
                plan.highlighted
                  ? "pricing-card highlighted"
                  : "pricing-card"
              }
              key={plan._id}
            >
              <img
                src={plan.imageUrl}
                alt={plan.planName}
              />

              <small>
                {plan.serviceName}
              </small>

              <h2>{plan.planName}</h2>

              <strong>
                ₹{plan.price}
              </strong>

              <p>{plan.billingText}</p>

              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <CheckCircle2 size={18} />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
