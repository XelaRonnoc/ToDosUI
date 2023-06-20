import { useContext, useEffect } from "react";
import { StyledForm } from "../../StyledComponents/Form/Form";
import { StyledSelect } from "../../StyledComponents/StyledSelect/StyledSelect";
import { CategoryContext } from "../../context/CategoryProvider";
import { Button } from "../../StyledComponents/Button/Button";
import { TaskContext, PartialTask } from "../../context/TaskProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { FullInput } from "../FullInputs/FullInputs";

const taskSchema = Yup.object().shape({
    taskName: Yup.string().required(),
    taskCategory: Yup.string().required(),
});

const ToDoItem = ({ task }: any) => {
    const { categories } = useContext(CategoryContext);
    const { addTask, tasks } = useContext(TaskContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(taskSchema),
        defaultValues: {},
        mode: "all",
        reValidateMode: "onChange",
    });

    const onSubmit: SubmitHandler<any> = (data: PartialTask) => {
        //updateTask(data);
        console.log(tasks);
    };

    useEffect(() => {
        reset({ ...task });
    }, []);

    return (
        <StyledForm onChange={handleSubmit(onSubmit)}>
            <FullInput
                type="text"
                placeholder="Type Task Here"
                error={errors.taskName}
                {...register("taskName")}
            />
            <StyledSelect
                value={task.taskCategory}
                // error={errors.taskCategory}
                {...register("taskCategory")}
            >
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
