import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TextInput, Button, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios'

export default class Bill extends Component {
    static navigationOptions = {
        title: 'Profile',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name='user' size={20} color={tintColor} />
        }
    };

    state = {
        name: 'Thanh Duy',
        username: '',
        password: ''
    }

    logInHandleClick = async () => {
        try {
            let response = await axios.post('http://localhost:3000/api/users/signIn', {
                email: this.state.username,
                password: this.state.password
            })
            console.log(response);
            // this.setState({
            //     name: response.data
            // })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: 'https://banner2.kisspng.com/20180626/fhs/kisspng-avatar-user-computer-icons-software-developer-5b327cc98b5780.5684824215300354015708.jpg' }}
                    style={{ width: 200, height: 200 }}
                ></Image>
                <Icon name='home' size={20} color='red' ></Icon>
                <Text> {this.state.name} </Text>
                <TextInput
                    style={{ width: "80%", height: 40, borderWidth: 1 }}
                    onChangeText={(value) => this.setState({ username: value })}
                ></TextInput>

                <TextInput
                    secureTextEntry={true}
                    style={{ width: "80%", height: 40, borderWidth: 1 }}
                    onChangeText={(value) => this.setState({ password: value })}
                ></TextInput>
                <Button
                    title='Nhấn'
                    style={{ width: "80%", height: 40 }}
                    onPress={() => this.logInHandleClick()}
                    
                ></Button>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        marginTop : 20
    }
})
