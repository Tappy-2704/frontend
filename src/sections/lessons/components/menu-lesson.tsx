import { useCategory, useTopic } from "@/hooks/actions/useLesson";
import { useEffect, useMemo, useState } from "react";

interface Props {
  onCat: (value: string) => void;
}

export const MenuLesson = ({ onCat }: Props) => {
  const { topic } = useTopic();
  const { categories } = useCategory();
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [isActived, setActived] = useState("");

  const results = useMemo(() => {
    if (!topic || !categories) return [];
    return topic.results.map((t) => ({
      ...t,
      children: categories.results.filter((c) => c.topicId._id === t._id),
    }));
  }, [topic, categories]);

  useEffect(() => {
    if (
      results &&
      results.length > 0 &&
      results[0].children &&
      results[0].children.length > 0
    ) {
      setActived(results[0].children[0]._id);
    }
  }, [results]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopic((prev) => (prev === topicId ? null : topicId));
  };

  return (
    <div className="space-y-4">
      {results.map((tp) => {
        const isExpanded = expandedTopic === tp._id;
        return (
          <div key={tp._id} className="min-w-60">
            <div
              className="flex justify-between items-center px-4 py-2 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors rounded-md"
              onClick={() => toggleTopic(tp._id)}
            >
              <span className="font-semibold text-gray-800 text-sm">
                {tp.title}
              </span>
              <span
                className={`transition-transform duration-300 text-xl ${
                  isExpanded ? "rotate-45" : "rotate-0"
                }`}
              >
                +
              </span>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? "max-h-[1000px] mt-2" : "max-h-0"
              }`}
            >
              <div className="flex flex-col gap-2">
                {tp.children.map((cat) => {
                  const active = isActived === cat._id;
                  return (
                    <div
                      key={cat._id}
                      onClick={() => {
                        onCat(cat._id);
                        setActived(cat._id);
                      }}
                      className={`relative group mx-3 px-4 py-3 rounded-md border shadow-sm font-medium cursor-pointer transition-all duration-300 flex justify-between items-center
                      ${
                        active
                          ? "bg-[#58cc02] text-white border-transparent"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span>{cat.title}</span>
                      <div
                        className={`w-[25px] h-[25px] rounded-md flex items-center justify-center transition-all duration-300 ${
                          active ? "bg-[#f4c542]" : "bg-[#a5e780]"
                        }`}
                      >
                        <div
                          className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px]
                          ${active ? "border-t-white" : "border-t-white opacity-70"}
                          -rotate-90`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
