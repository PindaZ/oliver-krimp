import Hero from "@/components/Hero";
import { Users, Droplets, Maximize, Wheat, Info } from "lucide-react";

const metrics = [
  { label: 'Oppervlakte', value: '~160 km²', icon: Maximize, color: 'text-blue-600' },
  { label: 'Inwoners', value: '~56.000', icon: Users, color: 'text-indigo-600' },
  { label: 'Gem. Peil', value: '-2 m NAP', icon: Droplets, color: 'text-sky-600' },
  { label: 'Landschap', value: 'Veenweide', icon: Wheat, color: 'text-amber-600' },
];

export default function Dashboard() {
  return (
    <div className="space-y-12">
      <Hero
        title="Krimpenerwaard"
        subtitle="Verbonden door water, gevormd door de tijd. Een uniek polderlandschap in het hart van de Randstad."
        image="/images/hero_polder.png"
      />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <div key={m.label} className="glass-card p-6 flex flex-col items-center text-center space-y-2 group">
            <div className={`p-4 rounded-2xl bg-white shadow-inner mb-2 group-hover:scale-110 transition-transform ${m.color}`}>
              <m.icon size={32} />
            </div>
            <span className="text-3xl font-black text-green-900">{m.value}</span>
            <span className="text-xs uppercase tracking-widest font-bold text-slate-500">{m.label}</span>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-8">
            <h2 className="text-3xl font-black text-green-900 mb-4 flex items-center gap-3">
              <span className="bg-green-100 p-2 rounded-lg"><Info className="text-green-700" /></span>
              Het Groene Hart
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              De <strong className="text-green-800">Krimpenerwaard</strong> is een uniek veenweidegebied ingeklemd tussen de rivieren de <strong>Lek</strong>,
              de <strong>Hollandse IJssel</strong> en de <strong>Vlist</strong>. Het is een oase van rust in de drukke Randstad,
              gekenmerkt door een fijnmazig patroon van sloten, smalle kavels en wuivend riet.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50/50 rounded-2xl border border-green-100">
                <h4 className="font-bold text-green-900 mb-1">Ecologische Hotspots</h4>
                <p className="text-sm text-slate-600">Essentieel leefgebied voor weidevogels en zeldzame flora.</p>
              </div>
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-1">Hydrologisch Belang</h4>
                <p className="text-sm text-slate-600">Beheer van waterpeilen ter voorkoming van veenoxidatie.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 border-l-8 border-green-600">
              <h3 className="text-xl font-bold text-green-900 mb-2">🦅 Weidevogelparadijs</h3>
              <p className="text-sm text-slate-600">Ideaal broedgebied voor de 'Grote Vier': Grutto, Kievit, Tureluur en Scholekster.</p>
            </div>
            <div className="glass-card p-6 border-l-8 border-blue-600">
              <h3 className="text-xl font-bold text-blue-900 mb-2">🌿 Blauwgraslanden</h3>
              <p className="text-sm text-slate-600">Zeldzame vegetatie op de Kortlandse Polder en Bilwijk.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 bg-slate-800/90 text-white border-none">
            <h3 className="text-xl font-bold mb-4">📍 Locatie</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">51.95° N</div>
                <div className="bg-white/20 p-2 rounded-lg">4.75° O</div>
              </div>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Gouda (Noordoost)</li>
                <li>• Rotterdam (West)</li>
                <li>• Schoonhoven (Zuidoost)</li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-6 border-t-8 border-amber-500">
            <h3 className="text-xl font-bold text-slate-900 mb-2">🚧 Actueel Beheer</h3>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
              <span className="text-amber-800 font-bold text-xs uppercase tracking-tighter">Winterrust</span>
              <p className="text-sm text-amber-900 mt-1">Onderhoud aan stuwen en duikers. Controle waterpeilen.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
