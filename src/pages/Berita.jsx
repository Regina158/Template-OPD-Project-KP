import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import { getBerita, getImageUrl } from "../fetch/api";
import { FaEye } from "react-icons/fa";

export default function Berita() {
  const [page, setPage] = useState(1);
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Inisialisasi AOS dengan durasi animasi 1000ms
  }, []);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const dataBerita = await getBerita();
        setBerita(dataBerita);
      } catch (error) {
        console.log("Failed to fetch berita data");
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  const totalPages = Math.ceil(berita.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const BeritaYangdiTampilkan = berita.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const beritaPopuler = [...berita]
    .sort((a, b) => b.jum_klik - a.jum_klik)
    .slice(0, 5);

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
                className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Home
              </a>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 dark:text-gray-600 mx-1"
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
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Berita
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="col-span-2">
              <ul className="grid grid-cols-1 gap-y-10 gap-x-6 items-start">
                {BeritaYangdiTampilkan.map((item) => {
                  const imageUrl = getImageUrl(item.post_gambar, item.isi_post);

                  return (
                    <li
                      key={item.id}
                      className="shadow-md border rounded-md p-6 flex flex-col sm:flex-row items-center sm:items-center max-w-full"
                      data-aos="fade-right"
                    >
                      <div
                        className={`order-1 ${
                          imageUrl ? "sm:ml-6" : ""
                        } w-full ${
                          imageUrl
                            ? "sm:w-auto sm:max-w-[60%]"
                            : "sm:max-w-full"
                        } pr-8`}
                      >
                        <Link to={`/berita/${item.id}`}>
                          <h3 className="mb-1 mt-3 md:mt-0 text-slate-900 font-semibold dark:text-white overflow-hidden overflow-ellipsis">
                            {item.judul_post}
                          </h3>
                        </Link>
                        <div className="prose prose-slate prose-sm text-slate-600 dark:text-slate-400">
                          <p className="text-sm overflow-hidden overflow-ellipsis line-clamp-3">
                            {item.isi}
                          </p>
                        </div>
                        <Link
                          to={`/berita/${item.id}`}
                          className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-400 mt-6"
                        >
                          Baca Berita
                          <span className="sr-only">
                            , Completely unstyled, fully accessible UI
                            components
                          </span>
                          <svg
                            className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400"
                            width="3"
                            height="6"
                            viewBox="0 0 3 6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M0 0L3 3L0 6"></path>
                          </svg>
                        </Link>
                      </div>
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt=""
                          className="shadow-md rounded-lg w-full sm:w-[30%] h-auto sm:mb-0 mt-6 sm:mt-0 max-w-full"
                          width="1216"
                          height="640"
                          data-aos="fade-left"
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="col-span-1" data-aos="fade-left">
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
                Berita Populer
              </h2>
              <ul className="space-y-4">
                {beritaPopuler.map((item, index) => (
                  <li
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-white dark:bg-slate-800 rounded-md shadow"
                    data-aos="fade-up"
                  >
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      {index + 1}
                    </span>
                    <div>
                      <Link
                        to={`/berita/${item.id}`}
                        className="text-sm font-medium text-slate-900 dark:text-white"
                      >
                        {item.judul_post}
                      </Link>
                      <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center">
                        <FaEye className="mr-1" /> {item.jum_klik}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
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
