import React from 'react';
import { View, StyleSheet} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Overlay } from 'react-native-elements';

const Map= props =>{
    let userLocationMarker=null,userLocation=props.userLocation;
    // if(userLocation){
    //   userLocationMarker=<MapView.Marker coordinate ={props.userLocation}/>;
    // }
    return(
        <View style={styles.container}>
        <MapView 
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            initialRegion={{ 
            latitude: 11.6357989,
            longitude: 92.7120575,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        }}
        style={styles.map}
        >
          <MapView.Marker coordinate={{
                                      latitude:11.6357989,longitude:92.7120575
                                      }}/>
        </MapView>
        </View>
    )
}
    const styles = StyleSheet.create({
        container: {
          ...StyleSheet.absoluteFillObject,
          flex:1,
          height: 400,
          width: 400,
          justifyContent: 'flex-end',
          alignItems: 'center',
        },
        map: {
          ...StyleSheet.absoluteFillObject,
          left:0,
          right:0,
          top:0,
          bottom:0,
        },
       });
export default Map;