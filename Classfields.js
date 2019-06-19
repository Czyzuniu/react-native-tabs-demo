import * as React from 'react';
import { ScrollView, StyleSheet, Dimensions, Text} from 'react-native';
import NewsItemBig from "./NewsItemBig";
import NewsItemSmall from "./NewsItemSmall";
import {ListItem} from "react-native-elements";

export default class Classfields extends React.Component {
  state = {
  };

  render() {
    return (
      <ScrollView style={styles.scene}>
        <NewsItemBig/>
        <NewsItemSmall/>
        <NewsItemSmall/>
        <NewsItemSmall/>
        <NewsItemSmall/>
        <NewsItemSmall/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
