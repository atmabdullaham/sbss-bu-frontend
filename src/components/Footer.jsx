import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "হোম", href: "/" },
    { label: "প্রোগ্রামসমূহ", href: "/programmes" },
    { label: "পরিচিতি", href: "/about" },
    { label: "যোগাযোগ", href: "/contact" },
  ];

  return (
    <footer className="border-t-4 border-t-[#5b7bb8] bg-linear-to-b from-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <div className="inline-flex rounded-3xl bg-white px-4 py-3 shadow-lg">
                <Logo size="sm" />
              </div>
            </div>
            <p className="mx-auto max-w-xs text-sm leading-6 text-slate-400 md:mx-0">
              সাবেক বর্তমান সাথী সদস্য
            </p>
            <p className="text-xs text-slate-500">বাঁশখালী উপজেলা, চট্টগ্রাম</p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-white">
              লিঙ্ক
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-[#5b7bb8]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-white">
              যোগাযোগ করুন
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#f78839]">📞</span>
                  <div>
                    <p className="font-semibold text-slate-100">সিরাজী মানিক</p>
                    <a
                      href="tel:01855003073"
                      className="mt-1 block transition-colors hover:text-white"
                    >
                      01855003073
                    </a>
                  </div>
                </div>
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#f78839]">📞</span>
                  <div>
                    <p className="font-semibold text-slate-100">আমির উদ্দিন</p>
                    <a
                      href="tel:01879260148"
                      className="mt-1 block transition-colors hover:text-white"
                    >
                      01879-260148
                    </a>
                  </div>
                </div>
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#5b7bb8]">📍</span>
                  <div>
                    <p className="font-semibold text-slate-100">অবস্থান</p>
                    <span className="mt-1 block">বাঁশখালী, চট্টগ্রাম</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-white/10 pt-8">
          {/* Bottom Copyright */}
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <p className="text-sm text-slate-400">
              Copyright © {currentYear} SBSSBU. সকল অধিকার সংরক্ষিত।
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
              <a href="#" className="transition-colors hover:text-[#5b7bb8]">
                গোপনীয়তা নীতি
              </a>
              <a href="#" className="transition-colors hover:text-[#f78839]">
                শর্তাবলী
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
