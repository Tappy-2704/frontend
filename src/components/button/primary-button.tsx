import { useDarkModeStore } from "@/zustand/useDarkModeStore";
import React from "react";
import HashLoader from "react-spinners/HashLoader";
interface Props {
  primary?: boolean;
  className?: string;
  text: string;
  size?: string;
  onClick?: () => void;
  sufixIcon?: React.ReactNode;
  prefixIcon?: React.ReactNode;
  isLoading?: boolean;
}

const PrimaryButton = ({
  primary,
  sufixIcon,
  prefixIcon,
  className,
  text,
  size,
  onClick,
  isLoading,
}: Props) => {
  const { isDarkStore } = useDarkModeStore();

  return (
    <div>
      {primary ? (
        <button
          type="submit"
          name={text}
          onClick={onClick}
          className={`flex flex-row justify-center items-center gap-3 px-6 py-4 rounded-[90px] bg-primary-blue  hover:bg-[#0d53f7] font-DM cursor-pointer ${className}`}
        >
          {prefixIcon}

          {isLoading ? (
            <div>
              {" "}
              <HashLoader
                color="#ffffff"
                loading={true}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <span className={` text-center  text-base  leading-4`}>{text}</span>
          )}
          {sufixIcon}
        </button>
      ) : (
        <button
          type="submit"
          name={text}
          onClick={onClick}
          className={`flex justify-center  items-center gap-3 px-6 py-4  border-1 ${isDarkStore ? "border-gray-700" : "border-gray-200"}  font-DM  rounded-full text-lg hover:bg-gray-400 transition cursor-pointer ${className}`}
        >
          {isLoading ? (
            <div>
              {" "}
              <HashLoader
                color="#ffffff"
                loading={true}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <span
              className={` text-center  text-base  leading-4 ${size}`}
            >
              {text}
            </span>
          )}
        </button>
      )}
    </div>
  );
};

export default PrimaryButton;
