import { MoonIcon, SunIcon } from "lucide-react";

interface ThemeButtonProps {
  theme: "light" | "dark";
  onClick: () => void;
}

export default function ThemeButton({ theme, onClick }: ThemeButtonProps) {
  return (
    <div
      onClick={onClick}
      className="rounded-full w-18 px-2 py-1 justify-between flex bg-primary border cursor-pointer"
    >
      <span
        className={`text-sm transition-transform text-background duration-300 ease-in-out ${
          theme === "dark" ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {theme === "light" ? (
          <SunIcon className="size-5" />
        ) : (
          <MoonIcon className="size-5" />
        )}
      </span>
      <div
        className={`rounded-full transition-all duration-300 size-5 bg-background ${
          theme === "light" ? "translate-x-0" : "-translate-x-8"
        }`}
      />
    </div>
  );
}
