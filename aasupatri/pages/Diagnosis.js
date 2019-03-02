import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableOpacity } from 'react-native';

export default class Diagnosis extends Component {
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
            switch1Value:false,
        }
    }
    render() {
        return (
            <View style={styles.container}>
             <View style={styles.rowStyle2}>
                        <TouchableOpacity style={styles.colDataStyle}>                            
                            
                            <View >
                                <Text style={styles.TextStyle2}>Heart</Text>
                            </View>

                        </TouchableOpacity>
                </View>

                <View style={styles.rowStyle2}>
                        <TouchableOpacity style={styles.colDataStyle}>                            
                            
                            <View >
                                <Text style={styles.TextStyle2}>Brain</Text>
                            </View>

                        </TouchableOpacity>
                </View>

                <View style={styles.rowStyle2}>
                        <TouchableOpacity style={styles.colDataStyle}>                            
                            
                            <View >
                                <Text style={styles.TextStyle2}>Leg</Text>
                            </View>

                        </TouchableOpacity>
                </View>


            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
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
    colDataStyle :{
        backgroundColor: '#0080d1',
        flex: 1,
        borderRadius:10,
    },
    TextStyle2:{
        marginTop: 20, 
        marginLeft:120,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        alignContent:'center',
        //color:'white',     
        // marginBottom: 80

    },
});
AppRegistry.registerComponent('Diagnosis', () => Diagnosis);