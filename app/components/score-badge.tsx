

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  const getBadgeStyles = () => {
    if (score > 69) {
      return {
        badgeClass: "bg-badge-green",
        textClass: "text-green-600",
        label: "Strong"
      };
    } else if (score > 49) {
      return {
        badgeClass: "bg-badge-yellow",
        textClass: "text-yellow-600",
        label: "Good Start"
      };
    } else {
      return {
        badgeClass: "bg-badge-red",
        textClass: "text-red-600",
        label: "Needs Work"
      };
    }
  };

  const { badgeClass, textClass, label } = getBadgeStyles();

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badgeClass}`}>
      <p className={textClass}>{label}</p>
    </div>
  );
};

export default ScoreBadge;
