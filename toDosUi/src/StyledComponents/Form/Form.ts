import styled, { css } from "styled-components";

export const StyledForm = styled.form<{ $primary?: boolean }>`
    width: 80%;
    align-self: flex-start;
    display: flex;
    align-items: left;

    ${(props) => props.$primary && css``}
`;

export const ErrorP = styled.p`
    color: red;
`;
