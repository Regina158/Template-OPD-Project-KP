import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getInfoGrafis, getInfografisImageUrl } from "../fetch/api";
import { Link } from "react-router-dom";

export default function Infografis() {
  const [infografis, setInfografis] = useState([]);
  // console.log(infografis);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  useEffect(() => {
    const fetchInfografis = async () => {
      try {
        const dataInfografis = await getInfoGrafis();
        const filteredInfografis = dataInfografis.filter(
          (item) => item.guid_gambar !== null
        );

        // Duplikasi gambar jika jumlahnya kurang dari 3
        let adjustedInfografis = [...filteredInfografis];
        const infografisCount = adjustedInfografis.length;
        if (infografisCount > 0 && infografisCount < 3) {
          while (adjustedInfografis.length < 3) {
            adjustedInfografis = adjustedInfografis.concat(
              filteredInfografis.slice(0, 3 - adjustedInfografis.length)
            );
          }
        }

        setInfografis(adjustedInfografis);
      } catch (error) {
        console.error("Failed to fetch infografis data:", error);
      }
    };

    fetchInfografis();
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 bg-gray-50 dark:bg-rose-200 rounded-lg shadow-lg mb-8">
      <h1 className="font-bold text-gray-900 dark:text-gray-100 text-2xl md:text-3xl mb-8 text-center">
        Infografis
      </h1>
      <div className="flex justify-center">
        {infografis.length > 0 ? (
          <Carousel
            responsive={responsive}
            autoPlay={true}
            autoPlaySpeed={3000}
            infinite={true}
            showDots={true}
            dotListClassName="custom-dot-list-style"
            className="bg-gray-100 dark:bg-gray-700 px-2 rounded-lg"
          >
            {infografis.map((item, index) => (
              <Link key={index} to={`/infografis/${item.id}`}>
                <div className="flex justify-center items-center p-2">
                  <div className="relative w-full h-[400px] border-4 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <img
                      src={getInfografisImageUrl(item.guid_gambar)}
                      alt={`Infografis ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            Tidak ada infografis yang tersedia.
          </p>
        )}
      </div>
    </div>
  );
}

// CONTOH JIKA INFOGRAFISNYA DATANYA 2
// import { useEffect, useState } from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import { Link } from "react-router-dom";

// export default function Infografis() {
//   const dummyInfografis = [
//     {
//       id: 1,
//       guid_gambar:
//         "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
//     },
//     {
//       id: 2,
//       guid_gambar:
//         "https://images.unsplash.com/photo-1722742925939-d780d52f4530?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     },
//   ];

//   const [infografis, setInfografis] = useState([]);

//   useEffect(() => {
//     let adjustedInfografis = [...dummyInfografis];
//     const infografisCount = adjustedInfografis.length;

//     // Jika jumlah infografis kurang dari 3, tambahkan elemen secara berulang hingga mencapai 3 elemen
//     if (infografisCount > 0 && infografisCount < 3) {
//       while (adjustedInfografis.length < 3) {
//         adjustedInfografis = adjustedInfografis.concat(
//           dummyInfografis.slice(0, 3 - adjustedInfografis.length)
//         );
//       }
//     }

//     // Jika jumlah infografis adalah nol, lakukan penanganan khusus (misalnya, tampilkan pesan atau placeholder)
//     if (infografisCount === 0) {
//       adjustedInfografis = [
//         {
//           id: "placeholder1",
//           guid_gambar: "placeholder-image-url-1.jpg",
//         },
//         {
//           id: "placeholder2",
//           guid_gambar: "placeholder-image-url-2.jpg",
//         },
//         {
//           id: "placeholder3",
//           guid_gambar: "placeholder-image-url-3.jpg",
//         },
//       ];
//     }

//     setInfografis(adjustedInfografis);
//   }, []);

//   const responsive = {
//     superLargeDesktop: {
//       breakpoint: { max: 4000, min: 1024 },
//       items: 3,
//       slidesToSlide: 3,
//     },
//     desktop: {
//       breakpoint: { max: 1024, min: 768 },
//       items: 3,
//       slidesToSlide: 3,
//     },
//     tablet: {
//       breakpoint: { max: 768, min: 464 },
//       items: 1,
//       slidesToSlide: 1,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//       slidesToSlide: 1,
//     },
//   };

//   return (
//     <div className="container mx-auto px-4 md:px-8 py-12 bg-gray-50 dark:bg-rose-200 rounded-lg shadow-lg mb-8">
//       <h1 className="font-bold text-gray-900 dark:text-gray-100 text-2xl md:text-3xl mb-8 text-center">
//         Infografis
//       </h1>
//       <div className="flex justify-center">
//         {infografis.length > 0 ? (
//           <Carousel
//             responsive={responsive}
//             autoPlay={true}
//             autoPlaySpeed={3000}
//             infinite={true}
//             showDots={true}
//             dotListClassName="custom-dot-list-style"
//             className="bg-gray-100 dark:bg-gray-700 px-2 rounded-lg"
//           >
//             {infografis.map((item, index) => (
//               <Link key={index} to={`/infografis/${item.id}`}>
//                 <div className="flex justify-center items-center p-2">
//                   <div className="relative w-full h-[400px] border-4 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
//                     <img
//                       src={item.guid_gambar}
//                       alt={`Infografis ${index + 1}`}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </Carousel>
//         ) : (
//           <p className="text-gray-600 dark:text-gray-400">
//             Tidak ada infografis yang tersedia.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
