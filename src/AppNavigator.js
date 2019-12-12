import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import Hesaplar from './Components/Hesap/Hesaplar';
import Hesaplarim from './Components/Hesap/Hesaplarim';
import HesapDetaylari from './Components/Hesap/HesapDetaylari';
import HesapHareketleri from './Components/Hesap/HesapHareketleri';
import HesapParaCekme from './Components/Hesap/HesapParaCekme';
import HesapParaYatirma from './Components/Hesap/HesapParaYatirma';
import Anasayfa from './Components/Menu/Anasayfa';
import VirmanGonderenHesap from './Components/HavaleVirman/VirmanGonderenHesap';
import Login from './Components/User/Login';
import ParaCekme from './Components/Hesap/ParaCekme';
import ParaYatir from './Components/Hesap/ParaYatir';
import KullaniciKayit from './Components/User/KullaniciKayit';
import KullaniciProfil from './Components/User/KullaniciProfil';
import ParaIslemleri from './Components/Menu/ParaIslemleri';
import HavaleVirmanGonderenHesap from './Components/HavaleVirman/HavaleVirmanGonderenHesap';
import HavaleAliciHesap from './Components/HavaleVirman/HavaleAliciHesap';
import HavaleVirmanGonderilecekTutar from './Components/HavaleVirman/HavaleVirmanGonderilecekTutar';
import HavaleVirmanOnayEkrani from './Components/HavaleVirman/HavaleVirmanOnayEkrani';
import VirmanAliciHesap from './Components/HavaleVirman/VirmanAliciHesap';
import FaturaOdemeKurumSecimi from './Components/Fatura/FaturaOdemeKurumSecimi';
import FaturaOdemeAboneBilgi from './Components/Fatura/FaturaOdemeAboneBilgi';
import FaturaOdemeFaturaSecimi from './Components/Fatura/FaturaOdemeFaturaSecimi';
import FaturaOdemeHesapSecimi from './Components/Fatura/FaturaOdemeHesapSecimi';
import FaturaOdemeOnayEkrani from './Components/Fatura/FaturaOdemeOnayEkrani';
import HesapHareket from './Components/Hesap/HesapHareket';

const MainNavigator = createStackNavigator({
  Login:{
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  KullaniciKayit: {
    screen: KullaniciKayit,
    navigationOptions: ({navigation}) => ({
      title: 'Kullanıcı Kayıt',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTintColor: 'white', // header back button color
    }),
  },
 
  ParaCekme: {
    screen: ParaCekme,
    navigationOptions: ({navigation}) => ({
      title: 'Para Çekme',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTintColor: 'white', // header back button color
    }),
  },

  ParaYatir: {
    screen: ParaYatir,
    navigationOptions: ({navigation}) => ({
      title: 'Para Yatır',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTintColor: 'white', // header back button color
    }),
  },

  KullaniciProfil: {
    screen: KullaniciProfil,
    navigationOptions: ({navigation}) => ({
      title: 'Kullanıcı Bilgileri',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },
  Anasayfa: {
    screen: Anasayfa,
    navigationOptions: ({navigation}) => ({
      title: 'GüvenBank',
      headerLeft: (
        <Icon
          name="power-off"
          size={25}
          color="white"
          style={{marginLeft: 15}}
          onPress={() =>    
            Alert.alert(
            'Çıkış yapılıyor!',
            'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
            [
              {
                text: 'Cancel',
                onPress: () => navigation.navigate('Anasayfa'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => {navigation.navigate('Login')} }
            ],
            {cancelable: false},
          )}
        />
      ),
      headerRight: (
        <Icon
          name="user"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => {
            const {musteriNo} = navigation.state.params;
            navigation.navigate('KullaniciProfil' /*, {
              musteriNo: musteriNo,
            }*/);
          }}
        />
      ),
      headerStyle: {
        backgroundColor: '#708090',
        fontFamily: 'Bahnschrift',
      },
      headerTitleStyle: {
        color: 'white',
        textAlign: 'center',
        flex: 1,
        fontFamily: 'Bahnschrift',
      },
    }),
  },
  ParaIslemleri: {
    screen: ParaIslemleri,
    navigationOptions: ({navigation}) => ({
      title: 'Para İşlemleri',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },
  HesapHareket: {
    screen: HesapHareket,
    navigationOptions: ({navigation}) => ({
      title: 'Para İşlemleri',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },
  ParaIslemleri: {
    screen: ParaIslemleri,
    navigationOptions: ({navigation}) => ({
      title: 'Para Transfer İşlemleri',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },
  HavaleAliciHesap: {
    screen: HavaleAliciHesap,
    navigationOptions: ({navigation}) => ({
      title: 'Havale/Virman İşlemleri',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },
  HavaleVirmanGonderenHesap: {
    screen: HavaleVirmanGonderenHesap,
    navigationOptions: ({navigation}) => ({
      title: 'Havale/Virman İşlemleri',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },
  HavaleVirmanGonderilecekTutar: {
    screen: HavaleVirmanGonderilecekTutar,
    navigationOptions: ({navigation}) => ({
      title: 'Havale/Virman İşlemleri',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },
  HavaleVirmanOnayEkrani: {
    screen: HavaleVirmanOnayEkrani,
    navigationOptions: ({navigation}) => ({
      title: 'Havale/Virman İşlemleri',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },
  VirmanAliciHesap: {
    screen: VirmanAliciHesap,
    navigationOptions: ({navigation}) => ({
      title: 'Havale/Virman İşlemleri',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },

  VirmanGonderenHesap: {
    screen: VirmanGonderenHesap,
    navigationOptions: ({navigation}) => ({
      title: 'Havale/Virman İşlemleri',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },
  FaturaOdemeKurumSecimi: {
    screen: FaturaOdemeKurumSecimi,
    navigationOptions: ({navigation}) => ({
      title: 'Fatura Ödeme İşlemleri',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },
  FaturaOdemeAboneBilgi: {
    screen: FaturaOdemeAboneBilgi,
    navigationOptions: ({navigation}) => ({
      title: 'Fatura Ödeme İşlemleri',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },
  FaturaOdemeFaturaSecimi: {
    screen: FaturaOdemeFaturaSecimi,
    navigationOptions: ({navigation}) => ({
      title: 'Fatura Ödeme İşlemleri',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },
  FaturaOdemeHesapSecimi: {
    screen: FaturaOdemeHesapSecimi,
    navigationOptions: ({navigation}) => ({
      title: 'Fatura Ödeme İşlemleri',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },
  FaturaOdemeOnayEkrani: {
    screen: FaturaOdemeOnayEkrani,
    navigationOptions: ({navigation}) => ({
      title: 'Fatura Ödeme İşlemleri',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },
  Hesaplarim: {
    screen: Hesaplarim,
    navigationOptions: ({navigation}) => ({
      title: 'Tüm Hesaplarım',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },
  Hesaplar: {
    screen: Hesaplar,
    navigationOptions: ({navigation}) => ({
      title: 'Hesaplar',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },
  HesapDetaylari: {
    screen: HesapDetaylari,
    navigationOptions: ({navigation}) => ({
      title: 'Hesap Detay',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },
  HesapHareketleri: {
    screen: HesapHareketleri,
    navigationOptions: ({navigation}) => ({
      title: 'Hesap Hareketleri',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },
  HesapParaCekme: {
    screen: HesapParaCekme,
    navigationOptions: ({navigation}) => ({
      title: 'Para Çekme',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },
  HesapParaYatirma: {
    screen: HesapParaYatirma,
    navigationOptions: ({navigation}) => ({
      title: 'Para Yatırma',
      headerStyle: {
        backgroundColor: '#708090',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white', // header back button color
      headerRight: (
        <Icon
          name="home"
          size={25}
          color="white"
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('Anasayfa')}
        />
      ),
    }),
  },
});

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;
