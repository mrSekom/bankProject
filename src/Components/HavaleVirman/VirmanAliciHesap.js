import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../faturaHavaleVirmanStyle.js';
export default class VirmanAliciHesap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hesaplar: [],
      token:this.props.navigation.state.params.token,
    };
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

  };

  componentDidMount() {
    this.getAccs();
}

  render() {
    let ffggf;
    //const { musteriNo,islemTuruID } = this.props.navigation.state.params;
    let hesaplar = this.state.hesaplar.map((hesap) => {
      return (
        <View style={styles.contContainer} >
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => {this.props.navigation.navigate('VirmanGonderenHesap',{ token:this.props.navigation.state.params.token,receiverBankAccountNo:hesap.no}) }}>
              <Text style={styles.hesapNo}> {hesap.no}  </Text>
              <Text style={styles.hesapText}> Bakiye: {hesap.balance} TL</Text>
               </TouchableOpacity>
      </View>
      )
  })
    return (
      <View style={styles.container,{marginTop:15}}>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.buttonContainer}>
              <View
                style={styles.buttonStyleHesap}>
                <Text style={styles.buttonColorMenu}>ALICI HESAP</Text>
              </View>
            </View>
              {hesaplar}
          </View>
        </ScrollView>
      </View>
    );
  }
}

