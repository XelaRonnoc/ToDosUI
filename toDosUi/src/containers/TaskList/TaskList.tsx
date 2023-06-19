import { useContext } from "react";
import ToDoForm from "../../components/ToDoForm/ToDoForm";
import { TaskContext } from "../../context/TaskProvider";
import ToDoItem from "../../components/ToDoItem/ToDoItem";

const TaskList = () => {
    const { tasks } = useContext(TaskContext);
    return (
        <>
            <ToDoForm />
            {tasks.map((task) => {
                return <ToDoItem task={task} />;
            })}
        </>
    );
};

export default TaskList;
