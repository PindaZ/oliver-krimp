import React from 'react';

interface HeroProps {
    title: string;
    subtitle: string;
    image: string;
}

export default function Hero({ title, subtitle, image }: HeroProps) {
    return (
        <div
            className="relative w-full h-[400px] rounded-[2rem] overflow-hidden shadow-2xl mb-12 group"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 md:p-12 transition-all duration-500 group-hover:bg-black/10">
                <h1 className="text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-2 tracking-tight hero-text-shadow animate-fadeIn break-words hyphens-auto">
                    {title}
                </h1>
                <p className="text-green-50 text-base sm:text-lg md:text-xl font-light max-w-2xl hero-text-shadow animate-fadeIn delay-150">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}
