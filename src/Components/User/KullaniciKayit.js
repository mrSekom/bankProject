import React, { Component } from 'react';
import { TouchableOpacity, Text, View, TextInput, Alert, ScrollView } from 'react-native';
import styles from './kullaniciKayitStyle.js';

export default class KullaniciKayit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tcError: "",
      passwordError: "",
      firstNameError: "",
      lastNameError: "",
      phoneNumberError:"",
      Musteri: {}, //tc
      firstName: '',
      lastName: '',
      phoneNumber:'',
      validatelastName: false,
      validatefirstName: false,
      validateTC: false,
      validatePassword: false,
      validatephoneNumber:false,
      pickerData: ''
    }
  }

  validatefirstName = (text) => {
    let musteri = this.state.Musteri;
    musteri.firstName = text.replace(/[0-9&+,:;=?@#|'~₺{}<>./^*()%!-]/g, '');
    this.setState({ Musteri: musteri })
    if (text != '') {
      this.setState({
        validatefirstName: true,
        firstNameError: ""
      })
    }
    else {
      this.setState({
        validatefirstName: false,
        firstNameError: "!"
      })
    }
  }

  validatelastName = (text) => {
    let musteri = this.state.Musteri;
    musteri.lastName = text.replace(/[0-9&+,:;=?@#|'~₺{}<>./^*()%!-]/g, '');
    this.setState({ Musteri: musteri })
    if (text != '') {
      this.setState({
        validatelastName: true,
        lastNameError: ""
      })
    }
    else {
      this.setState({
        validatelastName: false,
        lastNameError: "!"
      })
    }
  }

  validateTC = (text) => {
    let musteri = this.state.Musteri;
    musteri.tc = text.replace(/[^0-9]/g, '');
    this.setState({ Musteri: musteri })
    if (text !== '' && this.state.Musteri.tc.length == 11) {
      this.setState({
        tcError: "",
        validateTC: true,
      });
    }
    else
      this.setState({ tcError: "!", validateTC: false })
  }

  validatephoneNumber = (text) => {
    let musteri = this.state.Musteri;
    let phoneNumber = this.state.phoneNumber;
    musteri.phoneNumber = text.replace(/[^0-9]/g, '');
    this.setState({ Musteri: musteri })
    if (text !== '' && musteri.phoneNumber.length == 11) {
      this.setState({
        phoneNumberError: "",
        validatephoneNumber: true,
      });
    }
    else
      this.setState({ phoneNumberError: "!", validatephoneNumber: false })
  }

  validatePassword = (text) => {
    if (text != '' && this.state.Musteri.password.length >= 6)
      this.setState({
        validatePassword: true,
        passwordError: ""
      })
    else
      this.setState({
        validatePassword: false,
        passwordError: "!"
      })
  }
  //api gidip boyle bir musteri varmi diye soruyor
  KayitOl = () => {




    let Musteri = this.state.Musteri;
    if (this.state.validateTC && this.state.validatePassword && this.state.validatefirstName && this.state.validatelastName & this.state.validatephoneNumber) {
      if (this.state.Musteri.tc.length != 11) {
        this.setState({ tcError: "!" })
        Alert.alert('Hata!', 'TC Kimlik Numarası 11 Haneli olmalıdır!')
        
      }
      //if(this.state.Musteri)
      else {
        if (this.state.Musteri.phoneNumber.length != 11) {
          this.setState({ phoneNumberError: "!" })
          Alert.alert('Hata!', 'phoneNumber 11 Haneli olmalıdır!')
          
        }
        else{
          //alert(JSON.stringify(this.state.Musteri));
          this.Register();
        }
        
      }
    }
    else {
      {
        Alert.alert('Hata!', 'Lütfen bilgileri doğru ve eksiksiz giriniz!')
      }
    }
  }
    Register = () => {
      
      //const { mus } = this.props.navigation.state.params;
      var mus = this.state.Musteri;
        //alert('register ici'+JSON.stringify(mus));
        //Musteri.acilisPlatformID = 2,
        //  Musteri.kayıtTarihi = moment().format();
        fetch("http://207.154.196.92:5002/api/Auth/register", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "firstName": mus.firstName,
              "lastName": mus.lastName,
              "password": mus.password,
              "phoneNumber": mus.phoneNumber,
              "tc": mus.tc,
            })
        })
      
            .then((response) => response.json())
            .then((responseData) => 
            {
              //alert(JSON.stringify(responseData));
              
              var status=responseData['status']; 
              if(status == 'success')
              {
                this.createAcc(responseData.token);
                alert("Kayıt başarılı Login yönlendiriliyorsunuz");
                 this.props.navigation.navigate('Login');
              }
              else
              {
                
                var errors=responseData['errors'];
                if(errors!=null)
                alert("hata: "+JSON.stringify(errors));
                else
                  alert(responseData['message'])
              }
      
           
      })
      .catch((error) =>{
        alert(error);
      }) 
    }

    createAcc  = (token) => {
      fetch(`http://207.154.196.92:5002/api/BankAccount`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `bearer ${token}`,
        },
    }).then(data => data.json())
        .then(data => {
            console.log('Yeni Hesap Oluştu!');
        })
        .catch(err => alert(err))
    };
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.inputContainerKK}>
            <View style={{ flexDirection: "row" }}>
              <TextInput id='tc'
                placeholder="TC"
                underlineColorAndroid='transparent'
                placeholderTextColor="gray"
                style={styles.inputStyleKK}
                maxLength={11}
                value={this.state.Musteri.tc}
                keyboardType={'phone-pad'}
                onChangeText={(text) => this.validateTC(text)}
              />
              <Text style={styles.inputStyleIcon}> {this.state.tcError} </Text>
            </View>




            <View style={{ flexDirection: "row" }}>
              <TextInput id='password'
                placeholder="Şifre"
                underlineColorAndroid='transparent'
                placeholderTextColor="gray"
                style={styles.inputStyleKK}
                secureTextEntry={true}
                maxLength={20}
                onChangeText={(text) => {
                  let musteri = this.state.Musteri;
                  musteri.password = text;
                  this.setState({ Musteri: musteri })
                  this.validatePassword(text)
                }}
              />
              <Text style={styles.inputStyleIcon}> {this.state.passwordError} </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TextInput id='phoneNumber'
                placeholder="Tel"
                underlineColorAndroid='transparent'
                placeholderTextColor="gray"
                style={styles.inputStyleKK}
                maxLength={11}
                value={this.state.Musteri.phoneNumber}
                keyboardType={'phone-pad'}
                onChangeText={(text) => this.validatephoneNumber(text)}
              />
              <Text style={styles.inputStyleIcon}> {this.state.phoneNumberError} </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TextInput id='firstName'
                placeholder="Ad"
                underlineColorAndroid='transparent'
                placeholderTextColor="gray"
                style={styles.inputStyleKK}
                maxLength={20}
                value={this.state.Musteri.firstName}
                onChangeText={(text) => this.validatefirstName(text)}
              />
              <Text style={styles.inputStyleIcon}> {this.state.firstNameError} </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TextInput id='lastName'
                placeholder="Soyad"
                underlineColorAndroid='transparent'
                placeholderTextColor="gray"
                style={styles.inputStyleKK}
                maxLength={20}
                value={this.state.Musteri.lastName}
                onChangeText={(text) => this.validatelastName(text)}
              />
              <Text style={styles.inputStyleIcon}> {this.state.lastNameError} </Text>
            </View>
          </View>
          <View style={styles.buttonContainerKK}>
            <TouchableOpacity style={styles.buttonStyleKK}
              onPress={() => { this.KayitOl() }}>
              <Text style={styles.buttonColorKK} > Kayıt Ol </Text>
            </TouchableOpacity>
            <View style={styles.buttonRegisterKK}>
              <Text style={styles.buttonColor}>Kaydı tamamlamak için devam edin..</Text>
            </View>
          </View>

        </ScrollView>
      </View>
    );
  }
}