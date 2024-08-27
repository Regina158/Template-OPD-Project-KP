import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiCalendar, FiEye } from "react-icons/fi";
import { FaLayerGroup, FaTags } from "react-icons/fa";
import { getBerita } from "../fetch/api";
import AOS from "aos";
import "aos/dist/aos.css";

export default function DetailBerita() {
  const { id } = useParams();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredBerita, setFilteredBerita] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchBerita = async () => {
      try {
        const dataBerita = await getBerita();
        const selectedBerita = dataBerita.find((item) => item.id === id);
        setBerita(selectedBerita);
        setFilteredBerita(dataBerita);
      } catch (error) {
        console.log("Failed to fetch berita data by id");
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, [id]);

  const getBeritaLainnya = () => {
    return filteredBerita
      .filter((item) => item.id !== id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  };

  const getImageUrl = (postGambar) => {
    return postGambar
      ? `${import.meta.env.VITE_APP_LINK_API}/image/posting/berita/${
          import.meta.env.VITE_APP_OPD_ID
        }/original/${postGambar}`
      : null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  if (!berita) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-lg">Berita tidak ditemukan</span>
      </div>
    );
  }

  const ImageBeritaById = getImageUrl(berita.post_gambar);

  return (
    <>
       <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <nav className="flex mt-10" aria-label="Breadcrumb">
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
                  href="/berita"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white ms-1 md:ms-2"
                >
                  Berita
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
                  {berita.judul_post}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className="flex mt-10"
          aria-label="Breadcrumb"
          data-aos="fade-down"
        >
          {/* Breadcrumb code here */}
        </nav>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1" data-aos="fade-up">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {berita.judul_post}
            </h1>
            <div className="flex items-center my-5">
              <FiCalendar className="text-gray-700 dark:text-gray-300" />
              <h2 className="ml-3 text-gray-700 dark:text-gray-300">
                {berita.tanggal_terbit} Oleh {berita.yg_ngubah}
              </h2>
              <div className="flex items-center text-gray-700 dark:text-gray-300 ml-4">
                <FiEye className="mr-2" />
                <span>{berita.jum_klik} views</span>
              </div>
            </div>
            {ImageBeritaById && (
              <img
                src={ImageBeritaById}
                alt={berita.judul_post}
                className="w-full h-[430px] object-cover mb-6 rounded-lg shadow-lg mx-auto"
                style={{ objectFit: "cover" }}
                data-aos="zoom-in"
              />
            )}
            <div className="w-full">
  <div
    dangerouslySetInnerHTML={{
      __html: berita.isi_post.replace(
        /<img/g,
        '<img style="display: block; margin-left: auto; margin-right: auto;"'
      ),
    }}
    className="indent-10 text-justify text-gray-700 dark:text-gray-200 leading-relaxed"
    data-aos="fade-up"
  />
</div>
            <div className="flex items-center space-x-4 mt-5">
              <div className="flex items-center text-gray-500 dark:text-gray-300">
                <FaTags className="mr-2" />
                <h4>Kategori: {berita.tag}</h4>
              </div>
              <span className="text-gray-500 dark:text-gray-300">|</span>
              <div className="flex items-center text-gray-500 dark:text-gray-300">
                <FaLayerGroup className="mr-2" />
                <h4>Tags: {berita.kategori_post}</h4>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3" data-aos="fade-left">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Berita Lainnya
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {getBeritaLainnya().map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
                  data-aos="fade-up"
                >
                  <a href={`/berita/${item.id}`}>
                    <img
                      src={getImageUrl(item.post_gambar)}
                      alt={item.judul_post}
                      className="w-full h-[150px] object-cover"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="p-4">
                      <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-2">
                        {item.judul_post}
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
                href="/berita"
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
