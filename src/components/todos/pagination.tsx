"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="pagination-container">
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
        className="neobrutal-button hover-pop disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>

      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <div className="px-3 py-2 text-gray-500">
                <MoreHorizontal className="h-4 w-4" />
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => onPageChange(page as number)}
                className={`neobrutal-button hover-pop min-w-[40px] ${
                  currentPage === page
                    ? "bg-[hsl(var(--accent-medium))] text-black"
                    : "bg-white text-black"
                }`}
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="neobrutal-button hover-pop disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}
