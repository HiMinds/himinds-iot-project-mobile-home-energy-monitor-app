import React from "react";
import * as firebase from 'firebase';
import 'firebase/firestore';
import {
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  StyleProvider
} from "native-base";

import Speedometer from 'react-native-speedometer-chart';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';

export default class TestLabScreen extends React.Component {

  constructor(props) {
    super(props);

    //Graph
    this.generateData = this
      .generateData
      .bind(this);

    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
      userUID: "",
      email: "suru.dissanaike@himinds.com",
      password: "gufUXP69v7r5x3G",
      posts: [],
      loading: true,
      data: [],
      latestMeasurement: null,
      dataTime: "---",
      temperature: "---"
    }

    try {
      this.firestore = firebase.firestore();
      const settings = {/* your settings... */
        timestampsInSnapshots: true
      };
      this
        .firestore
        .settings(settings);

      this.refCurrentValue = this
        .firestore
        .collection('users');

    } catch (e) {
      console.log("Constructor");
      console.log(e.message);
    }

    try {

      var doc = this.refCurrentValue;

      var observer = doc.onSnapshot(docSnapshot => {
        //console.log(`Received doc snapshot: ${docSnapshot}`);
        this.generateData();
        // ...
      }, err => {
        console.log(`Encountered error: ${err}`);
      });

      if (this._mounted == true) 
        this.generateData();

      }
    catch (e) {
      console.log("Constructor");
      console.log(e.message);
    }
  }

  componentDidMount() {

    console.log("------- componentDidMount ----------");
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  generateData() {
    let user = firebase
      .auth()
      .currentUser;

    if (!user)
      return;
    console.log(user.uid);

    if(!this._mounted)
      return;

    if (user) {
      try {
        let energyRef = this
          .refCurrentValue
          .doc(user.uid);

        let getDoc = energyRef
          .get()
          .then(doc => {
            if (!doc.exists) {
              console.log('No such document!');
            } else {
              console.log(doc.data());
              let measurement = doc.data();
              let date = measurement
                .currentValue
                .timestamp
                .toDate();

              this.setState({
                latestMeasurement: measurement,
                dataTime: date.toLocaleDateString('se-SE') + " " + date.toLocaleTimeString('se-SE'),
                temperature: measurement.currentValue.measurement.temperature
              });

              console.log("l1 " + this.state.latestMeasurement.currentValue.measurement.current_l1);
              console.log("l2 " + this.state.latestMeasurement.currentValue.measurement.current_l2);
              console.log("l3 " + this.state.latestMeasurement.currentValue.measurement.current_l3);
            }
          })
          .catch(err => {
            console.log('Error getting document', err);
          });
      } catch (error) {
        console.log(error.message);
      }
    }

    if (this.state.latestMeasurement != null) {

      let data = [
        {
          x: 'Phase 1',
          y: this.state.latestMeasurement.currentValue.measurement.current_l1
        }, {
          x: 'Phase 2',
          y: this.state.latestMeasurement.currentValue.measurement.current_l2
        }, {
          x: 'Phase 3',
          y: this.state.latestMeasurement.currentValue.measurement.current_l3
        }
      ]
      this.setState({
        data: [
          {
            seriesName: 'test2',
            data: data,
            color: '#0e95de'
          }
        ]
      })
    } else {
      let data = [
        {
          x: 'Phase 1',
          y: 1
        }, {
          x: 'Phase 2',
          y: 1
        }, {
          x: 'Phase 3',
          y: 1
        }
      ]
      this.setState({
        data: [
          {
            seriesName: 'test2',
            data: data,
            color: '#0e95de'
          }
        ]
      })
    }
  }

  render() {
 
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <Header>
            <Body>
              <Title>Home Energy Monitor</Title>
            </Body>
          </Header>
          <Content padder>
            <Card>
              <CardItem header bordered>
                <Text>Last update: {this.state.dataTime}</Text>
              </CardItem>

              <CardItem>
                <Speedometer
                  value={this.state.latestMeasurement != null
                  ? this.state.latestMeasurement.currentValue.measurement.current_l1
                  : 0}
                  totalValue={20}
                  size={180}
                  outerColor="#d3d3d3"
                  internalColor="#4863A0"
                  showText
                  text="Phase 1"
                  textStyle={{
                  color: 'black'
                }}
                  showLabels
                  labelStyle={{
                  color: 'blue'
                }}
                  showPercent
                  percentStyle={{
                  color: 'grey'
                }}/>

                <Text>
                  {this.state.latestMeasurement != null
                    ? this.state.latestMeasurement.currentValue.measurement.current_l1
                    : 0}
                </Text>
                <Text>
                  A
                </Text>
              </CardItem>

              <CardItem>
                <Speedometer
                  value={this.state.latestMeasurement != null
                  ? this.state.latestMeasurement.currentValue.measurement.current_l2
                  : 0}
                  totalValue={20}
                  size={180}
                  outerColor="#d3d3d3"
                  internalColor="#4863A0"
                  showText
                  text="Phase 2"
                  textStyle={{
                  color: 'black'
                }}
                  showLabels
                  labelStyle={{
                  color: 'blue'
                }}
                  showPercent
                  percentStyle={{
                  color: 'grey'
                }}/>

                <Text>
                  {this.state.latestMeasurement != null
                    ? this.state.latestMeasurement.currentValue.measurement.current_l2
                    : 0}
                </Text>
                <Text>
                  A
                </Text>

              </CardItem>

              <CardItem>
                <Speedometer
                  value={this.state.latestMeasurement != null
                  ? this.state.latestMeasurement.currentValue.measurement.current_l3
                  : 0}
                  totalValue={20}
                  size={180}
                  outerColor="#d3d3d3"
                  internalColor="#4863A0"
                  showText
                  text="Phase 3"
                  textStyle={{
                  color: 'black'
                }}
                  showLabels
                  labelStyle={{
                  color: 'blue'
                }}
                  showPercent
                  percentStyle={{
                  color: 'grey'
                }}/>

                <Text>
                  {this.state.latestMeasurement != null
                    ? this.state.latestMeasurement.currentValue.measurement.current_l3
                    : 0}
                </Text>
                <Text>
                  A
                </Text>
              </CardItem>

              <CardItem footer bordered>
                <Text>Location: Sigtuna, {this.state.temperature}
                  °C</Text>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}