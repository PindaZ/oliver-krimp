"use client";

import React, { useState } from 'react';
import Hero from "@/components/Hero";
import { Waves, CheckCircle2, AlertTriangle, Droplets, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WaterbeheerPage() {
    const [q1, setQ1] = useState<string | null>(null);
    const [q2, setQ2] = useState<string | null>(null);
    const [q3, setQ3] = useState<string | null>(null);

    const reset = () => {
        setQ1(null);
        setQ2(null);
        setQ3(null);
    };

    return (
        <div className="space-y-12 animate-fadeIn pb-20">
            <Hero
                title="Water & Beheer"
                subtitle="De levensader van de polder. Beheer van peilen en greppels voor een vitale bodem."
                image="/images/hero_water.png"
            />

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-8 border-l-8 border-blue-600">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 p-2 rounded-xl text-blue-700 font-bold">❄️ Winter</div>
                        <h3 className="text-2xl font-black text-slate-900 leading-none">0 cm</h3>
                    </div>
                    <p className="text-sm text-slate-500 mb-4 uppercase tracking-widest font-bold">Periode: 1 okt - 1 apr</p>
                    <p className="text-slate-600">In de winter mag het water tot aan het maaiveld komen. Plas-dras situaties zijn wenselijk voor weidevogels.</p>
                </div>

                <div className="glass-card p-8 border-l-8 border-green-600">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-green-100 p-2 rounded-xl text-green-700 font-bold">☀️ Zomer</div>
                        <h3 className="text-2xl font-black text-slate-900 leading-none">-20 tot -40 cm</h3>
                    </div>
                    <p className="text-sm text-slate-500 mb-4 uppercase tracking-widest font-bold">Periode: 1 apr - 1 okt</p>
                    <p className="text-slate-600">Zomerpeil zakt om maaien mogelijk te maken. Echter, voor blauwgrasland nooit dieper dan 40 cm!</p>
                </div>
            </section>

            <section className="glass-card p-10 bg-gradient-to-br from-blue-50/50 to-green-50/50">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-4xl font-black text-slate-900 mb-4">Greppel Beslishulp</h2>
                    <p className="text-slate-600 italic">Beantwoord de vragen om het juiste beheeradvies te krijgen voor uw perceel.</p>
                </div>

                <div className="max-w-2xl mx-auto border-2 border-white/50 rounded-[3rem] p-8 shadow-inner bg-white/30">
                    <AnimatePresence mode="wait">
                        {!q1 && (
                            <motion.div
                                key="q1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6 text-center"
                            >
                                <h4 className="text-2xl font-bold text-slate-800">Is er sprake van langdurige wateroverlast in het groeiseizoen?</h4>
                                <div className="flex justify-center gap-4">
                                    <button onClick={() => setQ1('ja')} className="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-green-700 transition-colors">Ja</button>
                                    <button onClick={() => setQ1('nee')} className="bg-slate-800 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-slate-900 transition-colors">Nee</button>
                                </div>
                            </motion.div>
                        )}

                        {q1 === 'nee' && (
                            <motion.div
                                key="r1"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-6"
                            >
                                <div className="bg-green-100 text-green-700 p-4 rounded-3xl inline-block mx-auto"><CheckCircle2 size={64} /></div>
                                <h4 className="text-3xl font-black text-green-900">✅ Niets doen</h4>
                                <p className="text-slate-600">De huidige situatie is prima voor het behoud van vochtige omstandigheden.</p>
                                <button onClick={reset} className="text-sm font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest underline">Vragenlijst herstarten</button>
                            </motion.div>
                        )}

                        {q1 === 'ja' && !q2 && (
                            <motion.div
                                key="q2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6 text-center"
                            >
                                <h4 className="text-2xl font-bold text-slate-800">Is het perceel een Blauwgrasland of Vochtig Hooiland?</h4>
                                <div className="flex justify-center gap-4">
                                    <button onClick={() => setQ2('ja')} className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-colors">Ja</button>
                                    <button onClick={() => setQ2('nee')} className="bg-slate-800 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-slate-900 transition-colors">Nee / Regulier</button>
                                </div>
                            </motion.div>
                        )}

                        {q2 === 'ja' && (
                            <motion.div
                                key="r2"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-6"
                            >
                                <div className="bg-amber-100 text-amber-700 p-4 rounded-3xl inline-block mx-auto"><AlertTriangle size={64} /></div>
                                <h4 className="text-3xl font-black text-amber-900">⚠️ Wees voorzichtig!</h4>
                                <div className="bg-white/60 p-6 rounded-2xl text-left text-sm space-y-2">
                                    <p>• Blauwgraslanden hebben hoge waterstanden nodig.</p>
                                    <p>• Maak greppels niet dieper dan <strong>15 cm</strong>.</p>
                                    <p>• Alleen herstellen als beheer (maaien) onmogelijk wordt.</p>
                                </div>
                                <button onClick={reset} className="text-sm font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest underline">Vragenlijst herstarten</button>
                            </motion.div>
                        )}

                        {q2 === 'nee' && !q3 && (
                            <motion.div
                                key="q3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6 text-center"
                            >
                                <h4 className="text-2xl font-bold text-slate-800">Zijn de greppels volledig dichtgegroeid of vertrapt?</h4>
                                <div className="flex justify-center gap-4">
                                    <button onClick={() => setQ3('ja')} className="bg-red-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-red-700 transition-colors">Ja</button>
                                    <button onClick={() => setQ3('nee')} className="bg-slate-800 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-slate-900 transition-colors">Nee</button>
                                </div>
                            </motion.div>
                        )}

                        {q3 === 'ja' && (
                            <motion.div
                                key="r3"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-6"
                            >
                                <div className="bg-red-100 text-red-700 p-4 rounded-3xl inline-block mx-auto"><Waves size={64} /></div>
                                <h4 className="text-3xl font-black text-red-900">🚜 Greppelen noodzakelijk</h4>
                                <p className="text-slate-600">Haal de greppels open met een frees in het najaar. Verspreid de grond dun.</p>
                                <button onClick={reset} className="text-sm font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest underline">Vragenlijst herstarten</button>
                            </motion.div>
                        )}

                        {q3 === 'nee' && (
                            <motion.div
                                key="r4"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-6"
                            >
                                <div className="bg-blue-100 text-blue-700 p-4 rounded-3xl inline-block mx-auto"><Droplets size={64} /></div>
                                <h4 className="text-3xl font-black text-blue-900">ℹ️ Monitor situatie</h4>
                                <p className="text-slate-600">Licht onderhoud is voldoende. Behoud de kweldruk!</p>
                                <button onClick={reset} className="text-sm font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest underline">Vragenlijst herstarten</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
}
