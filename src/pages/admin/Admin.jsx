import React, {
  useState,
} from "react";

import AdminContent from "./AdminContent";
import AdminUsers from "./AdminUsers";
import AdminPaymentQR from "./AdminPaymentQR";
import AdminEnquiries from "./AdminEnquiries";

import "./Admin.css";

const tabs = [
  ["sliders", "Home Slider"],
  ["projects", "Projects"],
  ["services", "Services"],
  ["pricing", "Pricing"],
  ["payment-qr", "Payment QR"],
  ["users", "Users"],
  ["enquiries", "Enquiries"],
];

const contentTabs = [
  "sliders",
  "projects",
  "services",
  "pricing",
];

export default function Admin() {
  const [activeTab, setActiveTab] =
    useState("sliders");

  return (
    <section className="admin-page">
      <div className="container">
        <div className="admin-heading">
          <div>
            <span className="eyebrow">
              Admin Panel
            </span>

            <h1>
              Manage complete website
            </h1>
          </div>
        </div>

        <div
          className="admin-tabs"
          role="tablist"
          aria-label="Admin sections"
        >
          {tabs.map(
            ([value, label]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={
                  activeTab === value
                }
                className={
                  activeTab === value
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTab(value)
                }
              >
                {label}
              </button>
            )
          )}
        </div>

        {contentTabs.includes(
          activeTab
        ) && (
          <AdminContent
            key={activeTab}
            type={activeTab}
          />
        )}

        {activeTab ===
          "payment-qr" && (
          <AdminPaymentQR />
        )}

        {activeTab === "users" && (
          <AdminUsers />
        )}

        {activeTab ===
          "enquiries" && (
          <AdminEnquiries />
        )}
      </div>
    </section>
  );
}