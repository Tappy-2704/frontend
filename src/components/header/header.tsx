import { NavLink } from "react-router-dom";

const Header = () => {
  const menuItems = [
    { label: "Lessons", path: "/lessons" },
    { label: "Tests", path: "/tests" },
    { label: "Games", path: "/games" },
  ];

  return (
    <div>
      <div className="px-[450px] flex justify-between items-center bg-gradient-to-b from-[#0b85bb] to-[#5cb5db] h-[150px]">
        <div>
          <span className="font-bold text-[30px] text-white">typing</span>
          <span className="text-white">.com</span>
        </div>

        <div className="text-white py-[8px] px-[23px] bg-[rgba(32,95,140,.5)] rounded-[7px] flex items-center gap-[15px]">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-2 border-b-[#ffcf46] font-bold"
                    : "no-underline"
                }
                
                hover:text-[#bcddf8]
                `
              }
            >
              {item.label}
            </NavLink>
          ))}
          <span className="">|</span>
          <span>Chính</span>
        </div>
      </div>
      <div className="h-[60px] border"></div>
    </div>
  );
};

export default Header;
