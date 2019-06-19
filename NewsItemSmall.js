import React from "react";
import {StyleSheet, FlatList, ActivityIndicator, Dimensions,Alert, View, ImageBackground} from "react-native";
import {Avatar, ListItem, Text} from 'react-native-elements'


export default class NewsItemSmall extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.newsItem}>
        <View style={{flex:0.03,backgroundColor:'blue',margin:2}}>
        </View>
        <ListItem
          leftAvatar={<Avatar size={"large"} source={{uri:'https://cdn.pixabay.com/photo/2018/08/26/14/04/aster-3632294_960_720.jpg'}}/>}
          subtitle={
            <View style={styles.subtitleView}>
              <Text>{"Facebook Removed Nearly 3.4 Billion Fake Accounts In 6 Months"}</Text>
              <Text style={styles.timestamp}>
                2h ago
              </Text>
            </View>
          }
          containerStyle={{flex:1}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  subtitleView: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 5,
    height:75,
    justifyContent:'space-between'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  timestamp: {
    color:'red',
    alignSelf:'flex-start'
  },
  newsItem: {
    margin:5
  }
});
