import React from "react";
import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: any) => void;
  isLoading?: boolean;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
}

interface PageNavigationButtonProps {
  text: number | string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  icon: LucideIcon;
}

interface PageButtonProps {
  text: number | string;
  onClick: () => void;
  isCurrent?: boolean;
  isLoading?: boolean;
}

const PageNavigationButton = ({
  text,
  onClick,
  disabled = false,
  isLoading = false,
  icon: Icon,
}: PageNavigationButtonProps) => (
  <button
    onClick={onClick}
    className="px-3 py-2 text-sm font-medium rounded-lg flex gap-2 items-center bg-primary cursor-pointer text-background not-disabled:hover:bg-primary/70 transition-colors disabled:opacity-50 disabled:cursor-default"
    disabled={disabled || isLoading}
  >
    <Icon className="w-4 h-4" />
    {text}
  </button>
);

const PageButton = ({
  text,
  onClick,
  isCurrent = false,
  isLoading = false,
}: PageButtonProps) => (
  <button
    onClick={onClick}
    className={`
      px-3 py-2 text-sm font-medium rounded-lg transition-colors
      ${
        isCurrent ? "bg-primary text-background" : "text-primary/50 not-disabled:hover:bg-primary/60 not-disabled:hover:text-background cursor-pointer disabled:cursor-default "
      }`}
    disabled={isLoading || text === "..."}
  >
    {text}
  </button>
);

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  maxVisiblePages = 5,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const half = Math.floor(maxVisiblePages / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
      end = Math.min(totalPages, maxVisiblePages);
    }
    if (currentPage > totalPages - half) {
      start = Math.max(1, totalPages - maxVisiblePages + 1);
    }
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      className="flex items-center justify-between border-t border-primary/30 pt-6"
      aria-label="Pagination"
    >
      <PageNavigationButton
        text="Previous"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        isLoading={isLoading}
        icon={ChevronLeft}
      />

      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => (
          <PageButton
          text={page}
          key={index}
          onClick={() => onPageChange(page)}
          isCurrent={page === currentPage}
          isLoading={isLoading}
          />
        ))}
      </div>

      <PageNavigationButton
        text="Next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        isLoading={isLoading}
        icon={ChevronRight}
      />
    </nav>
  );
}
