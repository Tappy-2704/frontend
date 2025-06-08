import React, { useEffect, useState } from "react";

const keys = [
  ["Esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Del"],
  ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "⌫"],
  ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
  ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
  ["Ctrl", "Alt", "Cmd", "space", "🐾", "Alt", "Ctrl"],
];

const GeezerM3KeyBoard = () => {
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
    <div className="bg-pink-100 rounded-[40px] p-6 max-w-4xl mx-auto shadow-lg border-4 border-pink-300 relative">
      {/* Ears */}
      <div className="absolute -top-6 -left-6 w-10 h-10 bg-pink-300 rounded-full rotate-45"></div>
      <div className="absolute -top-6 -right-6 w-10 h-10 bg-pink-300 rounded-full -rotate-45"></div>

      <div className="flex flex-col gap-3">
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 justify-center">
            {row.map((key, keyIndex) => {
              const isActive = key.toLowerCase() === pressedKey?.toLowerCase();
              const isSpace = key === "space";
              const isPaw = key === "🐾";

              return (
                <div
                  key={keyIndex}
                  className={`rounded-full text-center font-bold select-none shadow-md border border-pink-300
                  ${isSpace ? "w-[300px]" : isPaw ? "w-[60px]" : "w-[45px]"} 
                  ${isSpace ? "bg-white" : isPaw ? "bg-pink-200" : "bg-pink-50"} 
                  ${isActive ? "bg-pink-400 text-white" : "text-pink-900"} 
                  py-2 text-sm`}
                >
                  {isSpace ? "␣" : key}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeezerM3KeyBoard;
