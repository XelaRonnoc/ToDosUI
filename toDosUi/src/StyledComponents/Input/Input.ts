import styled, { css } from "styled-components";

interface InputProps {
    error: boolean;
}

export const StyledInput = styled.input(({ error }: InputProps) => [
    `
    border: 2px solid grey;
    border-radius: 5px;
    padding: 7px 12px;
    font-size: 1.2rem;
    width: 600px;
    cursor: text;
`,
    error && `border: 2px solid red;`,
]);
