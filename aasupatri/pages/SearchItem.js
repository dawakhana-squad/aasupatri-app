import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

class SearchItem extends PureComponent {
  _onSelectOfItem = () => {
    const { onItemSelect } = this.props;
    onItemSelect(this.props.data);
  }
  _onClearSearchHistory = () => {
    this.props.onClearItem(this.props.data);
  }

  render() {
    return (
      <View style={styles.itemStyle}>
        <TouchableOpacity style={styles.NameHolder} onPress={this._onSelectOfItem}>
          <Text style={styles.mainString}>{this.props.data.searchString}</Text>
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
    marginTop: 15
  },
  NameHolder: {
    paddingLeft: 20,
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