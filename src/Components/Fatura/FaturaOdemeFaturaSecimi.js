import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../faturaHavaleVirmanStyle.js';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class FaturaOdemeFaturaSecimi extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { musteriNo,Fatura,islemTuruID } = this.props.navigation.state.params;

    let faturalar = Fatura.map((fatura) => {
      const sbstringAd = fatura.ad.substring(0,1)
      const sbstringSoyad = fatura.soyad.substring(0,1)
        return (
        <View style={styles.buttonContainer} key={fatura.faturaID}>
        <TouchableOpacity style={styles.hesapBilgiContainer}
                    onPress={() => {this.props.navigation.navigate('FaturaOdemeHesapSecimi',{musteriNo:musteriNo,odenecekFatura:fatura,islemTuruID:islemTuruID})}}>
                    <Text style={styles.hesapText}> Son Ödeme Tarihi: <Text style={{color:"#708090",fontWeight:"bold"}}>{moment(fatura.sonOdemeTarihi).format("DD/MM/YYYY")}  <Icon name="hourglass-end" size={13} color="#708090"></Icon></Text></Text>          
                    <Text style={styles.hesapText}> Ad Soyad: {sbstringAd+"** "+sbstringSoyad+"**"}</Text>
                    <Text style={styles.hesapText}> Abone No: {fatura.aboneNo} </Text>
                    <Text style={styles.hesapText}> Fatura Tutarı: <Text style={styles.hesapNo}>{fatura.faturaTutari} TL </Text></Text>
        </TouchableOpacity>
      </View>
      )
  })
    return (
      <View style={styles.container,{marginTop:15}}>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonStyleHesap}>
                <Text style={styles.buttonColorMenu}>FATURA SEÇİMİ</Text>
              </View>
            </View>
            {faturalar}
          </View>
        </ScrollView>
      </View>
    );
  }
}

