"use client";

import { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
    value: string;
    duration?: number;
}

export default function AnimatedCounter({ value, duration = 2000 }: AnimatedCounterProps) {
    const [displayValue, setDisplayValue] = useState('0');
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        // Extract numeric part and suffix
        const match = value.match(/^([~]?)([0-9.,]+)(.*)$/);
        if (!match) {
            setDisplayValue(value);
            return;
        }

        const prefix = match[1] || '';
        const numericStr = match[2].replace(/[.,]/g, '');
        const suffix = match[3] || '';
        const targetNumber = parseInt(numericStr, 10);

        if (isNaN(targetNumber)) {
            setDisplayValue(value);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true;
                        animateValue(0, targetNumber, duration, prefix, suffix, match[2].includes('.') || match[2].includes(','));
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [value, duration]);

    const animateValue = (start: number, end: number, dur: number, prefix: string, suffix: string, hasDecimals: boolean) => {
        const startTime = performance.now();

        const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / dur, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);

            // Format with dots for thousands
            let formatted = current.toString();
            if (hasDecimals && current >= 1000) {
                formatted = current.toLocaleString('nl-NL');
            }

            setDisplayValue(`${prefix}${formatted}${suffix}`);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    return <span ref={ref}>{displayValue}</span>;
}
