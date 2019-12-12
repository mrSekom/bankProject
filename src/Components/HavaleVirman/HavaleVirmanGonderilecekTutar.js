import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import moment from 'moment';
import styles from '../faturaHavaleVirmanStyle.js';
export default class HavaleGonderilecekTutar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validateTutar: false,
      tutar:''
    };
  }
  tutarKontrol = () => {
    var islemTarihi = moment().format();
    const { musteriNo, aliciHesap, gonderenHesap, islemTuruID } = this.props.navigation.state.params;
    if (parseFloat(this.state.tutar).toFixed(2) > 0) {
      if (gonderenHesap.bakiye < parseFloat(this.state.tutar).toFixed(2)) {
        Alert.alert(
          "Yetersiz Bakiye!",
          "Seçilen hesap bakiyesi, işlem için yetersizdir!")
      }
      else {
        this.props.navigation.navigate('HavaleVirmanOnayEkrani', { musteriNo: musteriNo, aliciHesap: aliciHesap, gonderenHesap: gonderenHesap, gonderilecekTutar: parseFloat(this.state.tutar).toFixed(2), islemTuruID: islemTuruID, islemTarihi: islemTarihi })
      }
    }
    else {
      Alert.alert(
        "Hata!",
        "Göndermek istediğiniz tutar 0 dan büyük olmalıdır!")
    }
  }

  validateTutar = (text) => {
    this.setState({tutar:text.replace(/[^0-9.]/g, '')});
    if(text != '')
      this.setState({validateTutar: true})
    else
      this.setState({validateTutar: false})
  }

  render() {

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}></View>
          <View style={styles.header}></View>
          <View style={styles.body}>

            <View style={styles.buttonContainer}>
              <View
                style={styles.buttonStyleHesap}>
                <Text style={styles.buttonColorMenu}>GÖNDERİLECEK TUTAR</Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TextInput
                style={styles.buttonStyleAbone}
                placeholder="Örn: 1500"
                underlineColorAndroid='transparent'
                placeholderTextColor="gray"
                keyboardType="phone-pad"
                value = {this.state.tutar}
                maxLength={11}
                onChangeText={(text) => this.validateTutar(text)}
                />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonStyleMenu}
                onPress={() => { this.tutarKontrol() }}>
                <Text style={styles.buttonColorMenu}> DEVAM </Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}

