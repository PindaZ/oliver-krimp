import Hero from "@/components/Hero";
import Link from "next/link";
import { Droplets, ArrowLeft, Gauge, TrendingDown, AlertTriangle, CheckCircle2 } from "lucide-react";

const waterSystems = [
    {
        name: 'Kwelwater',
        icon: '💧',
        description: 'Grondwater dat onder druk naar het oppervlak stroomt. Basenrijk en cruciaal voor blauwgraslanden.',
        importance: 'Voorkomt verzuring, voedt zeldzame vegetatie',
        status: 'Positief',
        statusColor: 'text-emerald-400',
    },
    {
        name: 'Wegzijging',
        icon: '⬇️',
        description: 'Water dat wegzakt naar diepere lagen. Versneld door diepe polders in de omgeving.',
        importance: 'Kan kweldruk verminderen',
        status: 'Aandachtspunt',
        statusColor: 'text-amber-400',
    },
    {
        name: 'Peilbeheer',
        icon: '📊',
        description: 'Actief beheer van waterstanden door het Hoogheemraadschap.',
        importance: 'Balans tussen landbouw, natuur en bodemdaling',
        status: 'Actief',
        statusColor: 'text-sky-400',
    },
];

const peilRegimes = [
    {
        period: 'Winter (okt-apr)',
        level: '0 tot -10 cm',
        reason: 'Plas-dras voor weidevogels, remmen veenoxidatie',
        color: 'border-blue-500 bg-blue-900/20',
    },
    {
        period: 'Broedseizoen (apr-jun)',
        level: '-10 tot -20 cm',
        reason: 'Bescherming nesten, toegankelijk voor kuikens',
        color: 'border-pink-500 bg-pink-900/20',
    },
    {
        period: 'Zomer (jun-sep)',
        level: '-20 tot -40 cm',
        reason: 'Maaien en hooien mogelijk maken',
        color: 'border-amber-500 bg-amber-900/20',
    },
];

export default function HydrologiePage() {
    return (
        <div className="space-y-16 animate-fadeIn pb-20">
            <Hero
                title="Hydrologie"
                subtitle="Water is de levensader van de polder. Het beheer ervan bepaalt de toekomst."
                image="/images/hero_water.png"
            />

            <div className="glass-card p-8 -mt-10 mx-auto max-w-4xl relative z-10 border border-white/20">
                <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold mb-6 transition-colors">
                    <ArrowLeft size={16} /> Terug naar Dashboard
                </Link>
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-sky-500/20 p-4 rounded-2xl">
                        <Droplets className="text-sky-400" size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white font-serif">Hydrologisch Systeem</h2>
                        <p className="text-slate-400">Kwel, peil en de balans van het veenlandschap</p>
                    </div>
                </div>
                <p className="text-slate-300 leading-relaxed">
                    De Krimpenerwaard ligt onder zeeniveau en is afhankelijk van een complex systeem van
                    <strong className="text-sky-300"> gemalen</strong>, <strong className="text-sky-300">stuwen</strong> en
                    <strong className="text-sky-300"> sloten</strong>. Het waterpeil beïnvloedt alles: van bodemdaling tot vogelbroed.
                </p>
            </div>

            <section className="max-w-6xl mx-auto px-4">
                <h3 className="text-2xl font-black text-white font-serif mb-8 border-b border-white/10 pb-4">Waterstromen</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {waterSystems.map((system) => (
                        <div key={system.name} className="glass-card p-6 hover:border-sky-500/30 transition-colors">
                            <div className="text-4xl mb-4">{system.icon}</div>
                            <h4 className="text-xl font-bold text-white mb-2">{system.name}</h4>
                            <p className="text-slate-400 text-sm mb-4">{system.description}</p>
                            <div className="bg-white/5 p-3 rounded-lg">
                                <span className="text-xs text-slate-500 uppercase tracking-widest font-bold block mb-1">Belang</span>
                                <span className="text-slate-300 text-sm">{system.importance}</span>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <span className={`${system.statusColor} font-bold text-sm`}>{system.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4">
                <h3 className="text-2xl font-black text-white font-serif mb-8 border-b border-white/10 pb-4">Peilregime</h3>
                <div className="space-y-4">
                    {peilRegimes.map((regime) => (
                        <div key={regime.period} className={`glass-card p-6 border-l-4 ${regime.color}`}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h4 className="text-lg font-bold text-white">{regime.period}</h4>
                                    <p className="text-slate-400 text-sm">{regime.reason}</p>
                                </div>
                                <div className="bg-white/10 px-6 py-3 rounded-xl">
                                    <span className="text-2xl font-black text-white font-mono">{regime.level}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4">
                <div className="glass-card p-8 bg-gradient-to-br from-red-900/30 to-amber-900/30 border border-red-500/20">
                    <div className="flex items-center gap-3 mb-4">
                        <TrendingDown className="text-red-400" size={28} />
                        <h3 className="text-xl font-bold text-white">Veenoxidatie & Bodemdaling</h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Bij te lage waterstanden komt het veen in contact met zuurstof en oxideert. Dit veroorzaakt:
                    </p>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2 text-red-200">
                            <AlertTriangle size={14} className="text-red-400" />
                            Bodemdaling van 1-2 cm per jaar
                        </li>
                        <li className="flex items-center gap-2 text-red-200">
                            <AlertTriangle size={14} className="text-red-400" />
                            CO₂-uitstoot equivalent aan 50.000 auto's per jaar
                        </li>
                        <li className="flex items-center gap-2 text-red-200">
                            <AlertTriangle size={14} className="text-red-400" />
                            Verlies van unieke veenbodemfunctie
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
