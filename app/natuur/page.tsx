import Hero from "@/components/Hero";
import { Leaf, Bird } from "lucide-react";
import Image from "next/image";

const habitats = [
    {
        id: 'N10.02',
        name: 'Vochtig Hooiland',
        tags: ['Prioritair', 'Kwelafhankelijk', 'Zeldzaam'],
        color: 'bg-green-600',
        species: [
            { name: 'Blauwe Knoop', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Succisa_pratensis_001.JPG' },
            { name: 'Spaanse Ruiter', img: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/CirsiumDissectum.jpg' },
            { name: 'Klokjesgentiaan', img: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Gentiana_pneumonanthe_0001.jpg' },
        ]
    },
    {
        id: 'N12.02',
        name: 'Kruidenrijk Grasland',
        tags: ['Weidevogels', 'Mozaïekbeheer', 'Biodiversiteit'],
        color: 'bg-blue-600',
        species: [
            { name: 'Grutto', img: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Limosa_limosa.jpg' },
            { name: 'Kievit', img: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Vanellus_vanellus_001.JPG' },
            { name: 'Tureluur', img: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Common_Redshank_Tringa_totanus.jpg' },
        ]
    }
];

export default function NatuurPage() {
    return (
        <div className="space-y-16 animate-fadeIn">
            <Hero
                title="Levende Natuur"
                subtitle="Van zeldzame blauwgraslanden tot vogelrijke weides. De rijkdom van het polderecosysteem."
                image="/images/hero_birds.png"
            />

            {habitats.map((h) => (
                <section key={h.id} className="space-y-8">
                    <div className="flex items-center justify-between border-b pb-4 border-white/10">
                        <div>
                            <div className="flex items-center gap-3">
                                <span className={`${h.color} text-white px-3 py-1 rounded-lg font-black text-sm shadow-lg`}>{h.id}</span>
                                <h2 className="text-3xl font-black text-white font-serif">{h.name}</h2>
                            </div>
                            <div className="flex gap-2 mt-2">
                                {h.tags.map(tag => (
                                    <span key={tag} className="text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-white/5 px-2 py-1 rounded-md border border-white/10">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="hidden sm:flex bg-white/10 p-3 rounded-2xl shadow-sm border border-white/10">
                            {h.id === 'N10.02' ? <Leaf className="text-emerald-400" size={32} /> : <Bird className="text-sky-400" size={32} />}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {h.species.map((s) => (
                            <div key={s.name} className="glass-card overflow-hidden group border border-white/10">
                                <div className="h-48 w-full relative transition-transform duration-500 group-hover:scale-110">
                                    <Image
                                        src={s.img}
                                        alt={s.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="p-4 bg-black/40 backdrop-blur-md">
                                    <h4 className="font-bold text-white">{s.name}</h4>
                                    <p className="text-xs text-slate-400 italic uppercase">Indicatorsoort</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
