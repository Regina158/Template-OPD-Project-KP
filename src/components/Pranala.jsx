import { useEffect, useState } from "react";
import {
  getPranalAplikasi,
  getPranalInternal,
  getPranalExternal,
} from "../fetch/api";

const Pranala = () => {
  const [pranalAplikasi, setPranalAplikasi] = useState([]);
  const [pranalInternal, setPranalInternal] = useState([]);
  const [pranalExternal, setPranalExternal] = useState([]);

  useEffect(() => {
    const fetchPranalAplikasi = async () => {
      try {
        const dataPranal = await getPranalAplikasi();
        setPranalAplikasi(dataPranal.slice(0, 5)); // Hanya ambil 5 data pertama
      } catch (error) {
        console.error("Failed to fetch pranal aplikasi data:", error);
      }
    };

    fetchPranalAplikasi();
  }, []);

  useEffect(() => {
    const fetchPranalInternal = async () => {
      try {
        const dataPranal = await getPranalInternal();
        setPranalInternal(dataPranal.slice(0, 5)); // Hanya ambil 5 data pertama
      } catch (error) {
        console.error("Failed to fetch pranal internal data:", error);
      }
    };

    fetchPranalInternal();
  }, []);

  useEffect(() => {
    const fetchPranalExternal = async () => {
      try {
        const dataPranal = await getPranalExternal();
        setPranalExternal(dataPranal.slice(0, 5)); // Hanya ambil 5 data pertama
      } catch (error) {
        console.error("Failed to fetch pranal external data:", error);
      }
    };

    fetchPranalExternal();
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 border bg-black rounded-lg dark:bg-rose-200">
      <h1 className="font-bold text-white dark:text-gray-100 text-2xl md:text-3xl mb-8 text-center border-b-4 border-orange-400 dark:border-white">
        Pranala
      </h1>

      <div className="flex flex-col md:flex-row gap-4 md:mx-8">
        {/* Pranala Aplikasi */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 flex-1 min-h-[300px] flex flex-col border border-black rounded-lg">
          <div className="bg-gray-700 dark:bg-gray-900 p-2 rounded-t-lg">
            <h1 className="text-sm text-white font-semibold">
              Pranala Aplikasi Pemerintah Kota Tanjungpinang
            </h1>
          </div>

          <div className="mt-5 flex-1 overflow-y-auto space-y-2">
            <div className="border border-black rounded-lg p-2">
              {pranalAplikasi.map((pranal, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 border-b border-black"
                >
                  <img src="/TPI-Logo.png" alt="LogoKota" className="w-5 h-6" />
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={pranal.alamat_pranala_http}
                    className="text-xs ml-2 text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
                  >
                    {pranal.nama_pranala}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 text-end">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/pranala/aplikasi"
              className="bg-gray-800 dark:bg-gray-900 font-bold text-sm text-white px-2 py-1 rounded"
            >
              Daftar Pranal Aplikasi
            </a>
          </div>
        </div>

        {/* Pranala Internal */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 flex-1 min-h-[300px] flex flex-col border border-black rounded-lg">
          <div className="bg-gray-700 dark:bg-gray-900 p-2 rounded-t-lg">
            <h1 className="text-sm text-white font-semibold">
              Pranala Web Internal Pemerintah Kota Tanjungpinang
            </h1>
          </div>

          <div className="mt-5 flex-1 overflow-y-auto space-y-2">
            <div className="border border-black rounded-lg p-2">
              {pranalInternal.map((pranal, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 border-b border-black"
                >
                  <img src="/TPI-Logo.png" alt="LogoKota" className="w-5 h-6" />
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={pranal.alamat_pranala_http}
                    className="text-xs ml-2 text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
                  >
                    {pranal.nama_pranala}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 text-end">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/pranala/internal"
              className="bg-gray-800 dark:bg-gray-900 font-bold text-sm text-white px-2 py-1 rounded"
            >
              Daftar Pranal Internal
            </a>
          </div>
        </div>

        {/* Pranala Eksternal */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 flex-1 min-h-[300px] flex flex-col border border-black rounded-lg">
          <div className="bg-gray-700 dark:bg-gray-900 p-2 rounded-t-lg">
            <h1 className="text-sm text-white font-semibold">
              Pranala Eksternal Pemerintah Kota Tanjungpinang
            </h1>
          </div>

          <div className="mt-5 flex-1 overflow-y-auto space-y-2">
            <div className="border border-black rounded-lg p-2">
              {pranalExternal.map((pranal, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 border-b border-black"
                >
                  <img src="/TPI-Logo.png" alt="LogoKota" className="w-5 h-6" />
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={pranal.alamat_pranala_http}
                    className="text-xs ml-2 text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
                  >
                    {pranal.nama_pranala}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 text-end">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/pranala/external"
              className="bg-gray-800 dark:bg-gray-900 font-bold text-sm text-white px-2 py-1 rounded"
            >
              Daftar Pranal Web External
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pranala;
