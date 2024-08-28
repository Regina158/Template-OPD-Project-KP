import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import ImageCard from "../components/ImageCard";
import Pagination from "../components/Pagination";
import { getGallery, getImageUrlGallery } from "../fetch/api";
import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";

export default function ListGallery() {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const navigate = useNavigate();

  const itemsPerPage = 8;

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const dataGallery = await getGallery();
        setGallery(dataGallery);
        // Prepare lightbox images
        const lightboxImgs = dataGallery.map((item) => ({
          src: getImageUrlGallery(item.gambar),
          title: item.judul_album,
          description: item.ket_album,
          id: item.id,
        }));
        setLightboxImages(lightboxImgs);
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

  const handleToggleView = useCallback(() => {
    setIsLightboxOpen((prev) => !prev);
  }, []);

  const handleImageClick = useCallback(
    (image) => {
      const sanitizedTitle = image.title
        .replace(/[^a-zA-Z\d\s]/g, "")
        .split(" ")
        .join("-")
        .toLowerCase();
      navigate(`/gallery_album/${sanitizedTitle}?id=${image.id}`);
    },
    [navigate]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 ">
        <div className="flex justify-start space-x-4 mb-5">
          <button
            className={`rounded-full px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 ${
              isLightboxOpen
                ? "bg-gray-200 text-gray-800"
                : " bg-blue-500 text-white"
            }`}
            onClick={handleToggleView}
          >
            {isLightboxOpen ? "View Gallery" : "View Lightbox"}
          </button>
        </div>
      </div>

      <SlideshowLightbox
        images={lightboxImages}
        showThumbnails={true}
        open={isLightboxOpen}
        lightboxIdentifier="lbox1"
        onClose={handleToggleView}
        showTitle={true}
        onImageClick={handleImageClick}
      />

      {!isLightboxOpen && (
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
          <Pagination
            count={totalPages}
            page={page}
            onPageChange={handleChangePage}
          />
        </div>
      )}
    </>
  );
}
