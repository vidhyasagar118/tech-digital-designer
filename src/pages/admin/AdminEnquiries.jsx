import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  CheckCircle2,
  ExternalLink,
  Mail,
  MessageCircle,
  Phone,
  RefreshCw,
} from "lucide-react";

import API from "../../api";
import "./AdminEnquiries.css";

const DEFAULT_APPROVAL_MESSAGE =
  "Your service enquiry has been approved. Please complete the payment using the QR link below.";

function normalizeWhatsAppNumber(phone) {
  const digits = String(
    phone || ""
  ).replace(/\D/g, "");

  if (digits.length === 10) {
    return `91${digits}`;
  }

  if (
    digits.length === 12 &&
    digits.startsWith("91")
  ) {
    return digits;
  }

  return digits;
}

function getEnquiryData(responseData) {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (
    Array.isArray(
      responseData?.items
    )
  ) {
    return responseData.items;
  }

  if (
    Array.isArray(
      responseData?.enquiries
    )
  ) {
    return responseData.enquiries;
  }

  return [];
}

export default function AdminEnquiries() {
  const [items, setItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [
    updatingId,
    setUpdatingId,
  ] = useState("");

  const [
    approvalMessages,
    setApprovalMessages,
  ] = useState({});

  const loadItems =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await API.get("/contact");

        const enquiryData =
          getEnquiryData(
            response.data
          );

        setItems(enquiryData);

        setApprovalMessages(
          (currentMessages) => {
            const nextMessages = {
              ...currentMessages,
            };

            enquiryData.forEach(
              (item) => {
                if (
                  nextMessages[
                    item._id
                  ] === undefined
                ) {
                  nextMessages[
                    item._id
                  ] =
                    item.adminMessage ||
                    DEFAULT_APPROVAL_MESSAGE;
                }
              }
            );

            return nextMessages;
          }
        );
      } catch (error) {
        console.error(
          "Enquiries load error:",
          error
        );

        if (
          error.response?.status ===
          401
        ) {
          setError(
            "Session expired or unauthorized. Please log in again as admin."
          );
        } else if (
          error.response?.status ===
          403
        ) {
          setError(
            "Only an admin can view enquiries."
          );
        } else {
          setError(
            error.response?.data
              ?.message ||
              "Enquiries could not be loaded."
          );
        }
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  function handleMessageChange(
    enquiryId,
    value
  ) {
    setApprovalMessages(
      (currentMessages) => ({
        ...currentMessages,

        [enquiryId]: value,
      })
    );
  }

  function buildUserWhatsAppUrl(
    enquiry
  ) {
    const phone =
      normalizeWhatsAppNumber(
        enquiry?.phone
      );

    if (!phone) {
      return "";
    }

    const messageLines = [
      `Hello ${
        enquiry?.name ||
        "Customer"
      },`,
      "",
      "Your service enquiry has been approved by Tech Digital Designers.",
      "",
      enquiry?._id
        ? `Enquiry ID: ${enquiry._id}`
        : "",
      enquiry?.service
        ? `Service: ${enquiry.service}`
        : "",
      "Status: Approved",
      "",
      enquiry?.adminMessage ||
        DEFAULT_APPROVAL_MESSAGE,
      "",
      enquiry?.paymentQrUrl
        ? `Payment QR: ${enquiry.paymentQrUrl}`
        : "",
      enquiry?.upiId
        ? `UPI ID: ${enquiry.upiId}`
        : "",
      "",
      "After payment, please send your payment screenshot or transaction reference on WhatsApp.",
      "",
      "For assistance, call +91 6367697913.",
      "",
      "Tech Digital Designers",
    ].filter(Boolean);

    const message =
      messageLines.join("\n");

    return `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;
  }

  async function approveEnquiry(
    enquiry
  ) {
    const adminMessage =
      approvalMessages[
        enquiry._id
      ]?.trim() ||
      DEFAULT_APPROVAL_MESSAGE;

    /*
     * Window पहले खोल रहे हैं ताकि
     * browser WhatsApp popup block न करे।
     */
    const whatsappWindow =
      window.open(
        "",
        "_blank"
      );

    setUpdatingId(enquiry._id);
    setError("");
    setSuccess("");

    try {
      const response =
        await API.patch(
          `/contact/${enquiry._id}/approve`,
          {
            adminMessage,
          }
        );

      const approvedEnquiry =
        response.data?.enquiry ||
        response.data?.item ||
        response.data;

      if (
        !approvedEnquiry ||
        !approvedEnquiry._id
      ) {
        throw new Error(
          "Backend से approved enquiry की जानकारी नहीं मिली।"
        );
      }

      if (
        !approvedEnquiry.paymentQrUrl
      ) {
        throw new Error(
          "Payment QR नहीं मिला। पहले Admin Payment QR section में QR upload करें।"
        );
      }

      const whatsappUrl =
        buildUserWhatsAppUrl(
          approvedEnquiry
        );

      if (!whatsappUrl) {
        throw new Error(
          "Customer का सही WhatsApp number उपलब्ध नहीं है।"
        );
      }

      if (whatsappWindow) {
        whatsappWindow.location.href =
          whatsappUrl;
      } else {
        window.location.href =
          whatsappUrl;
      }

      setSuccess(
        `${approvedEnquiry.name} की enquiry approve हो गई। WhatsApp में Send दबाकर message भेजें।`
      );

      await loadItems();
    } catch (error) {
      if (whatsappWindow) {
        whatsappWindow.close();
      }

      console.error(
        "Enquiry approval error:",
        error
      );

      setError(
        error.response?.data
          ?.message ||
          error.message ||
          "Enquiry could not be approved."
      );
    } finally {
      setUpdatingId("");
    }
  }

  async function updateStatus(
    enquiryId,
    status
  ) {
    setUpdatingId(enquiryId);
    setError("");
    setSuccess("");

    try {
      await API.patch(
        `/contact/${enquiryId}/status`,
        {
          status,
        }
      );

      setSuccess(
        "Enquiry status updated successfully."
      );

      await loadItems();
    } catch (error) {
      console.error(
        "Status update error:",
        error
      );

      setError(
        error.response?.data
          ?.message ||
          "Status could not be updated."
      );
    } finally {
      setUpdatingId("");
    }
  }

  if (loading) {
    return (
      <div
        className="admin-enquiry-message"
        role="status"
      >
        Loading enquiries...
      </div>
    );
  }

  return (
    <section className="admin-enquiries">
      <div className="admin-enquiry-heading">
        <div>
          <span>
            Customer Enquiries
          </span>

          <h2>
            Service enquiry approvals
          </h2>

          <p>
            Review customer enquiries,
            approve the service and open
            WhatsApp with the saved payment
            QR automatically.
          </p>
        </div>

        <button
          type="button"
          className="refresh-enquiries"
          onClick={loadItems}
          disabled={loading}
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {error && (
        <div
          className="admin-enquiry-message enquiry-error"
          role="alert"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="admin-enquiry-message enquiry-success"
          role="status"
        >
          {success}
        </div>
      )}

      {items.length === 0 ? (
        <div className="admin-enquiry-message">
          No enquiries available.
        </div>
      ) : (
        <div className="admin-enquiry-list">
          {items.map((item) => {
            const isUpdating =
              updatingId ===
              item._id;

            const approvalMessage =
              approvalMessages[
                item._id
              ] ??
              DEFAULT_APPROVAL_MESSAGE;

            const resendWhatsAppUrl =
              buildUserWhatsAppUrl(
                item
              );

            return (
              <article
                className="enquiry-card"
                key={item._id}
              >
                <div className="enquiry-card-top">
                  <div>
                    <span
                      className={`enquiry-status status-${
                        item.status ||
                        "new"
                      }`}
                    >
                      {item.status ||
                        "new"}
                    </span>

                    <h3>
                      {item.name ||
                        "Customer"}
                    </h3>
                  </div>

                  <small>
                    {item.createdAt
                      ? new Date(
                          item.createdAt
                        ).toLocaleString(
                          "en-IN"
                        )
                      : ""}
                  </small>
                </div>

                <div className="enquiry-contact">
                  {item.phone && (
                    <a
                      href={`tel:${item.phone}`}
                    >
                      <Phone size={15} />
                      {item.phone}
                    </a>
                  )}

                  {item.email && (
                    <a
                      href={`mailto:${item.email}`}
                    >
                      <Mail size={15} />
                      {item.email}
                    </a>
                  )}
                </div>

                <div className="enquiry-details">
                  <div>
                    <small>
                      Service
                    </small>

                    <strong>
                      {item.service ||
                        "Not specified"}
                    </strong>
                  </div>

                  <div>
                    <small>
                      Budget
                    </small>

                    <strong>
                      {item.budget ||
                        "Not specified"}
                    </strong>
                  </div>

                  <div>
                    <small>
                      Enquiry ID
                    </small>

                    <strong>
                      {item._id}
                    </strong>
                  </div>
                </div>

                <div className="enquiry-requirement">
                  <small>
                    Customer Requirements
                  </small>

                  <p>
                    {item.message ||
                      "No additional requirements provided."}
                  </p>
                </div>

                {item.serviceImage && (
                  <img
                    className="enquiry-service-image"
                    src={
                      item.serviceImage
                    }
                    alt={`${
                      item.service ||
                      "Service"
                    } enquiry`}
                    loading="lazy"
                  />
                )}

                <label className="admin-field">
                  Approval Message

                  <textarea
                    name="adminMessage"
                    value={
                      approvalMessage
                    }
                    onChange={(
                      event
                    ) =>
                      handleMessageChange(
                        item._id,
                        event.target
                          .value
                      )
                    }
                    rows={4}
                    disabled={
                      isUpdating
                    }
                    placeholder="Write an approval message for the customer"
                  />
                </label>

                {item.paymentQrUrl && (
                  <a
                    className="current-qr"
                    href={
                      item.paymentQrUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink
                      size={15}
                    />

                    View payment QR
                  </a>
                )}

                <div className="enquiry-actions">
                  <button
                    type="button"
                    className="approve-enquiry"
                    onClick={() =>
                      approveEnquiry(
                        item
                      )
                    }
                    disabled={
                      isUpdating
                    }
                  >
                    <CheckCircle2
                      size={16}
                    />

                    {isUpdating
                      ? "Processing..."
                      : "Approve & Open WhatsApp"}
                  </button>

                  {item.status ===
                    "approved" &&
                    resendWhatsAppUrl && (
                      <a
                        className="send-again"
                        href={
                          resendWhatsAppUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle
                          size={16}
                        />

                        Send Again
                      </a>
                    )}

                  <select
                    value={
                      item.status ||
                      "new"
                    }
                    onChange={(
                      event
                    ) =>
                      updateStatus(
                        item._id,
                        event.target
                          .value
                      )
                    }
                    disabled={
                      isUpdating
                    }
                    aria-label={`Update ${item.name} enquiry status`}
                  >
                    <option value="new">
                      New
                    </option>

                    <option value="contacted">
                      Contacted
                    </option>

                    <option value="approved">
                      Approved
                    </option>

                    <option value="payment_pending">
                      Payment Pending
                    </option>

                    <option value="paid">
                      Paid
                    </option>

                    <option value="rejected">
                      Rejected
                    </option>

                    <option value="closed">
                      Closed
                    </option>
                  </select>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}