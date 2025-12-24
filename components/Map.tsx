"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix for Leaflet default marker icons in Next.js
// Custom Emerald Pin Icon (SVG Data URI)
const emeraldIcon = L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: #10b981; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
});

interface MapProps {
    hotspots?: Array<{
        id: number;
        name: string;
        lat: number;
        lng: number;
        type: string;
        bio: string;
    }>;
}

export default function Map({ hotspots = [] }: MapProps) {
    useEffect(() => {
        // This ensures Leaflet CSS is fully loaded before map renders
        window.dispatchEvent(new Event('resize'));
    }, []);

    return (
        <MapContainer center={[51.95, 4.75]} zoom={12} style={{ height: "100%", width: "100%" }} className="z-0">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {hotspots.map((spot) => (
                <Marker key={spot.id} position={[spot.lat, spot.lng]} icon={emeraldIcon}>
                    <Popup className="glass-popup">
                        <div className="p-2 min-w-[200px]">
                            <h3 className="font-bold text-lg text-slate-800">{spot.name}</h3>
                            <p className="text-slate-600 italic text-sm mb-2">{spot.type}</p>
                            <p className="text-xs text-slate-500">{spot.bio}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
