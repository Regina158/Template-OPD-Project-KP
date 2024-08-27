export default function VisiMisi() {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-5">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                Home
              </a>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1 dark:text-gray-600"
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
                <span className="text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                  Visi Misi
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div>
            <h1 className="font-bold text-3xl text-gray-800 dark:text-gray-100 mb-3">
              Visi Misi
            </h1>
            <h1 className="font-normal text-3xl text-gray-800 dark:text-gray-100">
              Dinas Komunikasi dan Informatika
            </h1>
            <h1 className="font-normal text-3xl text-gray-800 dark:text-gray-100">
              Kota Tanjungpinang
            </h1>
          </div>
          <div className="flex justify-center md:justify-end md:mr-20 mt-6 md:mt-0">
            <img
              src="/TPI-Logo.png"
              alt="Logo Kota Tanjungpinang"
              width={180}
              height={180}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h1 className="font-bold text-3xl text-gray-800 dark:text-gray-100 mb-3">
          Visi
        </h1>
        <p className="w-full md:w-[50%] text-justify text-gray-800 dark:text-gray-300">
          &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
          iste doloribus rem corporis cumque, sequi commodi fuga totam odio
          labore?&quot;
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-12">
        <h1 className="font-bold text-3xl text-gray-800 dark:text-gray-100 mb-3">
          Misi
        </h1>
        <div className="w-full md:w-[50%]">
          <ul className="list-decimal text-gray-800 dark:text-gray-300 mt-5 ml-5">
            <li className="mb-1 text-justify">
              Percepatan peningkatan pertumbuhan ekonomi berbasis maritim,
              berwawasan lingkungan dan keunggulan wilayah untuk peningkatan
              kemakmuran masyarakat.
            </li>
            <li className="mb-1 text-justify">
              Mewujudkan kualitas sumber daya manusia yang berkualitas, sehat
              dan berdaya saing dengan berbasiskan iman dan taqwa.
            </li>
            <li className="mb-1 text-justify">
              Melaksanakan tata kelola pemerintahan yang bersih, terbuka dan
              berorientasi pelayanan.
            </li>
            <li className="mb-1 text-justify">
              Mengembangkan dan melestarikan budaya Melayu dan Nasional dalam
              mendukung pembangunan berkelanjutan.
            </li>
            <li className="mb-1 text-justify">
              Mempercepat pembangunan infrastruktur antar pulau guna
              pengintegrasian dan percepatan pembangunan kawasan pesisir.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
