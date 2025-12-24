"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, Bird, Leaf, Search, Calendar } from 'lucide-react';
import ObservationForm from '@/components/ObservationForm';
import { getObservations, deleteObservation, Observation, speciesTypes } from '@/lib/observations';

export default function ObservatiesPage() {
    const [observations, setObservations] = useState<Observation[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        setObservations(getObservations());
    }, []);

    const handleAdd = (obs: Observation) => {
        setObservations((prev) => [obs, ...prev]);
        setShowForm(false);
    };

    const handleDelete = (id: string) => {
        deleteObservation(id);
        setObservations((prev) => prev.filter((o) => o.id !== id));
    };

    const filtered = filter === 'all'
        ? observations
        : observations.filter((o) => o.type === filter);

    const getTypeEmoji = (type: string) => {
        return speciesTypes.find((t) => t.value === type)?.emoji || '❓';
    };

    const formatDate = (iso: string) => {
        const date = new Date(iso);
        return date.toLocaleDateString('nl-NL', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-8 animate-fadeIn pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold mb-2 transition-colors">
                        <ArrowLeft size={16} /> Dashboard
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-3">
                        <span className="bg-emerald-600 p-2 rounded-2xl">
                            <Search size={28} />
                        </span>
                        Observaties
                    </h1>
                    <p className="text-slate-400 mt-2">Log en bekijk je veldwaarnemingen</p>
                </div>

                <button
                    onClick={() => setShowForm(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2 self-start sm:self-auto"
                >
                    <Plus size={20} />
                    Nieuwe Observatie
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <ObservationForm onAdd={handleAdd} onClose={() => setShowForm(false)} />
            )}

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === 'all'
                            ? 'bg-white text-slate-900'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                >
                    Alle ({observations.length})
                </button>
                {speciesTypes.map((t) => {
                    const count = observations.filter((o) => o.type === t.value).length;
                    return (
                        <button
                            key={t.value}
                            onClick={() => setFilter(t.value)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === t.value
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                                }`}
                        >
                            {t.emoji} {count}
                        </button>
                    );
                })}
            </div>

            {/* Observation List */}
            {filtered.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <div className="text-6xl mb-4">🔭</div>
                    <h3 className="text-xl font-bold text-white mb-2">Geen observaties</h3>
                    <p className="text-slate-400 mb-6">Begin met het loggen van je veldwaarnemingen</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                        <Plus size={16} />
                        Eerste Observatie
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    {filtered.map((obs) => (
                        <div
                            key={obs.id}
                            className="glass-card p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-emerald-500/30 transition-colors"
                        >
                            <div className="flex items-start gap-4">
                                <div className="text-3xl shrink-0">{getTypeEmoji(obs.type)}</div>
                                <div>
                                    <h4 className="text-lg font-bold text-white">{obs.species}</h4>
                                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
                                        <span className="bg-emerald-900/30 text-emerald-300 px-2 py-0.5 rounded-full">
                                            {obs.count}×
                                        </span>
                                        <span>📍 {obs.location}</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {formatDate(obs.timestamp)}
                                        </span>
                                    </div>
                                    {obs.notes && (
                                        <p className="text-sm text-slate-500 mt-1 italic">"{obs.notes}"</p>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={() => handleDelete(obs.id)}
                                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                title="Verwijderen"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Stats Summary */}
            {observations.length > 0 && (
                <div className="glass-card p-6 bg-emerald-900/20 border-emerald-500/20">
                    <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-3">Samenvatting</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        <div>
                            <span className="text-2xl font-black text-white">{observations.length}</span>
                            <span className="text-xs text-slate-400 block">Observaties</span>
                        </div>
                        <div>
                            <span className="text-2xl font-black text-white">
                                {new Set(observations.map((o) => o.species)).size}
                            </span>
                            <span className="text-xs text-slate-400 block">Soorten</span>
                        </div>
                        <div>
                            <span className="text-2xl font-black text-white">
                                {observations.reduce((sum, o) => sum + o.count, 0)}
                            </span>
                            <span className="text-xs text-slate-400 block">Individuen</span>
                        </div>
                        <div>
                            <span className="text-2xl font-black text-white">
                                {new Set(observations.map((o) => o.location)).size}
                            </span>
                            <span className="text-xs text-slate-400 block">Locaties</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
