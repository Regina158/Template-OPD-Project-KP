import { useEffect, useState } from "react";
import ImageCard from "../components/ImageCard";
import {
  getGallery,
  getFooter,
  getPengumuman,
  getPengumumanImageUrl,
} from "../fetch/api";

export default function GalleryCard() {
  const [gallery, setGallery] = useState([]);
  const [pengumuman, setPengumuman] = useState([]);
  const [footer, setFooter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const dataGallery = await getGallery();
        setGallery(dataGallery.slice(0, 4)); // Ambil 4 album pertama
      } catch (error) {
        console.log("Failed to fetch Gallery data");
      }
    };

    fetchGallery();
  }, []);

  useEffect(() => {
    const fetchPengumuman = async () => {
      try {
        const dataPengumuman = await getPengumuman();
        setPengumuman(dataPengumuman.slice(0, 3)); // ambil 3 data pengumuman terbaru
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
    <div className="container mx-auto px-4 pt-10 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gallery Section */}
        <div className="bg-gray-100 dark:bg-gray-800 shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-bold text-gray-900 dark:text-gray-100 text-2xl">
              Gallery
            </h1>
            <a
              href="/gallery"
              className="inline-flex items-center px-3 py-1.5 font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-full text-xs"
            >
              Lihat Semua Gallery
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 ml-1"
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
          <div className="mt-4 grid grid-cols-2 gap-4">
            {gallery.map((item) => (
              <ImageCard
                key={item.id}
                id={item.id}
                imageUrl={item.gambar}
                title={item.judul_album}
                isiPost={item.ket_album}
                tanggalUpload={item.tanggal_terbit}
                className="w-full h-full" // Sesuaikan card menjadi w-full dan h-full
                style={{ maxWidth: "300px", height: "auto" }} // Mengatur proporsi gambar
              />
            ))}
          </div>
        </div>

        {/* Pengumuman Section */}
        <div className="bg-gray-100 dark:bg-gray-800 shadow-md p-4">
          <div className="mb-4">
            <h1 className="font-bold text-center text-gray-700 dark:text-gray-200 text-2xl md:text-3xl">
              Pengumuman Terkini
            </h1>
            <h2 className="font-semibold text-center text-gray-700 dark:text-gray-200">
              Lihat Pengumuman Resmi Dari {footer.nunker} Kota Tanjungpinang
            </h2>
          </div>
          <div className="p-4">
            {pengumuman.length > 0 ? (
              pengumuman.map((item) => (
                <div
                  key={item.id}
                  className="p-4 flex bg-white dark:bg-gray-700  border border-gray-500 rounded-md mb-5"
                >
                  <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg ">
                    <img
                      src={getPengumumanImageUrl(item.gambar)}
                      alt={item.judul_pengumuman}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="ml-4 flex-1 overflow-hidden ">
                    <a
                      href={`/pengumuman/${item.id}`}
                      className="font-bold capitalize hover:text-blue-500 text-justify dark:hover:text-blue-300 text-gray-700 dark:text-gray-200 block truncate"
                    >
                      {item.judul_pengumuman}
                    </a>
                    <p className="text-gray-700 dark:text-gray-200 text-justify line-clamp-2 break-words mt-2">
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
          <div className="text-center mt-10">
            <a
              href="/pengumuman"
              className="inline-flex items-center px-4 py-2.5 font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm"
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
  );
}
