import React from 'react';
import { TouchableOpacity, Text, View, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import styles from './hesaplarimStyle.js';

export default class Hesaplarim extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Hesaplar: [],
        }
    }
    hesapGetir = () => {
        const { musteriNo } = this.props.navigation.state.params;
        fetch('http://bankrestapi.azurewebsites.net/api/Hesap/GetByMusteriNo?musteriNo='+musteriNo)
            .then(res => res.json())
            .then(response => {
                this.setState({ Hesaplar: response });
            })
            .catch(err => alert(err));
    }
    componentDidMount() {
        this.hesapGetir();
    }

    componentWillUnmount() {
        this.focusListener.remove();
      }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
    const {navigation} = this.props;

    this.focusListener = navigation.addListener('didFocus', () => {
        this.hesapGetir();
    });
    }

    hesapOlustur = () => {
        var acilisTarihi = moment().format();
        const { musteriNo } = this.props.navigation.state.params;
        let Hesap = {
            bakiye: 0,
            hesapAcilisTarihi: acilisTarihi,
            musteriNo: 5,
            acilisPlatformID: 2,
        }
        fetch("http://bankrestapi.azurewebsites.net/api/Hesap/Add", {
            method: 'POST',
            body: JSON.stringify(Hesap),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(() =>
                Alert.alert(
                    "Hesap Oluşturuldu!",
                    "Hesap oluşturma işleminiz başarılı bir şekilde tamamlanmıştır!",
                    [{ text: 'OK' ,onPress:() => this.hesapGetir()}]
                )
            )
            .catch(err => Alert.alert("Hata!", "Hesap oluşturma işlemi sırasında bir hata oluştu !\nLütfen tekrar deneyin!"))
    }
    render() {

        let hesaplar = this.state.Hesaplar.map((hesap) => {
            return (
                <TouchableOpacity style={styles.hesapBilgiContainer} key={hesap.hesapNo}
                    onPress={() => {
                        this.props.navigation.navigate("HesapDetaylari", { hesapNo: hesap.hesapNo });
                    }}>
                    <Text style={styles.hesapNo}> {hesap.musteriNo} - {hesap.ekNo} </Text>
                    <Text style={styles.hesapText}> Bakiye: {parseFloat(hesap.bakiye).toFixed(2)} TL</Text>
                    <Text style={styles.hesapText}> Kullanılabilir Bakiye: {parseFloat(hesap.bakiye).toFixed(2)} TL</Text>
                </TouchableOpacity>
            )
        })
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.buttonContainerHesaplarim}>
                        <TouchableOpacity 
                        style={styles.buttonStyleHesaplarim}
                        onPress={() => { this.hesapOlustur() }}>
                            <Icon name="plus" size={16} color="white" backgroundColor="#708090">
                                <Text style={styles.buttonColorMenu}>  YENİ HESAP AÇ </Text>
                            </Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.hesaplarView}>
                        {hesaplar}
                    </View>
                </ScrollView>
            </View>
        );
    }
}
