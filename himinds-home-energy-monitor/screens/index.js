import React, {Component} from "react";

import LogInScreen from "./login/LoginScreen";
import SignUp from "./login/SignUpScreen";
import ForgotPassword from "./login/ForgotPasswordScreen";
import Home from "./login/HomeScreen";
import TestLabScreen from "./main/TestLabScreen";
import SettingsScreen from "./main/SettingsScreen.js";
import HomeEnergySettings from "./main/HomeEnergySettingsScreen.js";

import {createStackNavigator} from "react-navigation";
import {createBottomTabNavigator} from "react-navigation";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default AppStackNavigator = createStackNavigator({

  mainFlow: {
    screen: createStackNavigator({
      LogIn: {
        screen: LogInScreen
      },
      SignUp: {
        screen: SignUp
      },
      ForgotPassword: {
        screen: ForgotPassword
      },
      Home: {
        screen: Home
      },
      someTab: {
        screen: createBottomTabNavigator({
          Home: {
            screen: HomeEnergySettings,
            navigationOptions: {
              tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                  name={focused ? 'ios-home' : 'ios-home-outline'}
                  size={26}
                  style={{ color: tintColor }}
                />
              ),
            },
          },
          EnergyLab: {
            screen: TestLabScreen,
            navigationOptions: {
              tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                  name={focused ? 'ios-pulse' : 'ios-pulse-outline'}
                  size={26}
                  style={{ color: tintColor }}
                />
              ),
            },
          },
          Settings: {
            screen: SettingsScreen,
            navigationOptions: {
              tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                  name={focused ? 'ios-settings' : 'ios-settings-outline'}
                  size={26}
                  style={{ color: tintColor }}
                />
              ),
            },
          }
        })
      }
    }, {
      headerMode: 'none',
      mode: 'card',
      headerBackTitleVisible: false,
      navigationOptions: {
        gesturesEnabled: false
      }
    }, {initialRouteName: "LogIn"})
  }
});