import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination"; // Sesuaikan jalur impor sesuai kebutuhan
import { getDownloadArea } from "../fetch/api";

export default function DownloadArea() {
  const [downloadArea, setDownloadArea] = useState([]);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Inisialisasi AOS dengan durasi animasi 1000ms
  }, []);
  useEffect(() => {
    const fetchDownloadArea = async () => {
      try {
        const dataDownloadArea = await getDownloadArea();
        // console.log(dataDownloadArea);
        setDownloadArea(dataDownloadArea);
      } catch (error) {
        console.log("Failed to fetch download area data");
      } finally {
        setLoading(false);
      }
    };

    fetchDownloadArea();
  }, []);

  const filteredData = downloadArea.filter((item) =>
    item.nama_file.toLowerCase().includes(search.toLowerCase())
  );

  const pageCount = Math.ceil(filteredData.length / pageSize);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const displayData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) {
    return <p>Loading...</p>;
  }

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
                  Download Area
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div data-aos="fade-down">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h1 className="text-2xl font-bold mb-4">Download Area</h1>
          <div className="flex justify-between mb-4">
            <div>
              <label className="mr-2 text-gray-700 dark:text-gray-300">
                Search:
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-2 py-1 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="mr-2 text-gray-700 dark:text-gray-300">
                Page Size:
              </label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="border px-2 py-1 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light text-gray-900 dark:text-white">
                  <thead className="border-b border-neutral-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Nama File
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Deskripsi
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Jenis File
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Kategori
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Format
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Tanggal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayData.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-neutral-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                      >
                        <td className="px-6 py-4 font-medium max-w-xs break-words">
                          {item.nama_file}
                        </td>
                        <td className="px-6 py-4 break-words max-w-2xl">
                          {item.deskripsi_file}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.jenis_file}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.kategori_dip}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <Link
                            target="_blank"
                            to={`${
                              import.meta.env.VITE_APP_LINK_API
                            }/api/getDownloadArea/${
                              import.meta.env.VITE_APP_API_URL_APP_OPD_ID
                            }/${item.guid}`}
                            className="text-blue-500 underline"
                          >
                            {item.format_file}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.tanggal_file}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing{" "}
              {Math.min((currentPage - 1) * pageSize + 1, filteredData.length)}{" "}
              to {Math.min(currentPage * pageSize, filteredData.length)} of{" "}
              {filteredData.length} entries
            </p>
            <Pagination
              count={pageCount}
              page={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
