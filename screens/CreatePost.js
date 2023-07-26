import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from 'firebase';
import * as Font from 'expo-font';
let customFont = {
  Bubblegum_Sans: require('../assets/BubblegumSans-Regular.ttf'),
};
export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defImage: 'image1',
      dropdownHeight: 40,
      caption: '',
      darktheme: true,
    };
  }

  componentDidMount() {
    this.loadFont();
    this.fetchTheme();
  }
  async loadFont() { 
    await Font.loadAsync(customFont);
    this.setState({ fontsLoaded: true });
  }

  fetchTheme = async () => {
    let theme;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (data) => {
        theme = data.val().current_theme;
      });
    this.setState({ darktheme: theme === 'dark' ? true : false });
  };
  async addPost() {
    if (this.state.caption) {
      var d = new Date();
      let post = {
        caption: this.state.caption,
        post_img: this.state.defImage,
        likes: 0,
        createdOn: d.toString(),
        author: firebase.auth().currentUser.displayName,
        uid: firebase.auth().currentUser.uid,
      };
      await firebase
        .database()
        .ref('/posts/' + Math.random().toString(36).slice(2))
        .set(post)
        .then(function (data) {});
      this.props.navigation.navigate('Feed');
    } else {
      Alert.alert(
        'Error',
        'All fields are required',
        [{ text: 'OK', onPress: () => console.log('Pressed OK') }],
        { cancelable: false }
      );
    }
  }
  render() {
    let pre_img = {
      image1: require('../assets/image_1.jpg'),
      image2: require('../assets/image_2.jpg'),
      image3: require('../assets/image_3.jpg'),
      image4: require('../assets/image_4.jpg'),
      image5: require('../assets/image_5.jpg'),
      image6: require('../assets/image_6.jpg'),
      image7: require('../assets/image_7.jpg'),
    };
    return (
      <View
        style={
          this.state.darktheme
            ? { backgroundColor: 'black', flex: 1, padding: 5 }
            : { backgroundColor: 'white', flex: 1, padding: 5 }
        }>
        <View style={{ flexDirection: 'row', flex: 0.15 }}>
          <View>
            <Image source={require('../assets/logo.png')} style={styles.img} />
          </View>
          <View>
            <Text style={this.state.darktheme ? styles.text : styles.lighttext}>
              Spectagram
            </Text>
          </View>
        </View>
        <View style={{ flex: 0.75 }}>
          <ScrollView>
            <View>
              <Image
                source={pre_img[this.state.defImage]}
                style={styles.preview}
              />

              <DropDownPicker
                items={[
                  { label: 'image_1', value: 'image1' },
                  { label: 'image_2', value: 'image2' },
                  { label: 'image_3', value: 'image3' },
                  { label: 'image_4', value: 'image4' },
                  { label: 'image_5', value: 'image5' },
                  { label: 'image_6', value: 'image6' },
                  { label: 'image_7', value: 'image7' },
                ]}
                defaultValue={this.state.defImage}
                open={this.state.dropdownHeight === 170 ? true : false}
                onOpen={() => {
                  this.setState({ dropdownHeight: 170 });
                }}
                onClose={() => {
                  this.setState({ dropdownHeight: 40 });
                }}
                style={
                  this.state.darktheme
                    ? {
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: 'white',
                      }
                    : {
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: 'black',
                      }
                }
                textStyle={{
                  color: this.state.dropdownHeight == 170 ? 'gray' : 'dimgray',
                }}
                onSelectItem={(item) => {
                  this.setState({ defImage: item.value });
                }}
              />

              <TextInput
                placeholder={'Caption'}
                placeholderTextColor={this.state.darktheme ? 'white' : 'black'}
                onChangeText={(caption) => {
                  this.setState({ caption });
                }}
                style={
                  this.state.darktheme
                    ? styles.textinput
                    : styles.lighttextinput
                }
              />
            </View>

            <View style={styles.submit}>
              <Button
                title="Post"
                color="#ee8249"
                onPress={() => this.addPost()}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  preview: {
    width: '90%',
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 10,
    marginBottom: 10,
  },
  img: {
    width: 45,
    height: 45,
    marginTop: 10,
    marginLeft: 10,
  },
  text: {
    color: 'white',
    fontSize: 30,
    padding: 5,
    marginTop: 6,
    marginLeft: 15,
    fontFamily: 'Bubblegum_Sans',
  },
  lighttext: {
    color: 'black',
    fontSize: 30,
    padding: 5,
    marginTop: 6,
    marginLeft: 15,
    fontFamily: 'Bubblegum_Sans',
  },
  
  textinput: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    color: 'white',
    borderWidth: 1,
    alignItems: 'center',
    height: 40,
    borderColor: 'white',
    marginTop: 10,
  },
  lighttextinput: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    color: 'black',
    borderWidth: 1,
    alignItems: 'center',
    height: 40,
    borderColor: 'black',
    marginTop: 10,
  },
  submit: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
});
