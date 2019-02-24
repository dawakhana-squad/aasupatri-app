import React from 'react';
import { View, StyleSheet} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const Map= props =>{
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
        region={props.userLocation}

        />
        </View>
    )
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
export default Map;