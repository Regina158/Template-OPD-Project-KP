import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { getKalender } from "../fetch/api";
import { Link } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";

export default function Kalender() {
  const [activeEvents, setActiveEvents] = useState([]);
  const [currentMonthEvents, setCurrentMonthEvents] = useState([]);

  useEffect(() => {
    const fetchKalender = async () => {
      try {
        const dataKalender = await getKalender();
        console.log(dataKalender);
        filterActiveEvents(dataKalender);
        filterCurrentMonthEvents(dataKalender);
      } catch (error) {
        console.log("Failed to fetch kalender data");
      }
    };

    fetchKalender();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const filterActiveEvents = (dataKalender) => {
    const currentDate = new Date();
    const filteredEvents = dataKalender.filter((event) => {
      const startDate = new Date(event.tgl_event_mulai);
      const endDate = new Date(event.tgl_event_akhir);
      return currentDate >= startDate && currentDate <= endDate;
    });
    setActiveEvents(filteredEvents);
  };

  const filterCurrentMonthEvents = (dataKalender) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const filteredEvents = dataKalender.filter((event) => {
      const eventDate = new Date(event.tgl_event_mulai);
      return (
        eventDate.getMonth() === currentMonth &&
        eventDate.getFullYear() === currentYear
      );
    });
    setCurrentMonthEvents(filteredEvents);
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-5">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                Home
              </a>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                  Kalender
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div data-aos="fade-down">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h1 className="text-center font-bold text-gray-800 dark:text-gray-100 text-2xl mb-5">
            Kalender
          </h1>

          {/* Grid dengan enam kolom */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
            {/* Kolom pertama, 4 kolom kiri */}
            <div className="lg:col-span-4">
              {/* Menampilkan event yang aktif */}
              {activeEvents.length > 0 ? (
                activeEvents.map((event, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 mb-6"
                  >
                    <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-5">
                      {event.judul_kalender_event}
                    </h2>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <FiCalendar className="text-gray-700 dark:text-gray-300 mr-1" />
                      {event.tanggal_event_mulai} s/d{" "}
                      {event.tanggal_event_akhir} |
                      <FaPencilAlt className="text-gray-700 dark:text-gray-300 text-xs ml-2 mr-1" />
                      Oleh: {event.yg_bikin}
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: event.ket_kalender_event,
                        }}
                      />
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-10 text-sm font-bold">
                      Unit Kerja: {event.nunker}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-300">
                  Tidak ada event yang aktif saat ini.
                </p>
              )}
            </div>

            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Card untuk Event yang sedang berlangsung */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-blue-500">
                <h2 className="relative block mb-2 text-md font-semibold text-white px-4 py-2 dark:text-gray-100 bg-blue-500 before:absolute before:top-0 before:bottom-0 before:right-0 before:w-0 before:h-0 before:border-y-[20px] before:border-y-transparent before:border-r-[20px] before:border-r-white">
                  Event Sedang Berlangsung
                </h2>

                {activeEvents.length > 0 ? (
                  <ol className="list-decimal list-inside space-y-2">
                    {activeEvents.map((event) => {
                      const sanitizedTitle = event.judul_kalender_event
                        .replace(/[^a-zA-Z\d\s]/g, "")
                        .split(" ")
                        .join("-")
                        .toLowerCase();
                      return (
                        <li
                          key={event.id}
                          className="relative flex items-center space-x-2 p-2 overflow-hidden group"
                        >
                          <span className="text-gray-600 dark:text-gray-300 text-sm">
                            {/* Display the number */}
                            {activeEvents.indexOf(event) + 1}.
                          </span>
                          <Link
                            to={`/kalendar_even/${sanitizedTitle}?id=${event.id}`}
                            className="relative w-full items-center justify-start px-3 py-2 font-semibold overflow-hidden group"
                          >
                            <span className="absolute inset-0 bg-blue-500 transition-transform duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left z-[-1]"></span>
                            <span className="relative text-gray-600 dark:text-gray-300 transition-colors duration-200 ease-in-out group-hover:text-white text-sm">
                              {event.judul_kalender_event}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ol>
                ) : (
                  <p className="text-gray-600 text-center font-semibold text-sm dark:text-gray-300">
                    Tidak ada event yang sedang berlangsung saat ini.
                  </p>
                )}
              </div>

              {/* Card untuk Event pada bulan ini */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-blue-500">
                <h2 className="relative mb-2 block text-md font-semibold text-white px-4 py-2 dark:text-gray-100 bg-blue-500 before:absolute before:top-0 before:bottom-0 before:right-0 before:w-0 before:h-0 before:border-y-[20px] before:border-y-transparent before:border-r-[20px] before:border-r-white">
                  Event pada Bulan Ini
                </h2>

                {currentMonthEvents.length > 0 ? (
                  <ol className="list-decimal list-inside space-y-2">
                    {currentMonthEvents.map((event) => {
                      const sanitizedTitle = event.judul_kalender_event
                        .replace(/[^a-zA-Z\d\s]/g, "")
                        .split(" ")
                        .join("-")
                        .toLowerCase();
                      return (
                        <li
                          key={event.id}
                          className="relative flex items-center space-x-2 overflow-hidden group"
                        >
                          <span className="text-gray-600 dark:text-gray-300 text-sm">
                            {/* Display the number */}
                            {currentMonthEvents.indexOf(event) + 1}.
                          </span>
                          <a
                            href={`/kalendar_even/${sanitizedTitle}?id=${event.id}`}
                            className="relative w-full items-center justify-start px-3 py-2 font-semibold overflow-hidden group"
                          >
                            <span className="absolute inset-0 bg-blue-500 transition-transform duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
                            <span className="relative text-gray-600 dark:text-gray-300 transition-colors duration-200 ease-in-out group-hover:text-white text-sm">
                              {event.judul_kalender_event}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ol>
                ) : (
                  <p className="text-gray-600  font-semibold dark:text-gray-300">
                    Tidak ada event pada bulan ini.
                  </p>
                )}
              </div>

              {/* Card untuk tautan ke daftar kalender event */}
              <div className="bg-white dark:bg-gray-800 p-6 text-center rounded-lg  border-2 border-blue-500">
                <Link
                  to="/list/kalender_even"
                  className="text-gray-800 hover:bg-blue-500 hover:text-white hover:py-2 hover:px-4 hover:transform hover:transition-all hover:duration-300 hover:ease-in-out  dark:text-gray-300 text-sm hover:underline font-semibold"
                >
                  Lihat Daftar Kalender Event
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
