"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TreePine, Waves, Mountain, ScrollText, Map as MapIcon, Sprout, Home, Compass } from 'lucide-react';

const navItems = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Natuur', href: '/natuur', icon: Sprout },
    { name: 'Hotspots', href: '/hotspots', icon: Compass },
    { name: 'Blauwgrasland', href: '/blauwgrasland', icon: TreePine },
    { name: 'Kaarten', href: '/kaarten', icon: MapIcon },
    { name: 'Historie', href: '/historie', icon: ScrollText },
    { name: 'Water', href: '/waterbeheer', icon: Waves },
    { name: 'Bodem', href: '/bodem', icon: Mountain },
];

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto max-w-7xl">
            <div className="glass-nav rounded-full p-2 pl-6 pr-2 flex items-center justify-between shadow-2xl border border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-300">

                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-3 group mr-4" onClick={() => setIsOpen(false)}>
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                        <TreePine className="text-emerald-400 relative z-10 group-hover:-rotate-12 transition-transform duration-300" size={20} />
                    </div>
                    <span className="font-black text-xl tracking-tighter text-white font-serif group-hover:text-emerald-100 transition-colors">OLIVER</span>
                </Link>

                {/* Nav Items - Desktop */}
                <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group ${isActive
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                                    : 'hover:bg-white/10 text-slate-300 hover:text-white'
                                    }`}
                            >
                                <Icon size={16} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                <span className={`text-sm font-semibold transition-all ${isActive ? 'opacity-100' : 'opacity-100'}`}>{item.name}</span>

                                {/* Active Indicator Dot */}
                                {isActive && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-300 rounded-full shadow-[0_0_8px_rgba(167,243,208,0.8)]"></span>}
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Menu Trigger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 rounded-full hover:bg-white/10 text-emerald-100 transition-colors relative z-50"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-4 p-4 glass-card rounded-3xl md:hidden flex flex-col gap-2 bg-black/90 backdrop-blur-xl border border-white/10 animate-fadeIn origin-top">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-4 p-4 rounded-xl transition-all ${isActive
                                        ? 'bg-emerald-900/40 text-emerald-100 border border-emerald-500/20'
                                        : 'text-slate-300 hover:bg-white/5'
                                    }`}
                            >
                                <div className={`p-2 rounded-lg ${isActive ? 'bg-emerald-500 text-white' : 'bg-white/5'}`}>
                                    <Icon size={20} />
                                </div>
                                <span className="font-bold text-lg">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            )}
        </nav>
    );
}
