import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import FetchLocation from './components/FetchLocation';
import Map from './components/Map';

export default class App extends Component{
  state={
    userLocation:null,
  }
  getUserLocationHandler=()=>{
    navigator.geolocation.getCurrentPosition(position=>{
      this.setState({
        userLocation:{
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta:0.0121,
        }
      })

    },err=>console.log(err));

  }
  render() {
    return (
      <View style={styles.container}>
        <FetchLocation onGetLocation={this.getUserLocationHandler}/>
        <Map userLocation={this.state.userLocation}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});
