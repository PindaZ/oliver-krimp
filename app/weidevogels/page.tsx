import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";
import { Bird, ArrowLeft, MapPin, Calendar, AlertTriangle } from "lucide-react";

const birds = [
    {
        name: 'Grutto',
        latin: 'Limosa limosa',
        status: 'Bedreigd',
        statusColor: 'bg-red-500',
        population: '~800 broedparen',
        img: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Limosa_limosa.jpg',
        description: 'De iconische ambassadeur van het Nederlandse weidelandschap. Herkenbaar aan de lange rechte snavel en de roestbruine borst in zomerkleed.',
        habitat: 'Vochtige, kruidenrijke graslanden met hoge waterstand.',
        threats: ['Intensieve landbouw', 'Predatie door vossen', 'Te vroeg maaien'],
    },
    {
        name: 'Kievit',
        latin: 'Vanellus vanellus',
        status: 'Kwetsbaar',
        statusColor: 'bg-amber-500',
        population: '~2.500 broedparen',
        img: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Vanellus_vanellus_001.JPG',
        description: 'Bekend om zijn acrobatische baltsvlucht en kenmerkende kuif. De roep "kie-wit" is onmiskenbaar.',
        habitat: 'Open grasland met korte vegetatie en kale plekken.',
        threats: ['Nestpredatie', 'Machines', 'Verdroging'],
    },
    {
        name: 'Tureluur',
        latin: 'Tringa totanus',
        status: 'Kwetsbaar',
        statusColor: 'bg-amber-500',
        population: '~600 broedparen',
        img: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Common_Redshank_Tringa_totanus.jpg',
        description: 'De "politieagent van de polder" vanwege zijn alarmkreet bij verstoring. Opvallende oranje poten.',
        habitat: 'Natte graslanden met greppels en plas-dras.',
        threats: ['Verdroging', 'Verlies van greppels', 'Verstoring'],
    },
    {
        name: 'Scholekster',
        latin: 'Haematopus ostralegus',
        status: 'Gevoelig',
        statusColor: 'bg-yellow-500',
        population: '~1.200 broedparen',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Oystercatcher_%28Haematopus_ostralegus%29.jpg/1280px-Oystercatcher_%28Haematopus_ostralegus%29.jpg',
        description: 'Zwart-wit met opvallende oranje snavel. Broedt op daken én in weilanden.',
        habitat: 'Variabel: van weilanden tot stedelijk gebied.',
        threats: ['Voedseltekort in de winter', 'Predatie'],
    },
];

export default function WeidevogelsPage() {
    return (
        <div className="space-y-16 animate-fadeIn pb-20">
            <Hero
                title="Weidevogels"
                subtitle="De 'Grote Vier' van de Krimpenerwaard. Ambassadeurs van een levend landschap."
                image="/images/hero_birds.png"
            />

            <div className="glass-card p-8 -mt-10 mx-auto max-w-4xl relative z-10 border border-white/20">
                <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold mb-6 transition-colors">
                    <ArrowLeft size={16} /> Terug naar Dashboard
                </Link>
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-emerald-500/20 p-4 rounded-2xl">
                        <Bird className="text-emerald-400" size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white font-serif">De Grote Vier</h2>
                        <p className="text-slate-400">Karakteristieke broedvogels van het veenweidelandschap</p>
                    </div>
                </div>
                <div className="bg-amber-900/20 p-4 rounded-xl border border-amber-500/20">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                        <AlertTriangle size={16} /> Beschermingsstatus
                    </div>
                    <p className="text-sm text-amber-200/80">
                        Alle vier de soorten staan onder druk. De Krimpenerwaard is één van de laatste bolwerken.
                    </p>
                </div>
            </div>

            <section className="max-w-6xl mx-auto px-4 space-y-8">
                {birds.map((bird, idx) => (
                    <div key={bird.name} className={`glass-card overflow-hidden group ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} md:flex`}>
                        <div className="md:w-1/3 h-64 md:h-auto relative">
                            <Image
                                src={bird.img}
                                alt={bird.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                        <div className="md:w-2/3 p-8">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <h3 className="text-2xl font-black text-white">{bird.name}</h3>
                                <span className="text-sm text-emerald-300 italic">{bird.latin}</span>
                                <span className={`${bird.statusColor} text-white text-xs px-2 py-1 rounded-full font-bold`}>
                                    {bird.status}
                                </span>
                            </div>
                            <p className="text-slate-300 leading-relaxed mb-6">{bird.description}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <div className="bg-white/5 p-4 rounded-xl">
                                    <span className="text-slate-500 uppercase tracking-widest text-xs font-bold block mb-1">Populatie</span>
                                    <span className="text-white font-bold">{bird.population}</span>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl">
                                    <span className="text-slate-500 uppercase tracking-widest text-xs font-bold block mb-1">Habitat</span>
                                    <span className="text-slate-300">{bird.habitat}</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <span className="text-slate-500 uppercase tracking-widest text-xs font-bold block mb-2">Bedreigingen</span>
                                <div className="flex flex-wrap gap-2">
                                    {bird.threats.map((threat) => (
                                        <span key={threat} className="bg-red-900/20 text-red-300 text-xs px-3 py-1 rounded-full border border-red-500/20">
                                            {threat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}
