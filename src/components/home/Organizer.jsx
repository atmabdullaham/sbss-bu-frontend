const Organizer = () => {
  const organizers = [
    {
      name: "তানজীর হোসেন জুয়েল",
      designation: "কেন্দ্রীয় তথ্য ও মানবাধিকার সম্পাদক",
      imageUrl:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1160", // Placeholder image
    },
    {
      name: "মুমিনুল হক",
      designation: "সভাপতি, চট্টগ্রাম মহানগর উত্তর",
      imageUrl:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1160",
    },
    {
      name: "মাইমুনুল ইসলাম মামুন",
      designation: "সভাপতি, চট্টগ্রাম মহানগর দক্ষিণ",
      imageUrl:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1160",
    },
    {
      name: "ফরমানুর রহমান জাহিন",
      designation: "সভাপতি, চট্টগ্রাম জেলা পশ্চিম",
      imageUrl:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1160",
    },
    {
      name: "সিরাজী মানিক",
      designation: "সেক্রেটারি, চট্টগ্রাম জেলা পশ্চিম",
      imageUrl:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1160",
    },
  ];

  return (
    <div className="w-11/12 md:w-10/12 mx-auto py-10 md:py-20 h-full text-black">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-1 leading-snug">
        সার্বিক তত্ত্বাবধানে
      </h2>
      <p className="text-center text-gray-700 mb-12 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
        এই প্রোগ্রামটি পরিচালনা ও তত্ত্বাবধান করছেন
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {organizers.map((organizer, index) => (
          <div
            key={index}
            className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6"
          >
            <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
              <div className="sm:order-last sm:shrink-0">
                <img
                  alt={organizer.name}
                  src={organizer.imageUrl}
                  className="size-16 rounded-full object-cover sm:size-18"
                />
              </div>

              <div className="mt-4 sm:mt-0">
                <h3 className="text-lg font-medium text-pretty text-gray-900">
                  {organizer.name}
                </h3>

                <p className="mt-1 text-sm text-gray-700">
                  {organizer.designation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Organizer;
