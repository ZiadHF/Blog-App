"use client";
import { useTheme } from "@/contexts/ThemeContext";
import { Tally4 } from "lucide-react";
import { useState } from "react";
import ThemeButton from "./theme-button";
import Link from "next/link";
import MobileModal from "./mobile-modal";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="flex relative items-center justify-between mb-8 py-9">
      {showModal && (
        <MobileModal
          theme={theme}
          setShowModal={setShowModal}
          handleThemeChange={handleThemeChange}
        />
      )}
      <Link href="/posts">
        <h1 className="font-semibold text-primary hover:scale-110 duration-300 ease-in-out">THE BLOG</h1>
      </Link>
      <div className="hidden md:flex items-start">
        <Link href="/posts" className="mr-4 text-primary hover:underline">
          Posts
        </Link>
        <Link href="/about" className="mr-4 text-primary hover:underline">
          About
        </Link>
        <ThemeButton theme={theme} onClick={handleThemeChange} />
      </div>
      <div className="md:hidden rotate-90">
        <Tally4
          className="w-6 h-6 cursor-pointer"
          onClick={() => setShowModal(!showModal)}
        />
      </div>
    </header>
  );
}
