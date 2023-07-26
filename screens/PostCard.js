import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.post.value.likes,
      post_id: this.props.post.key,
      post_data: this.props.post.value,
    };
  }

  likes = () => {
    
    this.setState({ likes: (this.state.likes += 1) });
    firebase
      .database()
      .ref('/posts/' + this.state.post_id )
      .update({
        likes: this.state.likes,
      });
  };
  render() {
    let post = this.state.post_data;

    let images = {
      image1: require('../assets/image_1.jpg'),
      image2: require('../assets/image_2.jpg'),
      image3: require('../assets/image_3.jpg'),
      image4: require('../assets/image_4.jpg'),
      image5: require('../assets/image_5.jpg'),
      image6: require('../assets/image_6.jpg'),
      image7: require('../assets/image_7.jpg'),
    };
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('PostScreen', {
            post: this.props.post,
          });
        }}>
        <View
          style={{
            backgroundColor: 'gray',
            flex: 1,
            borderRadius: 20,
            margin: 20,
          }}>
          <View style={{ flexDirection: 'row', flex: 0.1 }}>
            <Image
              source={require('../assets/profile_img.png')}
              style={styles.img}
            />

            <View>
              <Text style={{ marginLeft: 20, marginTop: 30, color: 'white' }}>
                {' '}
                {post.author}
              </Text>
            </View>
          </View>

          <Image source={images[post.post_img]} style={styles.img2} />

          <Text style={{ marginLeft: 20, marginTop: 30, color: 'white' }}>
            {' '}
            {post.caption}
          </Text>
          <TouchableOpacity onPress={this.likes}>
            <View
              style={{
                flexDirection: 'row',
                width: 100,
                height: 30,
                backgroundColor: '#eb3636',
                justifyContent: 'center',
                borderRadius: 15,
                alignSelf: 'center',
                marginTop: 20,
                marginBottom: 10,
              }}>
              <View>
                <Ionicons name={'heart'} size={28} color={'white'} />
              </View>
              <View>
                <Text style={{ color: 'white', fontSize: 20 }}>
                  {' '}
                  {this.state.likes}{' '}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 30,
    marginTop: 20,
    marginLeft: 20,
  },
  img2: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginTop: 80,
  },
});
