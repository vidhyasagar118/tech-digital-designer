import React from "react";
import "./AdminEnquiries.css";
import { useEffect, useState } from "react";

import API from "../../api";

export default function AdminEnquiries() {
  const [items, setItems] = useState([]);

  async function loadItems() {
    const response = await API.get(
      "/contact"
    );

    setItems(response.data);
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function updateStatus(
    id,
    status
  ) {
    await API.patch(
      `/contact/${id}/status`,
      { status }
    );

    loadItems();
  }

  return (
    <div className="admin-list">
      {items.map((item) => (
        <article
          className="enquiry-card"
          key={item._id}
        >
          <h3>{item.name}</h3>
          <p>{item.email}</p>
          <p>{item.phone}</p>
          <p>{item.service}</p>
          <p>{item.message}</p>

          <select
            value={item.status}
            onChange={(event) =>
              updateStatus(
                item._id,
                event.target.value
              )
            }
          >
            <option value="new">
              New
            </option>

            <option value="contacted">
              Contacted
            </option>

            <option value="closed">
              Closed
            </option>
          </select>
        </article>
      ))}
    </div>
  );
}
