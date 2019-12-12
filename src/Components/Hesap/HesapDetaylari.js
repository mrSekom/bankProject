import React from 'react';
import {TouchableOpacity, Text, View,Alert} from 'react-native';
import styles from './hesapDetaylariStyle.js';
import moment from 'moment';

export default class HesapDetaylari extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Hesap: {},
    };
  }

  componentDidMount() {
    this.fetchInvoice();
  }

  fetchInvoice = () => {
    const {hesapNo} = this.props.navigation.state.params;
    fetch('http://bankrestapi.azurewebsites.net/api/Hesap/GetById/' + hesapNo)
      .then(res => res.json())
      .then(response => {
        this.setState({Hesap: response});
      })
      .catch(err =>
        Alert.alert('Başarısız!', 'Hesap bilgileri getirilirken bir hata oluştu!'),
      );
  };

  componentWillUnmount() {
    this.focusListener.remove();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {navigation} = this.props;

    this.focusListener = navigation.addListener('didFocus', () => {
      this.fetchInvoice();
    });
  }
  
  eminMisiniz=()=>{
    Alert.alert(
      'Hesabınız siliniyor!',
      'Hesabınızı silmek istediğinize emin misiniz?',
      [
        {
          text: 'Cancel',
          onPress: () => this.props.navigation.navigate('HesapDetaylari'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.hesapSil() },
      ],
      {cancelable: false},
    )
  }

  hesapSil=()=>{
    const {hesapNo} = this.props.navigation.state.params;
    if(this.state.Hesap.bakiye == 0)
    {
    let silinecekHesap={
      hesapNo:this.state.Hesap.hesapNo,
      ad:this.state.Hesap.ad,
      soyad:this.state.Hesap.soyad,
      bakiye:this.state.Hesap.bakiye,
      hesapAcilisTarihi:this.state.Hesap.hesapAcilisTarihi,
      musteriNo:this.state.Hesap.musteriNo,
      acilisPlatformID:4,
      ekNo:this.state.Hesap.ekNo
    }
    fetch("http://bankrestapi.azurewebsites.net/api/Hesap/Delete", {
      method: 'DELETE',
      body: JSON.stringify(silinecekHesap),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }})
      .then(()=>
      Alert.alert(
        "Başarılı","Hesabınız başarılı bir şekilde silinmiştir.",
        [{ text: 'OK', onPress: () => this.props.navigation.navigate('Hesaplarim') }]
      ) 
    )
    .catch(err=>alert("Hata!", "Hesap silme işlemi sırasında bir hata oluştu !\nLütfen tekrar deneyin!"))
  }
  else
  {
    Alert.alert(
      "Bilgi!","Hesabınızı silebilmek için bakiye 0 olmalıdır.",
      [{ text: 'OK', onPress: () => this.props.navigation.navigate('HesapDetaylari') }]
    ) 
  }
  }
  render() {
    var islemTarihi = moment().format();
    const {hesapNo} = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={styles.detayView}>
          <Text style={styles.hesapNoTop}>
            {this.state.Hesap.musteriNo} - {this.state.Hesap.ekNo}
          </Text>
          <Text style={styles.adSoyad}>
            {this.state.Hesap.ad} {this.state.Hesap.soyad}
          </Text>

          <View style={styles.satirView}>
            <Text style={styles.satir}>Hesap Bakiyeniz</Text>
            <Text style={styles.satirBilgi}>{parseFloat(this.state.Hesap.bakiye).toFixed(2)} TL</Text>
          </View>
          <View style={styles.altCizgi}></View>
          <View style={styles.satirView}>
            <Text style={styles.satir}>Kullanılabilir Bakiyeniz</Text>
            <Text style={styles.satirBilgi}>{parseFloat(this.state.Hesap.bakiye).toFixed(2)} TL</Text>
          </View>
          <View style={styles.altCizgi}></View>
          <View style={styles.satirView}>
            <Text style={styles.satir}>Açılış Tarihi</Text>
            <Text style={styles.satirBilgi}>
              {moment(this.state.Hesap.hesapAcilisTarihi).format(
                'DD.MM.YYYY HH.mm',
              )}
            </Text>
          </View>
          <View style={styles.altCizgi}></View>
          <View style={styles.satirView}>
            <Text style={styles.satir}>Açılış Platformu</Text>
            <Text style={styles.satirBilgi}>
              {this.state.Hesap.acilisPlatformAdi}
            </Text>
          </View>
          <View style={styles.altCizgi}></View>
        </View>

        <View style={styles.buttonContainerHesapHareketleri}>
          <TouchableOpacity
            style={styles.hesapHareketleri}
            onPress={() => {
              this.props.navigation.navigate('HesapParaCekme', {
                Hesap: this.state.Hesap,
                islemTarihi: islemTarihi,
                islemTuruID: 3,
              });
            }}>
            <Text style={styles.buttonText}>Para Çekme</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hesapHareketleri}
            onPress={() => {
              this.props.navigation.navigate('HesapParaYatirma', {
                Hesap: this.state.Hesap,
                islemTarihi: islemTarihi,
                islemTuruID: 4,
              });
            }}>
            <Text style={styles.buttonText}>Para Yatırma</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hesapHareketleri}
            onPress={() => {
              this.props.navigation.navigate('HesapHareketleri', {
                hesapNo: hesapNo,
              });
            }}>
            <Text style={styles.buttonText}>Hesap Hareketleri</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hesapHareketleri}
            onPress={() => { this.eminMisiniz() }}>
            <Text style={styles.buttonText}>Hesabı Sil</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
