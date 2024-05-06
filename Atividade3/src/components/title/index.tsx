import styled from "styled-components";

const Sld = styled.h3`
    text-align: center;
    width: 100%
`;

export default function Title({ children }: any) {
    return (
        <Sld>
            {children}
        </Sld>
    );
}