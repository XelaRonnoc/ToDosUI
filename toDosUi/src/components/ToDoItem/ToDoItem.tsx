import { useContext, useRef } from "react";
import { StyledForm } from "../../StyledComponents/Form/Form";
import { StyledInput } from "../../StyledComponents/Input/Input";
import { StyledSelect } from "../../StyledComponents/StyledSelect/StyledSelect";
import { CategoryContext } from "../../context/CategoryProvider";
import { Button } from "../../StyledComponents/Button/Button";
import { TaskContext, PartialTask } from "../../context/TaskProvider";

const ToDoItem = ({ task }: any) => {
    const { categories } = useContext(CategoryContext);
    const { addTask, tasks } = useContext(TaskContext);
    const taskInput = useRef<HTMLInputElement>(null);
    const taskSelect = useRef<HTMLSelectElement>(null);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (taskInput.current && taskSelect.current) {
            const newTask: PartialTask = {
                taskName: taskInput.current.value,
                taskCategory: taskSelect.current.value,
            };
            addTask(newTask);
            taskInput.current.value = "";
        }
        console.log(tasks);
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledInput
                type="text"
                placeholder="Type Task Here"
                ref={taskInput}
                required
                value={task.taskName}
            />
            <StyledSelect value={task.taskCategory}>
                {categories.map((category) => {
                    return <option>{category}</option>;
                })}
            </StyledSelect>

            <Button $primary type="submit">
                Duplicate
            </Button>
        </StyledForm>
    );
};

export default ToDoItem;
