import { useState } from "react";
import { Menu, X, MoveUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "../../../lib/utils";
import logo from "@/assets/images/fitness-app-logo.png";

const Navbar = () => {
  // Translation
  const { t } = useTranslation();

  // Locale from URL
  const { locale = "en" } = useParams();

  // State
  const [isOpen, setIsOpen] = useState(false);

  // Navbar links
  const links = ["home", "about", "classes", "healthy"];

  // Buttons
  const buttons = [
    { key: "login", variant: "filled" },
    { key: "signup", variant: "outline" },
  ];

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Generate path
  const getPath = (key: string) =>
    key === "home" ? `/${locale}/` : `/${locale}/${key}`;

  // Render NavLink
  const renderLink = (key: string, isMobile = false) => (
    <NavLink
      key={key}
      to={getPath(key)}
      end={key === "home"}
      onClick={() => setIsOpen(false)}
      className={({ isActive }) =>
        cn(
          "relative font-semibold px-3 py-2 transition-colors duration-300",
          isMobile ? "w-full text-center rounded-md" : "",
          isActive
            ? isMobile
              ? "bg-[#FF4100]/20 text-[#FF4100]"
              : "text-[#FF4100] after:w-full after:h-0.5 after:bg-[#FF4100] after:absolute after:left-0 after:bottom-0"
            : "text-gray-800 dark:text-gray-200 hover:text-orange-500 hover:bg-[#FF4100]/10"
        )
      }
    >
      {t(`navbar.${key}`)}
    </NavLink>
  );

  // Render Login / Register buttons
  const renderButton = (
    { key, variant }: { key: string; variant: string },
    isMobile = false
  ) => (
    <NavLink
      key={key}
      to={`/${locale}/${key === "login" ? "login" : "register"}`}
      onClick={() => setIsOpen(false)}
      className={cn("relative flex items-center", isMobile ? "w-full" : "w-auto")}
    >
      <Button
        className={cn(
          "w-full md:w-auto rounded-[6.25rem] py-2 px-6 font-semibold shadow-md transition-colors duration-300",
          variant === "filled"
            ? "bg-linear-to-r from-orange-500 to-red-500 text-white hover:from-red-500 hover:to-orange-500"
            : "border-2 border-[#FF4100] text-[#FF4100] hover:bg-linear-to-r hover:from-orange-500 hover:to-red-500 hover:text-white"
        )}
      >
        {t(`navbar.${key}`)}
      </Button>

      <div className="absolute -end-3 bg-[#FF4100] border-2 border-white rounded-full p-1">
        <MoveUpRight size={16} />
      </div>
    </NavLink>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-[#232424]/80 backdrop-blur-md shadow-lg transition-colors duration-500">
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <img src={logo} alt="Fitness App Logo" className="h-20 w-auto" />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex flex-1 justify-center space-x-8 items-center">
            {links.map((key) => renderLink(key))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-4">
            {buttons.map((btn) => renderButton(btn))}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden bg-white dark:bg-gray-800 px-4 pt-4 pb-4 transition-all duration-300 flex flex-col items-center space-y-4",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        {/* Mobile Links */}
        <div className="flex flex-col w-full space-y-2 items-center">
          {links.map((key) => renderLink(key, true))}
        </div>

        {/* Mobile Buttons */}
        <div className="flex flex-col w-full space-y-2 items-center px-8">
          {buttons.map((btn) => renderButton(btn, true))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
