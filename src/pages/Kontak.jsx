export default function Kontak() {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Home
              </a>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 dark:text-gray-600 mx-1"
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
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Kontak Kami
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h1 className="text-center font-bold text-gray-800 dark:text-gray-100 text-2xl">
          Kontak Kami
        </h1>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 shadow-md mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div className="px-4 sm:px-6 lg:px-10">
              <h2 className="font-semibold mb-3 text-gray-900 dark:text-gray-200">
                Kontak
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Email:{" "}
                <a
                  href="mailto:kominfo@tanjungpinangkota.go.id"
                  className="text-blue-600 dark:text-blue-400"
                >
                  kominfo@tanjungpinangkota.go.id
                </a>
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                No Telp: (+62771) 733 4004 - 05
              </p>
            </div>
            <div className="px-4 sm:px-6 lg:px-10">
              <h2 className="font-semibold mb-3 text-gray-900 dark:text-gray-200">
                Jam Layanan
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Senin s/d Kamis (08:00-16:00), Jumat (08:00-15:00), Sabtu s/d
                Minggu (Libur)
              </p>
            </div>
            <div className="px-4 sm:px-6 lg:px-10">
              <h2 className="font-semibold mb-3 text-gray-900 dark:text-gray-200">
                Alamat
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Jalan Daeng Celak, Komplek Perkantoran, Gedung C Lantai 1 & 2,
                Senggarang, Kecamatan Tanjungpinang Kota, Tanjungpinang,
                Kepulauan Riau
              </p>
            </div>
          </div>
          <div className="flex mx-auto justify-center  mt-10 pb-10 w-full md:w-1/2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.2567423264686!2d104.44622217371742!3d0.9613271627040947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d9711ad7dbca3f%3A0x376fd724965d5ace!2sDinas%20Komunikasi%20dan%20Informatika%20Kota%20Tanjungpinang%20(Diskominfo%20Kota%20Tanjungpinang)!5e0!3m2!1sen!2sid!4v1722602147377!5m2!1sen!2sid"
              width="100%"
              height="400"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
