import Link from "next/link";
import ThemeButton from "./theme-button";
import { X } from "lucide-react";

interface MobileModalProps {
  theme: "light" | "dark";
  setShowModal: (cond: Boolean) => void;
  handleThemeChange: () => void;
}

export default function MobileModal({
  theme,
  setShowModal,
  handleThemeChange,
}: MobileModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-background p-6 shadow-lg rounded-lg text-primary flex flex-col justify-between items-center min-h-screen min-w-[50vh]">
        <div />
        <div className="flex flex-col items-center space-y-4">
          <div className="mb-8 font-semibold text-lg">Ziad Hesham</div>
          <Link href="/posts" className="text-primary hover:underline">
            Posts
          </Link>
          <Link href="/about" className="mb-8 text-primary hover:underline">
            About
          </Link>
          <ThemeButton theme={theme} onClick={handleThemeChange} />
        </div>
        <div className="cursor-pointer" onClick={() => setShowModal(false)}>
          <X className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );
}
