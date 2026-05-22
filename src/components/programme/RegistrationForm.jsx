import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import useAxiosPublic from "../../hooks/useAxiosPublic";
import { uploadToImageKit } from "../../utils/imagekitUpload";

const RegistrationForm = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = async (data) => {
    const file = data.imageUrl[0];

    if (!file) {
      toast.error("Please select a file");
      return;
    }

    try {
      setLoading(true);
      const url = await uploadToImageKit(file, (event) => {
        setProgress((event.loaded / event.total) * 100);
      });

      data.imageUrl = url;

      console.log("Submitting registration form with data:", data);

      // Call the backend registration API
      const response = await axiosPublic.post("/registration", data);

      console.log("Backend response:", response.data);

      if (response.data.success || response.data.insertedId) {
        // Save registration data to localStorage
        const registrationData = {
          imageUrl: data.imageUrl,
          name_bn: data.name_bn,
          daitto: data.daitto,
          organizational_branch: data.organizational_branch,
          timestamp: new Date().toISOString(),
        };
        localStorage.setItem(
          "registrationData",
          JSON.stringify(registrationData),
        );

        toast.success("Registration successful!");
        navigate("/registration-success");
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again";
      console.error("Error details:", errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-8"
      >
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-2xl md:text-4xl font-bold tracking-tight text-slate-900">
            রেজিস্ট্রেশন ফরম
          </h1>
          <p className="text-md font-medium text-slate-600">
            আপনার সকল তথ্য সম্পূর্ণ নিরাপদ থাকবে
          </p>
          <p className="mt-2 text-sm font-semibold text-blue-600">
            বিকাশ/নগদ: ০১৮৫৫-০০৩০৭৩
          </p>
        </div>
        {/* Personal Information div*/}
        <div className="mb-6 grid grid-cols-1 gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-3 md:grid-cols-2 md:p-6 shadow-sm">
          {/* Name Bangla */}
          <div>
            <label className="label dark:text-gray-300">নাম *</label>
            <input
              {...register("name_bn", {
                required: " Name in Bangla is required",
              })}
              placeholder="Write Your Name in Bangla"
              className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-100"
            />
            {errors.name_bn && (
              <p className="text-error">{errors.name_bn.message}</p>
            )}
          </div>
          {/* Sabek/Bortoman */}
          <div>
            <label className="label dark:text-gray-300">সাবেক/বর্তমান *</label>
            <select
              {...register("sabek_bortoman", {
                required: "Sabek/Bortoman is required",
              })}
              className="select select-bordered w-full dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="">Select</option>
              <option value="sabek">সাবেক</option>
              <option value="bortoman">বর্তমান</option>
            </select>
            {errors.gender && (
              <p className="text-error">{errors.gender.message}</p>
            )}
          </div>
          {/* sangotonik man */}
          <div>
            <label className="label dark:text-gray-300">মান *</label>
            <select
              {...register("songotonik_man", {
                required: "সাংগঠনিক মান is required",
              })}
              className="select select-bordered w-full dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="">Select</option>
              <option value="associate">সাথী</option>
              <option value="member">সদস্য</option>
            </select>
            {errors.songotonik_man && (
              <p className="text-error">{errors.songotonik_man.message}</p>
            )}
          </div>
          {/* daitto */}
          <div>
            <label className="label dark:text-gray-300">দায়িত্ব *</label>
            <input
              {...register("daitto", {
                required: " দায়িত্ব is required",
              })}
              placeholder="বর্তমান বা সর্বশেষ দায়িত্ব লিখুন"
              className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-100"
            />
            {errors.daitto && (
              <p className="text-error">{errors.daitto.message}</p>
            )}
          </div>
          {/*image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Photo Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Photo
              </label>
              <div className="relative">
                <input
                  {...register("imageUrl")}
                  type="file"
                  className="w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-emerald-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-600 hover:file:bg-emerald-100"
                />
              </div>
              {progress > 0 && progress < 100 && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-medium text-slate-600">
                      Upload Progress
                    </p>
                    <p className="text-xs font-bold text-emerald-600">
                      {Math.round(progress)}%
                    </p>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full bg-linear-to-r from-emerald-400 to-teal-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Added By Name */}

            {/* Added By Email */}
          </div>
        </div>
        {/* Educational Information */}
        <div className="mb-6 grid grid-cols-1 gap-4 rounded-2xl border border-purple-100 bg-purple-50 p-3 md:grid-cols-2 md:p-6 shadow-sm">
          {/* School Name */}
          <div>
            <label className="label dark:text-gray-300">
              সাংগঠনিক শাখার নাম *
            </label>
            <input
              {...register("organizational_branch", {
                required: "শাখার নাম is required",
              })}
              placeholder="সর্বশেষ বা বর্তমান শাখার নাম লিখুন"
              className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-100"
            />
            {errors.organizational_branch && (
              <p className="text-error">
                {errors.organizational_branch.message}
              </p>
            )}
          </div>
          {/* Class */}
          <div>
            <label className="label dark:text-gray-300">গেঞ্জি সাইজ *</label>
            <select
              {...register("tshirt_size", {
                required: "tshirt size is required",
              })}
              className="select select-bordered w-full dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="">Select</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
              <option value="3xl">3XL</option>
            </select>
            {errors.songotonik_man && (
              <p className="text-error">{errors.songotonik_man.message}</p>
            )}
          </div>

          {/* Section */}
          {/* Bkash Number */}
          <div>
            <label className="label dark:text-gray-300">
              Bkash/Nagad Number *
            </label>
            <input
              {...register("sendmoney_number", {
                required: " number is required",
                pattern: {
                  value: /^01[0-9]{9}$/,
                  message:
                    "বাংলাদেশি মোবাইল নম্বর দিন (১১ ডিজিট)। যে নাম্বার থেকে ফি পাঠিয়েছেন।",
                },
              })}
              placeholder="Bkash/Nagad Number in 01XXXXXXXXX format"
              className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-100"
            />
            {errors.sendmoney_number && (
              <p className="text-error">{errors.sendmoney_number.message}</p>
            )}
          </div>
          {/* Roll */}
          <div>
            <label className="label dark:text-gray-300">Transaction Id *</label>
            <input
              {...register("transaction_Id", {
                required: "Transaction Id is required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d)[A-Z0-9]{8,15}$/,
                  message: "সঠিক Transaction Id দিন",
                },
              })}
              placeholder="Write Transaction Id"
              className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-100"
            />
            {errors.transaction_Id && (
              <p className="text-error">{errors.transaction_Id.message}</p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-6 grid grid-cols-1 gap-4 rounded-2xl border border-green-100 bg-green-50 p-3 md:grid-cols-2 md:p-6 shadow-sm">
          {/* Phone */}
          <div>
            <label className="label dark:text-gray-300">Phone Number *</label>
            <input
              {...register("phone_number", {
                required: "Phone number is required",
                pattern: {
                  value: /^01[0-9]{9}$/,
                  message: "Give a valid Bangladeshi mobile number (11 digits)",
                },
              })}
              placeholder="Phone"
              className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-100"
            />
            {errors.phone_number && (
              <p className="text-error">{errors.phone_number.message}</p>
            )}
          </div>

          {/* whatsapp */}
          <div>
            <label className="label dark:text-gray-300">
              Whatsapp Number *
            </label>
            <input
              {...register("whatsapp_number", {
                required: "Whatsapp number is required",
                pattern: {
                  value: /^01[0-9]{9}$/,
                  message: "Give a valid Bangladeshi mobile number (11 digits)",
                },
              })}
              placeholder="Whatsapp Number"
              className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-100"
            />
            {errors.whatsapp_number && (
              <p className="text-error">{errors.whatsapp_number.message}</p>
            )}
          </div>
          {/* Present Adress */}
          <div>
            <label className="label dark:text-gray-300">বর্তমান ঠিকানা *</label>
            <div className="flex gap-2">
              <input
                {...register("present_area", { required: true })}
                placeholder="এরিয়া"
                className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-100"
              />
              <input
                {...register("present_thana", { required: true })}
                placeholder="থানা"
                className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-100"
              />
              <input
                {...register("present_zilla", { required: true })}
                placeholder="জেলা"
                className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </div>
          {/* Permanent Adress */}
          <div>
            <label className="label dark:text-gray-300">স্থায়ী ঠিকানা *</label>
            <div className="flex gap-2">
              <select
                {...register("permanent_union", { required: true })}
                placeholder="Area"
                className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="">ইউনিয়ন সিলেক্ট করুন</option>
                <option value="pukuria">পুকুরিয়া</option>
                <option value="sadhanpur">সাধনপুর</option>
                <option value="khankhanabad">খানখানাবাদ</option>
                <option value="baharchhara">বাহারছড়া</option>
                <option value="kalipur">কালীপুর</option>
                <option value="bailchhari">বৈলছড়ি</option>
                <option value="paurasava">পৌরসভা</option>
                <option value="katharia">কাথরিয়া</option>
                <option value="saral">সরল</option>
                <option value="gandamara">গণ্ডামারা</option>
                <option value="silkup">শীলকূপ</option>
                <option value="chambal">চাম্বল</option>
                <option value="puichhari">পুঁইছড়ি</option>
                <option value="chhanua">ছনুয়া</option>
                <option value="sekherkhil">শেখেরখীল</option>
              </select>
              <select
                {...register("permanent_ward", { required: true })}
                placeholder="Thana"
                className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="">ওয়ার্ড সিলেক্ট করুন</option>
                <option value="1">১নং </option>
                <option value="2">২নং </option>
                <option value="3">৩নং </option>
                <option value="4">৪নং </option>
                <option value="5">৫নং </option>
                <option value="6">৬নং </option>
                <option value="7">৭নং </option>
                <option value="8">৮নং </option>
                <option value="9">৯নং </option>
              </select>
            </div>
          </div>
        </div>
        {/* email and exam center choice */}
        <div className="text-center mt-8">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-2xl px-8 py-4 text-base font-bold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            style={{
              backgroundImage: `linear-gradient(135deg, #5b7bb8 0%, #4a69a1 100%)`,
            }}
          >
            {loading ? (
              <>
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-3" />
                প্রসেসিং...
              </>
            ) : (
              "রেজিস্ট্রেশন সম্পন্ন করুন"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;
