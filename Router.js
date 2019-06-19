import SideMenu from './Menu'
import Home from './Home'
import Incidents from './Incidents'
import React from "react"
import HeaderBar from './HeaderBar'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation';
import TabView from './TabView'


// wrap your screen inside the drawer into StackNavigator
const HomeNavigator = createStackNavigator({
  HomeScreen: {
    screen: Home,
    navigationOptions: {
      header: <HeaderBar/>
    }
  }
});


const IncidentsNavigator = createStackNavigator({
  IncidentsScreen: {
    screen: Incidents,
    navigationOptions: {
      header:<HeaderBar />
    }
  }
});

const drawerScreens = createDrawerNavigator({
  Home: HomeNavigator,
  Incidents: IncidentsNavigator,
}, {
  initialRouteName: 'Home',
  contentComponent: SideMenu,
  drawerWidth: 250,
  drawerPosition: 'left',
  gesturesEnabled: false
})

const AppStack = createStackNavigator({
    drawer: {
      screen: drawerScreens,
    }
  },
  {
    initialRouteName: 'drawer',
    headerMode:'none'
  });


const App = createAppContainer(AppStack);

export default App
