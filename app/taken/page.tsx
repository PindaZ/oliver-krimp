"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, CheckCircle2, Circle, Clock, Calendar, ListTodo } from 'lucide-react';
import { getTasks, updateTaskStatus, deleteTask, addTask, Task, taskCategories } from '@/lib/tasks';

export default function TakenPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<string>('all');
    const [showAddForm, setShowAddForm] = useState(false);

    // New task form
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newDeadline, setNewDeadline] = useState('');
    const [newCategory, setNewCategory] = useState<Task['category']>('overig');

    useEffect(() => {
        setTasks(getTasks());
    }, []);

    const handleStatusChange = (id: string, status: Task['status']) => {
        updateTaskStatus(id, status);
        setTasks(getTasks());
    };

    const handleDelete = (id: string) => {
        deleteTask(id);
        setTasks(getTasks());
    };

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        addTask({
            title: newTitle.trim(),
            description: newDescription.trim(),
            deadline: newDeadline,
            category: newCategory,
            status: 'todo',
        });

        setTasks(getTasks());
        setNewTitle('');
        setNewDescription('');
        setNewDeadline('');
        setNewCategory('overig');
        setShowAddForm(false);
    };

    const filtered = filter === 'all'
        ? tasks
        : tasks.filter((t) => t.status === filter);

    const getCategoryInfo = (cat: string) => taskCategories.find(c => c.value === cat);

    const formatDeadline = (date: string) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const isOverdue = (task: Task) => {
        if (task.status === 'done' || !task.deadline) return false;
        return new Date(task.deadline) < new Date();
    };

    const statusOrder = { 'in-progress': 0, 'todo': 1, 'done': 2 };
    const sortedTasks = [...filtered].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

    const stats = {
        total: tasks.length,
        done: tasks.filter(t => t.status === 'done').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        todo: tasks.filter(t => t.status === 'todo').length,
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
                        <span className="bg-amber-600 p-2 rounded-2xl">
                            <ListTodo size={28} />
                        </span>
                        Beheertaken
                    </h1>
                    <p className="text-slate-400 mt-2">Plan en volg je seizoensgebonden werkzaamheden</p>
                </div>

                <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2 self-start sm:self-auto"
                >
                    <Plus size={20} />
                    Nieuwe Taak
                </button>
            </div>

            {/* Add Form */}
            {showAddForm && (
                <div className="glass-card p-6 border border-amber-500/30 animate-fadeIn">
                    <h3 className="text-xl font-bold text-white mb-4">Nieuwe Taak</h3>
                    <form onSubmit={handleAddTask} className="space-y-4">
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Taak titel..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                            required
                        />
                        <textarea
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            placeholder="Beschrijving (optioneel)..."
                            rows={2}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-slate-400 block mb-2">Deadline</label>
                                <input
                                    type="date"
                                    value={newDeadline}
                                    onChange={(e) => setNewDeadline(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-slate-400 block mb-2">Categorie</label>
                                <select
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value as Task['category'])}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                                >
                                    {taskCategories.map((c) => (
                                        <option key={c.value} value={c.value}>{c.emoji} {c.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                Toevoegen
                            </button>
                            <button type="button" onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-white transition-colors">
                                Annuleren
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="glass-card p-4 text-center">
                    <span className="text-2xl font-black text-white">{stats.total}</span>
                    <span className="text-xs text-slate-400 block">Totaal</span>
                </div>
                <div className="glass-card p-4 text-center border-l-4 border-amber-500">
                    <span className="text-2xl font-black text-amber-400">{stats.inProgress}</span>
                    <span className="text-xs text-slate-400 block">Bezig</span>
                </div>
                <div className="glass-card p-4 text-center border-l-4 border-slate-500">
                    <span className="text-2xl font-black text-slate-400">{stats.todo}</span>
                    <span className="text-xs text-slate-400 block">Te doen</span>
                </div>
                <div className="glass-card p-4 text-center border-l-4 border-emerald-500">
                    <span className="text-2xl font-black text-emerald-400">{stats.done}</span>
                    <span className="text-xs text-slate-400 block">Afgerond</span>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                {[
                    { value: 'all', label: 'Alle' },
                    { value: 'todo', label: 'Te doen' },
                    { value: 'in-progress', label: 'Bezig' },
                    { value: 'done', label: 'Afgerond' },
                ].map((f) => (
                    <button
                        key={f.value}
                        onClick={() => setFilter(f.value)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === f.value
                                ? 'bg-white text-slate-900'
                                : 'bg-white/5 text-slate-300 hover:bg-white/10'
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Task List */}
            <div className="space-y-3">
                {sortedTasks.map((task) => {
                    const cat = getCategoryInfo(task.category);
                    return (
                        <div
                            key={task.id}
                            className={`glass-card p-4 sm:p-6 group hover:border-white/20 transition-colors ${task.status === 'done' ? 'opacity-60' : ''
                                } ${isOverdue(task) ? 'border-l-4 border-red-500' : ''}`}
                        >
                            <div className="flex items-start gap-4">
                                {/* Status Toggle */}
                                <button
                                    onClick={() => {
                                        const next = task.status === 'todo' ? 'in-progress' : task.status === 'in-progress' ? 'done' : 'todo';
                                        handleStatusChange(task.id, next);
                                    }}
                                    className="shrink-0 mt-1"
                                >
                                    {task.status === 'done' ? (
                                        <CheckCircle2 className="text-emerald-400" size={24} />
                                    ) : task.status === 'in-progress' ? (
                                        <Clock className="text-amber-400" size={24} />
                                    ) : (
                                        <Circle className="text-slate-500 hover:text-slate-300" size={24} />
                                    )}
                                </button>

                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <h4 className={`font-bold text-white ${task.status === 'done' ? 'line-through text-slate-400' : ''}`}>
                                            {task.title}
                                        </h4>
                                        {cat && (
                                            <span className={`${cat.color} text-white text-xs px-2 py-0.5 rounded-full`}>
                                                {cat.emoji} {cat.label}
                                            </span>
                                        )}
                                    </div>
                                    {task.description && (
                                        <p className="text-sm text-slate-400 mb-2">{task.description}</p>
                                    )}
                                    {task.deadline && (
                                        <div className={`flex items-center gap-1 text-xs ${isOverdue(task) ? 'text-red-400' : 'text-slate-500'}`}>
                                            <Calendar size={12} />
                                            {formatDeadline(task.deadline)}
                                            {isOverdue(task) && <span className="ml-1 font-bold">VERLOPEN</span>}
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
