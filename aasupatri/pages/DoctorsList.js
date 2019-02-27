import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Dimensions, FlatList, Image, DrawerLayoutAndroid, Text, Alert } from 'react-native';
import { RecyclerListView, LayoutProvider, DataProvider, RefreshControl } from "recyclerlistview";


const DoctorIcon = require('./../images/doctor.png');

export default class DoctorsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
			dataProvider: new DataProvider((r1, r2) => {
				return r1.id !== r2.id
			}),
			searchList: [],
			currentUser: {},
			syncMessage: '',
		};
		this._layoutProvider = new LayoutProvider((i) => {
			return this.state.dataProvider.getDataForIndex(i);
		}, (data, dim) => {
			dim.height = 65;
			dim.width = width;
		});
		// this._renderRow = this._renderRow.bind(this);
        this.navigation = this.props.navigation;
    }
    _buildNameImg = () => {
        if(!this.props.data.name) {
          return '';
        }
        var list = this.props.data.name.split(" ");
        return list[0].charAt(0) + list[list.length - 1].charAt(0);
      }

      _displayDetails = () => {
        if(!this.props.stopNavigation){
          this.props.onItemSelect(this.props.data);
        }
    }

    _renderRow(type,item) {
		return (
            
                <View style={styles.itemContainer}>
                <TouchableOpacity
                    style={[styles.itemStyle, this.props.style]}
                    disabled={this.props.stopNavigation}
                    onPress={this._displayDetails}
                >
        <View style={styles.imageCard}>
          <Text style={[styles.imageStyle, customStyle ,this.props.iconColor]}>
            {this._buildNameImg()}
          </Text>
          <Image
            style={[styles.imageStyleTop, this.props.imageStyle]}
            source={DoctorIcon}
          />
        </View>

        <View style={styles.nameCard}>
          <Text numberOfLines={!this.props.stopNavigation ? 1 : 2} style={[styles.mainName, this.props.nameStyle]}>{this.props.data.name}</Text>
          <Text numberOfLines={!this.props.stopNavigation ? 1 : 2} style={[styles.designation, this.props.infoStyle]}>{this.props.data.designation}</Text>
        </View>
      </TouchableOpacity>
                </View>
    );
    }
    

render() {
    return (
        <RecyclerListView
        rowRenderer={this._renderRow}
        dataProvider={this.state.dataProvider}
        layoutProvider={this._layoutProvider}
    />
    )}
}

AppRegistry.registerComponent('DoctorsList', () => DoctorsList);


const styles = StyleSheet.create({
    itemContainer: {
        marginTop:15
    },
    itemStyle: {
        flexDirection: 'row'
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
        borderWidth: 1,
        borderColor: '#999999'
    },
    nameCard: {
        flex: 60,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    mainName: {
        fontSize: 15
    },
    designation: {
        fontSize: 12        
    },
    optionTile: {
        flex: 25,
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        backgroundColor: '#fafafa',
    },
    iconStyle: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:5
    },
    textUnderIcon: {
        fontSize: 11,
        color: '#666666'
    },
    callIcon: {
        color: '#00bb00'
    },
    messageIcon:{
        color: '#ffac14'
    },
    emailIcon:{
        color: '#7575ff'
    },
    infoIcon:{
        color: '#8f8f8f'
    }
    
});

