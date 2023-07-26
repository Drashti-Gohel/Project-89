import React, { Component } from 'react';
import {
  Text,
  View,
  Switch,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  StyleSheet,
} from 'react-native';
import * as Font from 'expo-font';
let customFont = {
  Bubblegum_Sans: require('../fonts/BubblegumSans-Regular.ttf'),
};
import firebase from 'firebase';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isEnabled: false,
      darktheme: true,
      name: '',
    };
  }

  componentDidMount() {
    this.loadFont();
    this.fetchUser();
  }

  async loadFont() {
    await Font.loadAsync(customFont);
    this.setState({ fontsLoaded: true });
  }

  fetchUser = () => {
    let name;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', function (data) {
        name = data.val().first_name + ' ' + data.val().last_name;
      });

    this.setState({ name: name });
  };
  toggleSwitch() {
    const previous_Status = this.state.isEnabled;
    const theme = this.state.isEnabled ? 'dark' : 'light';
    
      firebase
        .database()
        .ref('/users/' + firebase.auth().currentUser.uid).update({current_theme:theme})
    
    

    this.setState({ isEnabled: !previous_Status, darktheme: previous_Status });
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <Text> Loading </Text>;
    } else {
      return (
        <View
          style={
            this.state.darktheme ? styles.container : styles.containerlight
          }>
          <SafeAreaView style={styles.safeArea} />
          <View style={styles.apptitle}>
            <View style={styles.icon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.image}
              />
            </View>
            <View style={styles.titlecontainer}>
              <Text
                style={
                  this.state.darktheme ? styles.titletext : styles.darktext
                }>
                {' '}
                Sepctagram{' '}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Image
              source={require('../assets/profile_img.png')}
              style={{
                width: 80,
                height: 80,
                resizeMode: 'contain',
                borderRadius: 50,
              }}
            />

            <Text
              style={
                this.state.darktheme
                  ? { color: 'white', marginTop: 20, fontSize: 20 }
                  : { color: 'black', marginTop: 20, fontSize: 20 }
              }>
              {this.state.name}
            </Text>
          </View>

          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Text style={this.state.darktheme ? styles.theme : styles.dtheme}>
              {' '}
              Dark Theme{' '}
            </Text>

            <Switch
              style={{
                transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
                marginTop: 10,
              }}
              trackColor={{ false: 'gray', true: 'black' }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => this.toggleSwitch()}
              thumbColor={this.state.isEnabled ? 'white' : 'pink'}
              value={this.state.isEnabled}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'black',
  },
  containerlight: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  apptitle: {
    flex: 0.2,
    flexDirection: 'row',
  },
  icon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titlecontainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  titletext: {
    fontSize: 30,
    fontFamily: 'Bubblegum_Sans',
    color: 'white',
  },
  darktext: {
    fontSize: 25,
    fontFamily: 'Bubblegum_Sans',
    color: 'black',
  },
  theme: {
    color: 'white',
    fontSize: 20,
  },
  dtheme: {
    color: 'black',
    fontSize: 20,
  },
});
