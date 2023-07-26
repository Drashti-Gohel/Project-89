import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
let posts = require('./temp_posts.json');
import PostCard from './PostCard';
import * as Font from 'expo-font';
let customFont = {
  Bubblegum_Sans: require('../assets/BubblegumSans-Regular.ttf'),
};
import firebase from 'firebase';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      darktheme: true,
      posts: [],
    };
  }
  keyExtractor = (item, index) => {
    index.toString();
  };
  renderItem = ({ item: post }) => {
    return <PostCard post={post} navigation={this.props.navigation} />;
  };
  componentDidMount() {
    this.loadFont();
    this.fetchTheme();
    this.fetchPost();
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

 fetchPost = () => {
    firebase
      .database()
      .ref('/posts/')
      .on(
        'value',
        (data) => {
          let posts = [];
          if (data.val()) {
            Object.keys(data.val()).forEach(function (key) {
              posts.push({
                key: key,
                value: data.val()[key],
              });
            });
          }
          this.setState({ posts: posts });
        },
        function (error) {
          console.log('the read failed');
        }
      );
  };
  render() {
    return (
      <View
        style={
          this.state.darktheme
            ? { backgroundColor: 'black', flex: 1 }
            : { backgroundColor: 'white', flex: 1 }
        }>
        <View style={{ flexDirection: 'row', flex: 0.15 }}>
          <View>
            <Image source={require('../assets/logo.png')} style={styles.img} />
          </View>
          <View>
            <Text style={this.state.darktheme ? styles.text : styles.darktext}>
              Spectagram
            </Text>
          </View>
        </View>
        <View style={{ flex: 0.75 }}>
          <FlatList
            data={this.state.posts}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  darktext: {
    color: 'black',
    fontSize: 30,
    padding: 5,
    marginTop: 6,
    marginLeft: 15,
    fontFamily: 'Bubblegum_Sans',
  },
});
