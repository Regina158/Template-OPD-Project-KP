import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getKalender } from "../fetch/api"; // Adjust the path if necessary

export default function DetailEvent() {
  const location = useLocation(); // Get the current location object
  const queryParams = new URLSearchParams(location.search); // Extract query parameters from the URL
  const id = queryParams.get("id"); // Get the 'id' value from the query parameters

  const [event, setEvent] = useState(null); // State to hold the event data
  //   console.log(id);
  //   console.log(event);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const dataKalender = await getKalender();
        // console.log(dataKalender);
        const eventDetail = dataKalender.find((event) => event.id == id);
        setEvent(eventDetail);
      } catch (error) {
        console.log("Failed to fetch event data", error); // Handle errors if the fetch fails
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-5">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-blue-500">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-5">
          {event.judul_kalender_event}
        </h1>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
          <span className="text-gray-700 dark:text-gray-300 mr-2">
            {event.tanggal_event_mulai} s/d {event.tanggal_event_akhir}
          </span>
        </div>
        <div className="text-gray-600 dark:text-gray-300 mb-4">
          <div dangerouslySetInnerHTML={{ __html: event.ket_kalender_event }} />
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm font-bold">
          Unit Kerja: {event.nunker}
        </p>
      </div>
    </div>
  );
}
