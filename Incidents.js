import React from "react";
import {Text, StyleSheet, FlatList, ActivityIndicator, Dimensions,Alert, View} from "react-native";

let willFocus = null


export default class Incidents extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Text>Hi incidents</Text>
        );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
    subtitleView: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 5
  },
   loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#F5FCFF88',
  }
});
