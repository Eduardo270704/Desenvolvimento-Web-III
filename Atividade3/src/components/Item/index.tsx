import styled from "styled-components";

const Sid = styled.div`
  display: flex;
  margin: 5px 0px;
  font-size: 15px;
  cursor: pointer;

  &: hover {
    color: orange;
  }
`;

export default function Item({ get, children }: any) {
  return <Sid onClick={get}>{children}</Sid>;
}
