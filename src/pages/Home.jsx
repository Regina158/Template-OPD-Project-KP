import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BeritaHomePage from "../components/BeritaHomePage";
import Infografis from "../components/Infografis";
import PengumumanHomePage from "../components/PengumumanHomePage";
import GalleryCard from "../components/GalleryCard";
import AnnouncementModal from "../components/AnnouncementModal";
import StatistikKunjungan from "../components/StatistikKunjungan ";
import CustomDot from "../components/CustomDot";
import {
  getBannerImageUrl,
  getCarouselHome,
  getPengumuman,
} from "../fetch/api";
import PetaLokasi from "../components/PetaLokasi";
import Statistik from "../components/Statistik";
import WidgetKominfo from "../components/WidgetKominfo";
import Pranala from "../components/Pranala";
import KalenderHome from "../components/KalenderHome";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carouselHome, setCarouselHome] = useState(null);
  const [annoucementModal, setAnnoucementModal] = useState(null); // Perbarui state ini

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Inisialisasi AOS dengan durasi animasi 1000ms
  }, []);

  useEffect(() => {
    const fetchPengumuman = async () => {
      try {
        const dataPengumuman = await getPengumuman();
        const filterPopUp = dataPengumuman
          .filter((item) => item.tayang_khusus === "Y" && item.gambar_khusus)
          .sort((a, b) => new Date(b.tgl_terbit) - new Date(a.tgl_terbit));
        if (filterPopUp.length > 0) {
          setAnnoucementModal(filterPopUp[0]);
          setIsModalOpen(true); // Buka modal hanya jika ada data
        }
      } catch (error) {
        console.log("Failed to fetch pengumuman data.");
      }
    };

    fetchPengumuman();
  }, []);

  useEffect(() => {
    const fetchCarouselHomeData = async () => {
      try {
        const dataCarouselHome = await getCarouselHome();
        setCarouselHome(dataCarouselHome);
      } catch (error) {
        console.error("Failed to fetch carousel data:", error);
      }
    };

    fetchCarouselHomeData();
  }, []);

  // Handle loading state when data is not yet fetched
  if (carouselHome === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {/* Announcement Modal */}
      {annoucementModal && ( // Hanya tampilkan modal jika data tersedia
        <AnnouncementModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Ditampilkan jika carousel nya ada */}
      {carouselHome != null && (
        <div
          className="relative h-[50vh] md:h-[80vh] mb-20 pt-16 "
          data-aos="fade-up"
        >
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            showDots={true}
            customDot={<CustomDot />}
            arrows={true}
          >
            {carouselHome.map((item, index) => (
              <div key={index} className="relative h-[40vh] md:h-[80vh]">
                <img
                  src={getBannerImageUrl(item)}
                  alt={`slide-${index}`}
                  className="w-full h-full object-fit"
                />
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {/* Berita dan GPR Kominfo */}
      <div data-aos="fade-up">
        <BeritaHomePage />
      </div>

      {/* Kalender
      <div data-aos="fade-down">
        <KalenderHome/>
      </div> */}

      {/* Gallery */}
      <div data-aos="fade-down">
        <GalleryCard />
      </div>
      
      {/* Pengumuman dan Pranala Aplikasi Pemerintah Kota Tanjungpinang */}
      {/* <div data-aos="fade-up">
        <PengumumanHomePage />
      </div> */}
      {/* Infografis dan Pranala Web Internal Pemerintah Kota Tanjungpinang */}
      <div data-aos="fade-up">
        <Infografis />
      </div>
      <div data-aos="fade-down">
        <Pranala />
      </div>

      {/* Statistik Data */}
      <div data-aos="fade-up">
        <div className="p-8 mx-8 grid grid-cols-1 md:grid-cols-2  justify-center items-center">
          <Statistik />
          <PetaLokasi />
        </div>
      </div>
      {/* <StatistikKunjungan /> */}
      <WidgetKominfo />
    </>
  );
};

export default Home;
