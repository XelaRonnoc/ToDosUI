import { useContext, useRef } from "react";
import { Button } from "../../StyledComponents/Button/Button";
import { StyledForm } from "../../StyledComponents/Form/Form";
import { StyledInput } from "../../StyledComponents/Input/Input";
import { CategoryContext } from "../../context/CategoryProvider";

const CategoryForm = () => {
    const { categories, addCategory } = useContext(CategoryContext);
    const categoryInput = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (categoryInput.current) {
            addCategory(categoryInput.current.value);
            categoryInput.current.value = "";
        }
        console.log(categories);
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledInput
                type="text"
                placeholder="Type Category Here"
                ref={categoryInput}
                required
            />
            <Button $primary type="submit">
                Add
            </Button>
        </StyledForm>
    );
};

export default CategoryForm;
