import React from "react";
import * as firebase from 'firebase';

import {
  Text,
  Container,
  Body,
  Content,
  Header,
  Title,
  Button,
  Label
} from "native-base";

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  onSignoutPress = () => {
    console.log("Sign out");
    firebase.auth().signOut();
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
          <Title>HiMinds Energy Monitor</Title>
          </Body>
        </Header>
        <Content>
        <Label>Sign out  </Label>
          <Button
            rounded
            info
            style={{
            marginTop: 10
          }}
            onPress={this.onSignoutPress}>
            <Text>Sign out</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}