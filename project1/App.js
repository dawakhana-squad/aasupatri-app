import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import CurrentLocation from './components/CurrentLocation';
//import Login from './src/pages/login';
export default class App extends Component{

  
    constructor(props){
        super(props);
        this.state={
          latitude:0,
          longitude:0,
          latlng:{'latitude':36.4220,'longitude':-125.0841},
          long:0,
          error:null,
          markers:{latlng:{'latitude':36.4220,'longitude':-125.0841}},
        };
  }

  getHospitalLocation=()=>{
    this.setState({
      lat:36.4220,
      long:-125.0841,
    });
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position=>{
        this.setState({
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
          error:null
        });
      },error=>this.setState({error:error.message})
    );

  }
      // fetch('https://whylikethis-b14f1.firebaseio.com/hospitals.json')
    // .then(res=>res.json())
    // .then(parsedRes => {
    //   const placesArray=[];
    //   for(const key in parsedRes){
    //     placesArray.push({
    //       latitude:parsedRes[key].latitude,
    //       longitude:parsedRes[key].longitude,
    //       id:key
    //     });
    //   }
  render() {
    // const userMarker=props.userPlaces.map(userPlace=>(<MapView.Marker coordinate={userPlace} key={userPlace.id}/>);
    return (
      <View style={styles.container}>
        <MapView
            style={styles.map} 
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            initialRegion={{ 
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
            showsUserLocation: true,
                      }}
            
          >
               {this.state.markers.map(marker => (
    <Marker
              pinColor="blue"
      coordinate={marker.latlng}
      title={marker.title}
      description={marker.description}
    />
  ))}
          </MapView>
          {/* <MapView.Marker {...this.getHospitalLocation} 
          coordinate= {{'latitude':this.state.lat,'longitude':this.state.long}} pinColor='red'/> */}
      </View>    
          );
  }
}
const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   flex:1,
  //  height: 400,
  //  width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
   flex:1,

 },
});