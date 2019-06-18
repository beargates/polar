/**
 *
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';

class TabBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback style={styles.tabItem}>
          <Text style={styles.tabLabel}>列表</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback style={styles.tabItem}>
          <Text style={styles.tabLabel}>设置</Text>
        </TouchableWithoutFeedback>
      </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    borderStyle: 'solid',
  },
  tabItem: {
    flex: 1,
  },
  tabLabel: {
    fontSize: 18,
    color: '#666',
    lineHeight: 50,
    textAlign: 'center',
  },
});

export default TabBar;
