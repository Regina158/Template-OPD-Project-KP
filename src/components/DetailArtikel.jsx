import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArtikel, getImageUrlArtikel } from "../fetch/api";

export default function DetailArtikel() {
  const { id } = useParams();
  const [artikelDetail, setArtikelDetail] = useState({});
  const [artikelLainnya, setArtikelLainnya] = useState([]);
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    const fetchDetailArtikel = async () => {
      try {
        const dataArtikelDetail = await getArtikel();
        setArtikelDetail(dataArtikelDetail.find((item) => item.id === id));

        const lainnya = dataArtikelDetail
          .filter((item) => item.id !== id)
          .slice(0, 3);
        setArtikelLainnya(lainnya);
      } catch (error) {
        console.log("Failed to fetch artikel detail data");
      }
    };

    fetchDetailArtikel();
  }, [id]);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300"
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
                  className="rtl:rotate-180 w-3 h-3 text-gray-700 dark:text-gray-300 mx-1"
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
                  href="/artikel"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 ms-1 md:ms-2"
                >
                  Artikel
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-700 dark:text-gray-300 mx-1"
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
                  Detail Artikel
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Konten Artikel di Kolom Utama */}
        <div className="lg:col-span-2">
          <h1 className="text-gray-800 dark:text-white font-bold text-4xl mb-5">
            {artikelDetail.judul_post}
          </h1>
          <h1 className="mb-5 text-gray-500 dark:text-gray-400 text-lg">
            {artikelDetail.tanggal_terbit} - Oleh {artikelDetail.penulis}
          </h1>

          <img
            src={getImageUrlArtikel(artikelDetail.post_gambar)}
            alt=""
            className="w-full h-auto mb-5 transition-transform transform hover:scale-105 duration-300 ease-in-out rounded-lg shadow-lg"
          />

          <div
            dangerouslySetInnerHTML={{
              __html: showFullContent
                ? artikelDetail.isi_post
                : artikelDetail.isi_post?.slice(0, 500),
            }}
            className="leading-relaxed text-gray-800 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md"
          />

          {artikelDetail.isi_post?.length > 500 && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="mt-4 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 font-semibold py-2 px-4 rounded-full transition-colors duration-300"
            >
              {showFullContent ? "Lihat Lebih Sedikit" : "Lihat Selengkapnya"}
            </button>
          )}
        </div>

        {/* Lihat Artikel Lainnya di Kolom Samping */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Lihat Artikel Lainnya
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {artikelLainnya.map((artikel) => (
              <Link
                to={`/artikel/${artikel.id}`}
                key={artikel.id}
                className="group"
              >
                <div className="p-4 border rounded-lg shadow-lg dark:border-gray-600 bg-white dark:bg-gray-800 transition-transform transform hover:scale-105 duration-300 ease-in-out">
                  <img
                    src={getImageUrlArtikel(artikel.post_gambar)}
                    alt=""
                    className="w-full h-48 object-cover rounded-lg mb-4 transition-transform transform group-hover:scale-110 duration-300 ease-in-out"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors duration-300">
                    {artikel.judul_post}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {artikel.tanggal_terbit} - Oleh {artikel.penulis}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
