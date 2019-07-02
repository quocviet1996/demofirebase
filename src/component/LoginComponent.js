import React, { Component } from 'react'
import firebase from 'react-native-firebase';
import {
    View,
    Text,
    Button,
    TextInput
}
from 'react-native';


export default class LoginComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthenticated :false, 
            typedEmail:'',
            typedPassword: '',
            user:null,
        }
    }
    onAnonymousLogin = () =>{
        firebase.auth().signInAnonymously().then(() =>{
            console.log(`Login successfully`);
            this.setState({
                isAuthenticated : true,
            })

        }).catch((error) =>{
            console.log(`Login fail with error: ${error}`);
        })
    }
    onLogin = () =>{
        firebase.auth().signInWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword)
            .then((loggedInUser) => {
                console.log(`Login with user : ${JSON.stringify(loggedInUser.toJSON())}`);
            }).catch((error) => {
                console.log(`Login fail with error: ${error}`);
            });

    }
    onRegister = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword)
            .then((loggedInUser) => {
                this.setState({ user: loggedInUser })
                console.log(`Register with user : ${JSON.stringify(loggedInUser.toJSON())}`);
            }).catch((error) => {
                console.log(`Register fail with error: ${error}`);
            });
    }
  render() {
    return (
      <View style={{flex:1,alignItems:'center',backgroundColor:'white',borderRadius :30}}>
      <Text style ={{ fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    margin: 40}}>
                    Login with Firebase

      </Text>
      <Text Style={{
                    padding: 10,
                    borderRadius: 4,
                    backgroundColor: 'rgb(226,161,184)'
                }}
                    
                    onPress={this.onAnonymousLogin.bind(this)}
                >Login anonymous</Text>
                <Text style={{ margin: 20, fontSize: 15, }}>{this.state.isAuthenticated == true ? 'Logged in anonymous' : ''}</Text>
                <TextInput style={{
                    height: 40,
                    width: 200,
                    margin: 10,
                    padding: 10,
                    borderColor: 'gray',
                    borderWidth: 1,
                    color: 'black'
                }}
                    keyboardType='email-address'
                    placeholder='Enter your email'
                    autoCapitalize='none'
                    onChangeText={
                        (text) => {
                            this.setState({ typedEmail: text });
                        }
                    }
                />
                 <TextInput
                    style={{
                        height: 40,
                        width: 200,
                        margin: 10,
                        padding: 10,
                        borderColor: 'gray',
                        borderWidth: 1,
                        color: 'black'
                    }}
                    keyboardType='default'
                    placeholder='Enter your password'
                    secureTextEntry={true}
                    onChangeText={
                        (text) => {
                            this.setState({ typedPassword: text });
                        }
                    }
                />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                        padding: 10,
                        borderRadius: 4,
                        margin: 10,
                        backgroundColor: 'green'
                    }}
                        
                        onPress={this.onRegister.bind(this)}
                    >Register</Text>
                    <Text style={{
                        padding: 10,
                        margin: 10,
                        borderRadius: 4,
                        backgroundColor: 'blue'
                    }}
                        
                        onPress={this.onLogin.bind(this)}
                    >Login</Text>
                </View>
            
            
      </View>

    )
  }
}
