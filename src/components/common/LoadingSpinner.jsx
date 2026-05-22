const LoadingSpinner = ({ size = "md", message = "লোড হচ্ছে..." }) => {
  const sizeClasses = {
    sm: "h-8 w-8 border-2",
    md: "h-12 w-12 border-4",
    lg: "h-16 w-16 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeClasses[size]} border-blue-200 border-t-blue-600 rounded-full animate-spin`}
      ></div>
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
