import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

class SearchItem extends Component {
    constructor(props) {
        super(props)
        this.searchDetails = this.props.data;
    }

    _onSelectOfItem = () => {
        const { onItemSelect } = this.props;
        onItemSelect(this.searchDetails);
    }
    _onClearSearchHistory = () => {
        const { onClearItem } = this.props;
        onClearItem(this.searchDetails);
    }

    render() {
        return (
            <View style={styles.itemStyle}>
                <TouchableOpacity style={styles.NameHolder} onPress={this._onSelectOfItem}>
                    <Text style={styles.mainString}>{this.searchDetails.searchString}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeHolder} onPress={this._onClearSearchHistory}>
                    <Text style={[styles.iconStyle]}>
                        <FontAwesome>{Icons.times}</FontAwesome>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemStyle: {
        flexDirection: 'row',
        marginTop:15
    },
    NameHolder: {
        paddingLeft :20,
        flex: 85,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    closeHolder: {
        flex: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainString: {
        fontSize: 17
    },
    iconStyle: {
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default SearchItem;