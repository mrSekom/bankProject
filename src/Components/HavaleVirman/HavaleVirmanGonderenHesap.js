import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../faturaHavaleVirmanStyle.js';
export default class HavaleGonderenHesap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Hesaplar: [],
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
    const { musteriNo,aliciHesap,islemTuruID } = this.props.navigation.state.params;
    let hesaplar = this.state.Hesaplar.map((hesap) => {
      if(islemTuruID==2)
      {
        if(hesap.hesapNo!=aliciHesap.hesapNo)
      return (
        <View style={styles.contContainer} key={hesap.hesapNo}>
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => { this.props.navigation.navigate('HavaleVirmanGonderilecekTutar',{musteriNo:musteriNo,aliciHesap:aliciHesap,gonderenHesap:hesap,islemTuruID:islemTuruID})}}>
              <Text style={styles.hesapNo}> {hesap.musteriNo} - {hesap.ekNo} </Text>
              <Text style={styles.hesapText}> Bakiye: {parseFloat(hesap.bakiye).toFixed(2)} TL</Text>
              <Text style={styles.hesapText}> Kullanılabilir Bakiye: {parseFloat(hesap.bakiye).toFixed(2)} TL</Text>
        </TouchableOpacity>
      </View>
      )
      }
      else
      {
        return (
          <View style={styles.contContainer} key={hesap.hesapNo}>
          <TouchableOpacity style={styles.buttonContainer} 
          onPress={() => { this.props.navigation.navigate('HavaleVirmanGonderilecekTutar',{musteriNo:musteriNo,aliciHesap:aliciHesap,gonderenHesap:hesap,islemTuruID:islemTuruID})}}>
                <Text style={styles.hesapNo}> {hesap.musteriNo} - {hesap.ekNo} </Text>
                <Text style={styles.hesapText}> Bakiye: {parseFloat(hesap.bakiye).toFixed(2)} TL</Text>
                <Text style={styles.hesapText}> Kullanılabilir Bakiye: {parseFloat(hesap.bakiye).toFixed(2)} TL</Text>
          </TouchableOpacity>
        </View>
        )
      }
  })
    return (
      <View style={styles.container,{marginTop:15}}>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.buttonContainer}>
              <View
                style={styles.buttonStyleHesap}>
                <Text style={styles.buttonColorMenu}>GÖNDEREN HESAP</Text>
              </View>
            </View>
            {hesaplar}
          </View>
        </ScrollView>
      </View>
    );
  }
}
