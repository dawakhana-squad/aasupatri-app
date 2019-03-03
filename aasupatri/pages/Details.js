import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Clipboard, Platform, ToastAndroid, Linking } from 'react-native';
import { NavigationActions } from 'react-navigation';
import HeaderImageScrollView from './../components//ImageHeaderScrollView';
// const back =  require('./../assets/images/back.png')

// const actionIcons = {
// 	call: require('./../assets/images/call.png'),
// 	message: require('./../assets/images/message.png'),
//   email: require('./../assets/images/email.png'),
//   skype: require('./../assets/images/skype.png')
// }

export default class Details extends Component {
    doctors=[];
    constructor(props) {
    super(props)
    this.docDetails = this.props.navigation.state.params;
    this.screenWidth = Dimensions.get('window').width;
    this.state = {
      hideMiddle: true,
    }
    this.navigation = this.props.navigation;
  }

  _goBack = () => {
    const backAction = NavigationActions.back({});
    this.props.navigation.dispatch(backAction);
  }



  render() {
    console.log('doc',this.docDetails);

    return (
      <View style={{ width: "100%", height: "100%" }}>
        <HeaderImageScrollView
          maxHeight={this.screenWidth}
          minHeight={81}
          maxOverlayOpacity={1}
          overlayColor={'#f5a623'}
          minOverlayOpacity={0.1}
          renderForeground={
            () => {
              return (
                <View style={styles.onImageInfo}>
                  <View style={styles.nameCard}>
                    <Text style={styles.desgInfoMiddle}>
                      Qualification: {this.docDetails.Qualification}
                    </Text>
                    <Text style={styles.praticeMiddle}>
                      Specialization: {this.docDetails.Specialization}
                    </Text>
                    <Text style={styles.praticeMiddle}>
                      Experience: {this.docDetails.Experience}
                    </Text>
                  </View>
                </View>
              )
            }
          }
          renderTouchableFixedForeground={() => {
            return (
              <View style={styles.itemStyle}>
                <View style={styles.nameCard}>
                  <Text style={styles.mainName}>
                    Doctor Name: {this.docDetails.Doctor_name}
                  </Text>
                </View>
              </View>
            )
          }}
          renderHeader={() => (
            <Image source={require('../images/doctor.png')}
              resizeMode={'contain'}
              style={{ width: '100%', height: '70%', backgroundColor: '#0080d1' }}
            />
          )}>

          {/* {this._buildContactInformation('Work', this.empDetails.companyNumber, 'phone')}
          {this._buildContactInformation('Personal', this.empDetails.personalNumber, 'phone')}
          {this._buildContactInformation('Alternative', this.empDetails.altNumber, 'phone')}
          {this._buildContactInformation('Work', this.empDetails.companyEmail, 'email')}
          {this._buildContactInformation('Personal', this.empDetails.personalEmail, 'email')}
          {this._buildContactInformation('Skype', this.empDetails.skypeId, 'skype')}
          {this._buildContactInformation('Work Space', this.empDetails.workStationId, '')}
          {this._buildContactInformation('Work Location', this.empDetails.workLocation, '')}
          {this._buildContactInformation('Employee Code', this.empDetails.id, '')} */}
        </HeaderImageScrollView>
      </View>
    );
  }
}
          

const styles = StyleSheet.create({
  itemStyle: {
    flexDirection: 'row',
    height: 55
  },
  backTile: {
    // flex: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backStyle: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  },
  nameCard: {
    marginTop: 275,
    // flex: 90,
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 1
  },
  mainName: {
    fontSize: 18,
    color: '#000'
  },
  onImageInfo: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    flexDirection: 'column'
  },
  desgInfoMiddle: {
    fontSize: 15,
    color: '#000',
    marginBottom:5
  },
  praticeMiddle: {
    fontSize: 15,
    color: '#000',
    marginBottom:0
  },
  actionsHolder: {
    flexDirection: 'row'
  }
});

AppRegistry.registerComponent('Details', () => Details);