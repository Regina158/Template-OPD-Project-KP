import { useEffect, useState } from "react";
import {
  getFooter,
  getPengumuman,
  getPengumumanImageUrl,

} from "../fetch/api";

export default function PengumumanHomePage() {
 
  const [pengumuman, setPengumuman] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [footer, setFooter] = useState([]);
  useEffect(() => {
    const fetchPengumuman = async () => {
      try {
        const dataPengumuman = await getPengumuman();
        if (dataPengumuman && dataPengumuman.length > 0) {
          setPengumuman(dataPengumuman.slice(0, 1)); // ambil 2 data pengumuman terbaru
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

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const dataFooter = await getFooter();

        setFooter(dataFooter);
      } catch (error) {
        console.log("Failed to fetch footer data");
      }
    };

    fetchFooter();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 pt-10 md:pt-0 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          {/* Kolom untuk Berita Terkini */}
          <div className="md:col-span-4 bg-gray-100 dark:bg-gray-800 shadow-md">
            <h1 className="font-bold mt-10 text-center text-gray-700 dark:text-gray-200 text-2xl md:text-3xl mb-4">
              Pengumuman Terkini
            </h1>
            <h1 className="font-semibold text-center text-gray-700 dark:text-gray-200">
              Lihat Pengumuman Resmi Dari {footer.nunker} Kota Tanjungpinang
            </h1>

            <div className="p-6">
              {pengumuman.length > 0 ? (
                pengumuman.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 flex bg-white dark:bg-gray-700 w-full  items-center border border-gray-500 rounded-md mb-5"
                  >
                    <div className="w-32 h-24 overflow-hidden rounded-lg">
                      <img
                        src={getPengumumanImageUrl(item.gambar)}
                        alt={item.judul_pengumuman}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-4 flex-1 overflow-hidden">
                      <a
                        href={`/pengumuman/${item.id}`}
                        className="font-bold hover:text-blue-500 dark:hover:text-blue-300 text-gray-700 dark:text-gray-200 block truncate"
                        style={{ maxWidth: "100%" }}
                      >
                        {item.judul_pengumuman}
                      </a>
                      <p className="text-gray-700 dark:text-gray-200 line-clamp-2 break-words">
                        {item.desk_singkat}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-48">
                  <span className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                    Tidak ada pengumuman yang tersedia.
                  </span>
                </div>
              )}
            </div>

            <div className="text-center mx-auto my-10">
              <a
                href="/pengumuman"
                className="inline-flex items-center px-4 py-2.5 font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm md:text-sm"
              >
                Lihat Pengumuman
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 ml-2"
                >
                  <path
                    d="M20 4L12 12M20 4V8.5M20 4H15.5M19 12.5V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.07989 5 7.2 5H11.5"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
}
