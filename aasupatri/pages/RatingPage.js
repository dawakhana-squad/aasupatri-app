import { Rating, AirbnbRating } from 'react-native-ratings';
import React, { Component } from 'react';
import { TouchableOpacity,StyleSheet, AppRegistry, View,Text } from 'react-native';
const WATER_IMAGE = require('../images/logo.png')

ratingCompleted = (rating) => {
  console.log("Rating is: " + rating)
}

export default class RatingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readOnly: false,
      score: 0,
      scoreBase: 5,
      activeColor: 'white',
      defaultColor: '#d6eaf8',
    }
    this.navigation = this.props.navigation;
  }

  _continueToLanding=()=> {
    this.props.navigation.navigate('Landing');
}
  
  render() 
  {
    return (
      <View>
       <View>
           <Text style={styles.rating}>Facilities</Text>
        </View>
        <Rating
          type='heart'
          ratingCount={3}
          imageSize={60}
          showRating
          onFinishRating={this.ratingCompleted}
        />
        {/* </View> */}

        {/* <View> */}

        <View>
           <Text style={styles.rating}>Hospitality</Text>
        </View>
        <Rating
          type='heart'
          ratingCount={3}
          imageSize={60}
          showRating
          onFinishRating={this.ratingCompleted}
        />
        {/* </View> */}
        
        {/* <View> */}
        <View>
           <Text style={styles.rating}>Maintainence</Text>
        </View>
        <Rating
          type='heart'
          ratingCount={3}
          imageSize={60}
          showRating
          onFinishRating={this.ratingCompleted}
        />
        {/* </View> */}
        {/* <View style={styles.rating}> */}
        <View>
           <Text style={styles.rating}>Billing Procedures</Text>
        </View>
        <Rating
          type='heart'
          ratingCount={3}
          imageSize={60}
          showRating
          onFinishRating={this.ratingCompleted}
        />

            <TouchableOpacity
               style={styles.submit}
                onPress={this._continueToLanding}
                underlayColor='#fff'>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
        

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  rating:{
      alignContent:'center',
      alignItems:'center',
      textAlign:'center',
      fontWeight:'bold',
      fontSize:25,
      

  },
  submit:{
    marginTop:25,
    backgroundColor:'#e84925',
    borderRadius:10,
    width: '50%',
    height: 50,
    paddingTop: 14,
    marginLeft:100
},
submitText:{
    color:'#fff',
    textAlign:'center',
    fontSize: 16
},
});

AppRegistry.registerComponent('RatingPage', () => RatingPage);