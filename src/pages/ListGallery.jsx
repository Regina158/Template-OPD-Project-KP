import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ImageCard from "../components/ImageCard";
import Pagination from "../components/Pagination"; // Import Pagination
import { getGallery } from "../fetch/api";

export default function ListGallery() {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1); // State untuk halaman saat ini
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 8; // Tentukan jumlah item per halaman
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Inisialisasi AOS dengan durasi animasi 1000ms
  }, []);
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const dataGallery = await getGallery();
        setGallery(dataGallery);
      } catch (error) {
        console.log("Failed to fetch Gallery data");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const totalPages = Math.ceil(gallery.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const GalleryYangDitampilkan = gallery.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-lg">Loading...</span>
      </div>
    );

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-5"></div>
      <div data-aos="fade-down">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="mt-10 mx-auto grid max-w-2xl grid-cols-2 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none md:grid-cols-3 lg:grid-cols-4">
            {GalleryYangDitampilkan.map((item) => (
              <ImageCard
                key={item.id}
                id={item.id}
                imageUrl={item.gambar}
                title={item.judul_album}
                isiPost={item.ket_album}
                tanggalUpload={item.tanggal_terbit}
              />
            ))}
          </div>
        </div>
      </div>
      <Pagination
        count={totalPages}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  );
}
