/**
 *
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';

function ItemSeparator() {
  return <View style={styles.container} />
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    borderStyle: 'solid'
  }
});

export default ItemSeparator;
