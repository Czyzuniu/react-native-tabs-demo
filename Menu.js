import React, { Component,} from 'react';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {StyleSheet, DeviceEventEmitter} from 'react-native';
import { Drawer, Avatar,Badge, Icon, ListItem} from 'react-native-material-ui';
import StatusBar from './StatusBar'


export default class MenuComponent extends Component<Props> {

  constructor(props){
    super(props)

  }




  navigateToScreen = (route) => {

    const navigateAction = NavigationActions.navigate({
        routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  menuList = [
    {
      value: 'Home',
      icon: 'home',
      onPress: () => {
        this.navigateToScreen('Home')
      }
    },
    {
      value: 'Incidents',
      icon: 'warning',
      onPress: () => {
        this.navigateToScreen('Incidents')
      }
    },
    {
      value: 'Expenses',
      icon: 'receipt',
      onPress: () => {
        this.navigateToScreen('Expenses')
      }
    },
    {
      value: 'Create Leave',
      icon: 'date-range',
      onPress: () => {
        this.navigateToScreen('CreateLeave')
      }
    },
    {
      value: 'About',
      icon: 'info',
      onPress: () => {
        this.navigateToScreen('About')
      }
    }
  ];

  render () {
    return (
        <Drawer>
          <StatusBar backgroundColor="#CD202C" barStyle="light-content" />
          <Drawer.Header>
            <Drawer.Header.Account
              style={{
                container: {
                  backgroundColor:  '#CD202C',
                }
              }}
              avatar={<Avatar icon="person" />}
              footer={{
                dense: true,
                centerElement: {
                  primaryText: 'Konrad Kolpak',
                  secondaryText: 'Konrad.Kolpak@Stannah.co.uk',
                }
              }}
            />
          </Drawer.Header>
          <Drawer.Section
            divider
            items={this.menuList}
          />
        </Drawer>
    )
  }
}






const styles = StyleSheet.create({
  menu: {
    flex:1,
    paddingTop:25,
    flexDirection:'column',
    backgroundColor:'white'

  },
  listItem: {
    borderBottomWidth: 1,
    margin:5
  }
})



MenuComponent.propTypes = {
  navigation: PropTypes.object
};
