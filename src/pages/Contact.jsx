import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const contactNumbers = [
    {
      name: "সিরাজী মানিক",
      phone: "01855003073",
      icon: "📞",
    },
    {
      name: "আমির উদ্দিন",
      phone: "01879260148",
      icon: "📞",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "https://sbssbu-backend.vercel.app/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "বার্তা পাঠানো ব্যর্থ হয়েছে");
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Show success message
      setSuccess(data.message || "আপনার বার্তা সফলভাবে পাঠানো হয়েছে!");
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "কোনো ত্রুটি ঘটেছে। দয়া করে পুনরায় চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-2 md:px-4 ">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            যোগাযোগ করুন
          </h1>
          <p className="text-xl text-slate-600">
            আমাদের সাথে যোগাযোগ করতে নিম্নের ফর্ম পূরণ করুন অথবা সরাসরি কল করুন
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Direct Contact */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                যোগাযোগ তথ্য
              </h2>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactNumbers.map((contact, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl mt-1">{contact.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">
                          {contact.name}
                        </p>
                        <a
                          href={`tel:${contact.phone}`}
                          className="text-[#5b7bb8] hover:text-[#f78839] font-medium transition-colors mt-1 block"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                বার্তা পাঠান
              </h2>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-medium">{success}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold text-slate-900">
                      আপনার নাম
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="আপনার নাম লিখুন"
                    className="input input-bordered w-full bg-slate-50 border-slate-300 focus:border-[#5b7bb8] focus:outline-none focus:ring-2 focus:ring-[#5b7bb8]/20"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold text-slate-900">
                      ইমেল ঠিকানা
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="আপনার ইমেল"
                    className="input input-bordered w-full bg-slate-50 border-slate-300 focus:border-[#5b7bb8] focus:outline-none focus:ring-2 focus:ring-[#5b7bb8]/20"
                    required
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold text-slate-900">
                      বিষয়
                    </span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="বিষয় লিখুন"
                    className="input input-bordered w-full bg-slate-50 border-slate-300 focus:border-[#5b7bb8] focus:outline-none focus:ring-2 focus:ring-[#5b7bb8]/20"
                    required
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold text-slate-900">
                      বার্তা
                    </span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="আপনার বার্তা লিখুন..."
                    className="textarea textarea-bordered w-full h-32 bg-slate-50 border-slate-300 focus:border-[#5b7bb8] focus:outline-none focus:ring-2 focus:ring-[#5b7bb8]/20 resize-none"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn btn-primary w-full font-semibold py-3 transition-all ${
                    loading
                      ? "bg-slate-400 border-none text-white cursor-not-allowed"
                      : "bg-gradient-to-r from-[#5b7bb8] to-[#4a6aa0] border-none text-white hover:from-[#4a6aa0] hover:to-[#3a5a90]"
                  }`}
                >
                  {loading ? "পাঠানো হচ্ছে..." : "বার্তা পাঠান"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Additional CTA Section */}
      </div>
    </div>
  );
};

export default Contact;
