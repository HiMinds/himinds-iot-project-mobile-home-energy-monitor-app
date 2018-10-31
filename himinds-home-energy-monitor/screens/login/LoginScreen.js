import React from "react";
import {Alert, Image, Dimensions} from "react-native";
import * as firebase from 'firebase';
import {
  Text,
  Container,
  Body,
  Content,
  Header,
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

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);

    try {
      firebase
        .auth()
        .onAuthStateChanged(this.onAuthStateChanged);

    } catch (e) {
      console.log("Constructor");
      console.log(e.message);
    }

    this.state = {
      email: "suru.dissanaike@himinds.com",
      password: ""
    };
  }

  onLoginPress = () => {
    console.log(this.state.email);
    console.log(this.state.password);

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        //REDUX

      }, (error) => {
        Alert.alert(error.message);
      });
  }

  onAuthStateChanged = (user) => {

    if (user) {
      // User is signed in.

      this.setState({
        isAuthenticationReady: !!user
      });

      this.setState({
        isAuthenticated: !!user
      });

      this.setState({userUID: user.uid});

      console.log(user.uid);
      console.log(this.state.isAuthenticationReady);
      this
        .props
        .navigation
        .navigate("EnergyLab");
    }
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

          </Form>

          <Button
            block
            info
            style={{
            marginTop: 5
          }}
            onPress={this.onLoginPress}>
            <Text>Sign in</Text>
          </Button>

          <Button
            block
            info
            style={{
            marginTop: 5,
            alignSelf: "center"
          }}
            onPress={() => navigate("SignUp")}>
            <Text>Sign up</Text>
          </Button>
          <Button
            block
            info
            style={{
            marginTop: 5,
            alignSelf: "center"
          }}
            onPress={() => navigate("ForgotPassword")}>
            <Text>Forgot password</Text>
          </Button>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>© HiMinds 2018 , HiMinds Home Energy Monitor </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}