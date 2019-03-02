import React, { Component } from 'react';
import {Image,Switch, Text, AppRegistry, StyleSheet, View, TouchableOpacity } from 'react-native';
//import ContactItem from '../components/ContactItem';
//import SearchItem from '../components/SearchItem';
import { Toolbar } from 'react-native-material-ui';
import { retrieveEmployeeList, retrieveSearchList, updateSearchInfo } from "../services/databaseConnection";
import _ from 'lodash';
//import { Switch } from 'react-native-gesture-handler';
//import {FeedbackElement} from './feedback'
const DoctorIcon = require('./../images/doctor.png');
const HospitalIcon = require('./../images/hospital.png');
const BloodIcon = require('./../images/blood.png');

export default class Listing extends Component {
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
        this._getEmployeeData();
    }
    
    
    toggleSwitch1 = (value) => {
        this.setState({switch1Value: value})
        console.log('Switch 1 is: ' + value)
     }


    _getEmployeeData = () => {
        retrieveEmployeeList((list) => {
            this.empList = list;
            this.setState({
                empList: list
            });
        });
    }



    /**
     * Function to extract key
     */
    _keyExtractor = (item) => item.id || item.searchString;

    /**
     * On focus on search icon
     */
    _onFocusOfSearch = () => {
        this.searchEnabled = true;
        retrieveSearchList((list) => {
            this.setState({
                recentSearch: list.reverse(),
                showEmpList: false
            });
        });
    }

    /**
     * update the search table data
     */
    _updateTheSearchTable = () => {
        if (this.searchString) {
            let deleteItem = null, insertItem = null;
            let delete_id = _.find(this.state.recentSearch, (obj)  => {
                return obj.searchString === this.searchString;
            });
            if (!delete_id) {
                insertItem = this.searchString;
                if (this.state.recentSearch.length === 10) {
                    deleteItem = this.state.recentSearch[10]
                }
            } else {
                deleteItem = insertItem = this.searchString;
            }
            updateSearchInfo(insertItem, deleteItem);
        }
        this.searchString = null;
    }

    /**
     * On focusout of seach box
     */
    _onFocusOutOfSearch = () => {
        this._clearPrevSelection();
        this.childFunctions = [];
        this.setState({
            showEmpList: true,
            empList: this.empList
        });
        this._updateTheSearchTable();
        this.searchEnabled = false;
    }

    /**
     * on search changes
     */
    _onChangeOfSearch = (text) => {
        if (text.length) {
            this.searchString = text;
            text = text.toLowerCase();
            this.childFunctions = [];
            this.setState({
                showEmpList: true,
                empList: this.empList.filter((_) => _.name.toLowerCase().indexOf(text) !== -1)
            });
        } else {
            this.searchString = null;
            this._onFocusOfSearch();
        }
    }
    /**
     *To clear the icon selection
     */
    _clearPrevSelection = () => {
        for (let i = 0, iLen = this.childFunctions.length; i < iLen; i++) {
            this.childFunctions[i]();
        }
    }

    /**
     * History search selected.
     */
    _onSearchItemSelect = (item) => {
        this.refs.toolbar.onSearchTextChanged(item.searchString);
    }

    /**
     * History search clear icon clicked
     */
    _onClearSearchHistoryItem = (item) => {
        this.setState({
            recentSearch: this.state.recentSearch.filter((_) => _ !== item)
        });
        updateSearchInfo(null,item.searchString);
    }

    /**
     * On item selection
     */
    _onSearchItemSelectEmp = (item) => {
        this._clearPrevSelection();
        if(this.searchEnabled) {
            this.searchString = item.name;
            this._updateTheSearchTable();
        }
	}
	

	_continueToDoctorsList=()=>{
		this.props.navigation.navigate('DoctorsList');
    }
    _continueToHospitalMap=()=>{
        this.props.navigation.navigate('HospitalMap');
    }
    _continueToBloodBank=()=>{
        this.props.navigation.navigate('BloodBank');
    }

    render() {
        return (
            <View style={styles.container}>
                <Toolbar
                    centerElement="Asupathri"
                    ref="toolbar"
                    searchable={{
                        autoFocus: true,
                        placeholder: 'Search',
                        onSearchPressed: this._onFocusOfSearch,
                        onSearchClosed: this._onFocusOutOfSearch,
                        onChangeText: this._onChangeOfSearch
                    }}
                />
                <Switch
                style={styles.switch}
                value={this.state.switch1Value}
                onValueChange={(val) => this.setState({switch1Value:val})}

                />
                <View style={styles.rowStyle}>
                    <View style={[styles.colStyle, styles.colLeftStyle]}>
                        <TouchableOpacity style={styles.colDataStyle} onPress={this._continueToDoctorsList}>
                            <Image style={styles.ImageStyle}
                                source={DoctorIcon}/>
                                <Text style={styles.TextStyle}>Doctors</Text>
                            
                    </TouchableOpacity>
                    </View>
                    <View style={[styles.colStyle, styles.colRightStyle]}>
                        <TouchableOpacity style={styles.colDataStyle} onPress={this._continueToHospitalMap}>
                            
                            <Image style={styles.ImageStyle}
                                source={HospitalIcon}/>
                                <Text style={styles.TextStyle}>Search Hospitals</Text>

                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.rowStyle}>
                        <TouchableOpacity style={styles.colDataStyle} onPress={this._continueToBloodBank}>
                              <Text style={styles.TextStyle1}>Blood Availability</Text>
                            
                            <Image style={styles.ImageStyle}
                                source={BloodIcon}/>
                                
                        </TouchableOpacity>
                </View>
                {/* <View style={styles.rowStyle}>
                        <TouchableOpacity style={styles.colDataStyle}>
                            
                        </TouchableOpacity>
                </View> */}
                
            
            </View>




            // <View style={styles.container}>
            //  <Toolbar
            //      centerElement="Asupathri"
            //      ref="toolbar"
            //      searchable={{
            //          autoFocus: true,
            //          placeholder: 'Search',
            //          onSearchPressed: this._onFocusOfSearch,
            //          onSearchClosed: this._onFocusOutOfSearch,
            //          onChangeText: this._onChangeOfSearch
            //      }}
            //  />
            //  {this.state.showEmpList ?
            //      <FlatList
            //          data={this.state.empList}
            //          keyExtractor={this._keyExtractor}
            //          renderItem={({ item }) =>
            //              <ContactItem navigation={this.props.navigation}
            //                  data={item}
            //                  onItemSelect={this._onSearchItemSelectEmp}
            //                  ref={(ref) => { ref && this.childFunctions.push(ref._clearSelection) }}
            //              />
            //          }
            //      />
            //      :
            //      <FlatList
            //          data={this.state.recentSearch}
            //          keyExtractor={this._keyExtractor}
            //          renderItem={({ item }) =>
            //              <SearchItem onItemSelect={this._onSearchItemSelect}
            //                  onClearItem={this._onClearSearchHistoryItem}
            //                  data={item}
            //              />}
            //      />
            //  }
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    rowStyle: {
        flexDirection: 'row',
        height: 150,
        marginTop:30,
        marginRight:30,
        marginLeft:30,
    },
    colStyle: {
        flex :1,
        // paddingTop: 40,
        // paddingBottom: 40
    },
    colLeftStyle: {
        //marginLeft:15,
        marginRight:30,
        // paddingLeft: 40,
        // paddingRight: 20
    },
    colRigtStyle: {
        marginLeft:30,
        //marginRight:15,
        
        // paddingLeft: 20,
        // paddingRight: 40
    },
    colDataStyle :{
        backgroundColor: '#f5a623',
        flex: 1,
        borderRadius:10
    },

    ImageStyle:{
        height:70,
        width:70,
        marginTop:20,
        marginLeft:30,
        //alignContent:'center'
        resizeMode:'center'
    },

    TextStyle:{
        marginTop:20,
        marginLeft:10,
        fontSize: 15,
        fontWeight: 'bold',
		alignContent:'center',
		justifyContent:'center',

    },
    TextStyle1:{
        marginTop:50,
        marginLeft:100,
        fontSize: 15,
        fontWeight: 'bold',
        alignContent:'center'

    },
    switch:{
        marginTop:10,
        marginRight:30,
    }
    
});

AppRegistry.registerComponent('LandingPage', () => LandingPage);