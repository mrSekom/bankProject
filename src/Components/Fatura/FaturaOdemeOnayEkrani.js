import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from '../faturaHavaleVirmanStyle.js';
import moment from 'moment';

export default class FaturaOdemeOnayEkrani extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  paraCek = () => {
    const { odenecekFatura, odenenHesap } = this.props.navigation.state.params;
    let tutar = -Math.abs(odenecekFatura.faturaTutari)
    fetch("http://bankrestapi.azurewebsites.net/api/Hesap/ParaIslem?hesapNo=" + odenenHesap.hesapNo + "&tutar=" + tutar, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(() =>
        Alert.alert(
          "Başarılı!",
          "Fatura Ödeme işleminiz başarılı bir şekilde tamamlanmıştır!",
          [{ text: 'OK', onPress: () => this.props.navigation.navigate("Anasayfa") }]
        )
      )
      .catch(err => Alert.alert("Başarısız!", "Fatura Ödeme işlemi sırasında bir hata oluştu !\nLütfen tekrar deneyin!"))
  }
  faturaOde = () => {
    const { odenecekFatura, islemTarihi } = this.props.navigation.state.params;
    let Fatura = {
      faturaID: odenecekFatura.faturaID,
      aboneNo: odenecekFatura.aboneNo,
      ad: odenecekFatura.ad,
      soyad: odenecekFatura.soyad,
      sonOdemeTarihi: odenecekFatura.sonOdemeTarihi,
      faturaOdemeTarihi: islemTarihi,
      faturaTutari: odenecekFatura.faturaTutari,
      faturaDurumu: true
    }
    fetch("http://faturapi.azurewebsites.net/api/Fatura/FaturaOde", {
      method: 'POST',
      body: JSON.stringify(Fatura),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(() => this.IslemYap())
      .catch(err => alert("Başarısız!", "Fatura Ödeme işlemi sırasında bir hata oluştu !\nLütfen tekrar deneyin!"))
  }

  IslemYap = () => {
    const { odenecekFatura, odenenHesap, islemTarihi, islemTuruID } = this.props.navigation.state.params;
    let ParaTransferi = {
      aliciHesapNo: islemTuruID,
      gonderenHesapNo: odenenHesap.hesapNo,
      islemTutari: odenecekFatura.faturaTutari,
      aciklama: "Fatura Ödeme",
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
      .then(() => this.paraCek())
      .catch(err => alert("Başarısız!", "Fatura Ödeme işlemi sırasında bir hata oluştu !\nLütfen tekrar deneyin!"))
  }

  render() {
    const { odenecekFatura, odenenHesap, islemTarihi } = this.props.navigation.state.params;
    const sbstringAd = odenecekFatura.ad.substring(0,1)
    const sbstringSoyad = odenecekFatura.soyad.substring(0,1)
    return (
      <View style={styles.container, { marginTop: 15 }}>
        <ScrollView>
          <View style={styles.body}>

            <View style={styles.buttonContainer}>
              <View style={styles.buttonStyleHesap}>
                <Text style={styles.buttonColorMenu}>İŞLEM DETAYLARI</Text>
              </View>
            </View>

            <Text style={styles.infoColor} >KURUM BİLGİLERİ</Text>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonStyleOnayEkrani}>
                <Text style={styles.buttonColor} >ASKİ</Text>
              </View>
            </View>

            <Text style={styles.infoColor} >FATURA BİLGİLERİ</Text>
            <View style={styles.buttonContainer}>
              <View style={styles.hesapBilgiContainerFO}>
                <Text style={styles.hesapText}> Son Ödeme Tarihi: <Text style={{ color: "#708090", fontWeight: "bold" }}>{moment(odenecekFatura.sonOdemeTarihi).format("DD/MM/YYYY")}</Text></Text>
                <Text style={styles.hesapText}> Ad Soyad: {sbstringAd+"** "+ sbstringSoyad+"**"}</Text>
                <Text style={styles.hesapText}> Abone No: {odenecekFatura.aboneNo} </Text>
              </View>
            </View>

            <Text style={styles.infoColor} >TUTAR</Text>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonStyleOnayEkrani}>
                <Text style={styles.buttonColor} > {odenecekFatura.faturaTutari} TL </Text>
              </View>
            </View>

            <Text style={styles.infoColor} >İŞLEM TARİHİ</Text>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonStyleOnayEkrani}>
                <Text style={styles.buttonColor} > {moment(islemTarihi).format("DD.MM.YYYY  HH:mm")} </Text>
              </View>
            </View>

            <Text style={styles.infoColor} >ÖDENECEK HESAP</Text>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonStyleOnayEkrani}>
                <Text style={styles.buttonColor} > {odenenHesap.ad + " " + odenenHesap.soyad} - {odenenHesap.hesapNo} </Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonStyleMenu}
                onPress={() => { this.faturaOde() }}>
                <Text style={styles.buttonColorMenu}> ONAYLA </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
