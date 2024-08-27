import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { getGallery, getGalleryDetail, getImageUrlGallery } from "../fetch/api";
import { RiGalleryView2 } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [galleryDetail, setGalleryDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const dataGallery = await getGallery();
        setGallery(dataGallery);

        if (dataGallery.length > 0) {
          const firstGalleryId = dataGallery[0].id; // Mengambil ID pertama dari GalleryYangDitampilkan
          const dataGalleryDetail = await getGalleryDetail();
          const filteredDetail = dataGalleryDetail.filter(
            (item) => item.id_gallery_album === firstGalleryId
          );
          setGalleryDetail(filteredDetail);
        }
      } catch (error) {
        console.log("Failed to fetch Gallery data");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const GalleryYangDitampilkan = gallery.slice(0, 1);
  const GalleryLain = gallery.slice(0, 4);

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
                  Gallery
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div data-aos="fade-down">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="col-span-2">
              {GalleryYangDitampilkan.map((item) => (
                <div key={item.id}>
                  <h3 className="mt-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
                    {item.judul_album}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 my-2">
                    {item.tanggal_terbit} Oleh {item.yg_ngupload}
                  </p>
                  <Link
                    to={`${getImageUrlGallery(item.gambar)}`}
                    target="_blank"
                  >
                    <div className="w-full overflow-hidden rounded-2xl mb-4 relative group">
                      <img
                        src={getImageUrlGallery(item.gambar)}
                        alt={item.judul_album}
                        className="object-cover w-full h-[400px] rounded-2xl"
                      />
                      <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <FaEye className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  </Link>
                  <p className="text-md text-gray-600 dark:text-gray-400 mt-1 line-clamp-3">
                    {item.ket_album?.replace(/(<([^>]+)>)/gi, "") || ""}
                  </p>

                  <h4 className="mt-5 text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Daftar Album Gallery
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    {galleryDetail.map((detail) => (
                      <div key={detail.id}>
                        <Link
                          to={`${getImageUrlGallery(detail.gambar)}`}
                          target="_blank"
                        >
                          <img
                            src={getImageUrlGallery(detail.gambar)}
                            alt={detail.judul_gallery}
                            className="object-cover w-full h-40 rounded-2xl"
                          />
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            {detail.judul_gallery}
                          </p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-1" data-aos="fade-left">
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
                Gallery Lainnya
              </h2>
              <ul className="space-y-4">
                {GalleryLain.map((item, index) => {
                  const sanitizedTitle = item.judul_album
                    .replace(/[^a-zA-Z\d\s]/g, "")
                    .split(" ")
                    .join("-")
                    .toLowerCase();
                  return (
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
                          to={`/gallery_album/${sanitizedTitle}?id=${item.id}`}
                          className="text-sm font-medium text-slate-900 dark:text-white"
                        >
                          {item.judul_album}
                        </Link>
                        <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center">
                          <RiGalleryView2 className="mr-1" /> Total Gallery:{" "}
                          {item.jum_gallery}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6">
                <Link
                  to={`/list/gallery_album`}
                  className="block p-4 bg-blue-500 hover:bg-blue-600 text-white text-center rounded-md shadow-lg transition-all duration-300"
                >
                  Lihat Daftar Album Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
