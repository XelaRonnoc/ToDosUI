import { useContext } from "react";
import { StyledForm } from "../../StyledComponents/Form/Form";
import { CategoryContext } from "../../context/CategoryProvider";
import { Button } from "../../StyledComponents/Button/Button";
import { StyledSelect } from "../../StyledComponents/StyledSelect/StyledSelect";
import { PartialTask, TaskContext } from "../../context/TaskProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { FullInput } from "../FullInputs/FullInputs";

const taskSchema = Yup.object().shape({
    taskName: Yup.string().required(),
    taskCategory: Yup.string().required(),
});

const ToDoForm = () => {
    const { categories } = useContext(CategoryContext);
    const { addTask, tasks } = useContext(TaskContext);
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(taskSchema),
        defaultValues: {},
        mode: "all",
        reValidateMode: "onChange",
    });

    const onSubmit: SubmitHandler<PartialTask> = (data: PartialTask) => {
        addTask(data);
        reset();
        console.log(tasks);
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <FullInput
                type="text"
                placeholder="Type Task Here"
                error={errors.taskName}
                {...register("taskName")}
            />
            <StyledSelect {...register("taskCategory")}>
                {categories.map((category, index) => {
                    return <option key={index}>{category.name}</option>;
                })}
            </StyledSelect>

            <Button $primary type="submit">
                Add
            </Button>
        </StyledForm>
    );
};

export default ToDoForm;
