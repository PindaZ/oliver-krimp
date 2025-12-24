"use client";

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { addObservation, speciesTypes, commonSpecies, Observation } from '@/lib/observations';

interface ObservationFormProps {
    onAdd: (obs: Observation) => void;
    onClose: () => void;
}

export default function ObservationForm({ onAdd, onClose }: ObservationFormProps) {
    const [type, setType] = useState<'bird' | 'plant' | 'mammal' | 'insect' | 'other'>('bird');
    const [species, setSpecies] = useState('');
    const [count, setCount] = useState(1);
    const [notes, setNotes] = useState('');
    const [location, setLocation] = useState('Krimpenerwaard');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!species.trim()) return;

        const newObs = addObservation({
            species: species.trim(),
            type,
            count,
            notes: notes.trim(),
            location: location.trim(),
        });

        onAdd(newObs);
        setSpecies('');
        setCount(1);
        setNotes('');
    };

    const suggestions = commonSpecies[type] || [];

    return (
        <div className="glass-card p-6 border border-emerald-500/30 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Nieuwe Observatie</h3>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X size={20} className="text-slate-400" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Type Selection */}
                <div>
                    <label className="text-sm text-slate-400 font-bold uppercase tracking-widest block mb-2">Type</label>
                    <div className="flex flex-wrap gap-2">
                        {speciesTypes.map((t) => (
                            <button
                                key={t.value}
                                type="button"
                                onClick={() => { setType(t.value); setSpecies(''); }}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${type === t.value
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                                    }`}
                            >
                                {t.emoji} {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Species Input */}
                <div>
                    <label className="text-sm text-slate-400 font-bold uppercase tracking-widest block mb-2">Soort</label>
                    <input
                        type="text"
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                        placeholder="Naam van de soort..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                        required
                    />
                    {suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {suggestions.map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setSpecies(s)}
                                    className="text-xs px-3 py-1 bg-emerald-900/30 text-emerald-300 rounded-full border border-emerald-500/20 hover:bg-emerald-900/50 transition-colors"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Count */}
                <div>
                    <label className="text-sm text-slate-400 font-bold uppercase tracking-widest block mb-2">Aantal</label>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setCount(Math.max(1, count - 1))}
                            className="w-10 h-10 bg-white/5 rounded-lg text-white hover:bg-white/10 transition-colors"
                        >
                            -
                        </button>
                        <input
                            type="number"
                            value={count}
                            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-20 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-center focus:outline-none focus:border-emerald-500"
                            min="1"
                        />
                        <button
                            type="button"
                            onClick={() => setCount(count + 1)}
                            className="w-10 h-10 bg-white/5 rounded-lg text-white hover:bg-white/10 transition-colors"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Location */}
                <div>
                    <label className="text-sm text-slate-400 font-bold uppercase tracking-widest block mb-2">Locatie</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                </div>

                {/* Notes */}
                <div>
                    <label className="text-sm text-slate-400 font-bold uppercase tracking-widest block mb-2">Notities (optioneel)</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Gedrag, habitat, bijzonderheden..."
                        rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                    <Plus size={20} />
                    Observatie Toevoegen
                </button>
            </form>
        </div>
    );
}
