import React from 'react';
import { View, StyleSheet} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const Map= props =>{
    return(
        <View style={styles.container}>
        <MapView 
           provider={ PROVIDER_GOOGLE }
           style={ styles.map }
           initialRegion={this.state.region}
           onPress={this.onMapPress}
           minZoomLevel={15}
           showsUserLocation={true}
           ref={ref => { this.mapView = ref } }
           

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