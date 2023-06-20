import { useContext, useEffect } from "react";
import { StyledForm } from "../../StyledComponents/Form/Form";
import { StyledSelect } from "../../StyledComponents/StyledSelect/StyledSelect";
import { CategoryContext } from "../../context/CategoryProvider";
import { Button } from "../../StyledComponents/Button/Button";
import { TaskContext } from "../../context/TaskProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { FullInput } from "../FullInputs/FullInputs";

const taskSchema = Yup.object().shape({
    taskName: Yup.string().required(),
    taskCategory: Yup.string().required(),
});

const ToDoItem = ({ task, updateList }: any) => {
    const { categories } = useContext(CategoryContext);
    const { tasks, updateTask, removeTask } = useContext(TaskContext);
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
        e.preventDefault;
        if (e.target) {
            if (e.target.name === "taskName") {
                console.log(e.target.name, e.target.value);
                curTask[e.target.name] = e.target.value;
            } else {
                console.log(e.target.name, e.target.value);
                curTask[e.target.name] = e.target.value;
            }
        }
        updateTask(curTask);
        console.log(tasks);
    };

    const handleDuplicate = (e: any) => {
        e.preventDefault();
        console.log("duplicating");
    };

    const handleDelete = (e: any) => {
        e.preventDefault();
        removeTask(task.taskId);
        updateList();
    };

    useEffect(() => {
        reset({ ...task });
    }, []);

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
                    return <option key={index}>{category}</option>;
                })}
            </StyledSelect>

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
