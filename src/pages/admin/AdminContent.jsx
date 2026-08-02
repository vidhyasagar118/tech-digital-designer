import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import API from "../../api";

import {
  getImageUrl,
  handleImageError,
} from "../../utils/image";

import "./AdminContent.css";

const emptyForms = {
  sliders: {
    title: "",
    subtitle: "",
    buttonText: "Contact Us",
    buttonLink: "/contact",
    order: 0,
    active: true,
  },

  projects: {
    title: "",
    category: "",
    shortDescription: "",
    description: "",
    liveUrl: "",
    featured: false,
    active: true,
  },

  services: {
    title: "",
    category: "",
    categorySlug: "",
    categoryDescription: "",
    categoryOrder: 0,
    showCategoryOnHome: false,
    shortDescription: "",
    description: "",
    order: 0,
    active: true,
  },

  pricing: {
    serviceName: "",
    serviceCategorySlug: "",
    planName: "",
    price: "",
    billingText: "Starting price",
    features: "",
    highlighted: false,
    active: true,
  },
};

const labels = {
  title: "Title",
  subtitle: "Subtitle",
  buttonText: "Button Text",
  buttonLink: "Button Link",
  order: "Display Order",
  active: "Active",

  category: "Category",
  categorySlug: "Category Slug",
  categoryDescription:
    "Category Description",
  categoryOrder:
    "Category Display Order",
  showCategoryOnHome:
    "Use As Home Category Card",

  shortDescription:
    "Short Description",
  description: "Full Description",
  liveUrl: "Live Project URL",
  featured: "Featured Project",

  serviceName: "Service Name",
  serviceCategorySlug:
    "Service Category Slug",
  planName: "Plan Name",
  price: "Price",
  billingText: "Billing Text",
  features: "Features",
  highlighted: "Highlighted Plan",
};

function getEmptyForm(type) {
  return {
    ...emptyForms[type],
  };
}

function formatTypeName(type) {
  if (!type) {
    return "";
  }

  return (
    type.charAt(0).toUpperCase() +
    type.slice(1)
  );
}

function revokeBlobUrl(url) {
  if (
    typeof url === "string" &&
    url.startsWith("blob:")
  ) {
    URL.revokeObjectURL(url);
  }
}

export default function AdminContent({
  type,
}) {
  const [items, setItems] =
    useState([]);

  const [form, setForm] =
    useState(() =>
      getEmptyForm(type)
    );

  const [image, setImage] =
    useState(null);

  const [
    imagePreview,
    setImagePreview,
  ] = useState("");

  const [
    editingId,
    setEditingId,
  ] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [
    deletingId,
    setDeletingId,
  ] = useState(null);

  const [message, setMessage] =
    useState("");

  const [
    messageType,
    setMessageType,
  ] = useState("");

  const fileInputRef =
    useRef(null);

  async function loadItems() {
    try {
      setLoading(true);

      const response =
        await API.get(
          `/content/${type}?admin=true`
        );

      const responseItems =
        Array.isArray(response.data)
          ? response.data
          : response.data?.items ||
            [];

      setItems(responseItems);
    } catch (error) {
      console.error(
        `${type} load error:`,
        error
      );

      setMessage(
        error.response?.data
          ?.message ||
          `${formatTypeName(
            type
          )} load nahi ho saka.`
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  function resetForm(
    clearMessage = true
  ) {
    revokeBlobUrl(imagePreview);

    setForm(getEmptyForm(type));
    setImage(null);
    setImagePreview("");
    setEditingId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }

    if (clearMessage) {
      setMessage("");
      setMessageType("");
    }
  }

  useEffect(() => {
    resetForm(false);
    loadItems();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    return () => {
      revokeBlobUrl(imagePreview);
    };
  }, [imagePreview]);

  function handleChange(event) {
    const {
      name,
      value,
      type: inputType,
      checked,
    } = event.target;

    setForm((currentForm) => ({
      ...currentForm,

      [name]:
        inputType === "checkbox"
          ? checked
          : value,
    }));
  }

  function clearSelectedImage() {
    revokeBlobUrl(imagePreview);

    setImage(null);
    setImagePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }

    setMessage(
      editingId
        ? "Selected image remove ho gayi. Update karne par purani image use hogi."
        : "Selected image remove ho gayi."
    );

    setMessageType("info");
  }

  function handleImageChange(
    event
  ) {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(
        selectedFile.type
      )
    ) {
      setMessage(
        "Sirf JPG, PNG ya WEBP image select karo."
      );

      setMessageType("error");

      if (fileInputRef.current) {
        fileInputRef.current.value =
          "";
      }

      return;
    }

    const maximumImageSize =
      5 * 1024 * 1024;

    if (
      selectedFile.size >
      maximumImageSize
    ) {
      setMessage(
        "Image size 5 MB se kam honi chahiye."
      );

      setMessageType("error");

      if (fileInputRef.current) {
        fileInputRef.current.value =
          "";
      }

      return;
    }

    revokeBlobUrl(imagePreview);

    const previewUrl =
      URL.createObjectURL(
        selectedFile
      );

    setImage(selectedFile);
    setImagePreview(previewUrl);

    setMessage(
      "Image successfully select ho gayi."
    );

    setMessageType("success");
  }

  function validateForm() {
    if (
      type === "pricing" &&
      !String(
        form.planName || ""
      ).trim()
    ) {
      return "Plan name fill karo.";
    }

    if (
      type === "pricing" &&
      !String(
        form.serviceName || ""
      ).trim()
    ) {
      return "Service name fill karo.";
    }

    if (
      type !== "pricing" &&
      !String(
        form.title || ""
      ).trim()
    ) {
      return "Title fill karo.";
    }

    if (
      type === "services" &&
      !String(
        form.category || ""
      ).trim()
    ) {
      return "Service category fill karo.";
    }

    if (
      type === "services" &&
      !String(
        form.shortDescription ||
          ""
      ).trim()
    ) {
      return "Short description fill karo.";
    }

    if (
      type === "pricing" &&
      (form.price === "" ||
        Number.isNaN(
          Number(form.price)
        ) ||
        Number(form.price) < 0)
    ) {
      return "Valid price fill karo.";
    }

    if (
      type !== "pricing" &&
      !editingId &&
      !image
    ) {
      return "Image select karna zaroori hai.";
    }

    return "";
  }

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    const validationMessage =
      validateForm();

    if (validationMessage) {
      setMessage(
        validationMessage
      );

      setMessageType("error");

      return;
    }

    const formData =
      new FormData();

    Object.entries(form).forEach(
      ([key, value]) => {
        formData.append(
          key,
          String(value)
        );
      }
    );

    if (image) {
      formData.append(
        "image",
        image
      );
    }

    const wasEditing =
      Boolean(editingId);

    try {
      setSaving(true);

      setMessage("");
      setMessageType("");

      if (editingId) {
        await API.put(
          `/content/${type}/${editingId}`,
          formData
        );
      } else {
        await API.post(
          `/content/${type}`,
          formData
        );
      }

      resetForm(false);

      await loadItems();

      setMessage(
        wasEditing
          ? "Item successfully update ho gaya."
          : "Item successfully add ho gaya."
      );

      setMessageType(
        "success"
      );
    } catch (error) {
      console.error(
        `${type} save error:`,
        error
      );

      setMessage(
        error.response?.data
          ?.message ||
          "Content save nahi ho saka."
      );

      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(item) {
    const nextForm =
      getEmptyForm(type);

    Object.keys(
      nextForm
    ).forEach((key) => {
      if (
        item[key] !== undefined &&
        item[key] !== null
      ) {
        nextForm[key] =
          item[key];
      }
    });

    if (
      type === "pricing" &&
      Array.isArray(
        item.features
      )
    ) {
      nextForm.features =
        item.features.join("\n");
    }

    if (
      "active" in nextForm
    ) {
      nextForm.active =
        item.active !== false;
    }

    if (
      "featured" in nextForm
    ) {
      nextForm.featured =
        item.featured === true;
    }

    if (
      "highlighted" in
      nextForm
    ) {
      nextForm.highlighted =
        item.highlighted === true;
    }

    revokeBlobUrl(imagePreview);

    setForm(nextForm);
    setEditingId(item._id);
    setImage(null);

    setImagePreview(
      item.imageUrl || item.imageKey
        ? getImageUrl(item)
        : ""
    );

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }

    setMessage(
      "Editing mode active hai. Image change karna optional hai."
    );

    setMessageType("info");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function removeItem(id) {
    const confirmed =
      window.confirm(
        "Kya aap is item ko permanently delete karna chahte hain?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await API.delete(
        `/content/${type}/${id}`
      );

      if (
        editingId === id
      ) {
        resetForm(false);
      }

      await loadItems();

      setMessage(
        "Item successfully delete ho gaya."
      );

      setMessageType(
        "success"
      );
    } catch (error) {
      console.error(
        `${type} delete error:`,
        error
      );

      setMessage(
        error.response?.data
          ?.message ||
          "Item delete nahi ho saka."
      );

      setMessageType("error");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="admin-content-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-eyebrow">
            Content Management
          </span>

          <h1>
            Manage{" "}
            {formatTypeName(type)}
          </h1>

          <p>
            Yahan se content aur
            images add, update aur
            delete kar sakte ho.
          </p>
        </div>

        <span className="admin-count">
          {items.length} Items
        </span>
      </div>

      {message && (
        <div
          className={`admin-message ${messageType}`}
        >
          {message}
        </div>
      )}

      <div className="admin-layout">
        <form
          className="admin-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="admin-form-header">
            <div>
              <small>
                {editingId
                  ? "Update existing content"
                  : "Create new content"}
              </small>

              <h2>
                {editingId
                  ? "Edit"
                  : "Add"}{" "}
                {formatTypeName(type)}
              </h2>
            </div>

            {editingId && (
              <span className="editing-badge">
                Editing
              </span>
            )}
          </div>

          <div className="admin-form-fields">
            {Object.entries(
              form
            ).map(
              ([key, value]) => {
                if (
                  typeof value ===
                  "boolean"
                ) {
                  return (
                    <label
                      className="admin-checkbox"
                      key={key}
                    >
                      <input
                        type="checkbox"
                        name={key}
                        checked={value}
                        onChange={
                          handleChange
                        }
                      />

                      <span>
                        {labels[key] ||
                          key}
                      </span>
                    </label>
                  );
                }

                const longField =
                  [
                    "description",
                    "shortDescription",
                    "subtitle",
                    "features",
                    "categoryDescription",
                  ].includes(key);

                const isRequired =
                  type === "pricing"
                    ? [
                        "planName",
                        "serviceName",
                        "price",
                      ].includes(key)
                    : type ===
                        "services"
                      ? [
                          "title",
                          "category",
                          "shortDescription",
                        ].includes(key)
                      : key ===
                        "title";

                const isNumberField =
                  [
                    "price",
                    "order",
                    "categoryOrder",
                  ].includes(key);

                return (
                  <label
                    className="admin-field"
                    key={key}
                  >
                    <span>
                      {labels[key] ||
                        key}

                      {isRequired && (
                        <b> *</b>
                      )}
                    </span>

                    {longField ? (
                      <textarea
                        name={key}
                        value={value}
                        onChange={
                          handleChange
                        }
                        rows={
                          key ===
                          "features"
                            ? 7
                            : 4
                        }
                        placeholder={
                          key ===
                          "features"
                            ? "Har feature ko nayi line me likho"
                            : `${
                                labels[
                                  key
                                ] ||
                                key
                              } enter karo`
                        }
                      />
                    ) : (
                      <input
                        name={key}
                        value={value}
                        onChange={
                          handleChange
                        }
                        type={
                          isNumberField
                            ? "number"
                            : key ===
                                "liveUrl"
                              ? "url"
                              : "text"
                        }
                        min={
                          isNumberField
                            ? "0"
                            : undefined
                        }
                        placeholder={`${
                          labels[key] ||
                          key
                        } enter karo`}
                      />
                    )}
                  </label>
                );
              }
            )}

            <label className="admin-field">
                <span>
                  {type === "pricing"
                    ? "Plan Image"
                    : "Content Image"}

                  {type !== "pricing" &&
                    !editingId && (
                    <b> *</b>
                  )}
                </span>

                <div className="admin-file-box">
                  <input
                    ref={
                      fileInputRef
                    }
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={
                      handleImageChange
                    }
                  />

                  <small>
                    JPG, PNG ya WEBP.
                    Maximum 5 MB.
                    Image directly
                    upload hogi.
                  </small>
                </div>
              </label>

            {imagePreview && (
                <div className="admin-image-preview">
                  <div className="admin-image-preview-header">
                    <span>
                      Image Preview
                    </span>

                    {image && (
                      <button
                        type="button"
                        className="admin-remove-image-button"
                        onClick={
                          clearSelectedImage
                        }
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <img
                    src={
                      imagePreview
                    }
                    alt="Selected preview"
                    onError={
                      handleImageError
                    }
                  />
                </div>
              )}
          </div>

          <div className="admin-form-actions">
            <button
              className="btn"
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Content"
                  : "Add Content"}
            </button>

            {editingId && (
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() =>
                  resetForm()
                }
                disabled={saving}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <div className="admin-list-section">
          <div className="admin-list-header">
            <div>
              <small>
                Saved Content
              </small>

              <h2>
                Existing{" "}
                {formatTypeName(
                  type
                )}
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="admin-loading">
              Loading content...
            </div>
          ) : items.length ===
            0 ? (
            <div className="admin-empty">
              <h3>
                No content found
              </h3>

              <p>
                Left side form se
                pehla item add karo.
              </p>
            </div>
          ) : (
            <div className="admin-list">
              {items.map(
                (item) => (
                  <article
                    className={`admin-item ${
                      !item.imageUrl &&
                      !item.imageKey
                        ? "admin-item-without-image"
                        : ""
                    }`}
                    key={item._id}
                  >
                    {(item.imageUrl ||
                      item.imageKey) && (
                      <div className="admin-item-image">
                        <img
                          src={getImageUrl(
                            item
                          )}
                          alt={
                            item.title ||
                            item.planName ||
                            item.serviceName ||
                            "Content image"
                          }
                          loading="lazy"
                          onError={
                            handleImageError
                          }
                        />
                      </div>
                    )}

                    <div className="admin-item-content">
                      <div>
                        <small>
                          {item.category ||
                            item.serviceName ||
                            type}
                        </small>

                        <h3>
                          {item.title ||
                            item.planName ||
                            item.serviceName ||
                            "Untitled Item"}
                        </h3>

                        {item.shortDescription && (
                          <p>
                            {
                              item.shortDescription
                            }
                          </p>
                        )}

                        {type ===
                          "pricing" &&
                          item.price !==
                            undefined && (
                            <p className="admin-item-price">
                              ₹
                              {Number(
                                item.price
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </p>
                          )}
                      </div>

                      <div className="admin-status-row">
                        {item.active !==
                          undefined && (
                          <span
                            className={
                              item.active
                                ? "status-badge active"
                                : "status-badge inactive"
                            }
                          >
                            {item.active
                              ? "Active"
                              : "Inactive"}
                          </span>
                        )}

                        {item.highlighted && (
                          <span className="status-badge featured">
                            Highlighted
                          </span>
                        )}

                        {item.featured && (
                          <span className="status-badge featured">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="admin-actions">
                      <button
                        className="admin-edit-button"
                        type="button"
                        onClick={() =>
                          startEdit(
                            item
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="admin-delete-button"
                        type="button"
                        disabled={
                          deletingId ===
                          item._id
                        }
                        onClick={() =>
                          removeItem(
                            item._id
                          )
                        }
                      >
                        {deletingId ===
                        item._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </article>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}