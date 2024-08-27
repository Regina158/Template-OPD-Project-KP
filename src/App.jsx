import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Kontak from "./pages/Kontak";
import Pengumuman from "./pages/Pengumuman";
import useThemeSwitcher from "./hooks/useThemeSwitcher ";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DetailPengumuman from "./components/DetailPengumuman";
import NotFound from "./components/NotFound";
import Gallery from "./pages/Gallery";
import Kalender from "./pages/Kalender";
import SelayangPandang from "./pages/SelayangPandang";
import VisiMisi from "./pages/VisiMisi";
import ProfileOPD from "./pages/ProfileOPD";
import StrukturOrganisasi from "./pages/StrukturOrganisasi";
import Berita from "./pages/Berita";
import DetailBerita from "./components/DetailBerita";
import InfografisPage from "./pages/InfografisPage";
import DetailInfoGrafis from "./components/DetailInfoGrafis";
import DetailPranal from "./components/DetailPranal";
import DetailGallery from "./components/DetailGallery";
import DetailArtikel from "./components/DetailArtikel";
import DownloadArea from "./pages/DownloadArea";
import Artikel from "./pages/Artikel";
import Pages from "./pages/Pages";
import ListKalender from "./components/ListKalender";
import DetailEvent from "./pages/DetailEvent";
import DetailEvent2 from "./pages/DetailEvent2";
import ScrollTopButton from "./components/ScrollToTop";
import GalleryAlbum from "./pages/GalleryAlbum";
import ListGallery from "./pages/ListGallery";
function App() {
  const [theme, toggleTheme] = useThemeSwitcher();

  return (
    <div
      className={`transition duration-300 ${
        theme === "dark" ? "dark" : "light"
      }`}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/beranda" element={<Home />} />
        <Route path="/infografis" element={<InfografisPage />} />
        <Route path="/infografis/:id" element={<DetailInfoGrafis />} />
        <Route path="/visi_misi" element={<VisiMisi />} />
        <Route path="/pranala/aplikasi" element={<DetailPranal />} />
        <Route path="/pranala/internal" element={<DetailPranal />} />
        <Route path="/pranala/external" element={<DetailPranal />} />
        <Route path="/selayang_pandang" element={<SelayangPandang />} />
        <Route path="/struktur_organisasi" element={<StrukturOrganisasi />} />
        <Route path="/profil_opd" element={<ProfileOPD />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:id" element={<DetailBerita />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery_album/:judul" element={<GalleryAlbum />} />
        <Route path="/list/gallery_album" element={<ListGallery />} />
        <Route path="/kalendar_even" element={<Kalender />} />
        <Route
          path="/kalendar_even/:judul_kalender_event"
          element={<DetailEvent />}
        />
        <Route path="/event/:judul_kalender_event" element={<DetailEvent2 />} />
        <Route path="/list/kalender_even" element={<ListKalender />} />
        <Route path="/download_area" element={<DownloadArea />} />
        <Route path="/artikel" element={<Artikel />} />
        <Route path="/artikel/:id" element={<DetailArtikel />} />
        <Route path="/pengumuman" element={<Pengumuman />} />
        <Route path="/pengumuman/:id" element={<DetailPengumuman />} />
        <Route path="/pages/:route/:routes/:id" element={<Pages />} />
        <Route path="/pages/:route/:id" element={<Pages />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollTopButton />
      <Footer />
    </div>
  );
}

export default App;
