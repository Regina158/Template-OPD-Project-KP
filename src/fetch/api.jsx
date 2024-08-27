import axios from "axios";

const API_URL = import.meta.env.VITE_APP_LINK_API;
const OPD_ID = import.meta.env.VITE_APP_OPD_ID;

export async function getBerita() {
  try {
    const response = await axios.post(`${API_URL}/api/getData/${OPD_ID}`, {
      req: "berita",
    });
    return response.data.berita;
  } catch (error) {
    console.error("Error fetching berita data:", error);
    throw error;
  }
}
export async function getStatistik() {
  try {
    const response = await axios.post(`${API_URL}/api/getData/${OPD_ID}`, {
      req: "Grafik",
    });
    return response.data.Grafik;
  } catch (error) {
    console.error("Error fetching Grafik data:", error);
    throw error;
  }
}
export async function getPengumuman() {
  try {
    const response = await axios.post(`${API_URL}/api/getData/${OPD_ID}`, {
      req: "pengumuman",
    });
    return response.data.pengumuman;
  } catch (error) {
    console.error("Error fetching pengumuman data:", error);
    throw error;
  }
}
export async function getKalender() {
  try {
    const response = await axios.post(`${API_URL}/api/getData/${OPD_ID}`, {
      req: "event",
    });
    return response.data.event;
  } catch (error) {
    console.error("Error fetching event data:", error);
    throw error;
  }
}
export async function getCarouselHome() {
  try {
    const response = await axios.post(`${API_URL}/api/getOPDInfo`, {
      kunker: OPD_ID,
    });
    return response.data.banner;
  } catch (error) {
    console.error("Error fetching getCarouselHome data:", error);
    throw error;
  }
}
export async function getAllPages(id) {
  try {
    const response = await axios.post(`${API_URL}/api/getData/${OPD_ID}`, {
      req: "halaman",
      svar: "id",
      sval: id,
    });

    return response.data.halaman;
  } catch (error) {
    console.error("Error fetching getAllPages data:", error);
    throw error;
  }
}
export async function getArtikel() {
  try {
    const response = await axios.post(`${API_URL}/api/getData/${OPD_ID}`, {
      req: "artikel",
    });
    return response.data.artikel;
  } catch (error) {
    console.error("Error fetching artikel data:", error);
    throw error;
  }
}
export async function getGallery() {
  try {
    const response = await axios.post(`${API_URL}/api/getData/${OPD_ID}`, {
      req: "gallery_album",
    });
    return response.data.gallery_album;
  } catch (error) {
    console.error("Error fetching gallery data:", error);
    throw error;
  }
}
export async function getDownloadArea() {
  try {
    const response = await axios.post(`${API_URL}/api/getData/${OPD_ID}`, {
      req: "download",
    });
    return response.data.download;
  } catch (error) {
    console.error("Error fetching gallery data:", error);
    throw error;
  }
}

export async function getGalleryDetail() {
  try {
    const response = await axios.post(`${API_URL}/api/getData/${OPD_ID}`, {
      req: "gallery",
      limit: null,
      offset: null,
    });
    return response.data.gallery;
  } catch (error) {
    console.error("Error fetching gallery detail data:", error);
    throw error;
  }
}
export async function getPranalAplikasi() {
  try {
    const response = await axios.post(`${API_URL}/api/getMainPageInfo`, {
      kunker: OPD_ID,
    });
    return response.data.pranala_luar.aplikasi;
  } catch (error) {
    console.error("Error fetching pranal aplikasi data:", error);
    throw error;
  }
}
export async function getPranalInternal() {
  try {
    const response = await axios.post(`${API_URL}/api/getMainPageInfo`, {
      kunker: OPD_ID,
    });
    return response.data.pranala_luar.internal;
  } catch (error) {
    console.error("Error fetching pranal internal data:", error);
    throw error;
  }
}
export async function getPranalExternal() {
  try {
    const response = await axios.post(`${API_URL}/api/getMainPageInfo`, {
      kunker: OPD_ID,
    });
    return response.data.pranala_luar.external;
  } catch (error) {
    console.error("Error fetching pranal external data:", error);
    throw error;
  }
}
export async function getFooter() {
  try {
    const response = await axios.post(`${API_URL}/api/getOPDInfo`, {
      kunker: OPD_ID,
    });
    return response.data.unker;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    throw error;
  }
}

export function getImageUrl(postGambar, isiPost) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(isiPost, "text/html");
  const imgElement = doc.querySelector("img");
  return imgElement
    ? imgElement.src
    : `${API_URL}/image/posting/berita/${OPD_ID}/original/${postGambar}`;
}
export function getImageUrlGallery(postGambar, isiPost) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(isiPost, "text/html");
  const imgElement = doc.querySelector("img");
  return imgElement
    ? imgElement.src
    : `${API_URL}/image/posting/galeri/${OPD_ID}/original/${postGambar}`;
}
export function getImageUrlArtikel(postGambar, isiPost) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(isiPost, "text/html");
  const imgElement = doc.querySelector("img");
  return imgElement
    ? imgElement.src
    : `${API_URL}/image/posting/Artikel/${OPD_ID}/original/${postGambar}`;
}

export async function getInfoGrafis() {
  try {
    const response = await axios.post(`${API_URL}/api/getData/${OPD_ID}`, {
      req: "infografis_album",
    });
    return response.data.infografis_album;
  } catch (error) {
    console.error("Error fetching berita data:", error);
    throw error;
  }
}
export async function getDetailInfoGrafis(id) {
  try {
    const response = await axios.post(`${API_URL}/api/getData/${OPD_ID}`, {
      req: "infografis_album",
      svar: "id_infografis_album",
      sval: id,
    });
    return response.data.infografis_album;
  } catch (error) {
    console.error("Error fetching berita data:", error);
    throw error;
  }
}

export function getInfografisImageUrl(guidGambar) {
  return `${API_URL}/api/getDownloadInfografis/${OPD_ID}/${guidGambar}`;
}
export function getBannerImageUrl(guidGambar) {
  return `${API_URL}/image/banner/${OPD_ID}/${guidGambar}`;
}

export function getAllPagesImageUrl(guidGambar) {
  return `${API_URL}/image/posting/halaman/${OPD_ID}/original/${guidGambar}`;
}
export function getPengumumanImageUrl(guidGambar) {
  return `${API_URL}/image/posting/pengumuman/${OPD_ID}/original/${guidGambar}`;
}

export async function getNavbar() {
  try {
    const response = await axios.post(`${API_URL}/api/getOPDInfo`, {
      kunker: OPD_ID,
    });
    return response.data.menu.lsmenu;
  } catch (error) {
    console.error("Error fetching berita data:", error);
    throw error;
  }
}
