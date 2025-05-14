import { Link, Outlet, useLocation } from "react-router-dom";

const LessonsView = () => {
  const location = useLocation();

  const buttons = [
    { label: "Beginner", path: "beginner" },
    { label: "Intermediate", path: "intermediate" },
    { label: "Advanced", path: "advanced" },
  ];

  return (
    <div className="mx-[450px]">
      <div className="flex">
        <div className="border p-3 relative">
          <div className="flex flex-col min-w-[200px]">
            <span className="font-bold p-2 text-[#4a4a4a] text-[14px]">
              Learn to Type
            </span>
            <div className="flex flex-col rounded-md shadow-lg border overflow-hidden">
              {buttons.map((btn) => {
                const isActive = location.pathname.endsWith(btn.path);

                return (
                  <Link
                    key={btn.path}
                    to={btn.path}
                    className={` flex items-center justify-between px-4 py-3 border-b last:border-b-0
  ${isActive ? "bg-[#3295db] text-white font-bold" : "bg-white hover:bg-[#d6eaf8]"}
  ${isActive ? "" : "text-[#4a4a4a]"}`}
                  >
                    <span>{btn.label}</span>
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

                    {isActive && (
                      <div className="absolute right-[-10px] z-999 top-0 h-[40px] w-[30px] bg-[#bd7439] rounded-r-md" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border w-full bg-[#3295db] p-4 text-white rounded-md ml-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LessonsView;
