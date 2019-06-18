/**
 *
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../common/variables';

class NewsDetails extends Component {
  static navigationOptions = {
    headerTitle: '详情'
  }

  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <Text style={styles.title}>title</Text>
        <View style={styles.detailsWrapper}>
          <Text style={styles.userName}>userName</Text>
          <Text style={styles.time}>createTime</Text>
        </View>
      </TouchableOpacity>)
  }
}

const detailsStyle = {
  fontSize: 14,
  color: colors.details,
  lineHeight: 18,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingRight: 15,
  },
  title: {
    fontSize: 18,
    color: '#333',
    lineHeight: 32,
  },
  detailsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userName: Object.assign({}, detailsStyle),
  time: Object.assign({}, detailsStyle),
});

export default NewsDetails;
