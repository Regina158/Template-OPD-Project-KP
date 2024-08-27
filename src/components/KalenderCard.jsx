import { useState } from "react";

export default function KalenderCard() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState("Juni");

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const events = [
    {
      date: "15 July",
      time: "09:00 - 12:00",
      title: "Seleksi Magang di Dinas Pariwisata Kepri",
    },
    {
      date: "17 July",
      time: "09:00 - 14:00",
      title: "Hari Kemerdakaan NKRI",
    },
  ];

  const filteredEvents = events.filter((event) => event.date.includes("July"));

  return (
    <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-md font-semibold text-gray-800 dark:text-gray-100">
          Jadwal Tahun {selectedYear}
        </h2>
        <select
          className="border rounded-lg p-2 mt-4 md:mt-0 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {[2024, 2023, 2022].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap justify-between mb-6">
        {months.map((month) => (
          <button
            key={month}
            className={`font-semibold text-xs py-2 px-2 sm:py-4 sm:px-4 rounded-lg ${
              selectedMonth === month
                ? "bg-blue-500 text-white dark:bg-blue-600"
                : "text-gray-400 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
            onClick={() => setSelectedMonth(month)}
          >
            {month}
          </button>
        ))}
      </div>
      <div>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div key={index} className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center dark:bg-blue-600">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a4 4 0 10-8 0v2m5 4h-4m6 4H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-bold hover:text-blue-500 dark:hover:text-blue-400 text-slate-700 dark:text-gray-300">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1 dark:text-gray-500">
                  {event.date}, {event.time}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-center dark:text-gray-400">
              Tidak ada jadwal event atau agenda pada bulan {selectedMonth}{" "}
              {selectedYear}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
