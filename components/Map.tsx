"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix for Leaflet default marker icons in Next.js/Webpack
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

type Location = {
    id: string;
    name: string;
    lat: number;
    lng: number;
    description: string;
    type: "nature" | "water" | "history";
};

// Krimpenerwaard coordinates (approx center)
const CENTER: [number, number] = [51.93, 4.77];
const ZOOM = 12;

const locations: Location[] = [
    { id: "1", name: "Kortlandse Polder", lat: 51.95, lng: 4.75, description: "Zeldzaam blauwgrasland reservaat.", type: "nature" },
    { id: "2", name: "Eendenkooi Bakkerswaal", lat: 51.91, lng: 4.80, description: "Historische eendenkooi aan de Lek.", type: "history" },
    { id: "3", name: "Vlist", lat: 51.98, lng: 4.82, description: "Meanderend veenriviertje.", type: "water" },
    { id: "4", name: "Loetbos", lat: 51.93, lng: 4.70, description: "Recreatie- en natuurgebied.", type: "nature" },
];

export default function Map() {
    // Force Leaflet to recognize the custom icon globally if needed, 
    // or just apply it to markers. Applying to markers is safer/cleaner.

    return (
        <div className="h-full w-full rounded-3xl overflow-hidden border border-white/40 shadow-inner">
            <MapContainer center={CENTER} zoom={ZOOM} scrollWheelZoom={true} className="h-full w-full z-0">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {locations.map((loc) => (
                    <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={customIcon}>
                        <Popup className="glass-popup">
                            <div className="p-1">
                                <h3 className="font-bold text-green-900">{loc.name}</h3>
                                <p className="text-sm text-slate-600">{loc.description}</p>
                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full mt-2 inline-block
                                    ${loc.type === 'nature' ? 'bg-green-100 text-green-700' :
                                        loc.type === 'water' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {loc.type}
                                </span>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

