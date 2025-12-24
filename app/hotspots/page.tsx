"use client";

import Hero from "@/components/Hero";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

// Dynamic import for Map to avoid SSR issues with Leaflet
const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-slate-900 text-emerald-500 animate-pulse">
            <span className="font-serif text-xl">Kaart laden...</span>
        </div>
    )
});

const hotspots = [
    { id: 1, name: "Kortlandse Polder", lat: 51.968, lng: 4.765, type: "Blauwgrasland", bio: "Oudste stukje boezemland van de Krimpenerwaard.", img: "https://upload.wikimedia.org/wikipedia/commons/5/5f/CirsiumDissectum.jpg" },
    { id: 2, name: "Bilwijk", lat: 51.954, lng: 4.802, type: "Natuurontwikkeling", bio: "Nieuwe natte natuur met rietmoerassen en open water.", img: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Limosa_limosa.jpg" },
    { id: 3, name: "Loetbos", lat: 51.932, lng: 4.714, type: "Moerasbos", bio: "Broekbossen en recreatie langs het riviertje de Loet.", img: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Succisa_pratensis_001.JPG" },
    { id: 4, name: "De Nesse", lat: 51.940, lng: 4.650, type: "Veenweide", bio: "Klassiek strokenlandschap met weidevogelbeheer.", img: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Vanellus_vanellus_001.JPG" }
];

export default function HotspotsPage() {
    return (
        <div className="pb-20">
            <Hero
                title="Ecologische Hotspots"
                subtitle="Verken de parels van de Krimpenerwaard. Van eeuwenoude polders tot nieuwe wildernis."
                image="/images/hero_polder.png"
            />

            <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
                <div className="glass-card p-6 mb-8 flex justify-between items-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
                        <ArrowLeft size={16} /> Terug naar Dashboard
                    </Link>
                    <span className="text-white/60 text-sm font-mono">{hotspots.length} locaties geïdentificeerd</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
                    {/* Sidebar List */}
                    <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                        {hotspots.map((spot) => (
                            <div key={spot.id} className="glass-card p-5 group hover:bg-white/10 transition-colors cursor-pointer border-l-4 border-transparent hover:border-emerald-500">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-white font-bold text-lg">{spot.name}</h3>
                                        <span className="text-xs text-emerald-400 uppercase tracking-widest font-bold bg-emerald-900/40 px-2 py-1 rounded-md mt-1 inline-block">{spot.type}</span>
                                    </div>
                                    <ExternalLink size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                                </div>
                                <p className="text-slate-400 text-sm mt-3 leading-relaxed">{spot.bio}</p>
                            </div>
                        ))}
                    </div>

                    {/* Map */}
                    <div className="lg:col-span-2 glass-card overflow-hidden h-full rounded-3xl border border-white/20 shadow-2xl relative">
                        <Map hotspots={hotspots} />
                    </div>
                </div>
            </div>
        </div>
    );
}
