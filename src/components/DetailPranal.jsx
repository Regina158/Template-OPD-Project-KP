import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Pagination from "./Pagination"; // Adjust the import path if necessary
import {
  getPranalAplikasi,
  getPranalInternal,
  getPranalExternal,
} from "../fetch/api";

export default function DetailPranal() {
  const location = useLocation();
  const type = location.pathname.split("/").pop(); // Get the last segment of the path

  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let pranalData;
        switch (type) {
          case "external":
            pranalData = await getPranalExternal();
            break;
          case "internal":
            pranalData = await getPranalInternal();
            break;
          case "aplikasi":
          default:
            pranalData = await getPranalAplikasi();
            break;
        }
        setData(pranalData);
      } catch (error) {
        console.log("Failed to fetch pranal data");
      } finally {
        setLoading(false);
      }
    };

    if (type) {
      fetchData();
    }
  }, [type]);

  const filteredData = data.filter((item) =>
    item.nama_pranala.toLowerCase().includes(search.toLowerCase())
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-5 ">
      <div className="flex flex-col">
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
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Nama Pranal
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Alamat Pranal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-neutral-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {(currentPage - 1) * pageSize + index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.nama_pranala}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <a
                          href={item.alamat_pranala_http}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 dark:text-blue-300"
                        >
                          {item.alamat_pranala}
                        </a>
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
            {Math.min((currentPage - 1) * pageSize + 1, filteredData.length)} to{" "}
            {Math.min(currentPage * pageSize, filteredData.length)} of{" "}
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
  );
}
