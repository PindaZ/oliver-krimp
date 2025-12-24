import Hero from "@/components/Hero";
import { History } from "lucide-react";

const timeline = [
    { year: '1000-1100', title: 'De Grote Ontginning', desc: 'Bisschoppen en graven geven moerasland uit aan kolonisten. De "Cope" ontginningsbasis wordt gelegd.', icon: '⛏️' },
    { year: '1300-1400', title: 'De Bodem Daalt', desc: 'Door ontwatering klinkt het veen in. Het maaiveld daalt, wat leidt tot natte voeten en de noodzaak tot dijken.', icon: '📉' },
    { year: '1400-1600', title: 'Strijd tegen het Water', desc: 'Windmolens verschijnen om polders droog te malen. De Sint-Elisabethsvloed (1421) laat diepe sporen na.', icon: '💨' },
    { year: '1600-1800', title: 'Gouden Eeuw van de Zuivel', desc: 'De Krimpenerwaard wordt de "kraamkamer" van de Goudse kaas. Rijke boerderijen sieren het landschap.', icon: '🧀' },
    { year: '1850-1950', title: 'Industrialisatie', desc: 'Stoomgemalen vervangen de windmolens. De productie intensiveert.', icon: '🏭' },
    { year: '2000-Heden', title: 'Nieuwe Balans', desc: 'Herwaardering van natuur. Veenweidepact en focus op duurzaamheid en biodiversiteit.', icon: '🌿' },
];

export default function HistoriePage() {
    return (
        <div className="space-y-12 animate-fadeIn">
            <Hero
                title="Erfgoed & Historie"
                subtitle="Van ruig moeras naar strak polderlandschap. Een verhaal van menselijk vernuft en overlevingsdrang."
                image="/images/hero_history.png"
            />

            <div className="max-w-4xl mx-auto space-y-8 relative">
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-green-200 rounded-full hidden md:block" />

                {timeline.map((event, idx) => (
                    <div key={idx} className="relative pl-0 md:pl-20 group">
                        <div className="absolute left-4 top-1 w-8 h-8 bg-green-600 rounded-full border-4 border-white shadow-lg hidden md:flex items-center justify-center z-10 group-hover:scale-125 transition-transform" />

                        <div className="glass-card p-8 group-hover:bg-white/80 transition-all">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <span className="text-3xl font-black text-green-700 tracking-tighter">{event.year}</span>
                                <span className="text-4xl bg-white p-2 rounded-2xl shadow-inner">{event.icon}</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 mb-2">{event.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{event.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
