import React, { Component } from 'react';
import {Text, View, TouchableOpacity, ScrollView, TextInput,Alert } from 'react-native';
import styles from '../faturaHavaleVirmanStyle.js';
export default class FaturaOdemeAboneBilgi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Fatura:[],
      validateAbone:false,
      aboneNo:'',
    };
  }
  AboneGetir = () => {
    const { musteriNo,islemTuruID } = this.props.navigation.state.params;
    fetch('http://faturapi.azurewebsites.net/api/Fatura/GetById/'+this.state.aboneNo)
      .then(res => {
        if (res.ok) {
          fetch("http://faturapi.azurewebsites.net/api/Fatura/GetById/" + this.state.aboneNo)
            .then(res => res.json())
            .then(response => {
              this.setState({ Fatura: response });
              this.props.navigation.navigate('FaturaOdemeFaturaSecimi',{musteriNo:musteriNo,Fatura:this.state.Fatura,islemTuruID:islemTuruID})             
            })
            .catch(err => Alert.alert("Hata!", "Bir hata oluştu lütfen tekrar deneyin!"));
        }
        else {
          Alert.alert("Borç Bulunamadı!", "Bu Abone Numarasına Ait Borç Bulunmamaktadır!")
        }
      })
      .catch(err => Alert.alert("Hata!", "Bir hata oluştu lütfen tekrar deneyin!"));
  }
  validateAboneNo = (text) => {
    this.setState({ aboneNo: text.replace(/[^0-9]/g, '') });
    if (text != '')
      this.setState({ validateAbone: true })
    else
      this.setState({ validateAbone: false })
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}></View>
          <View style={styles.header}></View>
          <View style={styles.body}>

            <View style={styles.buttonContainer}>
              <View style={styles.buttonStyleHesap}>
                <Text style={styles.buttonColorMenu}>ABONE BİLGİLERİ</Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TextInput
                style={styles.buttonStyleAbone}
                placeholder="Abone Numarası Giriniz..."
                underlineColorAndroid='transparent'
                placeholderTextColor="gray"
                value={this.state.aboneNo}
                keyboardType={'phone-pad'}
                maxLength={8}
                onChangeText={(text) => this.validateAboneNo(text)}>
              </TextInput>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonStyleMenu}
                onPress={() => { this.AboneGetir() }}>
                <Text style={styles.buttonColorMenu}> DEVAM </Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}
