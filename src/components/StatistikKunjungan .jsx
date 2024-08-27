import { useState, useEffect } from "react";

const StatistikKunjungan = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [totalVisitor, setTotalVisitor] = useState(0);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    // Ambil data dari localStorage
    const storedVisitorCount = localStorage.getItem("visitorCount");

    // Jika ada data di localStorage, gunakan itu
    if (storedVisitorCount) {
      setTotalVisitor(parseInt(storedVisitorCount, 10));
    } else {
      // Jika tidak ada, inisialisasi dengan 0
      setTotalVisitor(0);
    }

    // Tambah kunjungan baru
    const newVisitorCount = totalVisitor + 1;

    // Simpan ke localStorage
    localStorage.setItem("visitorCount", newVisitorCount);

    // Update state
    setTotalVisitor(newVisitorCount);
  }, []);

  return (
    <>
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 flex">
        {isVisible && (
          <div className={`bg-blue-600 text-white p-4 w-72 shadow-lg ml-2 `}>
            <h3 className="text-lg font-bold mb-4">Statistik kunjungan</h3>
            <p className="text-sm mb-4">Perhitungan jumlah kunjungan website</p>

            <div className="bg-blue-700 p-4 rounded mb-4">
              <p className="text-sm font-semibold mb-2">Total visitor</p>
              <p className="text-2xl font-bold">
                {totalVisitor.toLocaleString()}
              </p>
              <p className="text-sm text-green-300 mt-2">• Online</p>
            </div>

            <div className="bg-blue-700 p-4 rounded">
              <p className="text-sm font-semibold mb-2">Total view</p>
              <p className="text-2xl font-bold">862.450</p>
            </div>
          </div>
        )}

        <button
          onClick={toggleVisibility}
          className="bg-blue-500 text-white py-2 px-2 rounded-l text-sm flex items-center"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          <div
            className={`${
              isVisible ? "rotate-180" : ""
            } ml-2 flex justify-center items-center bg-blue-700 px-1 py-1 my-1 rounded-full`}
          >
            <span className="text-white text-lg">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
              >
                <path
                  d="M10 7L15 12L10 17"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
          </div>
          Statistik Kunjungan
        </button>
      </div>
    </>
  );
};

export default StatistikKunjungan;
