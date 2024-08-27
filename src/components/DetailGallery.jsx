import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGalleryDetail, getImageUrlGallery } from "../fetch/api";

export default function DetailGallery() {
  const { id } = useParams();
  const [galleryDetail, setGalleryDetail] = useState([]);
  // console.log(galleryDetail);

  useEffect(() => {
    const fetchDetailGallery = async () => {
      try {
        const dataGalleryDetail = await getGalleryDetail();
        setGalleryDetail(
          dataGalleryDetail.filter((item) => item.id_gallery_album === id)
        );
      } catch (error) {
        console.log("Failed to fetch gallery detail data");
      }
    };

    fetchDetailGallery();
  }, [id]);

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
                  href="/gallery"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white ms-1 md:ms-2"
                >
                  Gallery
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
                  Detail Gallery
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex justify-center items-center ">
          {galleryDetail.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4  p-4 sm:p-6  transition-transform duration-300">
              {galleryDetail.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-start justify-between"
                >
                  <div className="w-full overflow-hidden rounded-2xl mb-4 relative group">
                    <img
                      src={getImageUrlGallery(item.gambar)}
                      alt={item.judul_gallery}
                      className="object-cover w-full h-full rounded-2xl"
                    />
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                    {item.judul_gallery}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {item.tgl_gambar}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Data tidak ada
              </h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
