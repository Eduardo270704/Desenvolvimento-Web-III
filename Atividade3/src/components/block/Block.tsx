import styled from "styled-components";

const Sld = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  width: 250px;
  padding: 0px 10px;
  margin: 0px 10px;
`;

export default function Block({ children }: any) {
  return <Sld>{children}</Sld>;
}
