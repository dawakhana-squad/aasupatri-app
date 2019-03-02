import React, { Component } from 'react';
import { TouchableOpacity, AppRegistry, StyleSheet, View, Dimensions, FlatList, Image, DrawerLayoutAndroid, Text, Alert } from 'react-native';
import { RecyclerListView, LayoutProvider, DataProvider, RefreshControl } from "recyclerlistview";
import { getDoctorList } from '../services/backendConnection';
let { width } = Dimensions.get('window');
const DoctorIcon = require('./../images/doctor.png');
import { Toolbar } from 'react-native-material-ui';
import { retrieveSearchList, updateSearchInfo } from '../services/databaseConnection';
import _ from 'lodash';
import SearchItem from '../components/SearchItem';
export default class DoctorsList extends Component {
    doctors= [];
    constructor(props) {
        super(props);
        this.state = {
            dataProvider: new DataProvider((r1, r2) => {
                return r1.id !== r2.id
            }),
            searchList: [],
            showEmpList: true
        };
        this._layoutProvider = new LayoutProvider((i) => {
            return this.state.dataProvider.getDataForIndex(i);
        }, (data, dim) => {
            dim.height = 65;
            dim.width = width;
        });
        this._renderRow = this._renderRow.bind(this);

        this.navigation = this.props.navigation;
        this._getEmployeeData();
    }

    _getEmployeeData = () => {
        getDoctorList((list) => {
            this.doctors = list;
            this.setState({
                showEmpList: true,
                dataProvider: this.state.dataProvider.cloneWithRows(list)
            });
        });
    }


    _buildNameImg = (name) => {
        if (!name) {
            return '';
        }
        var list = name.split(" ");
        return list[0].charAt(0) + list[list.length - 1].charAt(0);
    }

    _displayDetails = (item) => {
        if (!this.props.stopNavigation) {
            this.props.onItemSelect(item);
        }
    }
    _renderRowForSearch = (item) => {
		return (
			<SearchItem
				onItemSelect={this._onSearchItemSelect}
				onClearItem={this._onClearSearchHistoryItem}
				data={item.item}
			/>
		)
	}

	/**
	 * History search selected.
	 */
	_onSearchItemSelect = (item) => {
        
        console.log(this.toolbar);
        this._onChangeOfSearch(item.searchString)
		//this.toolbar.setState({ searchValue: item.searchString });
    }
    
    	/**
	 * History search clear icon clicked
	 */
	_onClearSearchHistoryItem = (item) => {
		this.setState({
			searchList: this.state.searchList.filter((_) => _ !== item)
		});
		updateSearchInfo(null, item.searchString);
	}


    _renderRow(type, item) {
        let customStyle = {};
        if (!this.props.stopNavigation) {
            const id = Number(item.DrReg_no);
            const idPor = id < 1000 ? id / 1000 : (id < 10000 ? id / 10000 : id / 100000);
            let color = '#' + (idPor * 0xFFFFFF << 0).toString(16);
            if (!(/^#[0-9A-F]{6}$/i.test(color))) {
                color = '#0080d1';
                console.log(color, item.id);
            }
            customStyle = {
                backgroundColor: color
            }
        }
        return (
            
            <View style={styles.itemContainer}>
            
                <TouchableOpacity
                    style={[styles.itemStyle, this.props.style]}
                    disabled={this.props.stopNavigation}
                    onPress={this._displayDetails}
                >
                    <View style={styles.imageCard}>
                        <Text style={[styles.imageStyle, customStyle]}>
                            {this._buildNameImg(item.Doctor_name)}
                        </Text>
                    </View>

                    <View style={styles.nameCard}>
                        <Text numberOfLines={1} style={[styles.mainName, this.props.nameStyle]}>{item.Doctor_name}</Text>
                        <Text numberOfLines={1} style={[styles.designation, this.props.infoStyle]}>{item.Specialization}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    /**
	 * update the search table data
	 */
	_updateTheSearchTable = (insertItem) => {
		let deleteItem = null;
		let delete_id = _.find(this.state.searchList, (obj) => {
			return obj.searchString === insertItem;
		});
		if (!delete_id) {
			if (this.state.searchList.length === 10) {
				deleteItem = this.state.searchList[10]
			}
		} else {
			deleteItem = insertItem;
		}
		updateSearchInfo(insertItem, deleteItem);
	}
    _keyExtractor = (item) => item.searchString;

    /**
	 * On focus on search icon
	 */
	_onFocusOfSearch = () => {
		this.searchEnabled = true;
		if (this.state.showEmpList) {
			this.setState({
				showEmpList: false
			});
		}
		retrieveSearchList((list) => {
			this.setState({
				searchList: list.reverse()
			});
		});
	}
    
    _onFocusOutOfSearch = (text) => {
		this.searchEnabled = false;
		if (this.searchString) {
			this._updateTheSearchTable(this.searchString);
		}
		this.setState({
			showEmpList: true,
			dataProvider: this.state.dataProvider.cloneWithRows(this.doctors),
			searchList: []
		});
		this.searchString = null;
    }
    
    _onChangeOfSearch = (text) => {
		this.searchString = text;
		if (text.length) {
            text = text.toLowerCase();
            list = [];
            for(let i=0, iLen=this.doctors.length; i < iLen; i++) { 
                if (this.doctors[i].Doctor_name.toLowerCase().indexOf(text) !== -1) {
                    list.push(this.doctors[i])
                }
            }
            this.setState({
                showEmpList: true,
                dataProvider: this.state.dataProvider.cloneWithRows(list)
            });
			// retrieveEmployeeListWithSearch(this.currentId, text, (list, searchText) => {
			// 	if (searchText === text) {
			// 		this.setState({
			// 			showEmpList: true,
			// 			dataProvider: this.state.dataProvider.cloneWithRows(list)
			// 		});
			// 	}
			// });
		} else {
			this._onFocusOfSearch();
		}
	}

    render() {

        return (
            <View style={styles.container}>
                <Toolbar
                    centerElement={'Asupathri'}
                    leftElement="arrow-back"
					ref={ref => {
                        this.toolbar = ref;
                      }}
					searchable={{
						autoFocus: true,
						placeholder: 'Search by name',
						onSearchPressed: this._onFocusOfSearch,
						onSearchClosed: this._onFocusOutOfSearch,
						onChangeText: this._onChangeOfSearch
					}}
				/>
            {this.state.showEmpList ? 
                <RecyclerListView
                    rowRenderer={this._renderRow}
                    dataProvider={this.state.dataProvider}
                    layoutProvider={this._layoutProvider}
                />
            :
                <FlatList
                    data={this.state.searchList}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderRowForSearch}
                />
            }
            </View>
        )
    };
}


AppRegistry.registerComponent('HospitalsList', () => HospitalsList);


const styles = StyleSheet.create({
    container: {
		flex: 1,
		backgroundColor: '#ffffff'
	},
    itemContainer: {
        marginTop: 15
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
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#fafafa'
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
        marginTop: 5
    },
    textUnderIcon: {
        fontSize: 11,
        color: '#666666'
    },
    callIcon: {
        color: '#00bb00'
    },
    messageIcon: {
        color: '#ffac14'
    },
    emailIcon: {
        color: '#7575ff'
    },
    infoIcon: {
        color: '#8f8f8f'
    }

});

