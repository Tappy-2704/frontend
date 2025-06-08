import React, { useEffect, useState } from "react";

const keyboardRows = [
  ["😺", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "PRTS", "PAUSE", "DEL"],
  ["TAB", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "(", ")", "BACKSPACE"],
  ["CAPSLOCK", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "ENTER"],
  ["SHIFT", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "SHIFT", "PGUP"],
  ["CTRL", "ALT", "FN", "SPACE", "CTRL", "←", "↓", "↑", "→"]
];


function getKeyStyle(key: string, isActive: boolean) {
  const base =
    "rounded-full h-12 flex items-center justify-center font-bold text-sm shadow-md border border-gray-300 select-none transition-all duration-150";

  let keyStyle = "";

  if (key === "SPACE") keyStyle = `bg-[#F8B4AA] text-white w-[300px]`;
  else if (["ENTER", "SHIFT", "😺"].includes(key)) keyStyle = `bg-[#F8B4AA] text-white w-20`;
  else if (["BACKSPACE", "DEL", "PRTS", "PAUSE", "HOME", "PGUP", "←", "↓", "↑", "→"].includes(key)) {
    keyStyle = `bg-[#EFEAE7] text-[#BA9F91] w-16`;
  } else if (["CAPSLOCK", "TAB", "CTRL", "ALT", "FN"].includes(key)) {
    keyStyle = `bg-[#F1E7DD] text-[#A87C6B] w-16`;
  } else if (key.startsWith("F")) {
    keyStyle = `bg-[#E8D5C7] text-[#A87C6B] w-12`;
  } else {
    keyStyle = `bg-white text-[#BA9F91] w-12`;
  }

  if (isActive) {
    keyStyle = `bg-green-500 text-white ${keyStyle.replace(/bg-\[.*?\]|bg-\w+/, '')}`;
  }

  return `${keyStyle} ${base}`;
}


const M80KeyBoard = () => {
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      setPressedKey(key === " " ? "space" : key);
    };

    const handleKeyUp = () => setPressedKey(null);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return (
  <div className="bg-gradient-to-br from-pink-100 to-orange-100 p-6 rounded-3xl max-w-6xl mx-auto shadow-lg border border-pink-200">
    <div className="flex flex-col gap-3 items-center">
      {keyboardRows.map((row, i) => (
        <div key={i} className="flex gap-2 flex-wrap justify-center">
          {row.map((key, j) => {
            const isActive = key.toLowerCase() === pressedKey?.toLowerCase();
            return (
              <div key={j} className={getKeyStyle(key, isActive)}>
                {key === "SPACE" ? "␣" : key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  </div>
);

};

export default M80KeyBoard;
