import { useEffect, useState } from "react";
import { getKalender } from "../fetch/api";
import { FiCalendar } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ListKalender() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [kalenderList, setKalenderList] = useState([]);
  const [filteredKalenderList, setFilteredKalenderList] = useState([]);

  // Generate dynamic years
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map(
    (year) => ({
      value: year,
      label: year,
    })
  );

  // Dynamic months array
  const months = [
    { value: 1, label: "Januari" },
    { value: 2, label: "Februari" },
    { value: 3, label: "Maret" },
    { value: 4, label: "April" },
    { value: 5, label: "Mei" },
    { value: 6, label: "Juni" },
    { value: 7, label: "Juli" },
    { value: 8, label: "Agustus" },
    { value: 9, label: "September" },
    { value: 10, label: "Oktober" },
    { value: 11, label: "November" },
    { value: 12, label: "Desember" },
  ];

  useEffect(() => {
    const fetchKalender = async () => {
      try {
        const dataKalender = await getKalender();
        setKalenderList(dataKalender);
        filterByYearAndMonth(dataKalender, selectedYear, selectedMonth);
      } catch (error) {
        console.log("Failed to fetch kalender data");
      }
    };

    fetchKalender();
  }, []);

  useEffect(() => {
    filterByYearAndMonth(kalenderList, selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth, kalenderList]);

  const filterByYearAndMonth = (data, year, month) => {
    const filteredData = data.filter((event) => {
      const startDate = new Date(event.tgl_event_mulai);
      const endDate = new Date(event.tgl_event_akhir);

      const startYear = startDate.getFullYear();
      const startMonth = startDate.getMonth() + 1;
      const endYear = endDate.getFullYear();
      const endMonth = endDate.getMonth() + 1;

      if (year >= startYear && year <= endYear) {
        if (month) {
          if (year === startYear && month < startMonth) return false;
          if (year === endYear && month > endMonth) return false;
          if (startMonth <= month && endMonth >= month) return true;
          return false;
        }
        return true;
      }
      return false;
    });

    setFilteredKalenderList(filteredData);
  };

  const sanitizeTitle = (title) => {
    return title
      .replace(/[^a-zA-Z\d\s]/g, "")
      .split(" ")
      .join("-")
      .toLowerCase();
  };

  const handleYearChange = (e) => {
    setSelectedYear(Number(e.target.value));
    setSelectedMonth(""); // Reset month selection when year is changed
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <h1 className="text-center font-bold text-gray-800 dark:text-gray-100 text-2xl mb-5">
        Daftar Kalender Event
      </h1>
      <div className="mb-6 flex space-x-4">
        <div className="w-1/2">
          <label
            htmlFor="yearFilter"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            Pilih Tahun:
          </label>
          <select
            id="yearFilter"
            value={selectedYear}
            onChange={handleYearChange}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 w-full"
          >
            {years.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/2">
          <label
            htmlFor="monthFilter"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            Pilih Bulan:
          </label>
          <select
            id="monthFilter"
            value={selectedMonth}
            onChange={handleMonthChange}
            disabled={!selectedYear} // Only enable if a year is selected
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 w-full"
          >
            <option value="">Semua Bulan</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col space-y-6">
        {filteredKalenderList.length > 0 ? (
          filteredKalenderList.map((event, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-blue-500"
            >
              <Link
                to={`/event/${sanitizeTitle(event.judul_kalender_event)}?id=${
                  event.id
                }`}
                className="text-lg font-semibold text-gray-800 dark:text-gray-100"
              >
                {event.judul_kalender_event}
              </Link>

              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <FiCalendar className="text-gray-700 dark:text-gray-300 mr-1" />
                {event.tgl_event_mulai} s/d {event.tgl_event_akhir} |
                <FaPencilAlt className="text-gray-700 dark:text-gray-300 text-xs ml-2 mr-1" />
                Oleh: {event.yg_bikin}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Tidak ada event yang terdaftar untuk tahun atau bulan ini.
          </p>
        )}
      </div>
    </div>
  );
}
