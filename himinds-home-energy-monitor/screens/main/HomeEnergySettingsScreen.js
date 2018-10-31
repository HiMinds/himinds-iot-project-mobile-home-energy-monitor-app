import React from "react";
import {
  Button,
  Text,
  Container,
  Body,
  Content,
  Header,
  Title,
  Input,
  Item,
  Label
} from "native-base";

export default class HomeEnergySettings extends React.Component {
  render() {
    const {navigate} = this.props.navigation;

    return (
      <Container>
        <Header>
          <Body>
            <Title>Energy Monitor Configuration</Title>
          </Body>
        </Header>
        <Content padder>
          <Item floatingLabel style={{
            marginTop: 20
          }}>
            <Label>Voltage</Label>
            <Input/>
          </Item>

          <Item floatingLabel style={{
            marginTop: 20
          }}>
            <Label>Current</Label>
            <Input/>
          </Item>
          <Button
            block
            info
            style={{
            marginTop: 20,
            alignSelf: "center"
          }}
            onPress={() => {
            navigate("EnergyLab")
          }}>
            <Text>EnergyLab</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}