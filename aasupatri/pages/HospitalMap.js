import React, {Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  AppRegistry,
  TouchableHighlight,
  Text
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';
const {width, height} = Dimensions.get('window')
//11.8311681, 92.6586401
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = SCREEN_HEIGHT / SCREEN_WIDTH
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO


const location=[
  {
    cord: {latitude:17.368162,longitude: 78.535811},
    title: 'Omni Hospital',
    description: 'Sri Sai Shivani Complex, Opposite P.V.T Market, Kothapet X Road, New Nagole Main Road, Dilsukhnagar, Laxmi Nagar Colony, Kothapet'
  },
  {
  cord: {latitude:17.390546,longitude: 78.481084},
  title: 'Aditya Hospital',
  description:'Boggulakunta, Tilak Road, Abids'
  }
  ,
  {
    cord: {latitude:17.408118,longitude: 78.484689},
    title: 'Sai Vani Super Specialty Hospital',
    description:'Opposite Indira Park, Ramakrishna Math Road, Domalgudas'
    },
    {
      cord: {latitude:17.4697664,longitude: 78.3853073},
      title: 'Ankura Hospital for Children and Women',
      description:'JNTU Hitech City Road, 7th Phase, KPHB Colony, Near Hitech City Railway Station'
      },
      {
        cord: {latitude:17.594126,longitude: 78.483647},
        title: 'Teja Clinic',
        description:'Kandlakoi, Telangana 501401'
        },
        {
          cord: {latitude:17.638612,longitude: 78.484886},
          title: 'V V R Hospital',
          description:'NH4, Near Bus Depot, RTC Colony, Medchal, Secunderabad, Telangana 501401'
          },

];
export default class HospitalMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   initialPosition: {
        latitude: 37.78825,
        longitude: -122.4324,
        // latitudeDelta: 0.0922,
        // longitudeDelta: 0.0421,
    //   },
    // 11.6357989, 92.7120575
    };
    
  }

  // componentWillMount() {
  //     console.log('call');
  //   navigator.geolocation.getCurrentPosition((position) => {
  //       console.log(position.coords.latitude);
  //   this.setState({
  //       latitude:position.coords.latitude,
  //       longitude:position.coords.longitude,
  //       error:null,
  //   });
  //   },
  //   (error) => alert(JSON.stringify(error)),
  //   {enableHighAccuracy: true});
  // }
  componentDidMount() {
    console.log('componentDidMount()')
    navigator.geolocation.getCurrentPosition(
       (position) => {
         console.log("wokeeey");
         console.log(position);
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000 },
     );
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
              pinColor='#0080d1'
              />
               {
    location.map((loc) => (<Marker 
                                          coordinate={loc.cord}
                                          title={loc.title} 
                                          description={loc.description}> 
                                          {/* <MapView.Callout tooltip style={styles.customView}>  */}
                                          <MapView.Callout> 
                                          <TouchableHighlight onPress= {()=>this.markerClick()} underlayColor='#dddddd'> 
                                          {/* <View style={styles.calloutText}>  */}
                                          <View>
                                          <Text>{loc.title}{"\n"}{loc.description}
                                          </Text> 
                                          </View> 
                                          </TouchableHighlight> 
                                          </MapView.Callout> 
                                          </Marker> ))}
              {/* {location.map((loc) => 
                 <Marker 
                 coordinate={loc}
                 />
              )} */}
            </MapView>
        </View>
      );
  }

  
  render() {
    //   console.log(this.state.latitude);
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
