import React from 'react';
import Expo from 'expo';
import {AppLoading, Asset, Font} from 'expo';
import APIKey from './constants/APIKey';
import * as firebase from 'firebase';
import './platform/AndroidFix';
import MainScreen from './screens/index.js';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  constructor(props) {
    super(props);

    try {
      firebase.initializeApp(APIKey.FirebaseConfig);
    } catch (e) {
      console.log("Constructor");
      console.log(e.message);
    }

    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
      loading: true
    }
  }

  render() {

    if (!this.state.isLoadingComplete && !this.state.isAuthenticationReady && !this.props.skipLoadingScreen) {
      return (<AppLoading
        startAsync={this._loadResourcesAsync}
        onError={this._handleLoadingError}
        onFinish={this._handleFinishLoading}/>);
    } else {
      console.log("Starting Energy Monitor App");
      return (<MainScreen/>)
    }
  }

  _loadResourcesAsync = async() => {
    return Promise.all([
      Asset.loadAsync([require('./assets/images/icon.png'), require('./assets/images/splash.png')]),
      Font.loadAsync({Roboto: require("native-base/Fonts/Roboto.ttf"), Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"), Ionicons: require("native-base/Fonts/Ionicons.ttf")})
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {

    console.log("Finished loading")
    this.setState({isLoadingComplete: true});
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL);
  };
}