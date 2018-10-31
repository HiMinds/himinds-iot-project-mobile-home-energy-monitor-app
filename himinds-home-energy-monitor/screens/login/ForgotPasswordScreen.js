import React from "react";
import {Image, Alert, Dimensions} from "react-native";
import * as firebase from 'firebase';

import {
  Text,
  Container,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Button,
  Form,
  Item,
  Label,
  Input,
  View,
  Footer,
  FooterTab
} from "native-base";

export default class ForgotPasswordScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  onResetPasswordPress = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        Alert.alert("Password reset email has been sent.");
        this
          .props
          .navigation
          .navigate("LogIn");
      }, (error) => {
        Alert.alert(error.message);
      });
  }

  render() {
    const {navigate} = this.props.navigation;
    let {height, width} = Dimensions.get('window');

    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>HiMinds</Title>
          </Body>
          <Right/>
        </Header>

        <Content>
          <View>
            <Image
              style={{
              width: width,
              height: 120
            }}
              source={require('../../assets/images/abstract-background-blur-949587.jpg')}/>
          </View>
          <Form>
            <Item floatingLabel>
              <Icon name="ios-person"/>
              <Label>E-mail
              </Label>
              <Input
                value={this.state.email}
                onChangeText={(text) => {
                this.setState({email: text})
              }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}/>
            </Item>
          </Form>
          <Button
            block
            info
            style={{
            marginTop: 10
          }}
            onPress={this.onResetPasswordPress}>
            <Text>Reset password</Text>
          </Button>

          <Button
            block
            info
            style={{
            marginTop: 10,
            alignSelf: "center"
          }}
            onPress={() => navigate("LogIn")}>
            <Text>Login Page</Text>
          </Button>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>© HiMinds 2018 , HiMinds Home Energy Monitor
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}