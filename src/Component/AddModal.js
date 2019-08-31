import React, { Component } from 'react';
import { Text, StyleSheet, View,Dimensions, Image,Button , TouchableOpacity} from 'react-native';
import Modal from 'react-native-modalbox';
import LinearGradient from 'react-native-linear-gradient'

var screen = Dimensions.get('window');

export default class AddModal extends Component {

    showAddModal = () => {
        this.refs.myModal.open();
    }

    setImage = (item) => {
        this.setState({
            item : item
        })
    }

    closeModal = () => {
        this.refs.myModal.close();
    }

    state = {
        item : {
            image : ''
        }
    }

    render() {
        return (
            <Modal
                ref={'myModal'}
                style={styles.container}
                position = 'center'

                backdrop = {true}
                
            >
                <View style={styles.leftArticle}>
                    <Text style={text_style(24,'#340021',0,12)}>User Details</Text>
                    <Text style={text_style(14,'#340021',0,12)}>Name : {this.state.item.nameUser}</Text>
                    <Text style={text_style(14,'#340021',0,12)}>Email : {this.state.item.email}</Text>
                    <Text style={text_style(14,'#340021',0,12)}>Service : Nail</Text>
                    <Text style={text_style(14,'#340021',0,12)}>Order : 45</Text>
                    <Text style={text_style(14,'#340021',0,12)}>Point : {this.state.item.point}</Text>
                    
                </View>
                <View
                    style={styles.rightArticle}
                >
                        <Image
                            source={{ uri: this.state.item.image }}
                            style={styles.avatar}
                        ></Image>
                       
                            <TouchableOpacity
                                style = {styles.closeButton}
                                onPress={() => {this.closeModal()}}
                            >
                                     <LinearGradient 
                                        start={{x: 0, y: 0}} 
                                        end={{x: 1, y: 1}} 
                                        style={{width : "100%", height : "100%", justifyContent : 'center',
                                            alignItems : "center", borderRadius : 20}}
                                        colors={['#FF00A9' ,'#FF3D81']}
                                    >
                                
                                    <Text style={text_style(15,'#FFFFFF')}>Close</Text>
                                    </LinearGradient>
                            </TouchableOpacity>
                        

                </View>
            </Modal>
        )
    }
}

const text_style = (fontSize,color, marginRight, marginBottom ,fontFamily ) => {
    return {
        fontSize : fontSize,
        color : color,
        marginRight : marginRight,
        marginBottom : marginBottom
       
    }
}

const styles = StyleSheet.create({
    container :{
        justifyContent : 'space-around',
        borderRadius : 10,
        width : screen.width - 40,
        height : 270,
        flexDirection : 'row',
        alignItems : 'flex-start',
        paddingTop : 13,
        shadowRadius : 10,
    },
    avatar : {
        width : 64,
        height : 64,
        borderRadius : 32
    },
    rightArticle : {
        width : '20%',
        height : '100%',
        flexDirection : 'column',
        justifyContent : 'space-around',
        overflow : 'hidden',
       
        
    },
    leftArticle : {
        width : "50%"
    },
    closeButton : {
        width : 65,
        height : 35,
       
       
    }

})
