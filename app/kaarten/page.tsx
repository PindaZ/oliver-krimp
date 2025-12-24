"use client";

import dynamic from "next/dynamic";
import { Info, Map as MapIcon, Layers } from "lucide-react";

// Dynamic import for the Map component to disable SSR (Leaflet requires window)
const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full flex items-center justify-center bg-slate-100/50 rounded-3xl animate-pulse">
            <div className="flex flex-col items-center gap-2 text-slate-400">
                <MapIcon size={48} />
                <span className="font-medium">Kaart laden...</span>
            </div>
        </div>
    ),
});

export default function KaartenPage() {
    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6 animate-fadeIn">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-white flex items-center gap-3">
                        <span className="bg-green-600 p-2 rounded-2xl text-white shadow-lg shadow-green-600/20">
                            <MapIcon size={32} />
                        </span>
                        <span>Gebiedskaart</span>
                    </h1>
                    <p className="text-slate-300 mt-2 max-w-xl">
                        Verken de actuele status van de Krimpenerwaard. Klik op de iconen voor meer informatie over natuurgebieden en waterbeheer.
                    </p>
                </div>

                <div className="hidden md:flex gap-3">
                    <button className="glass-card px-4 py-2 text-sm font-bold text-white hover:scale-105 active:scale-95 flex items-center gap-2">
                        <Layers size={16} />
                        Kaartlagen
                    </button>
                    <button className="glass-card px-4 py-2 text-sm font-bold text-white hover:scale-105 active:scale-95 flex items-center gap-2">
                        <Info size={16} />
                        Legenda
                    </button>
                </div>
            </div>

            <div className="flex-1 glass-card p-2 border-2 border-white/60 relative">
                <Map />

                {/* Floating overlay for mobile/quick stats */}
                <div className="absolute top-4 right-4 z-[400] glass-card p-4 w-64 hidden lg:block bg-black/60 border-white/10">
                    <h3 className="font-bold text-white mb-2 border-b border-white/10 pb-2">Legenda</h3>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm ring-2 ring-white/20"></span>
                            <span className="text-sm text-slate-300">Natuurreservaat</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm ring-2 ring-white/20"></span>
                            <span className="text-sm text-slate-300">Waterwegen</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm ring-2 ring-white/20"></span>
                            <span className="text-sm text-slate-300">Cultuurhistorie</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
