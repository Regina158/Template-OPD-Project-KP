import React from "react";
import { getPengumumanImageUrl } from "../fetch/api";

export default function PengumumanCard({ item }) {
  const { judul_pengumuman, desk_singkat, gambar, tgl_event } = item;

  return (
    <div className="p-4 flex bg-white dark:bg-gray-700 w-full sm:w-[70%] border border-gray-500 rounded-md mb-5">
      <div className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-lg mr-4">
        <img
          src={getPengumumanImageUrl(gambar)}
          alt={judul_pengumuman}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 overflow-hidden">
        <a
          href={`/pengumuman/${item.id}`}
          className="font-bold hover:text-blue-500 capitalize dark:hover:text-blue-300 text-gray-700 dark:text-gray-200 block"
          style={{ maxWidth: "100%" }}
        >
          {judul_pengumuman}
        </a>
        <p className="text-gray-700 dark:text-gray-200 line-clamp-2 mt-2 break-words">
          {desk_singkat}
        </p>
      </div>
    </div>
  );
}
