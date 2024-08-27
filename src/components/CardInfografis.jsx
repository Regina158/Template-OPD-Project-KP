// components/CardInfografis.js
import { Link } from "react-router-dom";
import { getInfografisImageUrl } from "../fetch/api";

export default function CardInfografis({ cards }) {
  return (
    <section
      id="Projects"
      className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
    >
      {cards.map((card) => (
        <div
          key={card.id}
          className="w-72 bg-gray-50 dark:bg-gray-800 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
        >
          <Link to={`/infografis/${card.id}`}>
            <img
              src={getInfografisImageUrl(card.guid_gambar)}
              alt={card.title}
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <p className="text-lg font-bold text-black dark:text-gray-200 truncate block capitalize">
                {card.judul}
              </p>
              <span className="text-gray-400 dark:text-gray-600 mr-3 uppercase text-xs">
                {card.tanggal_terbit}
              </span>

              <p className="text-sm font-semibold text-black dark:text-gray-200 cursor-auto my-3">
                Jumlah: {card.jum_gambar} gambar
              </p>
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
}
