import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams } from "react-router-dom";
import { getAllPages, getAllPagesImageUrl } from "../fetch/api";

export default function Pages() {
  const [allPageData, setAllPageData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Inisialisasi AOS dengan durasi animasi 1000ms
  }, []);

  useEffect(() => {
    const fetchAllPageData = async () => {
      try {
        const dataAllPageData = await getAllPages(id);
        setAllPageData(dataAllPageData);
      } catch (error) {
        console.error("Failed to fetch AllPageData data:", error);
      }
    };

    fetchAllPageData();
  }, [id]);

  if (!allPageData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  // Default values for missing data
  const {
    judul_post = "Judul tidak tersedia",
    post_gambar = "",
    isi_post = "<p>Isi tidak tersedia</p>",
    tanggal_tulis = "Tanggal tidak tersedia",
    penulis = "Penulis tidak diketahui",
  } = allPageData;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
      <div data-aos="fade-down">
        <div className="mx-auto flex flex-col justify-center items-center p-6 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {judul_post}
          </h1>
          <div className="flex flex-col md:flex-row mt-4">
            {post_gambar && (
              <img
                src={getAllPagesImageUrl(post_gambar)}
                alt="Post"
                className="w-full md:w-1/2 h-auto rounded-md shadow-md"
              />
            )}
            <div className="px-4 flex flex-col mt-4 md:mt-0 md:ml-4 text-gray-900 dark:text-gray-100">
              <div dangerouslySetInnerHTML={{ __html: isi_post }} />
              <div className="flex flex-col md:flex-row md:space-x-4 pt-4 text-sm">
                <p>{tanggal_tulis}</p>
                <p>
                  <strong>oleh:</strong> {penulis}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
