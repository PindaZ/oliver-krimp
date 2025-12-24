// Local storage utilities for observations

export interface Observation {
    id: string;
    species: string;
    type: 'bird' | 'plant' | 'mammal' | 'insect' | 'other';
    count: number;
    notes: string;
    location: string;
    timestamp: string;
}

const STORAGE_KEY = 'oliver_observations';

export function getObservations(): Observation[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function addObservation(obs: Omit<Observation, 'id' | 'timestamp'>): Observation {
    const observations = getObservations();
    const newObs: Observation = {
        ...obs,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
    };
    observations.unshift(newObs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(observations));
    return newObs;
}

export function deleteObservation(id: string): void {
    const observations = getObservations().filter(o => o.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(observations));
}

export function clearObservations(): void {
    localStorage.removeItem(STORAGE_KEY);
}

export const speciesTypes = [
    { value: 'bird', label: 'Vogel', emoji: '🦅' },
    { value: 'plant', label: 'Plant', emoji: '🌿' },
    { value: 'mammal', label: 'Zoogdier', emoji: '🦊' },
    { value: 'insect', label: 'Insect', emoji: '🦋' },
    { value: 'other', label: 'Overig', emoji: '❓' },
] as const;

export const commonSpecies = {
    bird: ['Grutto', 'Kievit', 'Tureluur', 'Scholekster', 'Slobeend', 'Watersnip', 'Gele Kwikstaart'],
    plant: ['Klokjesgentiaan', 'Blauwe Knoop', 'Spaanse Ruiter', 'Dotterbloem', 'Echte Koekoeksbloem'],
    mammal: ['Noordse Woelmuis', 'Hermelijn', 'Wezel', 'Haas', 'Ree'],
    insect: ['Gentiaanblauwtje', 'Grote Vuurvlinder', 'Heideblauwtje'],
    other: [],
};
