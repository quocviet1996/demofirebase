import React, { Component } from 'react'
import firebase from 'react-native-firebase';
import {
    View,
    Text,
    Button,
    TextInput,
    FlatList,
    TouchableHighlight,
    Image
}
from 'react-native';
export default class TotoComponent extends Component {
    constructor(props) {
        super(props);   
        this.state = ({
            todoTasks: [],
            newTaskName: '',
            loading: false,           
        });     
        this.ref = firebase.firestore().collection('todoTasks');
    }
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
            const todos = [];
            querySnapshot.forEach((doc) => {
                todos.push({
                    taskName: doc.data().taskName
                });
            });
            this.setState({
                todoTasks: todos,
                loading: false,

                });
                
            });
        
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    onPressAdd = () => {
        if(this.state.newTaskName.trim() === '') {
            alert('task name is blank');
            return;
        }
        this.ref.add({
            taskName: this.state.newTaskName
        }).then((data) => {
           // console.log(`added data = ${data}`);
            this.setState({
                newTaskName: '',
                loading: true
            });
        }).catch((error) => {
            console.log(`error adding Firestore document = ${error}`);
            this.setState({
                newTaskName: '',
                loading: true
            });
        });
    }
    render() {
        return (
            <View style={{ flex: 1, marginTop: 34  }}>
                <View style={{
                    backgroundColor: 'tomato',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: 64
                }}>
                    <TextInput style={{
                        height: 40,
                        width: 200,
                        margin: 10,
                        padding: 10,
                        borderColor: 'white',
                        borderWidth: 1,
                        color: 'white'
                    }}
                        keyboardType='default'
                        placeholderTextColor='white'
                        placeholder='Enter task name'
                        autoCapitalize='none'
                        onChangeText={
                            (text) => {
                                this.setState({ newTaskName: text });
                            }
                        }
                    />
                    <TouchableHighlight
                        style={{ marginRight: 10 }}
                        underlayColor='tomato'
                        onPress={this.onPressAdd}
                    >
                        <Image
                            style={{ width: 35, height: 35 }}
                            source={require('../img/baffle-icon.png')}
                        />
                    </TouchableHighlight>
                    <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',                                
                                margin: 40
                            }}>{this.state.todoTasks}</Text>);
                </View>
                {/* <FlatList                    
                    data={this.state.todoTasks}
                    renderItem={({ item, index }) => {
                        return (
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',                                
                                margin: 40
                            }}>{item.taskName}</Text>);
                    }}     
                    keyExtractor={(item, index) => item.taskName}               
                >
                </FlatList> */} 
            </View>
        );
    }
}
