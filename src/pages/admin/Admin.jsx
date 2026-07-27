import React from "react";
import "./Admin.css";
import { useState } from "react";

import AdminContent from "./AdminContent";
import AdminUsers from "./AdminUsers";
import AdminPaymentQR from "./AdminPaymentQR";
import AdminEnquiries from "./AdminEnquiries";
const tabs = [
  ["sliders", "Home Slider"],
  ["projects", "Projects"],
  ["services", "Services"],
  ["pricing", "Pricing"],
  ["users", "Users"],
  ["enquiries", "Enquiries"],
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

        <div className="admin-tabs">
          {tabs.map(([value, label]) => (
            <button
              key={value}
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
          ))}
        </div>

        {[
          "sliders",
          "projects",
          "services",
          "pricing",
        ].includes(activeTab) && (
          <AdminContent type={activeTab} />
        )}

        {activeTab === "users" && (
          <AdminUsers />
        )}

<AdminPaymentQR />

        {activeTab === "enquiries" && (
          
          <AdminEnquiries />
        )}
      </div>
    </section>
  );
}
