import { useContext, useEffect, useState } from "react";
import { StyledForm } from "../../StyledComponents/Form/Form";
import { StyledSelect } from "../../StyledComponents/StyledSelect/StyledSelect";
import { CategoryContext } from "../../context/CategoryProvider";
import { Button } from "../../StyledComponents/Button/Button";
import { PartialTask, TaskContext } from "../../context/TaskProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { FullInput } from "../FullInputs/FullInputs";

const taskSchema = Yup.object().shape({
    taskName: Yup.string().required(),
    taskCategory: Yup.string().required(),
    selected: Yup.string().optional(),
});

const ToDoItem = ({ task, updateList }: any) => {
    const [curSelect, setCurSelect] = useState(false);
    const { categories } = useContext(CategoryContext);
    const {
        tasks,
        updateTask,
        removeTask,
        addTask,
        selectTask,
        deselectTask,
        selectedTasks,
    } = useContext(TaskContext);
    const {
        register,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(taskSchema),
        defaultValues: {},
        mode: "all",
        reValidateMode: "onChange",
    });

    const handleChange = (e: any) => {
        const curTask = task;
        e.preventDefault();
        if (e.target) {
            console.log(e.target.name, e.target.value);
            curTask[e.target.name] = e.target.value;
        }
        updateTask(curTask);
        console.log(tasks);
    };

    const handleSelect = (e: any) => {
        console.log(e.target.value);
        if (curSelect === false) {
            setCurSelect(true);
            selectTask(task);
        } else {
            setCurSelect(false);
            deselectTask(task.taskId);
        }
    };

    const handleDuplicate = (e: any) => {
        e.preventDefault();
        const { taskName, taskCategory } = task;
        const duplicateTask: PartialTask = { taskName, taskCategory };
        addTask(duplicateTask);
    };

    const handleDelete = (e: any) => {
        e.preventDefault();
        removeTask(task.taskId);
        updateList();
    };

    useEffect(() => {
        reset({ ...task });
    }, []);

    useEffect(() => {
        console.log("Selected", selectedTasks);
    }, [selectedTasks]);

    return (
        <StyledForm>
            <FullInput
                type="text"
                placeholder="Type Task Here"
                error={errors.taskName}
                {...register("taskName", {
                    onChange: (e) => {
                        handleChange(e);
                    },
                })}
            />
            <StyledSelect
                {...register("taskCategory", {
                    onChange: (e) => {
                        handleChange(e);
                    },
                })}
            >
                {categories.map((category, index) => {
                    return <option key={index}>{category.name}</option>;
                })}
            </StyledSelect>

            <FullInput
                type="checkbox"
                error={errors.selected}
                onClick={(e) => {
                    handleSelect(e);
                }}
                {...register("selected")}
            />

            <Button
                $primary
                onClick={(e) => {
                    handleDuplicate(e);
                }}
            >
                Duplicate
            </Button>
            <Button
                $primary
                onClick={(e) => {
                    handleDelete(e);
                }}
            >
                Delete
            </Button>
        </StyledForm>
    );
};

export default ToDoItem;
