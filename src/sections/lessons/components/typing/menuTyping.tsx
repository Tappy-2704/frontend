import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const MenuTyping = () => {
  const [open, setOpen] = useState({
    collaps: false,
  });

  const buttons2 = [
    { label: "Reinforcement", path: "reinforcement" },
    { label: "Stories", path: "stories" },
  ];
  return (
    <div>
      <button
        onClick={() =>
          setOpen((prev) => ({
            ...prev,
            collaps: !prev.collaps,
          }))
        }
        className="flex items-center justify-between w-full pl-4 pr-7"
      >
        <span className="font-bold p-2 text-[#4a4a4a] text-[14px] block">
          Typing Practice
        </span>
        <div className="border p-1 rounded-full">
          <Plus className="w-4 h-4" />
        </div>
      </button>
      {open.collaps &&
        buttons2.map((btn, index) => {
          const isActive = location.pathname.endsWith(btn.path);
          const isFirst = index === 0;
          const isLast = index === buttons2.length - 1;

          return (
            <div key={btn.path} className="relative min-w-[250px]">
              <div className="">
                <div className="relative z-10 text-black shadow-md mx-3 bg-white">
                  <Link
                    to={btn.path}
                    className={`relative z-10 px-4 py-3 border flex justify-between items-center font-bold
                ${
                  isActive
                    ? "text-white font-bold bg-[#3295db] border-0 rounded-none"
                    : `text-[#4a4a4a] hover:bg-[#f0f0f0] ${
                        isFirst ? "rounded-t-md" : ""
                      } ${isLast ? "rounded-b-md" : ""}`
                }
              `}
                  >
                    {btn.label}
                    <div
                      className={`w-[25px] h-[25px] flex items-center justify-center rounded-md
                  ${isActive ? "bg-[#f4c542]" : "bg-[#bcddf8]"}`}
                    >
                      <div
                        className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px]
                    ${isActive ? "border-t-white" : "border-t-white opacity-70"}
                    -rotate-90`}
                      />
                    </div>
                  </Link>
                </div>

                <div
                  className={`absolute top-0 left-0 w-full h-full z-0 p-3
              ${isActive ? "bg-[#3295db]" : "bg-white"} rounded-l-md`}
                ></div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
