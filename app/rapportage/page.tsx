"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BarChart3, PieChart, Download, Calendar, TrendingUp } from 'lucide-react';
import { getObservations, Observation, speciesTypes } from '@/lib/observations';
import { getTasks, Task, taskCategories } from '@/lib/tasks';

export default function RapportagePage() {
    const [observations, setObservations] = useState<Observation[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [period, setPeriod] = useState<'week' | 'month' | 'all'>('all');

    useEffect(() => {
        setObservations(getObservations());
        setTasks(getTasks());
    }, []);

    // Filter by period
    const filterByPeriod = <T extends { timestamp?: string; createdAt?: string }>(items: T[]): T[] => {
        if (period === 'all') return items;
        const now = new Date();
        const cutoff = new Date();
        if (period === 'week') cutoff.setDate(now.getDate() - 7);
        if (period === 'month') cutoff.setMonth(now.getMonth() - 1);

        return items.filter(item => {
            const date = new Date(item.timestamp || item.createdAt || '');
            return date >= cutoff;
        });
    };

    const filteredObs = filterByPeriod(observations);

    // Stats
    const totalSpecies = new Set(filteredObs.map(o => o.species)).size;
    const totalIndividuals = filteredObs.reduce((sum, o) => sum + o.count, 0);
    const totalLocations = new Set(filteredObs.map(o => o.location)).size;

    const tasksDone = tasks.filter(t => t.status === 'done').length;
    const tasksInProgress = tasks.filter(t => t.status === 'in-progress').length;
    const tasksTodo = tasks.filter(t => t.status === 'todo').length;

    // Species breakdown
    const speciesCounts: Record<string, number> = {};
    filteredObs.forEach(o => {
        speciesCounts[o.species] = (speciesCounts[o.species] || 0) + o.count;
    });
    const topSpecies = Object.entries(speciesCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    // Type breakdown
    const typeCounts: Record<string, number> = {};
    filteredObs.forEach(o => {
        typeCounts[o.type] = (typeCounts[o.type] || 0) + 1;
    });

    return (
        <div className="space-y-8 animate-fadeIn pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold mb-2 transition-colors">
                        <ArrowLeft size={16} /> Dashboard
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-3">
                        <span className="bg-purple-600 p-2 rounded-2xl">
                            <BarChart3 size={28} />
                        </span>
                        Rapportage
                    </h1>
                    <p className="text-slate-400 mt-2">Overzicht van je veldwerk en beheeractiviteiten</p>
                </div>
            </div>

            {/* Period Filter */}
            <div className="flex flex-wrap gap-2">
                {[
                    { value: 'week', label: 'Afgelopen week' },
                    { value: 'month', label: 'Afgelopen maand' },
                    { value: 'all', label: 'Alles' },
                ].map((p) => (
                    <button
                        key={p.value}
                        onClick={() => setPeriod(p.value as 'week' | 'month' | 'all')}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${period === p.value
                                ? 'bg-purple-600 text-white'
                                : 'bg-white/5 text-slate-300 hover:bg-white/10'
                            }`}
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-card p-6 text-center">
                    <span className="text-4xl font-black text-emerald-400">{filteredObs.length}</span>
                    <span className="text-sm text-slate-400 block mt-1">Observaties</span>
                </div>
                <div className="glass-card p-6 text-center">
                    <span className="text-4xl font-black text-sky-400">{totalSpecies}</span>
                    <span className="text-sm text-slate-400 block mt-1">Soorten</span>
                </div>
                <div className="glass-card p-6 text-center">
                    <span className="text-4xl font-black text-amber-400">{totalIndividuals}</span>
                    <span className="text-sm text-slate-400 block mt-1">Individuen</span>
                </div>
                <div className="glass-card p-6 text-center">
                    <span className="text-4xl font-black text-purple-400">{totalLocations}</span>
                    <span className="text-sm text-slate-400 block mt-1">Locaties</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Species */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <TrendingUp size={20} className="text-emerald-400" />
                        Top 5 Soorten
                    </h3>
                    {topSpecies.length === 0 ? (
                        <p className="text-slate-500 text-sm">Nog geen observaties</p>
                    ) : (
                        <div className="space-y-3">
                            {topSpecies.map(([species, count], i) => {
                                const maxCount = topSpecies[0][1];
                                const width = (count / maxCount) * 100;
                                return (
                                    <div key={species}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-white font-medium">{i + 1}. {species}</span>
                                            <span className="text-slate-400">{count}×</span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                                                style={{ width: `${width}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Type Breakdown */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <PieChart size={20} className="text-sky-400" />
                        Verdeling per Type
                    </h3>
                    {filteredObs.length === 0 ? (
                        <p className="text-slate-500 text-sm">Nog geen observaties</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {speciesTypes.map((type) => {
                                const count = typeCounts[type.value] || 0;
                                const pct = filteredObs.length > 0 ? Math.round((count / filteredObs.length) * 100) : 0;
                                return (
                                    <div key={type.value} className="bg-white/5 p-3 rounded-xl text-center">
                                        <span className="text-2xl">{type.emoji}</span>
                                        <div className="text-lg font-bold text-white mt-1">{count}</div>
                                        <div className="text-xs text-slate-500">{pct}%</div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Task Progress */}
            <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Calendar size={20} className="text-amber-400" />
                    Taakvoortgang
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-slate-500/20 p-4 rounded-xl">
                        <span className="text-3xl font-black text-slate-400">{tasksTodo}</span>
                        <span className="text-xs text-slate-500 block mt-1">Te doen</span>
                    </div>
                    <div className="bg-amber-500/20 p-4 rounded-xl">
                        <span className="text-3xl font-black text-amber-400">{tasksInProgress}</span>
                        <span className="text-xs text-slate-500 block mt-1">Bezig</span>
                    </div>
                    <div className="bg-emerald-500/20 p-4 rounded-xl">
                        <span className="text-3xl font-black text-emerald-400">{tasksDone}</span>
                        <span className="text-xs text-slate-500 block mt-1">Afgerond</span>
                    </div>
                </div>
                {tasks.length > 0 && (
                    <div className="mt-4">
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden flex">
                            <div
                                className="h-full bg-emerald-500"
                                style={{ width: `${(tasksDone / tasks.length) * 100}%` }}
                            />
                            <div
                                className="h-full bg-amber-500"
                                style={{ width: `${(tasksInProgress / tasks.length) * 100}%` }}
                            />
                        </div>
                        <p className="text-xs text-slate-500 mt-2 text-center">
                            {Math.round((tasksDone / tasks.length) * 100)}% voltooid
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
