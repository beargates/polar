/**
 *
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../common/variables';

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onPress();
  }

  render() {
    const {title, userName, createTime} = this.props.item.item;

    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <Text numberOfLines={2} style={styles.title}>{title}</Text>
        <View style={styles.detailsWrapper}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.time}>{createTime}</Text>
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

export default ListItem;
