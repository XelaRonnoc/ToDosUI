import { useContext } from "react";
import { Button } from "../../StyledComponents/Button/Button";
import { StyledForm } from "../../StyledComponents/Form/Form";
import {
    CategoryContext,
    partialCategory,
} from "../../context/CategoryProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { FullInput } from "../FullInputs/FullInputs";

const categorySchema = Yup.object().shape({
    name: Yup.string(),
});

const CategoryForm = () => {
    const { categories, addCategory } = useContext(CategoryContext);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(categorySchema),
        defaultValues: {},
        mode: "all",
        reValidateMode: "onChange",
    });

    const onSubmit: SubmitHandler<partialCategory> = (
        data: partialCategory
    ) => {
        addCategory(data);
        console.log(categories);
        reset();
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <FullInput
                type="text"
                placeholder="Type Category Here"
                {...register("name")}
                error={errors.name}
            />
            <Button $primary type="submit">
                Add
            </Button>
        </StyledForm>
    );
};

export default CategoryForm;
