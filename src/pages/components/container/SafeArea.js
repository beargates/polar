/**
 * 适配ios刘海屏
 * todo for android: see https://reactnavigation.org/docs/en/handling-iphonex.html
 */
import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics';
import { SafeAreaView } from 'react-native'

export default function (Comp) {
  const tempComp = props => <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <Comp {...props} />
  </SafeAreaView>
  // 复制静态属性
  return hoistNonReactStatics(tempComp, Comp);
}
