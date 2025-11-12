interface ATSProps {
  score: number;
  suggestions: {
    type: "good" | "improve";
    tip: string;
  }[];
}

const ATS = ({ score, suggestions }: ATSProps) => {
  // Determine gradient background based on score
  const getGradientClass = () => {
    if (score > 69) return "from-green-100";
    if (score > 49) return "from-yellow-100";
    return "from-red-100";
  };

  // Determine icon based on score
  const getIcon = () => {
    if (score > 69) return "/icons/ats-good.svg";
    if (score > 49) return "/icons/ats-warning.svg";
    return "/icons/ats-bad.svg";
  };

  return (
    <div
      className={`p-6 rounded-2xl bg-linear-to-r ${getGradientClass()} to-white shadow-sm border border-gray-100`}
    >
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-6">
        <img src={getIcon()} alt="ATS Score Icon" className="w-8 h-8" />
        <h3 className="text-2xl font-semibold text-gray-800">
          ATS Score - {score}/100
        </h3>
      </div>

      {/* Description Section */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-800">
          Applicant Tracking System Compatibility
        </h4>

        <p className="text-gray-600 leading-relaxed">
          This score reflects how well your resume will perform when scanned by
          Applicant Tracking Systems (ATS). Higher scores increase your chances
          of getting past the initial screening and reaching human recruiters.
        </p>

        {/* Suggestions List */}

        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3">
              <img
                src={
                  suggestion.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt={
                  suggestion.type === "good"
                    ? "Good practice"
                    : "Improvement needed"
                }
                className="w-5 h-5 mt-0.5 shrink-0"
              />
              <p
                className={
                  suggestion.type === "good"
                    ? "text-green-700"
                    : "text-amber-700"
                }
              >
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Encouragement */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 italic">
            Keep optimizing your resume to improve your ATS compatibility and
            increase your job application success rate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ATS;
