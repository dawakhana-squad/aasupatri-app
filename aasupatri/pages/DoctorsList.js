import React, { Component } from 'react';
import { TouchableHighlight, AppRegistry, StyleSheet, View, Dimensions, FlatList, Image, DrawerLayoutAndroid, Text, Alert } from 'react-native';
import { RecyclerListView, LayoutProvider, DataProvider, RefreshControl } from "recyclerlistview";
import { getDoctorList } from '../services/backendConnection'
const DoctorIcon = require('./../images/doctor.png');

const list= [ 
    {
        name: 'john',
        age: 25
    },
    {
        name: 'hulk',
        age: 55
    },
    {
        name: 'hulk',
        age: 55
    }
];

export default class DoctorsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
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
			dim.width = 500;
		});
        this._renderRow = this._renderRow.bind(this);
        
        this.navigation = this.props.navigation;
    }

    
    componentWillMount() {
        this.setState({
            dataProvider: this.state.dataProvider.cloneWithRows(this.state.list)
        });
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

            <TouchableHighlight style={{backgroundColor:"#F7F7F7", elevation: 1, height: 80}} underlayColor="#878787" onPress={() => {

            }}>
                    <View style={styles.container}>
                        <Image style={styles.image} source={{uri: "https://www.myrtlebeachspeedway.com/wp-content/uploads/2015/09/hotel-icon.png"}}/>
                        <Text style={styles.finalPriceText}>we are in react native</Text>
                        <View style={styles.iconContainer}>
                        </View>
                    </View>
            </TouchableHighlight>

            
            // <View style={styles.itemContainer}>
            //     <TouchableOpacity
            //         style={[styles.itemStyle, this.props.style]}
            //         disabled={this.props.stopNavigation}
            //         onPress={this._displayDetails}
            //     >
            //         <View style={styles.imageCard}>
            //             <Text style={[styles.imageStyle, customStyle, this.props.iconColor]}>
            //                 {this._buildNameImg()}
            //             </Text>
            //             <Image
            //                 style={[styles.imageStyleTop, this.props.imageStyle]}
            //                 source={DoctorIcon}
            //             />
            //         </View>

            //         <View style={styles.nameCard}>
            //             <Text numberOfLines={!this.props.stopNavigation ? 1 : 2} style={[styles.mainName, this.props.nameStyle]}>{this.props.data.name}</Text>
            //             <Text numberOfLines={!this.props.stopNavigation ? 1 : 2} style={[styles.designation, this.props.infoStyle]}>{this.props.data.designation}</Text>
            //         </View>
            //     </TouchableOpacity>
            // </View>
    );
    }

    

render() {
    console.log(getDoctorList());

    return (
        <RecyclerListView
        rowRenderer={this._renderRow}
        dataProvider={this.state.dataProvider}
        layoutProvider={this._layoutProvider}
    />
    )};
    // return (
    //     <Text>
    //         {list.map((data) =>
    //             <Text>{data.name}</Text>
    //         )};
    //     </Text>
    // )};
}


AppRegistry.registerComponent('DoctorsList', () => DoctorsList);

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 8
    },
    iconContainer:{
        flex:1,
        justifyContent:'flex-end'
    },
    finalPriceText: {
        marginLeft:12
    },
    chevron:{
        width:20,
        height:20,
        resizeMode:"contain",
        position:'absolute',
        right:0,
        bottom:-10
    },
    image:{
        width:65,
        height:65
    }
};

// const styles = StyleSheet.create({
//     itemContainer: {
//         marginTop:15
//     },
//     itemStyle: {
//         flexDirection: 'row'
//     },
//     imageCard: {
//         flex: 20,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     imageStyle: {
//         width: 50, 
//         height: 50,
//         borderRadius: 25,
//         borderWidth: 1,
//         borderColor: '#999999'
//     },
//     nameCard: {
//         flex: 60,
//         alignItems: 'flex-start',
//         justifyContent: 'center'
//     },
//     mainName: {
//         fontSize: 15
//     },
//     designation: {
//         fontSize: 12        
//     },
//     optionTile: {
//         flex: 25,
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: 52,
//         backgroundColor: '#fafafa',
//     },
//     iconStyle: {
//         fontSize: 20,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop:5
//     },
//     textUnderIcon: {
//         fontSize: 11,
//         color: '#666666'
//     },
//     callIcon: {
//         color: '#00bb00'
//     },
//     messageIcon:{
//         color: '#ffac14'
//     },
//     emailIcon:{
//         color: '#7575ff'
//     },
//     infoIcon:{
//         color: '#8f8f8f'
//     }
    
// });

