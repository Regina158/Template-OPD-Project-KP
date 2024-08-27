import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getBerita } from "../fetch/api";

const BeritaHomePage = () => {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log(berita);
  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const dataBerita = await getBerita();
        // console.log(dataBerita);
        const filteredBerita = dataBerita.filter((beritaItem) => {
          const today = new Date();
          const publishDate = new Date(beritaItem.tgl_terbit);

          const diffDays = Math.ceil(
            (today - publishDate) / (1000 * 60 * 60 * 24)
          );

          return diffDays >= 0 && diffDays <= 60;
        });

        setBerita(filteredBerita);
      } catch (error) {
        console.log("Failed to fetch berita data");
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  // Fungsi untuk mendapatkan URL gambar dari isi_post
  const getImageSrcFromIsiPost = (isiPost) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(isiPost, "text/html");
    const imgElement = doc.querySelector("img");
    return imgElement ? imgElement.src : null;
  };

  // Fungsi untuk memeriksa apakah URL gambar valid
  const isValidImageUrl = (url) => {
    return url && !url.includes("null");
  };

  // Mendapatkan semua berita dengan gambar dari isi_post atau post_gambar
  const beritaDenganGambar = berita
    .map((item) => {
      const imageUrlFromIsiPost = getImageSrcFromIsiPost(item.isi_post);
      const imageUrlFromPostGambar = `${
        import.meta.env.VITE_APP_LINK_API
      }/image/posting/berita/${import.meta.env.VITE_APP_OPD_ID}/original/${
        item.post_gambar
      }`;

      return {
        ...item,
        gambar: isValidImageUrl(imageUrlFromIsiPost)
          ? imageUrlFromIsiPost
          : isValidImageUrl(imageUrlFromPostGambar)
          ? imageUrlFromPostGambar
          : null,
      };
    })
    .filter((item) => item.gambar !== null); // Hapus berita yang tidak memiliki gambar

  // console.log(beritaDenganGambar);

  const beritaTerbaru = berita.length > 0 ? berita.slice(0, 5) : [];

  const responsive = {
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
    <div className="pt-24 px-3 mb-5">
      <div className="mx-auto px-6 lg:px-12 py-8 bg-black dark:bg-rose-200 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm p-4">
            <h1 className="font-bold text-gray-900 dark:text-gray-100 text-2xl md:text-3xl mb-4">
              Berita Terkini
            </h1>
            {berita.length > 0 ? (
              <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                showDots={true}
                className="h-[550px]"
              >
                {beritaDenganGambar.length > 0 ? (
                  beritaDenganGambar.map((item, index) => (
                    <div key={index} className="relative w-full h-[550px]">
                      <Link to={`/berita/${item.id}`}>
                        <img
                          src={item.gambar}
                          alt={item.judul_post}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => (e.target.src = "/default-image.png")}
                        />
                        <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-4 w-full rounded-b-lg">
                          <h2 className="font-bold text-lg md:text-xl">
                            {item.judul_post}
                          </h2>
                          <p>{item.tanggal_terbit}</p>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    Tidak ada berita dalam 60 hari terakhir yang memiliki
                    gambar.
                  </p>
                )}
              </Carousel>
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400">
                Tidak ada berita dalam 60 hari terakhir.
              </p>
            )}
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm p-4">
            <div className="mb-3 flex justify-center md:justify-end">
              <Link
                to="/berita"
                className="inline-flex items-center px-4 py-2.5 font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm md:text-sm"
              >
                Lihat Semua Berita
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 ml-2"
                >
                  <path
                    d="M20 4L12 12M20 4V8.5M20 4H15.5M19 12.5V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.07989 5 7.2 5H11.5"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </Link>
            </div>

            <h2 className="bg-blue-500 text-center rounded-lg text-white p-2 mb-4 text-md md:text-xl dark:bg-blue-700">
              Terbaru
            </h2>
            <div className="overflow-y-auto space-y-4 h-[calc(100vh-150px)]">
              {beritaTerbaru.length > 0 ? (
                beritaTerbaru.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 p-4 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-700"
                  >
                    <Link
                      to={`/berita/${item.id}`}
                      className="font-bold text-sm text-gray-900 hover:text-blue-500 dark:text-gray-100 dark:hover:text-blue-300"
                    >
                      {item.judul_post}
                    </Link>
                    <div className="flex justify-between my-2">
                      <p className="text-gray-600 text-xs dark:text-gray-400">
                        Oleh: {item.penulis}
                      </p>
                      <p className="text-gray-600 text-xs dark:text-gray-400">
                        {item.tanggal_terbit}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Tidak ada berita terbaru yang tersedia.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeritaHomePage;
