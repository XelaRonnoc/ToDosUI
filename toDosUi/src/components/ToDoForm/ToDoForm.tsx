import { useContext, useRef } from "react";
import { StyledForm } from "../../StyledComponents/Form/Form";
import { StyledInput } from "../../StyledComponents/Input/Input";
import { CategoryContext } from "../../context/CategoryProvider";
import { Button } from "../../StyledComponents/Button/Button";
import { StyledSelect } from "../../StyledComponents/StyledSelect/StyledSelect";
import { PartialTask, Task, TaskContext } from "../../context/TaskProvider";

const ToDoForm = () => {
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
            />
            <StyledSelect ref={taskSelect}>
                {categories.map((category) => {
                    return <option>{category}</option>;
                })}
            </StyledSelect>

            <Button $primary type="submit">
                Add
            </Button>
        </StyledForm>
    );
};

export default ToDoForm;
