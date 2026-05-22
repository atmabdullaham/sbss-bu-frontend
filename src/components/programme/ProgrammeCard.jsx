import { Link } from "react-router-dom";

const ProgrammeCard = ({ program }) => {
  if (!program) {
    return null;
  }

  const {
    id,
    title,
    subtitle,
    probable_date: probableDate,
    sarbik_tottobodhon: supervisors = [],
    delegate_fee: delegateFee,
  } = program;

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-orange-300">
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-500"></div>

      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-200">
          {title}
        </h3>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        {probableDate && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 w-fit">
            <span className="inline-flex h-2 w-2 rounded-full bg-teal-500"></span>
            <span className="text-xs font-medium text-teal-700">
              {probableDate}
            </span>
          </div>
        )}
      </div>

      <div className="mt-5 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 p-4 border border-teal-200">
        <h4 className="text-xs font-bold uppercase text-gray-700 tracking-wider">
          ডেলিগেট ফি
        </h4>
        <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2">
          <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 border border-teal-100 hover:border-teal-300 transition-colors">
            <span>বর্তমান </span>
            <span className="font-bold text-teal-600">
              {delegateFee?.current_student} টাকা
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 border border-teal-100 hover:border-amber-300 transition-colors">
            <span>সাবেক </span>
            <span className="font-bold text-amber-600">
              {delegateFee?.alumni} টাকা
            </span>
          </div>
        </div>
      </div>

      {supervisors.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-bold uppercase text-gray-700 tracking-wider">
            সার্বিক তত্ত্বাবধানে
          </h4>
          <ul className="mt-3 space-y-1 text-xs text-gray-600  overflow-y-auto">
            {supervisors.map((person, index) => (
              <li
                key={`${person.name}-${index}`}
                className="truncate text-gray-700"
              >
                <span className="font-semibold">{person.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex gap-2">
        <Link
          to={`/programmes/${id}`}
          className="flex-1 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:from-teal-600 hover:to-cyan-700 hover:shadow-lg active:scale-95"
        >
          বিস্তারিত
        </Link>
      </div>
    </div>
  );
};

export default ProgrammeCard;
