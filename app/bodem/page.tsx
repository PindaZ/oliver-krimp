import Hero from "@/components/Hero";
import { Info, Layers } from "lucide-react";

export default function BodemPage() {
    return (
        <div className="space-y-12 animate-fadeIn">
            <Hero
                title="De Bodem Spreekt"
                subtitle="Een archief van duizenden jaren geschiedenis onder onze voeten. Het fundament van het weidelandschap."
                image="/images/hero_soil.png"
            />

            <div className="glass-card p-8 bg-amber-50/30">
                <h2 className="text-3xl font-black text-amber-900 mb-4 flex items-center gap-3">
                    <Layers size={32} />
                    De Krimpenerwaardse Ondergrond
                </h2>
                <p className="text-lg text-slate-700">
                    Het landschap wordt bepaald door de strijd tussen water en land.
                    De bodemopbouw vertelt het verhaal van <strong>veenmosgroei</strong> (moerassen) en
                    <strong>rivierafzettingen</strong> (klei).
                </p>
            </div>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h3 className="text-2xl font-black text-amber-800">Het Veenpakket</h3>
                    <p className="text-slate-600">
                        Veen is organisch materiaal gevormd onder natte, zuurstofarme omstandigheden.
                        In de Krimpenerwaard vinden we drie hoofdlagen die cruciaal zijn voor het waterbeheer.
                    </p>

                    <div className="space-y-4">
                        <div className="glass-card p-4 hover:border-amber-400 border-l-4 border-amber-600">
                            <h4 className="font-bold text-amber-900">🌱 Zeggeveen (0-1m)</h4>
                            <p className="text-sm text-slate-600">De bovenste laag. Vezelrijk en vaak gemengd met wat klei. Hier groeien de graslanden op.</p>
                        </div>
                        <div className="glass-card p-4 hover:border-amber-400 border-l-4 border-amber-700">
                            <h4 className="font-bold text-amber-900">🌾 Rietveen (1-3m)</h4>
                            <p className="text-sm text-slate-600">De middelste laag. Ontstaan in rietmoerassen. Lichtbruin en kruimelig.</p>
                        </div>
                        <div className="glass-card p-4 hover:border-amber-400 border-l-4 border-amber-900">
                            <h4 className="font-bold text-amber-900">🌲 Bosveen (3-6m)</h4>
                            <p className="text-sm text-slate-600">De onderste laag. Zeer donker, compact en vol houtresten van oude moerasbossen.</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col h-full justify-center">
                    <div className="flex flex-col w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
                        <div className="bg-[#4E342E] h-24 flex items-center justify-center text-white font-bold border-b border-white/10">🌱 Zeggeveen</div>
                        <div className="bg-[#6D4C41] h-32 flex items-center justify-center text-white font-bold border-b border-white/10">🌾 Rietveen</div>
                        <div className="bg-[#3E2723] h-48 flex items-center justify-center text-white font-bold border-b border-white/10">🌲 Bosveen</div>
                        <div className="bg-[#FFECB3] h-12 flex items-center justify-center text-amber-900 font-bold uppercase tracking-wider text-xs italic">Pleistoceen Zand</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
