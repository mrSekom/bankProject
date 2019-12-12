import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../faturaHavaleVirmanStyle.js';
export default class HesapHareket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hesaplar: [],
            token: this.props.navigation.state.params.token,
        };
    }

    getAccs = () => {

        fetch(`http://207.154.196.92:5002/api/Transaction`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `bearer ${this.state.token}`,
            },
        }).then(data => data.json())
            .then(data => {
                this.setState({ hesaplar: data.transactions })
            })
            .catch(err => alert(err))

    };

    componentDidMount() {
        this.getAccs();
    }

    render() {
        //const { musteriNo,islemTuruID } = this.props.navigation.state.params;
        let hesaplar = this.state.hesaplar.map((hesap) => {
            return (
                <View style={styles.contContainer} >
                    <TouchableOpacity style={styles.buttonContainer}
                    >
                        <Text style={styles.hesapNo}>GöndereciMüşteriNo: {hesap.senderCustomerNo}  </Text>
                        <Text style={styles.hesapText}>AlıcıMüşteriNo:  {hesap.receiverCustomerNo}</Text>
                        <Text style={styles.hesapNo}>GöndericiHesapNo:{hesap.senderBankAccountNo}  </Text>
                        <Text style={styles.hesapText}> AlıcıHesapNo: {hesap.receiverBankAccountNo}</Text>
                        <Text style={styles.hesapNo}>Tutar: {hesap.amount}  </Text>
                        <Text style={styles.hesapText}> Acıklama: {hesap.summary} TL</Text>
                        <Text style={styles.hesapNo}>GöndermeTarihi: {hesap.date}  </Text>
                        <Text style={styles.hesapText}> GönderenKişi: {hesap.receiverFullName}</Text>
                       
                    </TouchableOpacity>
                </View>
            )
        })
        return (
            <View style={styles.container, { marginTop: 15 }}>
                <ScrollView>
                    <View style={styles.body}>
                        <View style={styles.buttonContainer}>
                            <View
                                style={styles.buttonStyleHesap}>
                                <Text style={styles.buttonColorMenu}>HESAP HAREKETLERİ</Text>
                            </View>
                        </View>
                        {hesaplar}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

