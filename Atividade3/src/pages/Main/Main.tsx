import { MesoProps, RegiaoProps, UfProps } from "../../types";
import useIbge from "../../hooks/useIbge";
import { Block, Item, Loading, Title } from "../../components";
import styled from "styled-components";

const WrapperSld = styled.div`
  display: flex;
`;

export default function Main() {
  const { regioes, getUfs } = useIbge();
  const { ufs, loadingUfs, getMesos } = useIbge();
  const { mesorregioes, loadingMesos } = useIbge();

  const regiaoitemloading = regioes.map((regiao: RegiaoProps) => (
    <Item key={regiao.id} get={() => getUfs(regiao.id)}>
      {regiao.nome}
    </Item>
  ));

  const estadoitemloading = ufs.map((uf: UfProps) => (
    <Item key={uf.id} get={() => getMesos(uf.sigla)}>
      {uf.nome}
    </Item>
  ));

  const mesoitemloading = mesorregioes.map((mesos: MesoProps) => (
    <Item key={mesos.id} get={() => console.log(mesos.uf, mesos.nome)}>
      {mesos.nome}
    </Item>
  ));

  return (
    <WrapperSld>
      <Block>
        <Title>Regiões</Title>
        {regioes.length !== 0 ? regiaoitemloading : <Loading />}
      </Block>
      <Block>
        <Title>Estados</Title>
        {loadingUfs ? <Loading /> : estadoitemloading}
      </Block>
      <Block>
        <Title>Mesorregiões</Title>
        {loadingMesos ? <Loading /> : mesoitemloading}
      </Block>
    </WrapperSld>
  );
}
