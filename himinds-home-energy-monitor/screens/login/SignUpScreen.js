import React from "react";
import {Image, Alert, Dimensions} from "react-native";
import * as firebase from 'firebase';

import {
  Text,
  Container,
  Body,
  Content,
  Header,
  View,
  Icon,
  Title,
  Button,
  Form,
  Item,
  Label,
  Input,
  Footer,
  FooterTab
} from "native-base";

export default class SignUpScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: ""
    };
  }

  onSignUpPress = () => {
    if (this.state.password !== this.state.passwordConfirm) {
      Alert.alert("Passwords do not match");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
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
          <Body>
            <Title>HiMinds</Title>
          </Body>
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
            <Item floatingLabel>
              <Icon name="ios-unlock"/>
              <Label>Password</Label>
              <Input
                value={this.state.password}
                onChangeText={(text) => {
                this.setState({password: text})
              }}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}/>
            </Item>
            <Item floatingLabel>
              <Icon name="ios-unlock"/>
              <Label>Confirm password</Label>
              <Input
                value={this.state.passwordConfirm}
                onChangeText={(text) => {
                this.setState({passwordConfirm: text})
              }}
                secureTextEntry={true}
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
            onPress={this.onSignUpPress}>
            <Text>
              Sign up</Text>
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