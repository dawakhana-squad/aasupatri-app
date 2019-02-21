import React from 'react';
import {StyleSheet,View} from 'react-native';
import * as firebase from 'firebase';
import { Input } from './components/Input';

export default class App extends React.Component{
  componentWillMount(){
    const firebaseConfig={
      apiKey:'AIzaSyDDDJ-yqC9raNMmw3U1TeL7pqp4weamQvw',
      authDomain:'whylikethis-b14f1.firebaseapp.com',
    }
    firebase.initializeApp(firebaseConfig);
  }
  render() {
    return (
      <View style ={styles.container}>
       <Input />
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
  },
});