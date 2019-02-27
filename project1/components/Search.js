import { SearchBar } from 'react-native-elements';
import React from 'react';
import { StyleSheet, View} from 'react-native';
export default class Search extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
        style={styles.searchstyles}
      />
    );

  }
}
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    searchstyles: {
      ...StyleSheet.absoluteFillObject,
    },
   });

export {Search};