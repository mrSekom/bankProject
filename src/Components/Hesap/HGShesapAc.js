import React, { Component } from 'react';
import styles from '../faturaHavaleVirmanStyle.js';

import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    FlatList,
    BackHandler,
    Alert,
    TouchableOpacity,
    Button,
    TouchableWithoutFeedback,
    AsyncStorage,
    Dimensions,
    TextInput,
    ScrollView,
} from 'react-native';
import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton
} from 'react-native-modals';

import { Formik } from 'formik';
import * as yup from 'yup';
import DialogInput from 'react-native-dialog-input';

const validationSchema = yup.object().shape({
    balance: yup
        .number()
        .label('balance')
        .moreThan(0.09, "0.1 den büyük olsun")
        .lessThan(999999, "küçük yap")
        .required("zorunlu alan"),

});

export default class HGShesapAc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hesaplar: [],
            token: this.props.navigation.state.params.token,
            isDialogVisible: false,
            selectedAccountNo: 0,
            customerNo: 0,
            receiverBankAccountNo: 0,
            defaultAnimationModal: false,
            tc: 0,

        };
    }

    /*
    
    
    */
    give = async () => {
        let deger = await AsyncStorage.getItem('customerNo');
        console.log("degerrrr:  " + deger);
        deger = parseInt(deger)
        this.setState({
            customerNo: deger
        })
        return deger;
    }

    giveTc = async () => {
        let deger = await AsyncStorage.getItem('tc');
        console.log("degerrrr:  " + deger);
        deger = parseInt(deger)
        this.setState({
            tc: deger
        })
        return deger;
    }

    withdraw = (amount) => {
        if(!(amount>0))
        {
            alert("boş ve rakam olmayan karakterler içermemeli ve 0 dan büyük olmalı")
            return;
        }
        console.log(this.state.token)
        fetch("http://207.154.196.92:5002/api/BankAccount/withdraw", {
          method: 'POST',
          body: JSON.stringify({
            "no": this.state.selectedAccountNo,
            "amount": amount
          }),
    
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `bearer ${this.state.token}`
          }
        }).then((response) => response.json())
          .then((responseData) => {
            //alert(JSON.stringify(responseData));
            var status = responseData['status'];
            if (status == 'success') {
             
              this.getAccs();
              this.setState({
                isDialogVisible: false
              })
              this.registerHgs(amount);
            }
            else {
               
              var errors = responseData['errors'];
              if (errors != null)
                alert("hata: " + JSON.stringify(errors));

                alert("YETERSIZ PARA");
            }
    
    
          })
          .catch((error) => {
           // alert(error);
          })
    
      }



    registerHgs = (money) => {
        //alert("rcAc: +" + this.state.receiverBankAccountNo+ " cusno: " + this.state.customerNo+" selecAcount"+this.state.selectedAccountNo)
       
        console.log(this.state.token)
        fetch("http://207.154.196.92:5003/api/Account", {
            method: 'POST',
            body: JSON.stringify({
                "tcNo": this.state.tc
            }),

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `bearer ${this.state.token}`
            }
        }).then((response) => response.json())
            .then((responseData) => {
               // alert(JSON.stringify(responseData));
               var status = responseData['status'];
               if (status == 'success') {
                   var newHgsNo = responseData['hgsNo'];
                    this.depositHgs(money, newHgsNo, this.state.selectedAccountNo);
                   

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



    depositHgs = (balance, hgsNo, bankAccountNo) => {
        //alert("rcAc: +" + this.state.receiverBankAccountNo+ " cusno: " + this.state.customerNo+" selecAcount"+this.state.selectedAccountNo)
        alert(typeof this.state.receiverBankAccountNo)
        console.log(this.state.token)
        fetch("http://207.154.196.92:5003/api/Account/deposit", {
            method: 'POST',
            body: JSON.stringify({
                "hgsNo": hgsNo,
                "balance": balance,
                "bankAccountNo": bankAccountNo


            }),

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `bearer ${this.state.token}`
            }
        }).then((response) => response.json())
            .then((responseData) => {
                //alert(JSON.stringify(responseData));
                var status = responseData['status'];

                if (status == 'success') {
                    alert("HGS Hesap açıldı.! Yeni Hgs No: " + hgsNo +" \n Para işlemi başarılı.");

                   
                }
                else {

                    var errors = responseData['errors'];
                    if (errors != null)
                        alert("hata: " + JSON.stringify(errors));
                   
                }


            })
            .catch((error) => {
                //alert(error);
            })

    }







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
            })
            .catch(err => alert(err))

    };

    componentDidMount() {
        this.give();
        this.getAccs();
        this.giveTc();
    }

    render() {
        //const { musteriNo,islemTuruID } = this.props.navigation.state.params;
        // alert(this.state.receiverBankAccountNo+"jhh")
        let hesaplar = this.state.hesaplar.map((hesap) => {
            return (
                <View style={styles.contContainer} >
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => { this.setState({ isDialogVisible: true, selectedAccountNo: hesap.no }) }}>
                        <Text style={styles.hesapNo}> {hesap.no}  </Text>
                        <Text style={styles.hesapText}> Bakiye: {hesap.balance} TL</Text>
                    </TouchableOpacity>
                </View>

            )

        })
        return (

            <View style={styles.container, { marginTop: 15 }}>
                <ScrollView>
                    <View style={styles.body}>
                        <View style={styles.buttonContainer}>
                            <View
                                style={styles.buttonStyleHesap}>
                                <Text style={styles.buttonColorMenu}>GÖNDERİCİ HESAP</Text>
                            </View>
                        </View>
                        {hesaplar}
                    </View>
                </ScrollView>
                <DialogInput isDialogVisible={this.state.isDialogVisible}
                    title={"Hgs Hesabı Aç tc: "+this.state.tc}
                    message={"Para Miktarını Giriniz"}
                    hintInput={""}
                    textInputProps={{ keyboardType: 'decimal-pad' }}
                    submitInput={(inputText) => { this.withdraw(inputText) }}
                    closeDialog={() => this.setState({ isDialogVisible: false })}>
                </DialogInput>
            </View>
        );
    }
}

