"use client";

import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, ThermometerSun, CloudSun } from 'lucide-react';

interface WeatherData {
    temperature: number;
    windSpeed: number;
    weatherCode: number;
    precipitation: number;
    humidity: number;
}

interface ForecastDay {
    date: string;
    tempMax: number;
    tempMin: number;
    weatherCode: number;
    precipSum: number;
}

// Open-Meteo weather codes to icons/descriptions
const weatherConditions: Record<number, { icon: React.ReactNode; label: string }> = {
    0: { icon: <Sun className="text-amber-400" size={24} />, label: 'Helder' },
    1: { icon: <Sun className="text-amber-400" size={24} />, label: 'Overwegend helder' },
    2: { icon: <CloudSun className="text-slate-300" size={24} />, label: 'Half bewolkt' },
    3: { icon: <Cloud className="text-slate-400" size={24} />, label: 'Bewolkt' },
    45: { icon: <Cloud className="text-slate-400" size={24} />, label: 'Mist' },
    48: { icon: <Cloud className="text-slate-400" size={24} />, label: 'Rijpmist' },
    51: { icon: <CloudRain className="text-sky-400" size={24} />, label: 'Lichte motregen' },
    53: { icon: <CloudRain className="text-sky-400" size={24} />, label: 'Motregen' },
    55: { icon: <CloudRain className="text-sky-400" size={24} />, label: 'Dichte motregen' },
    61: { icon: <CloudRain className="text-sky-400" size={24} />, label: 'Lichte regen' },
    63: { icon: <CloudRain className="text-sky-400" size={24} />, label: 'Regen' },
    65: { icon: <CloudRain className="text-sky-500" size={24} />, label: 'Zware regen' },
    71: { icon: <CloudSnow className="text-white" size={24} />, label: 'Lichte sneeuw' },
    73: { icon: <CloudSnow className="text-white" size={24} />, label: 'Sneeuw' },
    75: { icon: <CloudSnow className="text-white" size={24} />, label: 'Zware sneeuw' },
    80: { icon: <CloudRain className="text-sky-400" size={24} />, label: 'Buien' },
    81: { icon: <CloudRain className="text-sky-400" size={24} />, label: 'Regenbuien' },
    82: { icon: <CloudRain className="text-sky-500" size={24} />, label: 'Zware buien' },
    95: { icon: <CloudRain className="text-purple-400" size={24} />, label: 'Onweer' },
};

const getWeatherInfo = (code: number) => {
    return weatherConditions[code] || { icon: <Cloud className="text-slate-400" size={24} />, label: 'Onbekend' };
};

const isGoodFieldDay = (temp: number, wind: number, precip: number): boolean => {
    return temp > 5 && temp < 25 && wind < 30 && precip < 2;
};

export default function WeatherWidget() {
    const [current, setCurrent] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastDay[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Krimpenerwaard coordinates
        const lat = 51.95;
        const lon = 4.75;

        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FAmsterdam&forecast_days=4`
                );

                if (!response.ok) throw new Error('Weer ophalen mislukt');

                const data = await response.json();

                setCurrent({
                    temperature: Math.round(data.current.temperature_2m),
                    windSpeed: Math.round(data.current.wind_speed_10m),
                    weatherCode: data.current.weather_code,
                    precipitation: data.current.precipitation,
                    humidity: data.current.relative_humidity_2m,
                });

                const days: ForecastDay[] = data.daily.time.slice(1, 4).map((date: string, i: number) => ({
                    date,
                    tempMax: Math.round(data.daily.temperature_2m_max[i + 1]),
                    tempMin: Math.round(data.daily.temperature_2m_min[i + 1]),
                    weatherCode: data.daily.weather_code[i + 1],
                    precipSum: data.daily.precipitation_sum[i + 1],
                }));
                setForecast(days);
            } catch (err) {
                setError('Weer niet beschikbaar');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    const formatDay = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('nl-NL', { weekday: 'short' });
    };

    if (loading) {
        return (
            <div className="glass-card p-5 animate-pulse">
                <div className="h-4 bg-white/10 rounded w-24 mb-3"></div>
                <div className="h-8 bg-white/10 rounded w-16"></div>
            </div>
        );
    }

    if (error || !current) {
        return (
            <div className="glass-card p-5 text-center">
                <Cloud className="text-slate-500 mx-auto mb-2" size={32} />
                <p className="text-sm text-slate-500">{error || 'Laden...'}</p>
            </div>
        );
    }

    const weatherInfo = getWeatherInfo(current.weatherCode);
    const goodDay = isGoodFieldDay(current.temperature, current.windSpeed, current.precipitation);

    return (
        <div className="glass-card p-5 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-bold text-slate-400">Krimpenerwaard</span>
                {goodDay ? (
                    <span className="text-xs bg-emerald-900/30 text-emerald-400 px-2 py-1 rounded-full">☀️ Veldwerkdag</span>
                ) : (
                    <span className="text-xs bg-amber-900/30 text-amber-400 px-2 py-1 rounded-full">🏠 Kantoordag</span>
                )}
            </div>

            {/* Current */}
            <div className="flex items-center gap-4">
                <div className="text-4xl">{weatherInfo.icon}</div>
                <div>
                    <div className="text-3xl font-black text-white">{current.temperature}°C</div>
                    <div className="text-sm text-slate-400">{weatherInfo.label}</div>
                </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white/5 p-2 rounded-lg">
                    <Wind size={14} className="mx-auto mb-1 text-slate-400" />
                    <span className="text-white font-bold">{current.windSpeed}</span>
                    <span className="text-slate-500 block">km/u</span>
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                    <Droplets size={14} className="mx-auto mb-1 text-sky-400" />
                    <span className="text-white font-bold">{current.humidity}</span>
                    <span className="text-slate-500 block">%</span>
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                    <CloudRain size={14} className="mx-auto mb-1 text-sky-400" />
                    <span className="text-white font-bold">{current.precipitation}</span>
                    <span className="text-slate-500 block">mm</span>
                </div>
            </div>

            {/* Forecast */}
            <div className="border-t border-white/10 pt-3">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    {forecast.map((day) => {
                        const info = getWeatherInfo(day.weatherCode);
                        return (
                            <div key={day.date} className="space-y-1">
                                <span className="text-slate-400 uppercase font-bold">{formatDay(day.date)}</span>
                                <div className="flex justify-center">{info.icon}</div>
                                <div>
                                    <span className="text-white font-bold">{day.tempMax}°</span>
                                    <span className="text-slate-500 ml-1">{day.tempMin}°</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
