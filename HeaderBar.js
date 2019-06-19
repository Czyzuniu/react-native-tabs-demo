
import React, { Component } from 'react';
import { Header, Icon} from 'react-native-elements'
import {
  StyleSheet,
  View,
  DeviceEventEmitter
} from 'react-native';
import StatusBar from './StatusBar'

import { withNavigation } from 'react-navigation';

class HeaderBar extends React.Component {

  constructor(props) {
    super(props)
  }

  renderRightComponent() {
    if (this.props.rightComponent) {
      return { icon: this.props.rightComponentIcon, onPress: () => this.props.navigation.push(this.props.navigator), testID:this.props.testID}
    } else {
      return null
    }
  }

  renderLeftComponent() {
    if (this.props.backButton) {
      return (
        <Icon
          name='chevron-left'
          type='MaterialIcons'
          testID='goBackIcon'
          size={35}
          onPress={() => this.props.navigation.pop()}
        />
      )
    } else {
        return (
            <Icon
                name='menu'
                type='MaterialIcons'
                testID='drawerIcon'
                size={30}
                onPress={() => {
                    this.props.navigation.openDrawer()
                    DeviceEventEmitter. emit('drawerOpened', {opened:true});
                  }
                }
            />
        )
    }
  }

  render() {
    return (
      <View>
        <StatusBar backgroundColor="#CD202C" barStyle="light-content" />
      <Header
        leftComponent={this.renderLeftComponent()}
        rightComponent={this.renderRightComponent()}
        outerContainerStyles={{ backgroundColor: '#CD202C', borderBottomWidth:0}}
      />
      </View>
    );
  }
}

export default withNavigation(HeaderBar);


const styles = StyleSheet.create({
  container: {
    justifyContent:'space-around',
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'stretch'
  }
})
