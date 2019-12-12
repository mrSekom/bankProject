import React, { Component } from 'react';
import { ListItem } from 'react-native-elements'
import DialogInput from 'react-native-dialog-input';
import styles from '../faturaHavaleVirmanStyle';
import { Text, View, TouchableOpacity, ScrollView, BackHandler, FlatList, AsyncStorage, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HGSgiris extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.navigation.state.params.token,
            hesaplar: [],
            selectedAccountNo: 0,
            isDialogVisible: false,
            isFetching: false
        };
    }

 

    
    render() {
        return (
            <View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.buttonStyleMenu}
                        onPress={() => {
                            this.props.navigation.navigate('HGShesapAc', { token: this.state.token })
                        }}>
                        <Icon
                            name="money"
                            size={16}
                            color="white"
                            backgroundColor="#708090">
                            <Text style={styles.buttonColorMenu}> HGS HESAP AÇ </Text>
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonStyleMenu}
                        onPress={() => {
                          
                        }}>
                        <Icon
                            name="money"
                            size={16}
                            color="white"
                            backgroundColor="#708090">
                            <Text style={styles.buttonColorMenu}> HGS PARA YATIR </Text>
                        </Icon>
                    </TouchableOpacity>
                </View>
               
                
            </View>
        );
    }
}
