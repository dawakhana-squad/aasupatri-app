import React, { Component } from 'react';
import { TouchableOpacity, AppRegistry, StyleSheet, View, Dimensions, FlatList, Image, DrawerLayoutAndroid, Text, Alert } from 'react-native';

export default class heart extends Component {
    constructor(props) {
        super();
        this.searchEnabled = false;
        this.childFunctions = [];
        this.empList = [];
        this.state = {
            showEmpList: true,
            recentSearch: [],
            searchValue: '',
            empList: [],
            switch1Value: false,
        }
        
    }
    render() {
        return (
            <View style={styles.container}>
            <View style={styles.rowStyle2}>
            <TouchableOpacity style={styles.rowStyle2} >                            
                            
            <Text style={styles.TextStyle}>Coronary Artery Disease</Text>
            <Text style={styles.TextStyle1}>Syptoms:</Text>
            <Text style={styles.TextStyle2}>1.Pain in the Chest</Text>
            <Text style={styles.TextStyle2}>2.Nausea</Text>
            <Text style={styles.TextStyle2}>3.LightHeadedness and sweating</Text>

            <Text style={styles.TextStyle1}>Tests</Text>
            <Text style={styles.TextStyle2}>Cardiac CT</Text>
            <Text style={styles.TextStyle2}>ECG</Text>
            <Text style={styles.TextStyle2}>3D Echo</Text>
            
            <Text style={styles.TextStyle}>Cardiac Arrest</Text>
            <Text style={styles.TextStyle1}>Syptoms:</Text>
            <Text style={styles.TextStyle2}>1.Pain in the Chest</Text>

            <Text style={styles.TextStyle2}>2.Collapse,Fainting</Text>

            <Text style={styles.TextStyle2}>3.Pulselessness,Palputations</Text>

            <Text style={styles.TextStyle1}>Tests</Text>
            <Text style={styles.TextStyle2}>CPR</Text>

            <Text style={styles.TextStyle2}>Echocardiogram</Text>

            <Text style={styles.TextStyle2}>CT,MRI</Text>
            </TouchableOpacity>
                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        //borderBottomWidth: StyleSheet.hairlineWidth,
    },
    TextStyle:{
        fontWeight:'bold',
        color:'#0080d1',
        fontSize:25,
        marginTop:10,
        marginLeft:20,


    },
    TextStyle1:{
        //fontWeight:'bold',
        color:'red',
        fontSize:20,
        marginTop:10,
        marginLeft:30,

    },
    TextStyle2:{
        //fontWeight:'bold',
        color:'#0080d1',
        fontSize:15,
        marginTop:10,
        marginLeft:30,

    },
    rowStyle2: {
        height: 100,
        marginTop:30,
        paddingBottom:20,
        marginRight:30,
        marginLeft:30,
        flexDirection:'row', 
        flexWrap:'wrap'
    },
    
});
AppRegistry.registerComponent('heart', () => heart);