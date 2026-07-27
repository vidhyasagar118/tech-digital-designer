import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  CheckCircle2,
  ImageUp,
  Loader2,
  RefreshCw,
} from "lucide-react";

import API from "../../api";
import "./AdminPaymentQR.css";

const initialSetting = {
  qrImageUrl: "",
  qrImageKey: "",
  accountName: "",
  upiId: "",
  active: true,
};

export default function AdminPaymentQR() {
  const fileInputRef =
    useRef(null);

  const [setting, setSetting] =
    useState(initialSetting);

  const [form, setForm] =
    useState({
      accountName: "",
      upiId: "",
    });

  const [
    selectedFile,
    setSelectedFile,
  ] = useState(null);

  const [
    previewUrl,
    setPreviewUrl,
  ] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const loadSetting =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await API.get(
            "/payment-settings"
          );

        const data =
          response.data?.setting ||
          response.data ||
          initialSetting;

        setSetting({
          ...initialSetting,
          ...data,
        });

        setForm({
          accountName:
            data.accountName || "",

          upiId:
            data.upiId || "",
        });
      } catch (error) {
        console.error(
          "Payment setting load error:",
          error.response?.data ||
            error
        );

        setError(
          error.response?.data
            ?.message ||
            "Payment setting could not be loaded."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadSetting();
  }, [loadSetting]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(
          previewUrl
        );
      }
    };
  }, [previewUrl]);

  function handleInputChange(event) {
    const {
      name,
      value,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleFileChange(event) {
    const file =
      event.target.files?.[0];

    setError("");
    setSuccess("");

    if (!file) {
      setSelectedFile(null);

      if (previewUrl) {
        URL.revokeObjectURL(
          previewUrl
        );
      }

      setPreviewUrl("");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      event.target.value = "";
      setSelectedFile(null);
      setPreviewUrl("");

      setError(
        "Only JPG, PNG or WEBP image is allowed."
      );

      return;
    }

    const maximumSize =
      5 * 1024 * 1024;

    if (
      file.size > maximumSize
    ) {
      event.target.value = "";
      setSelectedFile(null);
      setPreviewUrl("");

      setError(
        "QR image must be smaller than 5 MB."
      );

      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(
        previewUrl
      );
    }

    setSelectedFile(file);

    setPreviewUrl(
      URL.createObjectURL(file)
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!selectedFile) {
      setError(
        "Please select a payment QR image."
      );

      return;
    }

    const formData =
      new FormData();

    /*
     * Backend में upload.single("image")
     * है, इसलिए field name image रहेगा।
     */
    formData.append(
      "image",
      selectedFile,
      selectedFile.name
    );

    formData.append(
      "accountName",
      form.accountName.trim()
    );

    formData.append(
      "upiId",
      form.upiId.trim()
    );

    setUploading(true);

    try {
      const response =
        await API.post(
          "/payment-settings/qr",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      const updatedSetting =
        response.data?.setting ||
        response.data;

      setSetting({
        ...initialSetting,
        ...updatedSetting,
      });

      setForm({
        accountName:
          updatedSetting
            ?.accountName || "",

        upiId:
          updatedSetting
            ?.upiId || "",
      });

      setSelectedFile(null);

      if (previewUrl) {
        URL.revokeObjectURL(
          previewUrl
        );
      }

      setPreviewUrl("");

      if (
        fileInputRef.current
      ) {
        fileInputRef.current.value =
          "";
      }

      setSuccess(
        response.data?.message ||
        "Payment QR saved successfully."
      );

      await loadSetting();
    } catch (error) {
      console.error(
        "Payment QR upload error:",
        error
      );

      console.error(
        "Backend response:",
        JSON.stringify(
          error.response?.data,
          null,
          2
        )
      );

      setError(
        error.response?.data
          ?.message ||
          "Payment QR could not be uploaded."
      );
    } finally {
      setUploading(false);
    }
  }

  const displayedQr =
    previewUrl ||
    setting.qrImageUrl;

  if (loading) {
    return (
      <div
        className="payment-setting-message"
        role="status"
      >
        Loading payment QR...
      </div>
    );
  }

  return (
    <section className="admin-payment-setting">
      <div className="payment-setting-heading">
        <div>
          <span>
            Payment Setting
          </span>

          <h2>Payment QR</h2>

          <p>
            Upload the QR once. It will
            automatically be used when
            you approve an enquiry.
          </p>
        </div>

        <button
          type="button"
          className="payment-refresh-button"
          onClick={loadSetting}
          disabled={uploading}
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {error && (
        <div
          className="payment-setting-message payment-setting-error"
          role="alert"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="payment-setting-message payment-setting-success"
          role="status"
        >
          <CheckCircle2 size={18} />
          {success}
        </div>
      )}

      <div className="payment-setting-grid">
        <form
          className="payment-setting-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <label>
            Account Name

            <input
              type="text"
              name="accountName"
              value={
                form.accountName
              }
              onChange={
                handleInputChange
              }
              placeholder="Tech Digital Designers"
              required
            />
          </label>

          <label>
            UPI ID

            <input
              type="text"
              name="upiId"
              value={form.upiId}
              onChange={
                handleInputChange
              }
              placeholder="example@upi"
              required
            />
          </label>

          <label className="qr-file-field">
            Payment QR Image

            <input
              ref={fileInputRef}
              type="file"
              name="image"
              accept="image/png,image/jpeg,image/webp"
              onChange={
                handleFileChange
              }
              required
            />

            <small>
              JPG, PNG or WEBP —
              maximum size 5 MB.
            </small>
          </label>

          <button
            type="submit"
            className="btn payment-upload-button"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2
                  className="spin"
                  size={18}
                />
                Uploading...
              </>
            ) : (
              <>
                <ImageUp size={18} />
                Save Payment QR
              </>
            )}
          </button>
        </form>

        <div className="payment-qr-preview">
          <h3>
            Current Payment QR
          </h3>

          {displayedQr ? (
            <>
              <img
                src={displayedQr}
                alt="Payment QR"
              />

              {setting.qrImageUrl &&
                !previewUrl && (
                  <a
                    href={
                      setting.qrImageUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open full QR image
                  </a>
                )}
            </>
          ) : (
            <div className="empty-qr-preview">
              <ImageUp size={38} />

              <p>
                No payment QR
                uploaded yet.
              </p>
            </div>
          )}

          {setting.accountName && (
            <p>
              <strong>
                Account:
              </strong>{" "}
              {setting.accountName}
            </p>
          )}

          {setting.upiId && (
            <p>
              <strong>
                UPI ID:
              </strong>{" "}
              {setting.upiId}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}