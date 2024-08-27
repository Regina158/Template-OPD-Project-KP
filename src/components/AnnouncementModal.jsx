import { useEffect, useState } from "react";
import Modal from "react-modal";
import { getPengumuman, getPengumumanImageUrl } from "../fetch/api";
import { Link } from "react-router-dom";

const AnnouncementModal = ({ isOpen, onRequestClose }) => {
  const [annoucementModal, setAnnoucementModal] = useState([]);
  // console.log(annoucementModal);
  useEffect(() => {
    const fetchPengumuman = async () => {
      try {
        const dataPengumuman = await getPengumuman();
        const filterPopUp = dataPengumuman
          .filter((item) => item.tayang_khusus === "Y" && item.gambar_khusus)
          .sort((a, b) => new Date(b.tgl_terbit) - new Date(a.tgl_terbit));
        if (filterPopUp.length > 0) {
          setAnnoucementModal(filterPopUp[0]);
        }
      } catch (error) {
        console.log("Failed to fetch pengumuman data.");
      }
    };

    fetchPengumuman();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="relative bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-lg w-full mx-4">
        <button
          className="absolute -top-5 -right-3 m-4 text-gray-700 dark:text-white hover:text-gray-900 text-2xl font-bold"
          onClick={onRequestClose}
        >
          &times;
        </button>
        <div className="relative">
          <img
            src={getPengumumanImageUrl(annoucementModal.gambar_khusus)}
            alt="Pengumuman"
            className="w-full h-auto"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4 text-center">
            <p className="text-white text-sm font-bold">
              {annoucementModal.judul_pengumuman}
            </p>

            <p className="text-white text-sm font-normal">
              {annoucementModal.nunker}
            </p>
            <p className="text-white text-sm font-normal">
              {annoucementModal.tanggal_terbit} s/d{" "}
              {annoucementModal.tanggal_akhir}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AnnouncementModal;
