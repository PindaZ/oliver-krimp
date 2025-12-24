"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TreePine, Waves, Mountain, ScrollText, Map as MapIcon, Sprout, Home } from 'lucide-react';

const navItems = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Bodem', href: '/bodem', icon: Mountain },
    { name: 'Natuur', href: '/natuur', icon: Leaf },
    { name: 'Historie', href: '/historie', icon: ScrollText },
    { name: 'Kaarten', href: '/kaarten', icon: MapIcon },
    { name: 'Blauwgrasland', href: '/blauwgrasland', icon: Sprout },
    { name: 'Waterbeheer', href: '/waterbeheer', icon: Waves },
];

function Leaf(props: any) {
    return <TreePine {...props} />;
}

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="glass-nav px-8 py-4 mb-8 rounded-full mt-4 mx-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-emerald-500 p-2 rounded-xl text-white shadow-lg shadow-emerald-900/20 group-hover:scale-110 transition-transform">
                        <TreePine size={24} />
                    </div>
                    <span className="font-black text-2xl tracking-tighter text-white font-serif">OLIVER</span>
                </Link>

                <div className="hidden md:flex items-center gap-1 bg-white/20 p-1 rounded-full border border-white/40">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isActive
                                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-900/20'
                                    : 'hover:bg-white/10 text-emerald-100 hover:text-white'
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="text-sm font-semibold">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav >
    );
}
