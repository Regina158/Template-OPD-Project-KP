import { useEffect, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getPengumuman, getPengumumanImageUrl } from "../fetch/api";

export default function DetailPengumuman() {
  const { id } = useParams();
  const [pengumuman, setPengumuman] = useState({});
  const [pengumumanLainnya, setPengumumanLainnya] = useState([]);

  useEffect(() => {
    const fetchDetailPengumuman = async () => {
      try {
        const dataPengumumanDetail = await getPengumuman();
        const selectedPengumuman = dataPengumumanDetail.find(
          (item) => item.id == id
        );
        setPengumuman(selectedPengumuman);

        const filteredPengumuman = dataPengumumanDetail
          .filter((item) => item.id !== id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setPengumumanLainnya(filteredPengumuman);
      } catch (error) {
        console.log("Failed to fetch pengumuman detail data");
      }
    };

    fetchDetailPengumuman();
  }, [id]);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <nav className="flex mt-8" aria-label="Breadcrumb">
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
                  className="rtl:rotate-180 w-3 h-3 text-gray-700 mx-1"
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
                  href="/pengumuman"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white ms-1 md:ms-2"
                >
                  Pengumuman
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-700 mx-1"
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
                  Detail Pengumuman
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-[70%]">
            <h1 className="text-3xl capitalize  font-bold text-gray-800 dark:text-gray-100">
              {pengumuman.judul_pengumuman}
            </h1>

            <div className="flex items-center mt-5">
              <FiCalendar className="text-gray-700 dark:text-gray-300" />
              <h1 className="ml-3 text-gray-700 dark:text-gray-300">
                {pengumuman.tanggal_terbit} s/d {pengumuman.tanggal_akhir}
              </h1>
            </div>

            <div className="mt-10">
              <h1 className="font-bold text-sm text-gray-800 dark:text-gray-100">
                {pengumuman.nunker}
              </h1>
            </div>

            <div className="mt-10 w-full sm:w-[90%]">
              <img
                src={getPengumumanImageUrl(pengumuman.gambar)}
                alt={pengumuman.judul_pengumuman}
                className="w-full h-full mb-10 mx-auto object-cover"
              />
              <p className="indent-10 text-justify text-gray-700 dark:text-gray-200">
                <div
                  dangerouslySetInnerHTML={{ __html: pengumuman.isi }}
                  className="leading-relaxed text-gray-800 dark:text-gray-400"
                />
              </p>
            </div>
          </div>

          <div className="w-full md:w-[30%]">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Pengumuman Lainnya
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {pengumumanLainnya.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
                >
                  <a href={`/pengumuman/${item.id}`}>
                    <img
                      src={getPengumumanImageUrl(item.gambar)}
                      alt={item.judul_pengumuman}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-2">
                        {item.judul_pengumuman}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {item.tanggal_terbit}
                      </span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a
                href="/pengumuman"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 font-semibold"
              >
                Lihat Selengkapnya...
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
