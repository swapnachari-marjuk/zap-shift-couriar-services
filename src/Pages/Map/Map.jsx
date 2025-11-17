import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Map = () => {
  const serviceCentre = useLoaderData();
  const position = [23.685, 90.3563];
  const mapRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();

    const location = e.target.location.value.trim();
    console.log(location);

    const district = serviceCentre.find((center) =>
      center.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district) {
      const coOrdinat = [district.latitude, district.longitude];
      console.log(district, coOrdinat);
      mapRef.current.flyTo(coOrdinat, 14);
    }
  };
  return (
    <div className="bg-white rounded-2xl py-8 px-10 m-5">
      <div className="border-b-2 border-gray-300">
        <h2 className="text-4xl font-bold">We are available in 64 districts</h2>
        <form onSubmit={handleSearch} className="join my-8">
          <input
            className="input join-item rounded-l-full"
            name="location"
            placeholder="Location"
            required
          />
          <button className="btn join-item rounded-r-full btn-primary">
            Search
          </button>
        </form>
      </div>

      <h4 className="text-xl font-bold my-8">
        We deliver almost all over Bangladesh
      </h4>

      <div className="w-full h-[80vh] border-2">
        <MapContainer
          center={position}
          ref={mapRef}
          zoom={8}
          scrollWheelZoom={false}
          className="h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCentre.map((center, i) => (
            <Marker key={i} position={[center.latitude, center.longitude]}>
              <Popup>
                <b>Center: {center.district}</b>
                <br />
                <small className="font-light">
                  Coverage Aria: {center.covered_area.join(", ")}
                </small>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
