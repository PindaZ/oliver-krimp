"use client";

import { useState, useEffect } from 'react';
import { Sun, Cloud, Snowflake, Flower2, Leaf, Bird, TreePine } from 'lucide-react';

interface SeasonData {
    name: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    activity: string;
    tip: string;
}

const seasons: Record<string, SeasonData> = {
    winter: {
        name: 'Winter',
        icon: <Snowflake className="w-6 h-6" />,
        color: 'text-sky-300',
        bgColor: 'bg-sky-900/30 border-sky-500/30',
        activity: 'Winterrust in het veld',
        tip: 'Plas-dras situaties zijn nu optimaal voor weidevogels.'
    },
    spring: {
        name: 'Lente',
        icon: <Flower2 className="w-6 h-6" />,
        color: 'text-pink-300',
        bgColor: 'bg-pink-900/30 border-pink-500/30',
        activity: 'Broedseizoen gestart!',
        tip: 'Niet maaien vóór 15 juni ter bescherming van nesten.'
    },
    summer: {
        name: 'Zomer',
        icon: <Sun className="w-6 h-6" />,
        color: 'text-amber-300',
        bgColor: 'bg-amber-900/30 border-amber-500/30',
        activity: 'Hooitijd & monitoring',
        tip: 'Blauwgraslanden mogen nu gemaaid worden (na 1 juli).'
    },
    autumn: {
        name: 'Herfst',
        icon: <Leaf className="w-6 h-6" />,
        color: 'text-orange-300',
        bgColor: 'bg-orange-900/30 border-orange-500/30',
        activity: 'Najaarsbeheer',
        tip: 'Greppelonderhoud en duikerinspectie.'
    }
};

function getCurrentSeason(): string {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
}

export default function SeasonWidget() {
    const [season, setSeason] = useState<SeasonData | null>(null);

    useEffect(() => {
        setSeason(seasons[getCurrentSeason()]);
    }, []);

    if (!season) return null;

    return (
        <div className={`glass-card p-5 ${season.bgColor} border animate-fadeIn`}>
            <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-xl bg-white/10 ${season.color}`}>
                    {season.icon}
                </div>
                <div>
                    <span className={`text-xs uppercase tracking-widest font-bold ${season.color}`}>
                        {season.name}
                    </span>
                    <h4 className="text-white font-bold">{season.activity}</h4>
                </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
                💡 {season.tip}
            </p>
        </div>
    );
}
