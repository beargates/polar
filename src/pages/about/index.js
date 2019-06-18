/**
 * 关于页面
 */
import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

class About extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>React Native Demo</Text>
        <Text style={styles.ver}>v 0.0.1</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    lineHeight: 50,
  },
  ver: {
    fontSize: 18,
  },
});

export default About;
