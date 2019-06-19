import React from "react";
import {StyleSheet, FlatList, ActivityIndicator, Dimensions,Alert, View, ImageBackground} from "react-native";
import {Text} from 'react-native-elements'


export default class NewsItemBig extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{height:'45%'}}>
        <View style={{flex:1}}>
          <ImageBackground source={require('./ofbiz_logo.jpeg')} resizeMode={'contain'} style={{flex:1}}/>
        </View>
        <View>
          <Text h4 style={{fontWeight:'bold', padding:10}}>Latest Ofbiz released 19.0.3</Text>
          <Text h7 style={{color:'red', padding:10}}>1 hour ago | Announcements</Text>
        </View>
      </View>
    );
  }
}

