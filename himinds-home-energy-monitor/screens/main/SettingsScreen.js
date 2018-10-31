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
import * as firebase from 'firebase';

export default class SettingsScreen extends React.Component {

  onLogoutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this
        .props
        .navigation
        .navigate("LogIn");

      }, (error) => {
        Alert.alert(error.message);
      });
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Profile Settings</Title>
          </Body>
        </Header>
        <Content padder>
          <Item floatingLabel style={{
            marginTop: 20
          }}>
            <Label>Settings</Label>
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
            this.onLogoutPress()
          }} >
            <Text>Logout</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}