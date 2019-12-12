import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import moment from 'moment';
import styles from './HesapParaCekYatirStyle.js';
export default class HesapParaYatirma extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validateTutar: false,
      tutar: ""
    };
  }
  IslemYap = () => {
    const { Hesap, islemTarihi, islemTuruID } = this.props.navigation.state.params;
    let ParaTransferi = {
      aliciHesapNo: Hesap.hesapNo,
      gonderenHesapNo: islemTuruID,
      islemTutari: this.state.tutar,
      aciklama: "Para Yatırma",
      islemTarihi: islemTarihi,
      islemTuruID: islemTuruID
    }
    fetch("http://207.154.196.92:5002/api/BankAccount/deposit", {
      method: 'POST',
      body: JSON.stringify({

      //  "no": ,
      //  "amount":

      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(() =>
        Alert.alert(
          "Başarılı!",
          "Para Yatırma işleminiz başarılı bir şekilde tamamlanmıştır!",
          [{ text: 'OK', onPress: () => this.props.navigation.navigate("HesapDetaylari") }]
        ))
      .catch(err => alert("Hata!", "Para transfer işlemi sırasında bir hata oluştu !\nLütfen tekrar deneyin!"))
  }
  paraYatir = () => {
    const { Hesap } = this.props.navigation.state.params;
    if (parseFloat(this.state.tutar) > 0) {
      fetch("http://bankrestapi.azurewebsites.net/api/Hesap/ParaIslem?hesapNo=" + Hesap.hesapNo + "&tutar=" + this.state.tutar, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
        .then(() => this.IslemYap()
        )
        .catch(err => Alert.alert("Hata!", "Para Yatırma işlemi sırasında bir hata oluştu !\nLütfen tekrar deneyin!"))
    }
    else {
      Alert.alert(
        "Hata!",
        "Girdiğiniz tutar 0 dan büyük olmalıdır!")
    }
  }
  validateTutar = (text) => {
    this.setState({ tutar: text.replace(/[^0-9.]/g, '') });
    if (text != '')
      this.setState({ validateTutar: true })
    else
      this.setState({ validateTutar: false })
  }
  render() {
    const { Hesap } = this.props.navigation.state.params;
    return (
      <View style={styles.container, { marginTop: 15 }}>
        <ScrollView>
          <View style={styles.body}>

            <View style={styles.buttonContainer}>
              <View style={styles.buttonStyleHesap}>
                <Text style={styles.buttonColorMenu}> PARA YATIRMA </Text>
              </View>
            </View>

            <View style={styles.buttonContainerPY}>
              <Text style={styles.hesapNo}> {Hesap.musteriNo} - {Hesap.ekNo} </Text>
              <Text style={styles.hesapText}> Bakiye: {parseFloat(Hesap.bakiye).toFixed(2)} TL</Text>
              <Text style={styles.hesapText}> Kullanılabilir Bakiye: {parseFloat(Hesap.bakiye).toFixed(2)} TL</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TextInput style={styles.buttonStyleAbone}
                placeholder="Örn: 1500"
                underlineColorAndroid='transparent'
                placeholderTextColor="gray"
                value={this.state.tutar}
                keyboardType={'phone-pad'}
                maxLength={7}
                onChangeText={(text) => this.validateTutar(text)}>
              </TextInput>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonStyleMenu}
                onPress={() => { this.paraYatir() }}>
                <Text style={styles.buttonColorMenu}> YATIR </Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}

