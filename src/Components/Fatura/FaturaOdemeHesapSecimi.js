import React, { Component } from 'react';
import {Text, View, TouchableOpacity, ScrollView,Alert } from 'react-native';
import styles from '../faturaHavaleVirmanStyle.js';
import moment from 'moment';

export default class FaturaOdemeHesapSecimi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Hesaplar:[]
    };
  }
  componentDidMount() {
    const { musteriNo } = this.props.navigation.state.params;
    fetch('http://bankrestapi.azurewebsites.net/api/Hesap/GetByMusteriNo?musteriNo='+musteriNo)
      .then(res => res.json())
      .then(response => {
        this.setState({Hesaplar: response});      
      })
      .catch(err => alert(err));
}

  render() {
    var islemTarihi = moment().format();
    const { musteriNo,odenecekFatura,islemTuruID } = this.props.navigation.state.params;
    let hesaplar = this.state.Hesaplar.map((hesap) => {
      return (
        <View style={styles.contContainer} key={hesap.hesapNo}>
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => { 
          if(hesap.bakiye>=odenecekFatura.faturaTutari)
            this.props.navigation.navigate('FaturaOdemeOnayEkrani',{musteriNo:musteriNo,odenecekFatura:odenecekFatura,odenenHesap:hesap,islemTarihi:islemTarihi,islemTuruID:islemTuruID})
          else
            Alert.alert("Yetersiz Bakiye!","Seçilen hesap bakiyesi, işlem için yetersizdir!")
          }}>
              <Text style={styles.hesapNo}> {hesap.musteriNo} - {hesap.ekNo} </Text>
              <Text style={styles.hesapText}> Bakiye: {parseFloat(hesap.bakiye).toFixed(2)} TL</Text>
              <Text style={styles.hesapText}> Kullanılabilir Bakiye: {parseFloat(hesap.bakiye).toFixed(2)} TL</Text>
        </TouchableOpacity>
      </View>
      )
    });
    return (
      <View style={styles.container,{marginTop:15}}>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.buttonContainer}>
              <View
                style={styles.buttonStyleHesap}>
                <Text style={styles.buttonColorMenu}>HESAP SEÇİMİ</Text>
              </View>
            </View>
            {hesaplar}
          </View>
        </ScrollView>
      </View>
    );
  }
}

