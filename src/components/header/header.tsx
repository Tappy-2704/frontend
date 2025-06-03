import { useRouter } from "@/routes/hooks/use-router";
import { NavLink } from "react-router-dom";

const Header = () => {
  const router = useRouter();
  const menuItems = [
    { label: "Lessons", path: "/lessons" },
    { label: "Tests", path: "/tests" },
    { label: "Games", path: "/games" },
  ];

  return (
    <div>
      <header className="bg-gradient-to-b from-[#a5e780] to-[#58cc02] py-4 px-6 md:px-12 lg:px-[150px] transition-all duration-300 ease-in-out">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          {/* Logo */}
          <div className="text-center md:text-left">
            <span className="font-bold text-3xl text-white">typing</span>
            <span className="text-white text-xl">.com</span>
          </div>

          {/* Navigation */}
          <nav className="bg-[rgba(32,95,140,.5)] text-white py-2 px-4 md:py-[8px] md:px-[23px] rounded-[7px] flex flex-wrap justify-center items-center gap-4 text-sm md:text-base transition-all duration-300 ease-in-out">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-b-2 border-[#ffcf46] font-bold"
                      : "no-underline"
                  } hover:text-[#bcddf8] transition-colors duration-200`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Divider and Button */}
            <span className="hidden md:inline-block">|</span>

            <button
              onClick={() => router.push("/signUp")}
              className="hover:text-[#bcddf8] transition-colors duration-200"
            >
              Chính
            </button>
          </nav>
        </div>
      </header>

      {/* Bottom border line */}
      <div className="h-[40px] md:h-[60px] border-t border-gray-200"></div>
    </div>
  );
};

export default Header;
