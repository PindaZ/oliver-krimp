// Task management utilities

export interface Task {
    id: string;
    title: string;
    description: string;
    deadline: string;
    category: 'maaibeheer' | 'waterbeheer' | 'monitoring' | 'onderhoud' | 'overig';
    status: 'todo' | 'in-progress' | 'done';
    createdAt: string;
}

const STORAGE_KEY = 'oliver_tasks';

export function getTasks(): Task[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : getDefaultTasks();
}

export function saveTasks(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function updateTaskStatus(id: string, status: Task['status']): void {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.status = status;
        saveTasks(tasks);
    }
}

export function addTask(task: Omit<Task, 'id' | 'createdAt'>): Task {
    const tasks = getTasks();
    const newTask: Task = {
        ...task,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    };
    tasks.unshift(newTask);
    saveTasks(tasks);
    return newTask;
}

export function deleteTask(id: string): void {
    const tasks = getTasks().filter(t => t.id !== id);
    saveTasks(tasks);
}

export const taskCategories = [
    { value: 'maaibeheer', label: 'Maaibeheer', emoji: '🌾', color: 'bg-lime-500' },
    { value: 'waterbeheer', label: 'Waterbeheer', emoji: '💧', color: 'bg-sky-500' },
    { value: 'monitoring', label: 'Monitoring', emoji: '🔭', color: 'bg-purple-500' },
    { value: 'onderhoud', label: 'Onderhoud', emoji: '🔧', color: 'bg-amber-500' },
    { value: 'overig', label: 'Overig', emoji: '📋', color: 'bg-slate-500' },
] as const;

function getDefaultTasks(): Task[] {
    const now = new Date();
    const year = now.getFullYear();

    return [
        {
            id: '1',
            title: 'Winterpeil instellen',
            description: 'Waterpeil naar 0 cm t.o.v. maaiveld voor plas-dras situatie',
            deadline: `${year}-10-01`,
            category: 'waterbeheer',
            status: 'done',
            createdAt: new Date().toISOString(),
        },
        {
            id: '2',
            title: 'Weidevogel broedtellingen',
            description: 'Eerste ronde broedpaarinventarisatie Grutto/Kievit/Tureluur',
            deadline: `${year + 1}-04-15`,
            category: 'monitoring',
            status: 'todo',
            createdAt: new Date().toISOString(),
        },
        {
            id: '3',
            title: 'Eerste maaironde blauwgrasland',
            description: 'Na 1 juli - afvoeren maaisel binnen 48 uur',
            deadline: `${year + 1}-07-01`,
            category: 'maaibeheer',
            status: 'todo',
            createdAt: new Date().toISOString(),
        },
        {
            id: '4',
            title: 'Duikerinspectie',
            description: 'Controleer doorstroming en staat van alle duikers',
            deadline: `${year + 1}-09-01`,
            category: 'onderhoud',
            status: 'todo',
            createdAt: new Date().toISOString(),
        },
        {
            id: '5',
            title: 'Zomerpeil instellen',
            description: 'Waterpeil zakken naar -20 tot -40 cm voor maaibeheer',
            deadline: `${year + 1}-04-01`,
            category: 'waterbeheer',
            status: 'todo',
            createdAt: new Date().toISOString(),
        },
    ];
}
