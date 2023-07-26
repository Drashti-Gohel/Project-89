import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Image } from 'react-native';
import firebase from 'firebase';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
export default class CustomSideBarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darktheme: true,
    };
  }

  componentDidMount() {
   this.fetchtheme();
  }

  fetchtheme=()=>{
     let theme 
    firebase.database().ref('/users/'+firebase.auth().currentUser.uid).on('value',(data)=>{
      theme=data.val().current_theme

    })
    this.setState({darktheme:theme==='dark'? true : false })
  }
  render() {
    let props = this.props;
    return (
      <View>
        <SafeAreaView />
        <Image
          source={require('../assets/logo.png')}
          style={{
            width: 150,
            height: 100,
            resizeMode: 'contain',
            marginTop: 20,
            marginLeft: -20,
          }}
        />
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
