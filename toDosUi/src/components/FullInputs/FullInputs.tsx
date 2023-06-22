import { forwardRef, InputHTMLAttributes } from "react";
import { StyledInput } from "../../StyledComponents/Input/Input";
import { FieldError } from "react-hook-form";
import { ErrorP } from "../../StyledComponents/Form/Form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error: FieldError | undefined;
}

export const FullInput = forwardRef<HTMLInputElement, InputProps>(
    ({ error, ...rest }, ref) => {
        return (
            <div>
                <StyledInput
                    ref={ref}
                    error={Boolean(error?.message)}
                    {...rest}
                />
                {error?.message && <ErrorP>{error.message}</ErrorP>}
            </div>
        );
    }
);
