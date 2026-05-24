import { Image } from "@imagekit/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const toBanglaNumber = (number) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return number
    .toString()
    .split("")
    .map((digit) => banglaDigits[digit])
    .join("");
};

const RegistrationTimer = () => {
  const [enrollmentEnd] = useState(new Date("2026-05-24T23:59:00"));
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const diff = enrollmentEnd - currentTime;

  let timeLeft;
  if (diff <= 0) {
    // 🛑 After deadline — show all zeros
    timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  } else {
    // ⏳ Before deadline — show countdown
    timeLeft = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  const banglaLabels = ["দিন", "ঘণ্টা", "মিনিট", "সেকেন্ড"];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 items-stretch md:w-10/12 mx-auto py-10 md:py-20 h-full">
        {/* Image Section */}
        <div className="w-full h-full flex flex-col items-center pb-4 md:pb-0">
          <Image
            urlEndpoint="https://ik.imagekit.io/atm"
            src="https://ik.imagekit.io/atm/event_image2.jpg"
            width={800}
            height={600}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Countdown Section */}
        <div className=" flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6 w-full h-full">
          {/* Timer */}
          <div className="grid grid-cols-4 gap-2 xs:gap-3 sm:gap-5 md:gap-16 text-center w-full justify-center">
            {["days", "hours", "minutes", "seconds"].map((key, index) => {
              const value = timeLeft[key];
              return (
                <div
                  key={key}
                  className="flex flex-col items-center lg:items-end"
                >
                  <span className="bg-green-100 bg-opacity-30 backdrop-blur-xl text-[#0AA76B] font-bold text-base xs:text-lg sm:text-2xl md:text-4xl px-2 xs:px-3 sm:px-5 py-1 xs:py-2 rounded-lg shadow-inner">
                    {toBanglaNumber(String(value).padStart(2, "0"))}
                  </span>
                  <span className="text-xs sm:text-sm items-center mr-0 lg:mr-7 justify-center text-gray-500 mt-1">
                    {banglaLabels[index]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Main Heading */}
          <div className="text-center">
            <h2 className="text-base xs:text-lg sm:text-xl md:text-3xl font-bold text-black leading-snug">
              সম্প্রীতির টানে,
              <span className="text-green-500 font-bold">
                {" "}
                দ্বীনের আহ্বানে
              </span>{" "}
              ফিরি আবার আপন শেকড়ের পানে
            </h2>
          </div>

          {/* Enrollment Dates */}
          <div className="text-gray-600 text-xs xs:text-sm sm:text-base space-y-1 px-1 xs:px-2">
            <div className="flex items-center gap-2">
              রেজিস্ট্রেশন শুরু:
              <span className="text-black font-medium"> 20 মে, ২০২৬</span>
            </div>
            <div className="flex items-center gap-2">
              রেজিস্ট্রেশন শেষ:
              <span className="text-black font-medium"> ২৪ মে, ২০২৬</span>
            </div>
          </div>

          {/* Button */}
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
    </div>
  );
};

export default RegistrationTimer;
