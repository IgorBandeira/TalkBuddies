import { Link } from "react-router-dom";
import { LogOut, FilePen } from "lucide-react";
import { useState, useEffect } from "react";
import "../index.css";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHorizontal, setIsHorizontal] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 574);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  useEffect(() => {
    const checkIsHorizontal = () => {
      setIsHorizontal(window.innerHeight < 574);
    };

    checkIsHorizontal();

    window.addEventListener("resize", checkIsHorizontal);

    return () => {
      window.removeEventListener("resize", checkIsHorizontal);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-b from-blue-400 to-purple-950 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img
            src="/assets/TalkBuddies_navbar.png"
            alt="TalkBuddies"
            className={`mr-4 ${
              isMobile ? "w-32" : isHorizontal ? "w-20" : "w-40"
            }`}
          />
        </Link>

        <ul id="navbar_text" className="flex space-x-4 text-white">
          <li
            className={`flex items-center ${isMobile ? "mr-4" : "mr-8"} ${
              isMobile ? "text-sm" : isHorizontal ? "text-xs" : ""
            }`}
          >
            <Link to="/signup" className="flex items-center">
              <FilePen className="mr-1" />
              Cadastrar
            </Link>
          </li>
          <li
            className={`flex items-center ${
              isMobile ? "text-sm" : isHorizontal ? "text-xs" : ""
            }`}
          >
            <Link to="/" className="flex items-center">
              <LogOut className="mr-1" />
              Sair
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
