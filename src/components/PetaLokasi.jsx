import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getStatistik } from "../fetch/api";

// Green marker icon URL
const greenIcon = L.icon({
  iconUrl:
    "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function PetaLokasi() {
  const [mapsData, setMapsData] = useState({
    maps: [],
    judul: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchStatistik = async () => {
      try {
        const dataStatistik = await getStatistik();
        const data = dataStatistik.find((item) => item.jenis_file === "PETA");
        setMapsData({
          maps:
            data?.excel?.data.map((item) => ({
              name: item["1"],
              lat: item["2"],
              lng: item["3"],
              description: item["4"] || null,
            })) || [],
          judul: data?.judul || "Peta Statistik",
        });
      } catch (error) {
        console.error("Error fetching statistik maps:", error);
      }
    };

    fetchStatistik();
  }, []);

  return (
    <div className="w-full p-2">
      {mapsData.maps.length > 0 ? (
        <>
          <h2 className="text-xl font-bold text-center pb-2" data-aos="fade-up">
            {mapsData.judul}
          </h2>
          <MapContainer
            center={[0.9278868, 104.4434775]}
            zoom={13}
            style={{ height: "400px", width: "100%", zIndex: 0 }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {mapsData.maps.map((location, index) => (
              <Marker
                key={index}
                position={[location.lat, location.lng]}
                icon={greenIcon}
              >
                <Popup>
                  {location.name}
                  {location.description && <br />}
                  {location.description}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </>
      ) : (
        <div className="text-center text-gray-500"></div>
      )}
    </div>
  );
}
