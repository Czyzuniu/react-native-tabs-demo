import React from 'react';
import { View, StatusBar, Platform } from 'react-native';


export default function (props) {
  const height = (Platform.OS === 'ios') ? 20 : 0;
  const { backgroundColor } = props;

  return (
    <View style={{ height, backgroundColor }}>
      <StatusBar backgroundColor={backgroundColor} { ...props } />
    </View>
  );
}