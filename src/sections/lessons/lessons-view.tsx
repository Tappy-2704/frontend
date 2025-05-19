import { Outlet, useLocation } from "react-router-dom";
import { MenuLearn } from "./components/learn/menuLearn";
import { MenuTyping } from "./components/typing/menuTyping";

const LessonsView = () => {
  const location = useLocation();

  return (
    <div className="mx-[450px]">
      <div className="flex">
        <div className="flex flex-col gap-5">
          {/* ------------Learn to Type--------------- */}

          <MenuLearn />

          {/* ------------Typing Practice--------------- */}

          <MenuTyping />
        </div>

        <div className="w-full h-auto bg-[#3295db] p-4 text-white rounded-md ml-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LessonsView;
