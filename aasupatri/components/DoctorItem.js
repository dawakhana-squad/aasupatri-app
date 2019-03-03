import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, AppRegistry } from 'react-native';
export default class DoctorItem extends Component {
    constructor(props){
        super(props)
            this.docData = this.props.data;
    }
  _displayDetails = () => {
    if(!this.props.stopNavigation){
      this.props.onItemSelect(this.props.data);
      this.props.navigation.navigate('Details', this.props.data);
    }
  }
  _buildNameImg = () => {
    if(!this.props.data.Doctor_name) {
      return '';
    }
    var list = this.props.data.Doctor_name.split(" ");
    return list[0].charAt(0) + list[list.length - 1].charAt(0);
  }
  render() {
      console.log('in docitem', this.docData);
    let customStyle = {};
    if(!this.props.stopNavigation){
      const id = Number(this.props.data.DrReg_no);
      const idPor = id < 1000 ? id/1000 : (id < 10000 ? id / 10000 : id / 100000);
      let color = '#'+(idPor *0xFFFFFF<<0).toString(16);
      if(!(/^#[0-9A-F]{6}$/i.test(color))) {
        color = '#f5a623';
        console.log(color, this.props.data.DrReg_no);
      }
      customStyle = {
        backgroundColor: color
      }
    }
    return (
      <TouchableOpacity
        style={styles.itemStyle}
        disabled={this.props.stopNavigation}
        onPress={this._displayDetails}
      >
        <View style={styles.imageCard}>
          <Text style={[styles.imageStyle, customStyle ,styles.userInfoIcon]}>
            {this._buildNameImg()}
          </Text>
          <Image
            style={[styles.imageStyleTop, styles.userInfoImage]}
            source={require('../images/doctor.png')}
          />
        </View>

        <View style={styles.nameCard}>
        <Text numberOfLines={1} style={styles.mainName}>{this.props.data.Doctor_name}</Text>
        <Text numberOfLines={1} style={styles.designation}>{this.props.data.Specialization}</Text>
          {/* <Text numberOfLines={!this.props.stopNavigation ? 1 : 2} style={[styles.mainName, this.props.nameStyle]}>{this.props.data.Doctor_name}</Text>
          <Text numberOfLines={!this.props.stopNavigation ? 1 : 2} style={[styles.designation, this.props.infoStyle]}>{this.props.data.Specialization}</Text> */}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemStyle: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8
  },
  imageCard: {
    flex: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#fafafa'
  },
  imageStyleTop: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position:'absolute',
    top: 0,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#999999'
  },
  nameCard: {
    flex: 60,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  mainName: {
    fontSize: 15,
    paddingRight: 20
  },
  designation: {
    fontSize: 12,
    paddingRight: 15
  },
  userInfoImage: {
    borderWidth: 0,
    borderRadius: 10
},
userInfoIcon: {
    borderColor: '#ffffff',
    color: '#f5a623',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    fontSize: 25,
    fontWeight: 'bold',
    borderRadius: 10,
},
});
