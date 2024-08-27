import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { getFooter } from "../fetch/api";

export default function Footer() {
  const [footer, setFooter] = useState([]);
  const [medsos, setMedsos] = useState({});
  const [coordinates, setCoordinates] = useState("");

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const dataFooter = await getFooter();
        setMedsos(JSON.parse(dataFooter.medsos));
        setFooter(dataFooter);
        setCoordinates(dataFooter.latlng);
      } catch (error) {
        console.log("Failed to fetch footer data");
      }
    };

    fetchFooter();
  }, []);

  const generateMapUrl = () => {
    if (!coordinates) return "";

    const [lat, lng] = coordinates
      .replace("(", "")
      .replace(")", "")
      .split(",")
      .map((coord) => coord.trim());

    return `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=14&output=embed`;
  };

  return (
    <>
      <footer className="bg-gray-900 dark:bg-gray-700 text-white dark:text-white">
        <div className="container px-6 py-12 mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 flex items-start">
              <img
                src="/TPI-Logo.png"
                alt="Logo Kota Tanjungpinang"
                className="w-[90px] h-[120px]"
              />
              <img
                src="/logodiskominfo.svg"
                alt="Logo Diskominfo"
                className="w-[110px] h-[130px] ml-5"
              />
              <div className="ml-5">
                <h1 className="text-xl font-bold">{footer.nunker}</h1>
                <div className="mt-2">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-xl" />
                    <h1 className="text-sm">{footer.alamat}</h1>
                  </div>
                  <div className="flex items-center mt-2">
                    <FaEnvelope className="mr-2 text-lg" />
                    <h1 className="text-sm">{footer.email}</h1>
                  </div>
                  <div className="flex items-center mt-2">
                    <FaPhoneAlt className="mr-2 text-lg" />
                    <h1 className="text-sm">{footer.telp}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="font-semibold">Sosial Media</p>
              <div className="flex flex-col items-start mt-5 space-y-3">
                <a
                  href={medsos.facebook}
                  className="flex items-center transition-colors duration-300 hover:text-blue-500"
                >
                  <FaFacebookF className="mr-2" />
                  Facebook
                </a>
                <a
                  href={medsos.instagram}
                  className="flex items-center transition-colors duration-300 hover:text-pink-500"
                >
                  <FaInstagram className="mr-2" />
                  Instagram
                </a>
                <a
                  href={medsos.youtube}
                  className="flex items-center transition-colors duration-300 hover:text-red-500"
                >
                  <FaYoutube className="mr-2" />
                  Youtube
                </a>
              </div>
            </div>

            <div>
              <p className="font-semibold">Lokasi</p>
              <div className="mt-5">
                <iframe
                  src={generateMapUrl()}
                  width="100%"
                  height="200"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0"
                ></iframe>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200 dark:border-white" />

          <div>
            <p className="text-center text-sm">
              Copyright © 2024{" "}
              <a href="/" className="hover:text-blue-500">
                Dinas Komunikasi dan Informatika Kota Tanjungpinang
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
