import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import firebase from 'firebase';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  signIn = async (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.replace('Dashboard');
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  render() {
    const { email, password } = this.state;
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>
          {' '}
          Spectagram{' '}
        </Text>
        <Image
          source={require('../assets/logo.png')}
          style={{
            width: 100,
            height: 80,
            resizeMode: 'contain',
            marginTop: 20,
          }}
        />

        <TextInput
          style={styles.input}
          placeholder={'Enter Email'}
          placeholderTextColor={'white'}
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder={'Enter Password'}
          placeholderTextColor={'white'}
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
        />

        <TouchableOpacity
          onPress={() => {
            this.signIn(email, password);
          }}
          style={styles.login}>
          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
            {' '}
            Login{' '}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Register');
          }}
          style={styles.login}>
          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
            {' '}
            New User{' '}
          </Text>
        </TouchableOpacity>
             </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'gray',
    width: 250,
    height: 45,
    marginTop: 20,
    borderRadius: 10,
  },
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    backgroundColor: 'gray',
    marginTop: 30,
    borderRadius: 5,
    shadowOpacity: 0.6,
    shadowColor: 'white',
    shadowRadius: 10,
  },
  icon: {
    width: 28,
    height: 28,
  },
});
