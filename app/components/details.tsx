import { cn } from "lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
} from "./accordion";

interface DetailsProps {
  feedback: Feedback;
}

interface ScoreBadgeProps {
  score: number;
}

interface CategoryHeaderProps {
  title: string;
  categoryScore: number;
}

interface CategoryContentProps {
  tips: {
    type: "good" | "improve";
    tip: string;
    explanation: string;
  }[];
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  const getScoreConfig = () => {
    if (score > 69) {
      return {
        bgColor: "bg-green-100",
        textColor: "text-green-700",
        icon: <img src="/icons/check.svg" alt="check" className="w-4 h-4" />,
      };
    } else if (score > 39) {
      return {
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-700",
        icon: (
          <img src="/icons/warning.svg" alt="warning" className="w-4 h-4" />
        ),
      };
    } else {
      return {
        bgColor: "bg-red-100",
        textColor: "text-red-700",
        icon: <img src="/icons/cross.svg" alt="cross" className="w-4 h-4" />,
      };
    }
  };

  const { bgColor, textColor, icon } = getScoreConfig();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium",
        bgColor,
        textColor
      )}
    >
      {icon}
      <span>{score}/100</span>
    </div>
  );
};

const CategoryHeader = ({ title, categoryScore }: CategoryHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({ tips }: CategoryContentProps) => {
  return (
    <div className="space-y-6">
      {/* Two-column grid for tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg border",
              tip.type === "good"
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            )}
          >
            <div className="shrink-0 mt-0.5">
              {tip.type === "good" ? (
                <img
                  src="/icons/check.svg"
                  alt="check"
                  className="w-5 h-5 text-green-600"
                />
              ) : (
                <img
                  src="/icons/cross.svg"
                  alt="cross"
                  className="w-5 h-5 text-red-600"
                />
              )}
            </div>
            <div className="flex-1">
              <p
                className={cn(
                  "text-sm font-medium",
                  tip.type === "good" ? "text-green-900" : "text-red-900"
                )}
              >
                {tip.tip}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Explanation boxes */}
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div
            key={index}
            className={cn(
              "p-4 rounded-lg border-l-4",
              tip.type === "good"
                ? "bg-green-50 border-l-green-400"
                : "bg-orange-50 border-l-orange-400"
            )}
          >
            <p
              className={cn(
                "text-sm",
                tip.type === "good" ? "text-green-800" : "text-orange-800"
              )}
            >
              {tip.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: DetailsProps) => {
  const sections = [
    {
      id: "tone-style",
      title: "Tone & Style",
      score: feedback.toneAndStyle.score,
      tips: feedback.toneAndStyle.tips,
    },
    {
      id: "content",
      title: "Content",
      score: feedback.content.score,
      tips: feedback.content.tips,
    },
    {
      id: "structure",
      title: "Structure",
      score: feedback.structure.score,
      tips: feedback.structure.tips,
    },
    {
      id: "skills",
      title: "Skills",
      score: feedback.skills.score,
      tips: feedback.skills.tips,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Accordion allowMultiple className="space-y-4">
        {sections.map((section) => (
          <AccordionItem
            key={section.id}
            id={section.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <AccordionHeader
              itemId={section.id}
              className="px-6 py-4 bg-gray-50 hover:bg-gray-100"
            >
              <CategoryHeader
                title={section.title}
                categoryScore={section.score}
              />
            </AccordionHeader>
            <AccordionContent itemId={section.id} className="px-6 py-4">
              <CategoryContent tips={section.tips} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Details;
