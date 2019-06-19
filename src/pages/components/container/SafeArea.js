/**
 * 适配ios刘海屏
 * todo for android: see https://reactnavigation.org/docs/en/handling-iphonex.html
 */
import React from 'react'
import { SafeAreaView } from 'react-native'

export default function (Comp) {
  return props => <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <Comp {...props} />
  </SafeAreaView>
}
