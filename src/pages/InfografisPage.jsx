import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import CardInfografis from "../components/CardInfografis";
import { useEffect, useState } from "react";
import { getInfoGrafis } from "../fetch/api";

export default function InfografisPage() {
  // Contoh data card
  // const cards = [
  //   {
  //     id: 1,
  //     title: "Ransomware",
  //     total_gambar: "1 Gambar",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  //   {
  //     id: 2,
  //     title: "Reginaa",
  //     total_gambar: "5 Gambar",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  //   {
  //     id: 3,
  //     title: "Berita Umrah",
  //     total_gambar: "3 Gambar",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  //   {
  //     id: 4,
  //     title: "Berita Dompak",
  //     total_gambar: "3 Gambar",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  // ];

  const [infografisData, setInfografisData] = useState([]);
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Inisialisasi AOS dengan durasi animasi 1000ms
  }, []);
  // console.log(infografisData);
  useEffect(() => {
    const fetchInfografis = async () => {
      try {
        const dataInfografis = await getInfoGrafis();
        setInfografisData(
          dataInfografis.filter((item) => item.guid_gambar !== null)
        );
      } catch (error) {
        console.log("Failed to fetch infografis data");
      }
    };

    fetchInfografis();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
              >
                Home
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 dark:text-gray-500 mx-1"
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
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">
                  Infografis
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div data-aos="fade-down">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h1 className="font-bold text-3xl text-gray-800 dark:text-gray-100 mb-3">
            Album Infografis
          </h1>

          <CardInfografis cards={infografisData} />
        </div>
      </div>
    </>
  );
}
