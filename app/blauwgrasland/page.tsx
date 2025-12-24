import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sprout, Droplets, Sun } from "lucide-react";

export default function BlauwgraslandPage() {
    return (
        <div className="space-y-16 animate-fadeIn pb-20">
            <Hero
                title="Blauwgraslanden"
                subtitle="Een zeldzaam en bloemrijk hooilandtype. De parel van de Krimpenerwaard."
                image="/images/hero_polder.png"
            />

            <div className="glass-card p-8 -mt-10 mx-auto max-w-4xl relative z-10 border border-white/20">
                <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold mb-6 transition-colors">
                    <ArrowLeft size={16} /> Terug naar Dashboard
                </Link>
                <h2 className="text-3xl font-black text-white font-serif mb-6">Het Cirsio-Molinietum</h2>
                <div className="prose prose-invert prose-lg max-w-2xl text-slate-200 font-light leading-loose">
                    <p>
                        Blauwgraslanden (wetenschappelijk: <em>Cirsio-Molinietum</em>) behoren tot de meest soortenrijke graslanden van Europa.
                        Ze danken hun naam aan de blauwgroene kleur van de zeggen en grassen (zoals Blauwe Zegge en Pijpenstrootje) die in de zomer het beeld bepalen,
                        gevolgd door de massale bloei van de <strong className="text-emerald-300">Blauwe Knoop</strong> en <strong className="text-sky-300">Klokjesgentiaan</strong> in de nazomer.
                    </p>
                    <p>
                        In de Krimpenerwaard komen deze unieke vegetaties nog voor in specifieke natuurreservaten zoals de <strong>Kortlandse Polder</strong> en <strong>Bilwijk</strong>.
                        Ze zijn ontstaan door eeuwenlang specifiek beheer: maaien zonder bemesting op natte, verschraalde veengrond.
                    </p>
                </div>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                <div className="glass-card p-6 border-t-4 border-emerald-500">
                    <div className="bg-emerald-500/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                        <Sprout className="text-emerald-400" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Verschraling</h3>
                    <p className="text-slate-400 text-sm">
                        Essentieel is een voedselarme bodem. Door jarenlang maaien en afvoeren worden nutriënten onttrokken.
                    </p>
                </div>
                <div className="glass-card p-6 border-t-4 border-sky-500">
                    <div className="bg-sky-500/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                        <Droplets className="text-sky-400" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Kwelwater</h3>
                    <p className="text-slate-400 text-sm">
                        Gevoed door basenrijk kwelwater dat diep uit de ondergrond naar boven komt en verzuring tegengaat.
                    </p>
                </div>
                <div className="glass-card p-6 border-t-4 border-amber-500">
                    <div className="bg-amber-500/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                        <Sun className="text-amber-400" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Ma beheer</h3>
                    <p className="text-slate-400 text-sm">
                        Laat maaien (na 15 juni of zelfs juli) geeft zeldzame planten de kans om zaad te zetten.
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4">
                <h3 className="text-2xl font-black text-white font-serif mb-8 border-b border-white/10 pb-4">Karakteristieke Soorten</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="glass-card overflow-hidden group">
                        <div className="h-64 relative">
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Succisa_pratensis_001.JPG"
                                alt="Blauwe Knoop"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 25vw"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                <h4 className="text-white font-bold">Blauwe Knoop</h4>
                                <span className="text-xs text-emerald-300 uppercase tracking-widest">Succisa pratensis</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card overflow-hidden group">
                        <div className="h-64 relative">
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/5/5f/CirsiumDissectum.jpg"
                                alt="Spaanse Ruiter"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 25vw"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                <h4 className="text-white font-bold">Spaanse Ruiter</h4>
                                <span className="text-xs text-emerald-300 uppercase tracking-widest">Cirsium dissectum</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card overflow-hidden group">
                        <div className="h-64 relative">
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Gentiana_pneumonanthe_0001.jpg"
                                alt="Klokjesgentiaan"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 25vw"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                <h4 className="text-white font-bold">Klokjesgentiaan</h4>
                                <span className="text-xs text-emerald-300 uppercase tracking-widest">Gentiana pneumonanthe</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card overflow-hidden group bg-white/5 flex items-center justify-center border-dashed border-2 border-white/20">
                        <div className="text-center p-6">
                            <span className="block text-4xl mb-2">🦟</span>
                            <h4 className="text-white font-bold">Zeldzame Fauna</h4>
                            <p className="text-slate-400 text-sm mt-2">Leefgebied voor o.a. het Gentiaanblauwtje en de Moerassprinkhaan.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
