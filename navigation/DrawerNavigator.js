import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../screens/Profile';
import TabNav from './TabNavigator';
import StackNav from './stackNav';
import Logout from '../screens/logoutScreen';
import firebase from 'firebase';
import CustomSideBarMenu from '../screens/customMenu';

const Drawer = createDrawerNavigator();
export default class DrawerNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darktheme: true,
    };
  }

  componentDidMount() {
    this.fetchtheme();
  }

  fetchtheme = async () => {
    let theme;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (data) => {
        theme = data.val().current_theme;
      });
    this.setState({ darktheme: theme === 'dark' ? true : false });
  };
  render() {
    let props = this.props;
    return (
      <Drawer.Navigator
        useLegacyImplementation
        initialRouteName="Home"
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          inactiveTintColor: this.state.darktheme ? 'white' : 'black',
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustomSideBarMenu {...props} />}>
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            unmountOnBlur: true,
          }}
        />
        <Drawer.Screen
          name="Home"
          component={StackNav}
          options={{
            unmountOnBlur: true,
          }}
        />
        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{
            unmountOnBlur: true,
          }}
        />
      </Drawer.Navigator>
    );
  }
}
