import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { getArtikel, getImageUrlArtikel } from "../fetch/api";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

export default function Artikel() {
  const [artikel, setArtikel] = useState([]);
  const [page, setPage] = useState(1); // State untuk halaman saat ini
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6; // Tentukan jumlah item per halaman

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Inisialisasi AOS dengan durasi animasi 1000ms
  }, []);

  useEffect(() => {
    const fetchArtikel = async () => {
      try {
        const dataArtikel = await getArtikel();
        setArtikel(dataArtikel);
      } catch (error) {
        console.log("Failed to fetch artikel data");
      } finally {
        setLoading(false);
      }
    };

    fetchArtikel();
  }, []);

  const totalPages = Math.ceil(artikel.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const ArtikelYangDitampilkan = artikel.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-lg">Loading...</span>
      </div>
    );

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
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 dark:text-gray-300 mx-1"
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
                  Artikel
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div data-aos="fade-down">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {ArtikelYangDitampilkan.map((item) => (
              <Link
                to={`/artikel/${item.id}`}
                key={item.id}
                className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 dark:text-white"
              >
                <div className="relative pb-2/3">
                  <img
                    src={getImageUrlArtikel(item.post_gambar)}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="p-4 bg-white dark:bg-gray-900">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.judul_post}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.tanggal_terbit} Oleh {item.penulis}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Pagination
        count={totalPages}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  );
}
