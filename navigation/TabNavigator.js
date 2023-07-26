import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import CreatePost from '../screens/CreatePost';
import Feed from '../screens/Feed';
import { RFValue } from 'react-native-responsive-fontsize';
const Tab = createMaterialBottomTabNavigator();
export default class TabNav extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        labeled={false}
        barStyle={styles.bar}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Feed') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Post') {
              iconName = focused ? 'create' : 'create-outline';
            }
            return (
              <Ionicons
                name={iconName}
                size={RFValue(25)}
                color={color}
                style={{ width: RFValue(40), height: RFValue(40) }}
              />
            );
          },
        })}
        activeColor={'#ee8249'}
        inactiveColor={'white'}>
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{ headerShown: false,unmountOnBlur: true }}
        />
        <Tab.Screen
          name="Post"
          component={CreatePost}
          options={{ headerShown: false,unmountOnBlur: true }}
        />
      </Tab.Navigator>
    );
  }
}
const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'gray',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
    overflow: 'hidden',
    height: '10%',
  },
});
