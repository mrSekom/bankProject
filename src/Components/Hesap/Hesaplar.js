import React, { Component } from 'react';
import { ListItem } from 'react-native-elements'
import DialogInput from 'react-native-dialog-input';
import styles from '../faturaHavaleVirmanStyle';
import { Text, View, TouchableOpacity, ScrollView, BackHandler, FlatList, AsyncStorage, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Hesaplar extends Component {
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

    componentDidMount() {
        this.getAccs();
    }

    onRefresh = () => {
        this.setState({
            isFetching: true,
        });
        this.getAccs();
    }

    withdraw = (amount) => {
        console.log(this.state.token)
        fetch("http://207.154.196.92:5002/api/BankAccount/withdraw", {
            method: 'POST',
            body: JSON.stringify({
                "no": this.state.selectedAccountNo,
                "amount": amount
            }),

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `bearer ${this.state.token}`
            }
        }).then((response) => response.json())
            .then((responseData) => {
                //alert(JSON.stringify(responseData));
                var status = responseData['status'];
                if (status == 'success') {
                    alert("Para Çekildi!");
                    this.getAccs();
                    this.setState({
                        isDialogVisible: false
                    })
                }
                else {

                    var errors = responseData['errors'];
                    if (errors != null)
                        alert("hata: " + JSON.stringify(errors));
                    else
                        alert(responseData['message'])
                }


            })
            .catch((error) => {
                alert(error);
            })

    }

    getAccs = () => {
        fetch(`http://207.154.196.92:5002/api/BankAccount`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `bearer ${this.state.token}`,
            },
        }).then(data => data.json())
            .then(data => {
                this.setState({ hesaplar: data.bankAccounts })
            })
            .catch(err => alert(err))
        this.setState({
            isFetching: false,
        });
    };
    createAcc = () => {
        fetch(`http://207.154.196.92:5002/api/BankAccount`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `bearer ${this.state.token}`,
            },
        }).then(data => data.json())
            .then(data => {
                this.getAccs();

            })
            .catch(err => alert(err))
    };

    hesapKapat = (accountNo) => {
        fetch(`http://207.154.196.92:5002/api/BankAccount/` + accountNo, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: `bearer ${this.state.token}`,
            }
        }).then((response) => response.json())
            .then((responseData) => {
                //alert(JSON.stringify(responseData));
                var status = responseData['status'];
                if (status == 'success') {
                    alert("Hesap Kapatıldı..");
                    this.getAccs();

                }
                else {

                    var errors = responseData['errors'];
                    if (errors != null)
                        alert("hata: " + JSON.stringify(errors));
                    else
                        alert(responseData['message'])
                }


            })
            .catch((error) => {
                alert(error);
            })
    }
    render() {
        return (
            <View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.buttonStyleMenu}
                        onPress={() => {
                            this.createAcc();
                        }}>
                        <Icon
                            name="money"
                            size={16}
                            color="white"
                            backgroundColor="#708090">
                            <Text style={styles.buttonColorMenu}> Yeni Hesap Oluştur </Text>
                        </Icon>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.hesaplar}
                    refreshing={this.state.isFetching}
                    onRefresh={() => this.onRefresh()}
                    keyExtractor={(item) => item.no.toString()}
                    renderItem={({ item }) => (
                        <ListItem
                            topDivider
                            onPress={() =>
                                Alert.alert(
                                    'Hesabı Kapat!',
                                    'Hesabınızı kapatmak istediğinize emin misiniz?',
                                    [
                                        {
                                            text: 'İptal',
                                           
                                            style: 'cancel',
                                        },
                                        { text: 'OK', onPress: () => this.hesapKapat(item.no) }
                                    ],
                                    { cancelable: false },
                                )}
                            title={'Hesap No: ' + item.no}
                            subtitle={'Bakiye: ' + item.balance}
                            bottomDivider
                        >
                        </ListItem>
                    )}
                    nullable
                />
                <DialogInput isDialogVisible={this.state.isDialogVisible}
                    title={"Para Çek"}
                    message={"Parar Miktarını Giriniz"}
                    hintInput={""}
                    textInputProps={{ keyboardType: 'decimal-pad' }}
                    submitInput={(inputText) => { this.withdraw(inputText) }}
                    closeDialog={() => this.setState({ isDialogVisible: false })}>
                </DialogInput>
            </View>
        );
    }
}
