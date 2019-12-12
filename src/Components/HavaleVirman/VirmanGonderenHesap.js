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
    ListItem
} from 'react-native';
import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton
} from 'react-native-modals';

import { Formik } from 'formik';
import * as yup from 'yup';


const validationSchema = yup.object().shape({
    balance: yup
        .number()
        .label('balance')
        .moreThan(0.09, "0.1 den büyük olsun")
        .lessThan(999999, "küçük yap")
        .required("zorunlu alan"),

});

export default class VirmanGonderenHesap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hesaplar: [{no:5,balance:100}],
            token: this.props.navigation.state.params.token,
            isDialogVisible: false,
            selectedAccountNo: 0,
            customerNo: 0,
            receiverBankAccountNo: 0,
            defaultAnimationModal: false
        };
    }

    /*
    
    
    */


    virmanMoney = (amount, receiverBankAccountNo) => {
        //alert("rcAc: +" + this.state.receiverBankAccountNo+ " cusno: " + this.state.customerNo+" selecAcount"+this.state.selectedAccountNo)
        alert(typeof this.state.receiverBankAccountNo)
        console.log(this.state.token)
        fetch("http://207.154.196.92:5002/api/Transaction/internal", {
            method: 'POST',
            body: JSON.stringify({
                "receiverBankAccountNo": receiverBankAccountNo,
                "amount": amount,
                "receiverCustomerNo": this.state.customerNo,
                "senderBankAccountNo": this.state.selectedAccountNo,
                "summary": "aabbcc",
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
                    alert("Para Gönderildi!");
                    this.getAccs();
                    this.setState({
                        isDialogVisible: false
                    })
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
            this.state({
                defaultAnimationModal:false
            })
    }



    give = async () => {
        let deger = await AsyncStorage.getItem('customerNo');
        console.log("degerrrr:  " + deger);
        deger = parseInt(deger)
        this.setState({
            customerNo: deger
        })
        return deger;
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
        this.getAccs();
       // this.give();
    }

    render() {
        //const { musteriNo,islemTuruID } = this.props.navigation.state.params;
        // alert(this.state.receiverBankAccountNo+"jhh")
        
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
                    </View>
                </ScrollView>
                <FlatList
          data={this.state.hesaplar}
          keyExtractor={(item) => item.no.toString()}
          renderItem={({ item }) => (
            <View style={styles.contContainer} >
            <TouchableOpacity style={styles.buttonContainer}
                onPress={() => this.setState({
                    defaultAnimationModal: true,
                    selectedAccountNo: item.no
                  })} >
                <Text style={styles.hesapNo}> {item.no}  </Text>
                <Text style={styles.hesapText}> Bakiye: {item.balance} TL</Text>
            </TouchableOpacity>


        </View>
          )}
          nullable
        />
                <Formik initialValues={{ balance: 0, statement: "", receiverBankAccountNo: 0, }}
                    onSubmit={(values, actions) => {
                        this.virmanMoney(values.balance, values.receiverBankAccountNo, values.receiverCustomerNo);

                        setTimeout(() => {
                            actions.setSubmitting(false);
                        }, 1000);

                    }}
                    validationSchema={validationSchema}>
                    {formikProps => (
                        <Modal
                            width={0.9}
                            visible={this.state.defaultAnimationModal}
                            rounded
                            actionsBordered
                            onTouchOutside={() => {
                                //this.setState({ defaultAnimationModal: false });
                            }}
                            modalTitle={
                                <ModalTitle
                                    title="Virman Yap"
                                    align="left"
                                />
                            }
                            footer={
                                <ModalFooter>
                                    <ModalButton
                                        text="İPTAL"
                                        bordered
                                        onPress={() => {
                                            this.setState({ defaultAnimationModal: false });
                                        }}
                                        key="button-1"
                                    />
                                    <ModalButton
                                        text="GÖNDER"
                                        bordered
                                        onPress={formikProps.handleSubmit}
                                        key="button-2"
                                    />
                                </ModalFooter>
                            }
                        >
                            <ModalContent
                                style={{ backgroundColor: '#fff' }}
                            >
                                <ScrollView>
                                    <Text>Gönderilecek HesapNo: {this.state.receiverBankAccountNo} </Text>
                                    <Text> sddds {this.state.customerNo}</Text>
                                    <Text> senderBankAccountNo {this.state.selectedAccountNo}</Text>
                                    <Text style={{ color: 'red', marginBottom: 2 }}>
                                        {formikProps.errors.receiverAccountNo}
                                    </Text>
                                    <Text>Alıcı Hesap No</Text>
                                    <TextInput
                                        onChangeText={formikProps.handleChange("receiverBankAccountNo")}
                                        maxLength={30}
                                        keyboardType='numeric'
                                        style={{ marginBottom: 10, width: 250, backgroundColor: '#cfcfcf' }}
                                    //defaultValue='1'              
                                    />
                                    <Text>Alıcı Müşteri No: {this.state.customerNo}</Text>

                                    <Text>Gönderilecek Para Miktarı</Text>
                                    <TextInput
                                        onChangeText={formikProps.handleChange("balance")}
                                        keyboardType='numeric'
                                        maxLength={30}
                                        style={{ marginBottom: 10, width: 250, backgroundColor: '#cfcfcf' }}
                                    //defaultValue='1'              
                                    />
                                    <Text style={{ color: 'red', marginBottom: 2 }}>
                                        {formikProps.errors.balance}
                                    </Text>
                                    <Text>Açıklama</Text>
                                    <TextInput
                                        maxLength={30}
                                        style={{ marginBottom: 10, width: 250, backgroundColor: '#cfcfcf' }}
                                    //defaultValue='1'              
                                    />

                                </ScrollView>
                            </ModalContent>
                        </Modal>
                    )}
                </Formik>
            </View>
        );
    }
}

