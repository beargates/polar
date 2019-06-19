/**
 *
 */
import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List } from '@ant-design/react-native';

const { Item } = List;

class SettingScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Home',
  };
  toAbout = () => {
    this.props.navigation.navigate('About'); // eslint-disable-line react/prop-types
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <List>
          <Item>隐私</Item>
          <Item arrow="horizontal" onClick={this.toAbout}>关于</Item>
        </List>
      </ScrollView>)
  }
}

const styles = StyleSheet.create({
  container: {
  }
});

export default SettingScreen;
