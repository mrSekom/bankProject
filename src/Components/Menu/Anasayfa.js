import React, { Component } from 'react';
import { Text, View, TouchableOpacity, RefreshControl,ScrollView, BackHandler, FlatList, AsyncStorage, Button, Alert } from 'react-native';
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../faturaHavaleVirmanStyle.js';
export default class Anasayfa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      bakiye: 0,
      token: this.props.navigation.state.params.token,
      hesaplar: [],
      tc: 0,
      toplamPara: 0,
      isFetching:false,
      refreshing: false,
    };

    //alert('Anasayfa: ' + JSON.stringify(this.props.navigation.state.params.mus));
  }

  give = async () => {
    let deger = await AsyncStorage.getItem('tc');
    console.log("degerrrr:  " + deger);
    this.setState({
      tc: deger
    })
    console.log("tc" + deger)
    return deger;
  }

  giveCus = async () => {
    let deger = await AsyncStorage.getItem('customerNo');
 //   alert("customerNo1111:" + deger);
    console.log("degerrrr:  " + deger);
    this.setState({
      customerNo: deger
    })
    return deger;
  }
  paraHesapla = () => {
    let toplam = 0;
    for (let userObject of this.state.hesaplar) {
      toplam += userObject.balance;
    }
    this.setState({
      toplamPara: toplam
    })
  }

  componentDidMount() {
    this.getAccs();
    this.give();
    this.giveCus();
  }

  createAcc = () => {
    fetch(`http://207.154.196.92:5002/api/BankAccount`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `bearer ${this.state.token}`,
      },
    }).then(data => data.json())
      .then(data => {
        this.getAccs();

      })
      .catch(err => alert(err))
  };
  getAccs = () => {

    fetch(`http://207.154.196.92:5002/api/BankAccount`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `bearer ${this.state.token}`,
      },
    }).then(data => data.json())
      .then(data => {
        this.setState({ hesaplar: data.bankAccounts })
        this.paraHesapla();
      })
      .catch(err => alert(err))
      this.setState({
        isFetching: false,
      });
  };
  /*fetchInvoice = () => {
    const { mus } = this.props.navigation.state.params;
    fetch(
      'http://bankrestapi.azurewebsites.net/api/Hesap/GetToplamBakiye/'+musteriNo,
    )
      .then(res => res.json())
      .then(response => {
        this.setState({bakiye: response});      
      })
      .catch(err => alert(err));
  }*/

  componentWillUnmount() {
    this.focusListener.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', () => {
      this.fetchInvoice();
    });
  }

 

  hesapKapat = (accountNo) => {
    fetch(`http://207.154.196.92:5002/api/BankAccount/` + accountNo, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `bearer ${this.state.token}`,
      }
    }).then((response) => response.json())
      .then((responseData) => {
        //alert(JSON.stringify(responseData));
        var status = responseData['status'];
        if (status == 'success') {
          alert("Hesap Kapatıldı..");
          this.getAccs();

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

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getAccs();
      this.setState({refreshing: false});
  }

  render() {
    const { musteriNo } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
     
          <View style={styles.header}>
            <Icon name="money" style={{ marginTop: 15 }} size={90} color="#708090"></Icon>
            <Text style={styles.total, { marginTop: 15 }}>VARLIKLARIM</Text>
            <Text style={styles.cost}> {parseFloat(this.state.toplamPara).toFixed(2)} TL</Text>
          </View>

          <View style={styles.bodyHome}>

          
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonStyleMenu}
                onPress={() => {
                  this.props.navigation.navigate('ParaCekme', { token: this.state.token });
                }}>
                <Icon
                  name="briefcase"
                  size={16}
                  color="white"
                  backgroundColor="#708090">
                  <Text style={styles.buttonColorMenu}> Para Çek</Text>
                </Icon>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyleMenu}
                onPress={() => {
                  this.props.navigation.navigate('ParaYatir', { token: this.state.token });
                }}>
                <Icon
                  name="briefcase"
                  size={16}
                  color="white"
                  backgroundColor="#708090">
                  <Text style={styles.buttonColorMenu}> Para Yatır</Text>
                </Icon>
              </TouchableOpacity>

            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonStyleMenu}
                onPress={() => {
                  this.props.navigation.navigate('ParaIslemleri', { token: this.state.token });
                }}>
                <Icon
                  name="exchange"
                  size={16}
                  color="white"
                  backgroundColor="#708090">
                  <Text style={styles.buttonColorMenu}> PARA TRANSFERLERİ </Text>
                </Icon>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonStyleMenu}
                onPress={() => {
                  this.props.navigation.navigate('KrediTransaction');
                }}>
                <Icon
                  name="exchange"
                  size={16}
                  color="white"
                  backgroundColor="#708090">
                  <Text style={styles.buttonColorMenu}> Kredi Verme</Text>
                </Icon>
              </TouchableOpacity>
            </View>


            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonStyleMenu}
                onPress={() => {
                  this.props.navigation.navigate('HesapHareket', { token: this.state.token });
                }}>
                <Icon
                  name="exchange"
                  size={16}
                  color="white"
                  backgroundColor="#708090">
                  <Text style={styles.buttonColorMenu}> HESAP HAREKETLERİ </Text>
                </Icon>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonStyleMenu}
                onPress={() => {
                  this.props.navigation.navigate('HGSgiris', { token: this.state.token });
                }}>
                <Icon
                  name="money"
                  size={16}
                  color="white"
                  backgroundColor="#708090">
                  <Text style={styles.buttonColorMenu}>HGS İŞLEMLERİ </Text>
                </Icon>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonStyleMenu}
                onPress={() => {
                  this.props.navigation.navigate('Hesaplar', { token: this.state.token });
                }}>
                <Icon
                  name="money"
                  size={16}
                  color="white"
                  backgroundColor="#708090">
                  <Text style={styles.buttonColorMenu}>HESAPLARIM </Text>
                </Icon>
              </TouchableOpacity>
            </View>
            

            
           



          </View>
        </ScrollView>
      </View>
    );
  }
}
