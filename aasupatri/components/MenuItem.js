import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

class MenuItem extends PureComponent {

  renderIcon() {
		let height = 50;
		let width = height * 1;
    let imageStyles = {
      width,
      height
    };
		return(
      <Image
        source={this.props.icon}
				resizeMode={'cover'}
				style={imageStyles}
			/>
		)
	}

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.props.onPress} 
        // rippleOpacity={1}
      >
        <View style={styles.iconHolder}>
          {this.renderIcon()}
        </View>
        <View style={styles.dataHolder}>
          <Text style={styles.mainText}>
            {this.props.title.toUpperCase()}
          </Text>
          <Text style={styles.subText}>
            {this.props.info}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 5,
    paddingTop: 5,
  },
  iconHolder: {
    flex: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  dataHolder: {
    flex: 60,
    justifyContent: 'center',
    height: 40,
  },
  mainText: {
    fontSize: 17,
    color: '#0080d1',
  },
  subText: {
    fontSize: 12,
    color: '#4f4f4f',
  }
});


export default MenuItem;