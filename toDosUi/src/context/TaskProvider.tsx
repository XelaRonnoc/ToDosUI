import { createContext, useCallback, useState } from "react";

export interface Task {
    taskId: Number;
    taskName: string;
    taskCategory: string;
}
export interface PartialTask {
    taskName: string;
    taskCategory: string;
}

interface TaskContextProps {
    addTask: (newTask: PartialTask) => void;
    findById: (id: Number) => Task | undefined;
    removeTask: (id: Number) => Task | undefined;
    tasks: Task[];
}

export const TaskContext = createContext<TaskContextProps>({
    addTask: () => {},
    findById: () => {
        return { taskName: "", taskCategory: "", taskId: -1 };
    },
    removeTask: () => {
        return { taskName: "", taskCategory: "", taskId: -1 };
    },
    tasks: [],
});

const TaskProvider: React.FC<any> = ({ children }: any) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = useCallback(
        (newTask: PartialTask) => {
            const fullTask = {
                ...newTask,
                taskId: tasks.length,
            };
            setTasks([...tasks, fullTask as Task]);
        },
        [tasks]
    );

    const findById = useCallback(
        (id: Number) => {
            return tasks.find((task) => task.taskId === id);
        },
        [tasks]
    );

    const removeTask = useCallback(
        (id: Number) => {
            const curTask = findById(id);
            if (curTask) {
                const index = tasks.indexOf(curTask);
                return tasks.splice(index, 1)[0];
            }
        },
        [tasks]
    );

    return (
        <TaskContext.Provider value={{ findById, removeTask, addTask, tasks }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
