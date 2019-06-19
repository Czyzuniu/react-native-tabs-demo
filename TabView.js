import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Announcements from "./Announc";
import Blogs from "./Blogs";
import Classfields from "./Classfields";


export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Latest' },
      { key: 'second', title: 'Blogs' },
      { key: 'third', title: 'Classfields' },
    ],
  };


  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: Announcements,
          second: Blogs,
          third:Classfields,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props =>
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'black' }}
            style={{ backgroundColor: '#2089dc' }}
            labelStyle={{fontSize:16, color:'white', fontWeight:"bold", textTransform:'capitalize'}}
            tabStyle={{justifyContent:'flex-start', margin:0, padding:0}}
            contentContainerStyle={{height:30}}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
