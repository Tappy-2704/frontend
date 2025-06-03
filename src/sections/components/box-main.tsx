import React from "react";

interface Props {
  children: React.ReactNode;
}
const BoxMain = ({ children }: Props) => {
  return (
    <div className="lg:mx-[50px] px-3 shadow-md rounded-md bg-[#f7f7f7] ">{children}</div>
  );
};

export default BoxMain;
