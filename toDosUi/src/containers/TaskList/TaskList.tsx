import { useContext, useEffect, useState } from "react";
import ToDoForm from "../../components/ToDoForm/ToDoForm";
import { TaskContext } from "../../context/TaskProvider";
import ToDoItem from "../../components/ToDoItem/ToDoItem";

const TaskList = () => {
    const { tasks } = useContext(TaskContext);
    const [update, setUpdate] = useState(0);

    const handleUpdate = () => {
        setUpdate(update + 1);
    };

    return (
        <>
            <ToDoForm />
            {tasks.map((task) => {
                return (
                    <ToDoItem
                        task={task}
                        key={task.taskId}
                        updateList={handleUpdate}
                    />
                );
            })}
        </>
    );
};

export default TaskList;
