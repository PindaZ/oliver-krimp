"use client";

import { useState, useEffect } from 'react';
import { Lightbulb, ChevronRight } from 'lucide-react';

const facts = [
    "De Krimpenerwaard is één van de laatste plekken in Nederland waar de Grutto succesvol broedt.",
    "Het veenpakket onder de Krimpenerwaard is tot 6 meter dik en 4000 jaar oud.",
    "De naam 'Krimpenerwaard' verwijst naar het 'krimpen' (inklinken) van het veen.",
    "In de Kortlandse Polder groeien meer dan 200 plantensoorten per hectare.",
    "De Klokjesgentiaan bloeit alleen in augustus en september.",
    "Het Gentiaanblauwtje legt haar eitjes uitsluitend op de Klokjesgentiaan.",
    "De waterstanden in de polder worden beheerd door meer dan 50 gemalen.",
    "Bosveen op 5 meter diepte bevat nog herkenbare houtresten van 3000 jaar oud."
];

export default function FunFacts() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const nextFact = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % facts.length);
            setIsAnimating(false);
        }, 200);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextFact();
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="glass-card p-5 bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-500/20 group cursor-pointer hover:border-emerald-400/40 transition-colors" onClick={nextFact}>
            <div className="flex items-start gap-4">
                <div className="bg-emerald-500/20 p-3 rounded-xl shrink-0">
                    <Lightbulb className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                    <span className="text-xs uppercase tracking-widest font-bold text-emerald-400 mb-2 block">
                        Wist je dat?
                    </span>
                    <p className={`text-slate-200 leading-relaxed transition-all duration-200 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                        {facts[currentIndex]}
                    </p>
                </div>
                <button className="bg-white/5 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <ChevronRight className="w-4 h-4 text-emerald-400" />
                </button>
            </div>
            <div className="flex gap-1 mt-4 justify-center">
                {facts.map((_, i) => (
                    <span
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentIndex ? 'bg-emerald-400' : 'bg-white/20'}`}
                    />
                ))}
            </div>
        </div>
    );
}
