import React from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { getImageUrlGallery } from "../fetch/api";

export default function ImageCard({
  id,
  imageUrl,
  title,
  isiPost,
  tanggalUpload,
}) {
  const sanitizedTitle = title
    .replace(/[^a-zA-Z\d\s]/g, "")
    .split(" ")
    .join("-")
    .toLowerCase();
  return (
    <Link
      to={`/gallery_album/${sanitizedTitle}?id=${id}`}
      className="flex flex-col items-start justify-between bg-white dark:bg-gray-700 p-4 sm:p-6 shadow-lg rounded-2xl transition-transform duration-300 hover:scale-105"
    >
      <div className="w-full overflow-hidden rounded-2xl mb-4 relative group">
        <img
          src={getImageUrlGallery(imageUrl)}
          alt={title}
          className="object-cover w-full h-[200px] rounded-2xl"
        />
        <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FaEye className="w-6 h-6 text-white" />
        </button>
      </div>
      <h3 className="mt-2 capitalize text-sm text-justify font-bold text-gray-800 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-justify line-clamp-3">
        {isiPost?.replace(/(<([^>]+)>)/gi, "") || ""}
      </p>
      <p className="text-xs text-gray-500 text-justify dark:text-gray-400 mt-2">
        {tanggalUpload}
      </p>
    </Link>
  );
}
