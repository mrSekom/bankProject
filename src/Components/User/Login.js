import React, { Component } from 'react';
import { TouchableOpacity, Image, Text, View, TextInput, Alert,AsyncStorage } from 'react-native';
import styles from '../loginStyle.js';

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Musteri: {},
      tc: '',
      password: '',
      validatePassword: false,
      validateTC: false
    }
  }

  _storeLogin = async (tc,firstName,lastName,phoneNumber,customerNo) => {
    try {
      //alert(data)
      await AsyncStorage.setItem('tc', tc);
      await AsyncStorage.setItem('firstName', firstName);
      await AsyncStorage.setItem('lastName', lastName);
      await AsyncStorage.setItem('phoneNumber', phoneNumber);
      
      await AsyncStorage.setItem('customerNo', customerNo);
    } catch (error) {
      // Error saving data
    }
  };  

  

  validateTC = (text) => {
    this.setState({ tc: text.replace(/[^0-9]/g, '') });
    if (text != '')
      this.setState({ validateTC: true })
    else
      this.setState({ validateTC: false })
  }
  validatePassword = (text) => {
    if (text != '')
      this.setState({ password: text, validatePassword: true })
    else
      this.setState({ validatePassword: false })
  }
  ///api/auth/login
  /* GirisYap=()=>{
     fetch("http://207.154.196.92:5002/api/auth/login"+this.state.tc+"&password="+this.state.password)
     .then(data=>{
        if(data.ok){
          fetch("http://bankrestapi.azurewebsites.net/api/Musteri/GetByTcknPassword?tc="+this.state.tc+"&password="+this.state.password)
            .then(res=>res.json())
            .then(response=>{
                let musteri =response;
                this.setState({Musteri:response})
                this.props.navigation.navigate("Anasayfa",{musteriNo:musteri.musteriNo});  
               })
            .catch(err=>alert(err));
        }
        else{
          Alert.alert('Hata!', 'Tc veya Şifre hatalı!')}
     })
     .catch(err=>alert(err))
   } */

  GirisYap = () => {
    fetch("http://207.154.196.92:5002/api/auth/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": this.state.password,
        "tc": this.state.tc,

      })
    })

      .then((response) => response.json())
      .then((responseData) => {
        //alert(JSON.stringify(responseData));
        var status = responseData['status'];
        if (status == 'success') {
          alert("Giriş Yapıldı!");
          var _Musteri = {
            "firstName": responseData.firstName,
            "lastName": responseData.lastName,
            "password": responseData.password,
            "phoneNumber": responseData.phoneNumber,
            "tc": responseData.tc,
            "customerNo":responseData.no
          };
          this.props.navigation.navigate('Anasayfa', { mus: _Musteri, token: responseData.token});
          this._storeLogin(responseData.tc,responseData.firstName,responseData.lastName,responseData.phoneNumber,responseData.no.toString());          
        }
        else {

          var errors = responseData['errors'];
          if (errors != null)
            alert("hata: " + JSON.stringify(errors));
          else
            alert(responseData['message'])
        }


      })
      .catch((error) => {
        alert(error);
      })



  }

  doClear = () => {
    let textInputPwd = this.refs["inputPw"];
    let textInputTC = this.refs["inputTc"];
    textInputTC.clear();
    textInputPwd.clear();
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.boslukTop}></View>

        <View style={styles.styleLogo}>
          <Image style={styles.imageStyle}
            resizeMode="contain"
            source={require("../../img/loginLogo.png")} />
        </View>

        <View style={styles.inputContainerLogin}>
          <TextInput ref="inputTc"
            placeholder="TC"
            underlineColorAndroid='transparent'
            placeholderTextColor="gray"
            style={styles.inputStyleL}
            maxLength={11}
            value={this.state.tc}
            keyboardType={'phone-pad'}
            onChangeText={(text) => this.validateTC(text)}
          />
          <TextInput ref="inputPw"
            placeholder="***********"
            underlineColorAndroid='transparent'
            placeholderTextColor="gray"
            style={styles.inputStyleL}
            secureTextEntry={true}
            maxLength={16}
            onChangeText={(text) => this.validatePassword(text)}
          />
        </View>

        <View style={styles.buttonContainerL}>
          <TouchableOpacity style={styles.buttonStyleLogin}
            onPress={() => { this.GirisYap(); /*this.doClear()*/ }}>
            <Text style={styles.buttonColorLogin} > Giriş Yap </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRegisterLogin}>
          <Text>Bir Hesabın Yok Mu?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("KullaniciKayit")}>
            <Text style={styles.registerColor}>Kayıt Ol</Text></TouchableOpacity>
        </View>

        <View style={styles.bottomBosluk}></View>
      </View>
    );
  }
}