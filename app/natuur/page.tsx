import Hero from "@/components/Hero";
import { Leaf, Bird } from "lucide-react";

const habitats = [
    {
        id: 'N10.02',
        name: 'Vochtig Hooiland',
        tags: ['Prioritair', 'Kwelafhankelijk', 'Zeldzaam'],
        color: 'bg-green-600',
        species: [
            { name: 'Blauwe Knoop', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Succisa_pratensis_-_blauw_knoop_-_on_the_border_of_the_Dwingelderveld_%2801%29.jpg/640px-Succisa_pratensis_-_blauw_knoop_-_on_the_border_of_the_Dwingelderveld_%2801%29.jpg' },
            { name: 'Spaanse Ruiter', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Cirsium_dissectum_LC0128.jpg/640px-Cirsium_dissectum_LC0128.jpg' },
            { name: 'Klokjesgentiaan', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Gentiana_pneumonanthe_LC0255.jpg/640px-Gentiana_pneumonanthe_LC0255.jpg' },
        ]
    },
    {
        id: 'N12.02',
        name: 'Kruidenrijk Grasland',
        tags: ['Weidevogels', 'Mozaïekbeheer', 'Biodiversiteit'],
        color: 'bg-blue-600',
        species: [
            { name: 'Grutto', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Limosa_limosa_at_pulborough.jpg/640px-Limosa_limosa_at_pulborough.jpg' },
            { name: 'Kievit', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Vanellus_vanellus_1_%28Marek_Szczepanek%29.jpg/640px-Vanellus_vanellus_1_%28Marek_Szczepanek%29.jpg' },
            { name: 'Tureluur', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Tringa_totanus_thumbnail.jpg/640px-Tringa_totanus_thumbnail.jpg' },
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
                    <div className="flex items-center justify-between border-b pb-4 border-slate-200">
                        <div>
                            <div className="flex items-center gap-3">
                                <span className={`${h.color} text-white px-3 py-1 rounded-lg font-black text-sm`}>{h.id}</span>
                                <h2 className="text-3xl font-black text-slate-900">{h.name}</h2>
                            </div>
                            <div className="flex gap-2 mt-2">
                                {h.tags.map(tag => (
                                    <span key={tag} className="text-[10px] uppercase font-bold tracking-widest text-slate-500 bg-white/50 px-2 py-1 rounded-md border border-slate-200">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="hidden sm:flex bg-white p-3 rounded-2xl shadow-sm">
                            {h.id === 'N10.02' ? <Leaf className="text-green-600" size={32} /> : <Bird className="text-blue-600" size={32} />}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {h.species.map((s) => (
                            <div key={s.name} className="glass-card overflow-hidden group">
                                <div
                                    className="h-48 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${s.img})` }}
                                />
                                <div className="p-4 bg-white/40">
                                    <h4 className="font-bold text-slate-900">{s.name}</h4>
                                    <p className="text-xs text-slate-500 italic uppercase">Indicatorsoort</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
