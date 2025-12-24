import Hero from "@/components/Hero";
import Link from "next/link";
import { TreePine, ArrowLeft, MapPin, Ruler, Users } from "lucide-react";

const reserves = [
    {
        name: 'Kortlandse Polder',
        area: '45 ha',
        owner: 'Staatsbosbeheer',
        type: 'Blauwgrasland',
        typeColor: 'bg-lime-500',
        description: 'Het pronkstuk. Eén van de best ontwikkelde blauwgraslanden van Nederland met meer dan 200 plantensoorten per hectare.',
        highlights: ['Klokjesgentiaan', 'Spaanse ruiter', 'Blauwe knoop', 'Gentiaanblauwtje'],
        coords: '51.9612° N, 4.7234° O',
    },
    {
        name: 'Bilwijk',
        area: '120 ha',
        owner: 'Zuid-Hollands Landschap',
        type: 'Veenmosrietland',
        typeColor: 'bg-emerald-500',
        description: 'Uitgestrekt moerasgebied met overgangen van rietland naar schraalgrasland. Belangrijk weidevogelgebied.',
        highlights: ['Grutto', 'Watersnip', 'Grote vuurvlinder', 'Noordse woelmuis'],
        coords: '51.9423° N, 4.7891° O',
    },
    {
        name: 'Krimpenerhout',
        area: '85 ha',
        owner: 'Staatsbosbeheer',
        type: 'Moerasbos',
        typeColor: 'bg-teal-500',
        description: 'Zeldzaam elzenbroekbos op veenondergrond. Natte voeten gegarandeerd! Rijk aan mossen en paddenstoelen.',
        highlights: ['Elzenbos', 'Veenmossen', 'Kleine watersalamander', 'Ijsvogel'],
        coords: '51.9301° N, 4.6987° O',
    },
    {
        name: 'Polder Stein',
        area: '200 ha',
        owner: 'Particulier (ANV beheerd)',
        type: 'Weidevogelreservaat',
        typeColor: 'bg-sky-500',
        description: 'Voorbeeldpolder waar boeren en natuur samenwerken. Mozaïekbeheer met plas-dras en kruidenrijk grasland.',
        highlights: ['Kievit', 'Tureluur', 'Slobeend', 'Patrijs'],
        coords: '51.9567° N, 4.7456° O',
    },
];

export default function ReservatenPage() {
    return (
        <div className="space-y-16 animate-fadeIn pb-20">
            <Hero
                title="Natuurreservaten"
                subtitle="Beschermde parels in het polderlandschap. Van blauwgrasland tot moerasbos."
                image="/images/hero_polder.png"
            />

            <div className="glass-card p-8 -mt-10 mx-auto max-w-4xl relative z-10 border border-white/20">
                <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold mb-6 transition-colors">
                    <ArrowLeft size={16} /> Terug naar Dashboard
                </Link>
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-emerald-500/20 p-4 rounded-2xl">
                        <TreePine className="text-emerald-400" size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white font-serif">Beschermde Gebieden</h2>
                        <p className="text-slate-400">Hotspots van biodiversiteit in de Krimpenerwaard</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-white/5 p-4 rounded-xl">
                        <span className="text-2xl font-black text-emerald-400">450+</span>
                        <span className="text-xs text-slate-500 block uppercase tracking-widest">Hectare</span>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl">
                        <span className="text-2xl font-black text-emerald-400">4</span>
                        <span className="text-xs text-slate-500 block uppercase tracking-widest">Reservaten</span>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl">
                        <span className="text-2xl font-black text-emerald-400">200+</span>
                        <span className="text-xs text-slate-500 block uppercase tracking-widest">Soorten/ha</span>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl">
                        <span className="text-2xl font-black text-emerald-400">3</span>
                        <span className="text-xs text-slate-500 block uppercase tracking-widest">Beheerders</span>
                    </div>
                </div>
            </div>

            <section className="max-w-6xl mx-auto px-4 space-y-8">
                {reserves.map((reserve) => (
                    <div key={reserve.name} className="glass-card p-8 hover:border-emerald-500/30 transition-colors group">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <h3 className="text-2xl font-black text-white">{reserve.name}</h3>
                                    <span className={`${reserve.typeColor} text-white text-xs px-3 py-1 rounded-full font-bold`}>
                                        {reserve.type}
                                    </span>
                                </div>
                                <p className="text-slate-300 leading-relaxed mb-6">{reserve.description}</p>

                                <div className="mb-4">
                                    <span className="text-slate-500 uppercase tracking-widest text-xs font-bold block mb-2">Bijzondere soorten</span>
                                    <div className="flex flex-wrap gap-2">
                                        {reserve.highlights.map((species) => (
                                            <span key={species} className="bg-emerald-900/30 text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-500/20">
                                                {species}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-64 space-y-3">
                                <div className="bg-white/5 p-4 rounded-xl flex items-center gap-3">
                                    <Ruler size={18} className="text-slate-500" />
                                    <div>
                                        <span className="text-xs text-slate-500 uppercase tracking-widest block">Oppervlakte</span>
                                        <span className="text-white font-bold">{reserve.area}</span>
                                    </div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl flex items-center gap-3">
                                    <Users size={18} className="text-slate-500" />
                                    <div>
                                        <span className="text-xs text-slate-500 uppercase tracking-widest block">Beheerder</span>
                                        <span className="text-white font-bold">{reserve.owner}</span>
                                    </div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl flex items-center gap-3">
                                    <MapPin size={18} className="text-slate-500" />
                                    <div>
                                        <span className="text-xs text-slate-500 uppercase tracking-widest block">Coördinaten</span>
                                        <span className="text-emerald-400 font-mono text-sm">{reserve.coords}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}
