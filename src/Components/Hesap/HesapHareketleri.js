import React from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import Modal from 'react-native-modalbox'
import moment from 'moment';
import styles from './hesapHareketleriStyle.js';
export default class HesapHareketleri extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ParaTransferleri: [],
            modalVisible: false,
            choosenTransfer:{}
        }
    }
    componentDidMount() {
        const { hesapNo } = this.props.navigation.state.params;
        fetch('http://bankrestapi.azurewebsites.net/api/ParaTransferi/GetByHesapNo?hesapNo='+hesapNo)
          .then(res => res.json())
          .then(response => {
            this.setState({ParaTransferleri: response});      
          })
          .catch(err => alert(err));
    }
    render() {
        moment.locale('tr');
        const { hesapNo } = this.props.navigation.state.params;
        let paraTransferleri = this.state.ParaTransferleri.map(transfer => {
            let tutar = 0;
            if (transfer.gonderenHesapNo == hesapNo) {
                tutar = -Math.abs(transfer.islemTutari); //kişi gönderici ise eksi olarak göster.
            }
            else tutar = Math.abs(transfer.islemTutari);

            let gonderenMusteriNo = transfer.gonderenHesapNo.toString().substring(0, 6);
            let aliciMusteriNo = transfer.aliciHesapNo.toString().substring(0, 6);
            let gonderenEkNo = transfer.gonderenHesapNo.toString().substring(6, 10);
            let aliciEkNo = transfer.aliciHesapNo.toString().substring(6, 10);

            return (
                <View style={{ flexDirection: 'row' }} key={transfer.ptID}>
                    <TouchableOpacity style={styles.tarih} activeOpacity={1}>
                        <View style={styles.tarihView}>
                            <Text style={styles.dateDay}>{moment(transfer.tarih).format('D')}</Text>
                            <Text style={styles.date}>{moment(transfer.tarih).format("MMMM")}</Text>
                            <Text style={styles.date}>{moment(transfer.tarih).format('YYYY')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.hareketBilgi, transfer.gonderenHesapNo != hesapNo ? styles.gelenTutar : styles.gidenTutar]}
                        onPress={() => { 
                            this.refs.modal3.open();
                            this.setState({choosenTransfer: transfer}) 
                        }}>
                        <View style={styles.bilgiView}>
                            {transfer.islemTuruID !== 4 && 
                                <Text style={styles.aliciGondericiStyle}>{gonderenMusteriNo}-{gonderenEkNo} Nolu Hesaptan</Text>
                            }
                            {(transfer.islemTuruID === 1 || transfer.islemTuruID === 2 || transfer.islemTuruID === 4) &&
                                <Text style={styles.aliciGondericiStyle}>{aliciMusteriNo}-{aliciEkNo} Nolu Hesaba</Text>
                            }
                        
                            <Text style={[styles.tutarStyle, transfer.gonderenHesapNo != hesapNo ? styles.gelenTutar : styles.gidenTutar]}>{parseFloat(tutar).toFixed(2)} TL</Text>
                        </View>
                        <View style={styles.islemStyle}>
                            <Text style={styles.tur}>{transfer.tur}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        })
        return (
            <View style={styles.container}>
                <ScrollView>
                    {paraTransferleri}
                </ScrollView>
                <Modal style={styles.modal} position={'center'} ref={'modal3'} isDisabled={this.state.modalVisible}>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Text style={styles.islemDetay}>İşlem Detayı</Text>
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.textInfo}>İşlem Tarihi</Text>
                            <Text style={styles.textInfo}>{moment(this.state.choosenTransfer.islemTarihi).format("DD.MM.YYYY - HH:mm")}</Text>
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.textInfo}>Tutar</Text>
                            <Text style={styles.textInfo}>{parseFloat(this.state.choosenTransfer.islemTutari).toFixed(2)} TL</Text>
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.textInfo}>İşlem Türü</Text>
                            <Text style={styles.textInfo}>{this.state.choosenTransfer.tur}</Text>
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.textInfo}>Açıklama</Text>
                            <Text style={styles.textInfo}>{this.state.choosenTransfer.aciklama}</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.geriButton}
                                onPress={() => { this.refs.modal3.close() }}>
                                <Text style={styles.buttonText}>Geri</Text>
                            </TouchableOpacity>
                        </View>

                    </Modal>
            </View>
        )
    }
}