import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoLogoWhatsapp, IoMdDownload } from "react-icons/io";
import { Link } from "react-router-dom";
import { colors } from "../config/theme";
import { downloadPNG } from "../utils/downloadUtils";
const brand = {
  primary: colors.primary[500],
  primaryDark: colors.primary[700],
  accent: colors.accent[500],
  primarySoft: colors.primary[50],
};

const successGradient = `linear-gradient(135deg, #10b981 0%, ${brand.primary} 100%)`;
const whatsappColor = "#25D366";

const RegistrationSuccess = () => {
  const [downloading, setDownloading] = useState(false);
  const resultCardRef = useRef(null);
  const [registrationData, setRegistrationData] = useState(null);
  const whatsappLink = "https://chat.whatsapp.com/FLbWhnQGNk2L33Fvrvjn6l";

  useEffect(() => {
    // Retrieve registration data from localStorage
    const savedData = localStorage.getItem("registrationData");
    if (savedData) {
      try {
        setRegistrationData(JSON.parse(savedData));
      } catch (err) {
        console.error("Failed to parse registration data:", err);
      }
    }
  }, []);

  const handleDownloadPNG = async () => {
    if (!resultCardRef.current) return;

    try {
      setDownloading(true);
      const fileName = `${(registrationData?.name_bn || "Delegate_card").replace(/\s+/g, "_")}_Delegate_${new Date().toLocaleDateString("bn-BD")}.png`;
      await downloadPNG(resultCardRef.current, fileName);
      toast.success("ফলাফল PNG হিসেবে ডাউনলোড হয়েছে ✓");
    } catch (err) {
      const errorMsg = err?.message || err?.toString() || "অজানা ত্রুটি";

      if (errorMsg.includes("html-to-image")) {
        toast.error("⚠️ npm install html-to-image করুন");
      } else if (
        errorMsg.includes("CORS") ||
        errorMsg.includes("cross-origin")
      ) {
        toast.error("⚠️ ছবি লোড করতে সমস্যা। দয়া করে পুনরায় চেষ্টা করুন।");
      } else {
        toast.error("❌ ডাউনলোড ব্যর্থ: " + errorMsg.substring(0, 50));
      }
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-1 md:px-6 md:py-4">
      <div className="mx-auto max-w-3xl">
        {!registrationData && (
          <div className="mb-4">
            <p className="text-lg text-slate-600 text-center">
              আপনার রেজিস্ট্রেশন সম্পন্ন হয়নি।
            </p>
            <div className="flex items-center justify-center">
              <Link
                to={"/registration"}
                className="mt-2 sm:mt-4 w-full sm:w-auto text-center"
              >
                <button className="bg-[#0AA76B] hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 shadow-sm">
                  রেজিস্ট্রেশন করুন
                </button>
              </Link>
            </div>
          </div>
        )}
        {/* Success Header */}
        {registrationData && (
          <div className="text-center mb-4">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-2 animate-bounce">
              <svg
                className="h-10 w-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <p className="text-xl text-slate-600">
              আপনার নিবন্ধন সফলভাবে সম্পন্ন হয়েছে।
            </p>
          </div>
        )}
        {/* WhatsApp CTA */}
        {registrationData && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-4 shadow-sm">
            <div className="text-center mb-2">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full text-green-500 mb-4">
                <IoLogoWhatsapp className="text-4xl" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                হোয়াটসঅ্যাপ গ্রুপে জয়েন করুন
              </h2>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-lg px-4 py-2 text-center text-md font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              style={{ backgroundColor: whatsappColor }}
            >
              হোয়াটসঅ্যাপ গ্রুপ
            </a>
          </div>
        )}

        {/* Registration Details */}
        {/* {registrationData && (
          <div className="bg-white rounded-2xl border border-slate-200 p-2 pt-4 mb-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              আপনার তথ্য
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {registrationData.imageUrl && (
                <div className="md:col-span-2">
                  <div className="overflow-hidden rounded-2xl border border-slate-200">
                    <img
                      src={registrationData.imageUrl}
                      alt={registrationData.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="rounded-2xl bg-blue-50 p-5 border border-blue-100">
                <p className="text-sm font-semibold  tracking-[0.25em] text-blue-700 mb-2">
                  নাম
                </p>
                <p className="text-lg font-bold text-slate-900">
                  {registrationData.name_bn}
                </p>
              </div>

              <div className="rounded-2xl bg-amber-50 p-5 border border-amber-100">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700 mb-2">
                  দায়িত্ব
                </p>
                <p className="text-lg font-bold text-slate-900">
                  {registrationData.daitto}
                </p>
              </div>

              <div className="rounded-2xl bg-purple-50 p-5 border border-purple-100 md:col-span-2">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-700 mb-2">
                  সাংগঠনিক শাখা
                </p>
                <p className="text-lg font-bold text-slate-900">
                  {registrationData.organizational_branch}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-100 p-5 border border-slate-200">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-700 mb-2">
                  সময়
                </p>
                <p className="text-sm text-slate-600">
                  {new Date().toLocaleDateString("bn-BD", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        )} */}

        {/* Home Link */}

        {/* delegate card */}
        {registrationData && (
          <div
            ref={resultCardRef}
            className="max-w-75 max-h-fit"
            style={{ fontFamily: "'Tiro Bangla', serif" }}
          >
            <div className="max-w-75 relative grid grid-cols-1 mx-auto h-full">
              <img
                src="https://ik.imagekit.io/atm/event_card1.jpg"
                alt="Event Card"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                crossOrigin="anonymous"
              />
              {/* Countdown Section */}
              <div
                className="absolute flex items-center gap-10 md:gap-30 w-full h-full left-7 md:left-15 -bottom-22 md:-bottom-50 pointer-events-none"
                style={{ fontFamily: "'Tiro Bangla', serif" }}
              >
                {/* Main Heading */}
                <div className="text-center">
                  <img
                    src={registrationData.imageUrl}
                    alt={registrationData.name}
                    className="h-15 w-13 md:h-35 md:w-30 object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <div
                  className="space-y-0.5 md:space-y-4 text-xs font-normal md:text-xl text-gray-700"
                  style={{ fontFamily: "'Tiro Bangla', serif" }}
                >
                  <h2 style={{ fontFamily: "'Tiro Bangla', serif" }}>
                    {registrationData.name_bn}
                  </h2>
                  <h2 style={{ fontFamily: "'Tiro Bangla', serif" }}>
                    {registrationData.daitto}
                  </h2>
                  <h2 style={{ fontFamily: "'Tiro Bangla', serif" }}>
                    {registrationData.organizational_branch}
                  </h2>
                </div>

                {/* Button */}
              </div>
            </div>
          </div>
        )}
        {registrationData && (
          <div className="border-t-2 border-slate-300 px-2 md:px-4 py-4">
            <div className="flex md:gap-3 justify-between md:justify-end">
              <button
                onClick={handleDownloadPNG}
                disabled={downloading}
                className="btn px-6 py-2 font-semibold text-white rounded-lg"
                style={{
                  backgroundColor: "#2563eb",
                }}
              >
                {downloading ? "ডাউনলোড হচ্ছে..." : "ডাউনলোড"}
                <IoMdDownload />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationSuccess;
