import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import Map from './components/Mapdirect';
import CurrentLocation from './components/CurrentLocation';
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
        <Map userLocation={this.state.userLocation}/>
        <CurrentLocation onGetLocation={this.getUserLocationHandler}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   height: 400,
   width: 400,
   marginTop:150,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});
