import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import styles from '../faturaHavaleVirmanStyle.js';
import moment from 'moment';

export default class HavaleOnayEkrani extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aciklama: "",
      validateAciklama: false
    };
  }
  IslemYap = () => {
    const { musteriNo, aliciHesap, gonderenHesap, gonderilecekTutar, islemTuruID, islemTarihi } = this.props.navigation.state.params;
    let ParaTransferi = {
      aliciHesapNo: aliciHesap.hesapNo,
      gonderenHesapNo: gonderenHesap.hesapNo,
      islemTutari: gonderilecekTutar,
      aciklama: this.state.aciklama,
      islemTarihi: islemTarihi,
      islemTuruID: islemTuruID
    }
    fetch("http://bankrestapi.azurewebsites.net/api/ParaTransferi/Add", {
      method: 'POST',
      body: JSON.stringify(ParaTransferi),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(() => this.paraTransferi())
      .catch(err => alert("Hata!", "Para transfer işlemi sırasında bir hata oluştu !\nLütfen tekrar deneyin!"))
  }
  paraTransferi = () => {
    const { aliciHesap, gonderenHesap, gonderilecekTutar } = this.props.navigation.state.params;
    fetch("http://bankrestapi.azurewebsites.net/api/Hesap/HavaleVirman?aliciHesapNo=" + aliciHesap.hesapNo + "&gonderenHesapNo=" + gonderenHesap.hesapNo + "&tutar=" + gonderilecekTutar, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(() =>
        Alert.alert(
          "Başarılı!",
          "Para transfer işleminiz başarılı bir şekilde tamamlanmıştır!",
          [{ text: 'OK', onPress: () => this.props.navigation.navigate('Anasayfa') }]
        )
      )
      .catch(err => Alert.alert("Başarısız!", "Para transfer işlemi sırasında bir hata oluştu !\nLütfen tekrar deneyin!"))
  }
  validateAciklama = (text) => {
    if (text != '')
      this.setState({ validateAciklama: true, aciklama: text })
    else
      this.setState({ validateAciklama: false })
  }
  render() {
    const { musteriNo, aliciHesap, gonderenHesap, gonderilecekTutar, islemTarihi, islemTuruID } = this.props.navigation.state.params;
    return (
      <View style={styles.container, { marginTop: 15 }}>
        <ScrollView>
          <View style={styles.body}>

            <View style={styles.buttonContainer}>
              <View style={styles.buttonStyleHesap}>
                <Text style={styles.buttonColorMenu}>İŞLEM DETAYLARI</Text>
              </View>
            </View>

            <Text style={styles.infoColor} >GÖNDEREN HESAP</Text>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonStyle}>
                <Text style={styles.buttonColor} >{gonderenHesap.ad} {gonderenHesap.soyad} - {gonderenHesap.hesapNo} </Text>
              </View>
            </View>

            <Text style={styles.infoColor}>ALICI HESAP</Text>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonStyle}>
                <Text style={styles.buttonColor} >{aliciHesap.ad} {aliciHesap.soyad} - {aliciHesap.hesapNo} </Text>
              </View>
            </View>

            <Text style={styles.infoColor} >TUTAR</Text>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonStyle}>
                <Text style={styles.buttonColor} > {gonderilecekTutar} TL </Text>
              </View>
            </View>

            <Text style={styles.infoColor} >İŞLEM TARİHİ</Text>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonStyle}>
                <Text style={styles.buttonColor} > {moment(islemTarihi).format("DD.MM.YYYY - HH:mm")} </Text>
              </View>
            </View>


            <Text style={styles.infoColor} >AÇIKLAMA</Text>
            <View style={styles.buttonContainer}>
              <TextInput
                style={styles.buttonStyle}
                placeholder="Bir açıklama ekle..."
                placeholderTextColor="gray"
                fontFamily="Bahnschrift"
                maxLength={70}
                onChangeText={(text) => this.validateAciklama(text)}>
              </TextInput>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonStyleMenu}
                onPress={() => { this.IslemYap() }}>
                <Text style={styles.buttonColorMenu}> ONAYLA </Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}

