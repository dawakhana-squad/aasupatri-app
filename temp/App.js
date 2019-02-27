import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import {FetchLocation} from './components/FetchLocation';


type Props = {};

export default class App extends Component<Props> {

  getUserLocationHandler=()=>{

  }
  render() {
    return (
      <View style={styles.container}>
        <FetchLocation onGetLocation={this.getUserLocationHandler}/>
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

