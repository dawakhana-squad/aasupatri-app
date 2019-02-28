import React, {Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  AppRegistry,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
const {width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = SCREEN_HEIGHT / SCREEN_WIDTH
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class HospitalMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   initialPosition: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    //   },
      
    };
    
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
    //   var lat = parseFloat(position.coords.latitude)
    //   var long = parseFloat(position.coords.longitude)

    //   var initialRegion = {
    //     latitude: lat,
    //     longitude: long,
    //     latitudeDelta: LATITUDE_DELTA,
    //     longitudeDelta: LONGITUDE_DELTA,
    //   }

    //   this.setState({initialPosition: initialRegion})
    this.setState({
        latitude:position.coords.latitude,
        longitude:position.coords.longitude,
        error:null,
    });
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
  }


  renderScreen = () => {
      return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}>
            <Marker 
              coordinate={this.state}
              image={require('../images/placeholder.png')}
              style={styles.marker}
              />
            </MapView>
        </View>
      );
  }

  render() {
    return (
      this.renderScreen()
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  marker: {
    height: 1,
    width: 1,
  }
});

AppRegistry.registerComponent('HospitalMap', () => HospitalMap);
