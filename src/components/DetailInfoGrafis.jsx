import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDetailInfoGrafis } from "../fetch/api";

export default function DetailInfoGrafis() {
  const { id } = useParams();
  const [detailInfografis, setDetailInfografis] = useState([]);

  useEffect(() => {
    const fetchDetailInfografis = async () => {
      try {
        const dataDetailInfografis = await getDetailInfoGrafis(id);
        setDetailInfografis(dataDetailInfografis);
      } catch (error) {
        console.log("Failed to fetch infografis data", error);
      }
    };

    fetchDetailInfografis();
  }, [id]);

  if (!detailInfografis.length) return <p>Loading...</p>;

  const baseURL = import.meta.env.VITE_APP_LINK_API;
  const apiURLAppId = import.meta.env.VITE_APP_OPD_ID;

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-700 mx-1 dark:text-gray-300"
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
                <a
                  href="/infografis/"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white ms-1 md:ms-2"
                >
                  Infografis
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-700 mx-1 dark:text-gray-300"
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
                <span className="text-sm font-medium text-gray-700 dark:text-gray-400 ms-1 md:ms-2">
                  Detail Infografis
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {detailInfografis.map((item) => (
            <Link
              to={`${baseURL}/api/getDownloadInfografis/${apiURLAppId}/${item.guid}`}
              key={item.id}
              target="_blank"
              className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={`${baseURL}/image/posting/infografis/${apiURLAppId}/small/small_${item.guid}`}
                alt={item.judul}
                className="h-80 w-full object-cover rounded-t-lg"
              />
              <div className="px-4 py-3 w-full">
                <p className="text-lg font-bold text-black dark:text-gray-200 truncate block capitalize">
                  {item.judul}
                </p>
                <span className="text-gray-400 dark:text-gray-600 mr-3 uppercase text-xs">
                  {item.tanggal_terbit}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
