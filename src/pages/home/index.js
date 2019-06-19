/**
 * 首页
 */
import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Carousel } from '@ant-design/react-native';
import ItemSeparator from './ItemSeparator';
import ListItem from './ListItem';

const img1 = require('../../styles/images/1.jpg');
const img2 = require('../../styles/images/2.jpg');

const listData = [
  {
    title: 'Spring Boot 2.0 正式发布，升还是不升呢？',
    userName: 'Cat',
    createTime: 1519882814186,
  }, {
    title: '区块链技术开发资料收集',
    userName: 'Dog',
    createTime: 1519882814186,
  }, {
    title: 'iOS 微信内存监控',
    userName: 'Monkey',
    createTime: 1519882814186,
  }, {
    title: '我对 Go 2 类型系统的期望',
    userName: 'Jack',
    createTime: 1519882814186,
  }, {
    title: '初探 CSS Grid 布局',
    userName: 'Lucy',
    createTime: 1519882814186,
  }, {
    title: '解决使用 KeepAlive Agent 遇到的 ECONNRESET（Node.js）',
    userName: 'Uncle',
    createTime: 1519882814186,
  }, {
    title: 'btcd 是如何计算字节占用的',
    userName: 'Lina',
    createTime: 1519882814186,
  }, {
    title: '论如何黑掉舍友的网络账号',
    userName: 'Nima',
    createTime: 1519882814186,
  }, {
    title: '大规模分布式系统资源管理（二）',
    userName: 'Caocao',
    createTime: 1519882814186,
  }, {
    title: 'Spring Boot 2.0 权威发布',
    userName: 'Toby',
    createTime: 1519882814186,
  }
];
const carouselData = [
  {
    title: '比特币和以太坊技术原理对比之账户模型',
    coverUri: 'http://facebook.github.io/react/img/logo_og.png',
    coverFile: img1,
  },
  {
    title: '过年就学"区块链"',
    coverUri: 'http://facebook.github.io/react/img/logo_og.png',
    coverFile: img2,
  }
];

class HomeScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Home',
  };

  onItemPress = () => {
    this.props.navigation.navigate({
      routeName: 'Details',
      params: {},
    });
  }

  _keyExtractor = (item, idx) => `${idx}`;

  // Carousel如果只有一个item，则滑动时会出现bug
  // FlatList及父组件的flex: 1是必须的，否则将不能滚动
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Carousel
          autoplay
          infinite
          selectedIndex={0}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {
            carouselData.map(item => (
              <TouchableWithoutFeedback
                key={item}
                style={{}}
                onPress={this.onItemPress}
              >
                <View>
                  <Image
                    source={item.coverFile}
                    style={{ height: 100 }}
                  />
                  <Text style={styles.carouselTitle}>{item.title}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))
          }
        </Carousel>
        <FlatList
          style={{ ...styles.list, flex: 1 }}
          keyExtractor={this._keyExtractor}
          data={listData}
          renderItem={
            item => (
              <ListItem
                item={item}
                onPress={this.onItemPress}
              />
            )
          }
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    paddingLeft: 15,
  },
  carouselTitle: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  }
});

export default HomeScreen;
