import BasicKeyBoard from "@/components/keyboard/basic-keyboard";
import GeezerM3KeyBoard from "@/components/keyboard/geezer-m3-keyboard";
import M80KeyBoard from "@/components/keyboard/m80-keyboard";
import { IArticle } from "@/hooks/interfaces/lesson";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PracticeLessonView = () => {
  const location = useLocation();
  const lesson: IArticle = location?.state.lesson;

  console.log("lesson", lesson);

  const [currentText, setCurrentText] = useState(lesson?.en[0]);
  const [currentTextVN, setCurrentTextVn] = useState(lesson?.vn[0]);
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [errorIndex, setErrorIndex] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isComplete) return;

      const key = event.key === " " ? " " : event.key;
      const nextChar = currentText[typedText.length];

      // Xử lý gõ đúng
      if (errorIndex === null || typedText.length === errorIndex) {
        if (key === nextChar) {
          setTypedText((prev) => prev + key);
          setActiveKey(key);
          setErrorIndex(null);

          // Kiểm tra hoàn thành câu
          if (typedText.length + 1 === currentText.length) {
            const nextIndex = currentIndex + 1;
            if (nextIndex === lesson?.en.length) {
              setIsComplete(true);
              setShowPopup(true);
            } else {
              setCurrentIndex(nextIndex);
              setCurrentText(lesson?.en[nextIndex]);
              setCurrentTextVn(lesson?.vn[nextIndex]);
              setTypedText("");
              setAccuracy(100);
            }
          }
        } else {
          setErrorIndex(typedText.length);
        }

        const newAccuracy = Math.round(
          ((typedText.length + 1) / currentText.length) * 100
        );
        setAccuracy(newAccuracy);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [typedText, currentText, errorIndex, currentIndex, isComplete]);

  return (
    <div className=" bg-gray-100 flex flex-col items-center justify-center h-screen">
      <div className="flex flex-row w-full  h-full items-center">
        <div className="flex flex-col flex-1 justify-between h-[70%] gap-5 ">
          <div className="flex flex-row gap-4 ">
            <div className="flex flex-col flex-1 bg-white p-8 rounded-2xl shadow-lg ">
              <p className="text-2xl font-mono mb-8 text-center">
                {currentText.split("").map((char, index) => {
                  const typedChar = typedText[index] || "";
                  let className = "text-gray-300"; // Màu mờ cho chữ chưa gõ

                  if (typedChar === char)
                    className = "text-green-500"; // Đã gõ đúng
                  else if (index === errorIndex)
                    className = "text-red-500"; // Đã gõ sai
                  else if (index === typedText.length)
                    className = "text-blue-500 underline"; // Ký tự tiếp theo

                  return (
                    <span key={index} className={className}>
                      {char === " " && index === errorIndex ? "_" : char}
                    </span>
                  );
                })}
              </p>
              <p className="text-center text-lg">Accuracy: {accuracy}%</p>
            </div>
            <div className="flex  flex-1  bg-white p-8 rounded-2xl shadow-lg ">
              <p className="text-2xl font-mono mb-8 text-center">
                {currentTextVN}
              </p>
            </div>
          </div>
          {/* bàn phím */}
          <M80KeyBoard />
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md h-full w-[30%] ">
          <div
            className="text-gray-800 leading-relaxed max-h-[99%] overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: lesson.vocabulary }}
          />
        </div>
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Chúc mừng!</h2>
            <p className="text-lg">Bạn đã hoàn thành toàn bộ bài luyện tập!</p>
            <button
              onClick={() => {
                setShowPopup(false);
                setIsComplete(false);
                setCurrentIndex(0);
                setCurrentText(lesson?.en[0]);
                setCurrentTextVn(lesson?.vn[0]);
                setTypedText("");
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Luyện lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeLessonView;
