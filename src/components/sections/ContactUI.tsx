import React, { useState } from "react";
import { ContactUsData } from "@/services/APIServices";

const ContactUI = ({ title, image }: { title: string, image: string }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    queryType: "0",
    message: "",
    company: ""
  });
  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    phone: false,
    message: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean, message?: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, name } = e.target;
    const fieldName = id ? id.replace('txt', '').toLowerCase() : name;

    setFormData({
      ...formData,
      [fieldName === 'name' ? 'fullName' : fieldName === 'query' ? 'message' : fieldName]: value
    });
  };

  const validateForm = () => {
    const newErrors = {
      fullName: !formData.fullName.trim(),
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      phone: !/^\d{10}$/.test(formData.phone),
      message: !formData.message.trim()
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await ContactUsData({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        queryType: formData.queryType === "0" ? "General" : formData.queryType,
        message: formData.message,
        CompanyName: formData.company
      });

      if (response.ok) {
        setSubmitStatus({ success: true, message: "Your message has been sent successfully!" });
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          queryType: "0",
          message: "",
          company: ""
        });
      } else {
        setSubmitStatus({ success: false, message: "Failed to send message. Please try again." });
      }
    } catch (error) {
      console.log(error);
      setSubmitStatus({ success: false, message: "An error occurred. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-us-section section-ptb" id="reach-out" style={{ backgroundImage: `url(${image})` }}>
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-lg-6">
            <h2 className="mb-3 text-white contact-heading">{title}</h2>
            <div className="contact-form p-4 ir-form brInfRating">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {submitStatus && (
                    <div className={`alert ${submitStatus.success ? 'alert-success' : 'alert-danger'}`}>
                      {submitStatus.message}
                    </div>
                  )}
                  {/* Full Name */}
                  <div className="col-md-6">
                    <div className="input-icon-wrapper">
                      <i className="fa-solid fa-user icon"></i>
                      <input
                        type="text"
                        className="form-control"
                        id="txtName"
                        placeholder="Full Name*"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.fullName && <small className="ir-error">*Enter valid name</small>}
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <div className="input-icon-wrapper">
                      <i className="fa-solid fa-envelope icon"></i>
                      <input
                        type="email"
                        className="form-control"
                        id="txtEmail"
                        placeholder="Email ID*"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.email && <small className="ir-error">*Enter valid Email ID</small>}
                  </div>

                  {/* Phone */}
                  <div className="col-md-6">
                    <div className="input-icon-wrapper">
                      <i className="fa-solid fa-phone icon"></i>
                      <input
                        type="tel"
                        className="form-control"
                        id="txtPhone"
                        placeholder="Phone Number*"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.phone && <small className="ir-error">*Enter valid Phone No.</small>}
                  </div>

                  {/* Query Type */}
                  <div className="col-md-6">
                    <div className="input-icon-wrapper">
                      <i className="fa-solid fa-list icon"></i>
                      <select
                        className="form-control form-select"
                        name="queryType"
                        value={formData.queryType}
                        onChange={handleChange}
                      >
                        <option value="0" disabled>Our Offering</option>
                        <option value="Credit Rating">Credit Rating</option>
                        <option value="Investor">Investor</option>
                        <option value="Media">Media</option>
                        <option value="HR">HR</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                  <div className="input-icon-wrapper">
                      <i className="fa-solid fa-building icon"></i>
                      <input
                        type="input"
                        className="form-control"
                        id="txtcompany"
                        placeholder="Company Name*"
                        value={formData.company}
                        onChange={handleChange}
                        style={{minHeight: "auto"}}
                      />
                    </div>
                  </div>
                  {/* Message */}
                  <div className="col-12">
                    <div className="input-icon-wrapper textarea-wrapper">
                      <i className="fa-solid fa-pen icon"></i>
                      <textarea
                        className="form-control"
                        id="txtQuery"
                        rows={4}
                        placeholder="Message*"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    {errors.message && <small className="ir-error">*Enter valid Message</small>}
                  </div>

                  {/* reCAPTCHA */}
                  <div className="col-12 mb-3 text-start">
                    {/* Apna Site Key Yaha Paste Karein */}
                    <div className="g-recaptcha" data-sitekey="YOUR_REAL_SITE_KEY"></div>
                  </div>

                  {/* Submit */}
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 btn-ir-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUI;