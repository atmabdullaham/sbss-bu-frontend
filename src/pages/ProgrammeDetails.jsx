import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import programmeImage from "../assets/programme1_details.jpg";
import { colors } from "../config/theme";

const brand = {
  primary: colors.primary[500],
  primaryDark: colors.primary[700],
  primarySoft: colors.primary[50],
  accent: colors.accent[500],
  neutral100: colors.neutral[100],
  neutral200: colors.neutral[200],
  neutral500: colors.neutral[500],
  neutral600: colors.neutral[600],
  neutral700: colors.neutral[700],
  neutral900: colors.neutral[900],
};

const heroGradient = `linear-gradient(135deg, ${brand.primary} 0%, ${brand.primaryDark} 58%, #111827 100%)`;
const buttonGradient = `linear-gradient(135deg, ${brand.primary} 0%, ${brand.primaryDark} 100%)`;

const ProgrammeDetails = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const timer = setTimeout(() => {
      fetch("/programms.json")
        .then((res) => res.json())
        .then((data) => {
          if (!isMounted) return;
          const found = data.find((item) => String(item.id) === String(id));
          setProgram(found || null);
          setLoading(false);
        })
        .catch(() => {
          if (!isMounted) return;
          setProgram(null);
          setLoading(false);
        });
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [id]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          background: `linear-gradient(180deg, ${brand.primarySoft} 0%, #ffffff 100%)`,
        }}
      >
        <div className="flex flex-col items-center rounded-[1.75rem] border border-slate-200 bg-white px-8 py-10 shadow-xl">
          <div
            className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-transparent"
            style={{ borderTopColor: brand.primary }}
          />
          <p className="mt-4 text-sm font-medium text-slate-600">
            প্রোগ্রাম লোড হচ্ছে...
          </p>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          background: `linear-gradient(180deg, ${brand.primarySoft} 0%, #ffffff 100%)`,
        }}
      >
        <div className="max-w-lg rounded-[1.75rem] border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-10">
          <div className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            প্রোগ্রাম পাওয়া যায়নি
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            আপনি যে প্রোগ্রামটি খুঁজছেন সেটি এখনো পাওয়া যায়নি অথবা সরানো হয়েছে।
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
            style={{ backgroundImage: buttonGradient }}
          >
            হোমে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  const {
    title,
    subtitle,
    probable_date: probableDate,
    sarbik_tottobodhon: supervisors = [],
    delegate_fee: delegateFee,
  } = program;

  const currentStudentFee = delegateFee?.current_student ?? "—";
  const alumniFee = delegateFee?.alumni ?? "—";
  const currency = delegateFee?.currency ?? "";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section
        className="relative overflow-hidden text-white"
        style={{ background: heroGradient }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />
          <div
            className="absolute -right-24 bottom-0 h-80 w-80 rounded-full blur-3xl"
            style={{ backgroundColor: `${brand.accent}40` }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 12H5m7 7l-7-7 7-7"
              />
            </svg>
            সব প্রোগ্রাম
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h1 className="mt-4 text-2xl md:text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {title}
              </h1>

              {subtitle && (
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                  {subtitle}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                {probableDate && (
                  <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
                    তারিখ: {probableDate}
                  </span>
                )}
                <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
                  রেজিস্ট্রেশন একদম সহজ
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-4xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur">
                <div className="relative">
                  <img
                    src={programmeImage}
                    alt={title}
                    className="h-full w-full object-cover sm:h-80 lg:h-104"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-2 md:px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        {/* Key change: Added smaller gap on mobile, larger on desktop. 
        Defaults to 1 column on mobile, changes to 12 columns on large screens. 
      */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left Column (Content) */}
          <div className="space-y-6 lg:col-span-8">
            {probableDate && (
              <div className="rounded-[1.75rem] border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-3 md:p-5 shadow-sm ">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
                      তারিখ
                    </p>
                    <p className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:mt-2 sm:text-3xl">
                      {probableDate}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <div
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white sm:h-12 sm:w-12 sm:rounded-2xl"
                  style={{ background: heroGradient }}
                >
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                    ডেলিগেট ফি
                  </h2>
                  <p className="text-xs text-slate-500 sm:text-sm">
                    বর্তমান ও সাবেকদের জন্য আলাদা ফি
                  </p>
                </div>
              </div>

              {/* Changed from sm:grid-cols-2 to grid-cols-1 sm:grid-cols-2 for better mobile stacking */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:p-5">
                  <p className="text-sm font-medium text-slate-600">বর্তমান</p>
                  <div className="mt-2 flex items-baseline gap-2 sm:mt-3">
                    <span className="text-2xl font-bold tracking-tight text-[#5b7bb8] sm:text-3xl">
                      {currentStudentFee}
                    </span>
                    {currency && (
                      <span className="text-sm font-semibold text-slate-500">
                        {currency}
                      </span>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-100 bg-amber-50/80 p-4 sm:p-5">
                  <p className="text-sm font-medium text-slate-600">সাবেক</p>
                  <div className="mt-2 flex items-baseline gap-2 sm:mt-3">
                    <span className="text-2xl font-bold tracking-tight text-[#f78839] sm:text-3xl">
                      {alumniFee}
                    </span>
                    {currency && (
                      <span className="text-sm font-semibold text-slate-500">
                        {currency}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {supervisors && supervisors.length > 0 && (
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-5 flex items-center gap-3 sm:mb-6">
                  <div
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white sm:h-12 sm:w-12 sm:rounded-2xl"
                    style={{ background: heroGradient }}
                  >
                    <svg
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM6 20h12a6 6 0 00-6-6 6 6 0 00-6 6z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                      সার্বিক তত্ত্বাবধানে
                    </h2>
                    <p className="text-xs text-slate-500 sm:text-sm">
                      যারা এই প্রোগ্রামটি পরিচালনা ও তত্ত্বাবধান করছেন।
                    </p>
                  </div>
                </div>

                {/* Stacked on mobile, 2 columns on small screens and up */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {supervisors.map((person, index) => (
                    <div
                      key={`${person.name}-${index}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-[#5b7bb8]/30 hover:bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white sm:h-12 sm:w-12"
                          style={{ background: heroGradient }}
                        >
                          {person.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900 sm:text-base">
                            {person.name}
                          </p>
                          <p className="truncate text-xs text-slate-600 sm:text-sm text-wrap">
                            {person.designation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Sidebar/Registration) */}
          <aside className="lg:col-span-4">
            {/* Order shifted slightly on mobile for better flow if needed, but visually sticky on desktop */}
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-3 md:p-5 shadow-xl  lg:sticky lg:top-24">
              <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#5b7bb8]">
                Registration
              </div>

              <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                রেজিস্ট্রেশন শুরু করুন
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-3 sm:text-base">
                সম্প্রীতির টানে, দ্বীনের আহ্বানে ফিরি আবার আপন শেকড়ের পানে
              </p>

              <dl className="mt-6 space-y-3">
                {probableDate && (
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
                      তারিখ
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-slate-900 sm:mt-2">
                      {probableDate}
                    </dd>
                  </div>
                )}

                <div className="rounded-2xl bg-blue-50/70 p-4">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5b7bb8] sm:text-xs">
                    বর্তমান
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900 sm:mt-2">
                    {currentStudentFee} টাকা
                  </dd>
                </div>

                <div className="rounded-2xl bg-amber-50/80 p-4">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f78839] sm:text-xs">
                    সাবেক
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900 sm:mt-2">
                    {alumniFee} টাকা
                  </dd>
                </div>
              </dl>

              <Link
                to="/registration"
                className="mt-6 flex w-full items-center justify-center rounded-2xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:py-4 sm:text-base"
                style={{ backgroundImage: buttonGradient }}
              >
                রেজিস্ট্রেশন করুন
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ProgrammeDetails;
