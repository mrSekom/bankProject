import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import moment from 'moment';
import styles from './HesapParaCekYatirStyle.js';
export default class HesapParaCekme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validateTutar: false,
      tutar: ""
    };
  }
  IslemYap = () =>{
    const { Hesap, islemTarihi, islemTuruID } = this.props.navigation.state.params;
    let ParaTransferi = {
      aliciHesapNo:islemTuruID,
      gonderenHesapNo:Hesap.hesapNo,
      islemTutari: this.state.tutar,
      aciklama: "Para Çekme",
      islemTarihi:islemTarihi,
      islemTuruID: islemTuruID
    }
      fetch("http://bankrestapi.azurewebsites.net/api/ParaTransferi/Add", {
      method: 'POST',
      body: JSON.stringify(ParaTransferi),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }})
      .then(()=>
        Alert.alert(
        "Başarılı!",
        "Para Çekme işleminiz başarılı bir şekilde tamamlanmıştır!",
        [{ text: 'OK', onPress: () => this.props.navigation.navigate("HesapDetaylari") }]
      ) ) 
    .catch(err=>alert("Hata!", "Para transfer işlemi sırasında bir hata oluştu !\nLütfen tekrar deneyin!"))
  }
  paraCek = () => {
    const { Hesap } = this.props.navigation.state.params;
    if (parseFloat(this.state.tutar) > 0) {
      if (Hesap.bakiye < parseFloat(this.state.tutar)) {
        Alert.alert(
          "Yetersiz Bakiye!",
          "Çekmek istediğiniz tutar kullanılabilir bakiyeden küçük olmalıdır!")
      }
      else {
        let tutar = -Math.abs(this.state.tutar)
        fetch("http://bankrestapi.azurewebsites.net/api/Hesap/ParaIslem?hesapNo=" + Hesap.hesapNo + "&tutar=" +tutar, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
          .then(() => this.IslemYap())
          .catch(err => Alert.alert("Hata!", "Para Çekme işlemi sırasında bir hata oluştu !\nLütfen tekrar deneyin!"))
      }
    }
    else {
      Alert.alert("Hata!", "Girdiğiniz tutar 0 dan büyük olmalıdır!")
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
                <Text style={styles.buttonColorMenu}> PARA ÇEKME </Text>
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
                keyboardType="phone-pad"
                value={this.state.tutar}
                maxLength={7}
                onChangeText={(text) => this.validateTutar(text)}>
              </TextInput>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonStyleMenu}
                onPress={() => { this.paraCek() }}>
                <Text style={styles.buttonColorMenu}> ÇEK </Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}

