import React from "react";

export default function Pagination({ count, page, onPageChange }) {
  const handlePageChange = (event, value) => {
    onPageChange(event, value);
  };

  return (
    <div className="flex flex-col items-center px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-center mb-4">
        <nav
          aria-label="Pagination"
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        >
          <button
            onClick={(e) => handlePageChange(e, page - 1)}
            disabled={page === 1}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 dark:ring-gray-600 dark:hover:bg-gray-700 dark:text-gray-400 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {Array.from({ length: count }, (_, i) => (
            <button
              key={i + 1}
              onClick={(e) => handlePageChange(e, i + 1)}
              aria-current={i + 1 === page ? "page" : undefined}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                i + 1 === page
                  ? "bg-indigo-600 text-white ring-indigo-600"
                  : "text-gray-900 dark:text-gray-100 ring-gray-300 dark:ring-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              } ring-1 ring-inset focus:z-20 focus:outline-offset-0`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={(e) => handlePageChange(e, page + 1)}
            disabled={page === count}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 dark:ring-gray-600 dark:hover:bg-gray-700 dark:text-gray-400 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </nav>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Showing <span className="font-medium">{(page - 1) * 5 + 1}</span> to{" "}
          <span className="font-medium">{Math.min(page * 5, 97)}</span>
        </p>
      </div>
    </div>
  );
}
