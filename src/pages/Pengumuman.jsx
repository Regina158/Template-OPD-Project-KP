import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Pagination from "../components/Pagination";
import PengumumanCard from "../components/PengumumanCard";
import { getPengumuman } from "../fetch/api";

export default function Pengumuman() {
  const [pengumuman, setPengumuman] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchPengumuman = async () => {
      try {
        const dataPengumuman = await getPengumuman();
        if (dataPengumuman && dataPengumuman.length > 0) {
          setPengumuman(dataPengumuman);
        } else {
          setPengumuman([]);
        }
      } catch (error) {
        setError("Failed to fetch pengumuman data.");
        console.error("Error fetching pengumuman:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPengumuman();
  }, []);

  const totalPages = Math.ceil(pengumuman.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const PengumumanYangDitampilkan = pengumuman.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
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
                  Pengumuman
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div data-aos="fade-down">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h1 className="font-bold text-gray-800 dark:text-gray-100 text-2xl mb-6">
            Pengumuman Resmi
          </h1>

          {PengumumanYangDitampilkan.length > 0 ? (
            PengumumanYangDitampilkan.map((item) => (
              <PengumumanCard key={item.id} item={item} />
            ))
          ) : (
            <div className="flex justify-center items-center h-48">
              <span className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                Tidak ada pengumuman yang tersedia.
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Pagination
          count={totalPages}
          page={page}
          onPageChange={handleChangePage}
        />
      </div>
    </>
  );
}
