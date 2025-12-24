import Hero from "@/components/Hero";
import AnimatedCounter from "@/components/AnimatedCounter";
import SeasonWidget from "@/components/SeasonWidget";
import FunFacts from "@/components/FunFacts";
import WeatherWidget from "@/components/WeatherWidget";
import { Users, Droplets, Maximize, Wheat, Info, ExternalLink, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const metrics = [
  { label: 'Oppervlakte', value: '~160 km²', icon: Maximize, color: 'text-emerald-400 bg-emerald-400/10', source: 'Provincie Z-H' },
  { label: 'Inwoners', value: '~56.000', icon: Users, color: 'text-amber-400 bg-amber-400/10', source: 'CBS (2023)' },
  { label: 'Gem. Peil', value: '-2 m NAP', icon: Droplets, color: 'text-sky-400 bg-sky-400/10', source: 'HHS Krimpenerwaard' },
  { label: 'Landschap', value: 'Veenweide', icon: Wheat, color: 'text-lime-400 bg-lime-400/10', source: 'Bodemkaart NL' },
];

export default function Dashboard() {
  return (
    <div className="space-y-12 pb-20">
      <Hero
        title="Krimpenerwaard"
        subtitle="Verbonden door water, gevormd door de tijd. Een uniek polderlandschap in het hart van de Randstad."
        image="/images/hero_polder.png"
      />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className={`glass-card p-6 flex flex-col items-center text-center space-y-3 group relative hover:border-white/20 transition-all animate-fadeIn fill-mode-backwards`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className={`p-4 rounded-2xl mb-2 group-hover:scale-110 transition-transform duration-500 shadow-lg ${m.color}`}>
              <m.icon size={32} strokeWidth={1.5} />
            </div>
            <span className="text-3xl font-black text-white">
              <AnimatedCounter value={m.value} />
            </span>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs uppercase tracking-widest font-bold text-slate-400 group-hover:text-emerald-300 transition-colors">{m.label}</span>
              <span className="text-[10px] text-slate-600 font-mono">Bron: {m.source}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8 animate-fadeIn delay-300">
          <div className="glass-card p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-4">
              <span className="bg-emerald-900/50 p-2 rounded-xl border border-emerald-500/30"><Info className="text-emerald-400" /></span>
              <span className="font-serif italic">Het Groene Hart</span>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-8 font-light">
              De <strong className="text-emerald-300 font-normal">Krimpenerwaard</strong> is een uniek veenweidegebied ingeklemd tussen de rivieren de <strong className="text-white">Lek</strong>,
              de <strong className="text-white">Hollandse IJssel</strong> en de <strong className="text-white">Vlist</strong>. Het is een oase van rust in de drukke Randstad,
              gekenmerkt door een fijnmazig patroon van sloten, smalle kavels en wuivend riet.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/hotspots" className="p-5 bg-emerald-900/20 rounded-2xl border border-emerald-500/20 hover:bg-emerald-900/40 transition-all group/card cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-emerald-100">Ecologische Hotspots</h4>
                  <ArrowUpRight size={16} className="text-emerald-500 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-emerald-200/70">Essentieel leefgebied voor weidevogels en zeldzame flora.</p>
              </Link>
              <Link href="/hydrologie" className="p-5 bg-sky-900/20 rounded-2xl border border-sky-500/20 hover:bg-sky-900/40 transition-all group/card cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-sky-100">Hydrologisch Belang</h4>
                  <ArrowUpRight size={16} className="text-sky-500 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-sky-200/70">Beheer van waterpeilen ter voorkoming van veenoxidatie.</p>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/weidevogels" className="glass-card p-8 border-l-4 border-emerald-500 hover:border-emerald-400 transition-colors hover:shadow-emerald-900/20 hover:shadow-2xl group cursor-pointer">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">🦅 <span className="font-serif">Weidevogelparadijs</span></h3>
                <ArrowUpRight size={18} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </div>
              <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">De Grote Vier: Grutto, Kievit, Tureluur en Scholekster.</p>
            </Link>
            <Link href="/blauwgrasland" className="glass-card p-8 border-l-4 border-lime-500 hover:border-lime-400 transition-colors hover:shadow-lime-900/20 hover:shadow-2xl group cursor-pointer">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">🌿 <span className="font-serif">Blauwgraslanden</span></h3>
                <ArrowUpRight size={18} className="text-slate-500 group-hover:text-lime-400 transition-colors" />
              </div>
              <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">Zeldzame vegetatie op de Kortlandse Polder en Bilwijk.</p>
            </Link>
          </div>
        </div>

        <div className="space-y-6 animate-fadeIn delay-500">
          <div className="glass-card p-8 bg-black/40 border-none relative overflow-hidden">
            {/* Map texture overlay could go here */}
            <h3 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-4">📍 Locatie</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-3 rounded-lg font-mono text-emerald-400">51.95° N</div>
                <div className="bg-white/10 p-3 rounded-lg font-mono text-emerald-400">4.75° O</div>
              </div>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Gouda (Noordoost)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Rotterdam (West)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Schoonhoven (Zuidoost)</li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-8 border-t-4 border-amber-500">
            <h3 className="text-xl font-bold text-white mb-4">🚧 Actueel Beheer</h3>
            <div className="bg-amber-900/20 p-5 rounded-xl border border-amber-500/20">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-tighter">Winterrust</span>
              <p className="text-sm text-amber-200/80 mt-2 leading-relaxed">Onderhoud aan stuwen en duikers. Controle waterpeilen.</p>
            </div>
          </div>

          {/* Weather Widget */}
          <WeatherWidget />

          {/* Seasonal Widget */}
          <SeasonWidget />
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="mt-8">
        <FunFacts />
      </section>
    </div>
  );
}
