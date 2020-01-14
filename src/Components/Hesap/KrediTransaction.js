import React, { Component } from 'react';
import {
    Image, StyleSheet, Picker,Button, KeyboardAvoidingView,View, StatusBar, ToastAndroid, Text, Alert,TouchableOpacity
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-gesture-handler';



const requiredText="Boş Geçilemez";




const validationSchema = yup.object().shape({
    age: yup
        .number()
        .label('Age')
        .moreThan(18, "18 yaşından küçüklere kredi verilemez!")
        .lessThan(121, "120 yaşından büyüklere kredi verilemez!")
        .required(requiredText),
    creditAmount: yup
        .number()
        .label('Credit Amount')
        .moreThan(0.09, "0.1 den büyük olmalı!")
        .lessThan(1000000, "1 Milyon ₺'deb fazla kredi çekebilirsiniz!")
        .required(requiredText),
    numberOfCredits: yup
        .number()
        .label('Number of Credits')
        .moreThan(0.09, "0.1 den büyük olmalı!")
        .lessThan(100, "En fazla 100 değeri girebilirsiniz!")
        .required(requiredText),
});

export default class KrediTransaction extends Component {

    constructor() {
        super();
        this.state = {
            result: 5,
            isLoading: false,
            homeState:0,
            telephone:0
        }
    }



    getCredit = async (values) => {
        let url = 'https://rugratswebapi.azurewebsites.net/api/hgs/getcredit';
       
        console.log('url: ' + url)
        this.setState({
            isLoading: true
        })
        //alert(values.creditAmount +" "+ values.age+" "+values.numberOfCredits );
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                krediMiktari: values.creditAmount,
                yas: values.age,
                evDurumu: values.homeState,
                aldigi_kredi_sayi: values.numberOfCredits,
                telefonDurumu: values.telephone,
            }),
           
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            return response.json()
        }).then(json => {
            this.setState({
                result: json
            });
            console.log(this.state.result);

        }).finally(() => {
            this.setState({
                isLoading: false
            });
            let deger = '' + this.state.result;
            if (deger == "1") {
                Alert.alert("Maalesef Kredi Verilemez!");
            }
            else if (deger == "0") {
                Alert.alert("Kredi Verilebilir!");
            }
            else {
                alert("Kimlik No veya Şifre Hatalı!");
            }
            // console.log("finally " + this.state.accounts[0].accountNo)
        })
            .catch((error) => {
                console.error(error);
            });;

    }

    render() {
        return (
            <Formik initialValues={{ age: '', creditAmount: '',numberOfCredits:0 }}
                onSubmit={(values, actions) => {
                    //alert(JSON.stringify(values.firstName));
                    //alert(JSON.stringify(values))
                    this.getCredit(values);
                    setTimeout(() => {
                        actions.setSubmitting(false);
                    }, 1000);

                }}

                validationSchema={validationSchema}>
                {formikProps => (
                    <KeyboardAwareScrollView style={{ marginVertical: 40 }} behavior="padding" enabled>
                        <View  style={{marginLeft:70}}>
                            <View  style={{ marginTop: 25 }}>
                                <Text>YAŞ</Text>
                                <TextInput
                                    maxLength={3}
                                    style={{ marginBottom: 10, width: 250, backgroundColor: '#cfcfcf' }}
                                    onChangeText={formikProps.handleChange("age")}
                                />
                                <Text style={{ color: 'red', marginBottom: 2 }}>
                                    {formikProps.errors.age}
                                </Text>
                                <Text>KREDI MIKTARI:</Text>
                                <TextInput
                                    onChangeText={formikProps.handleChange("creditAmount")}
                                    maxLength={10}
                                    style={{ marginBottom: 10, width: 250, backgroundColor: '#cfcfcf' }}
                                //defaultValue='1'              
                                />
                                <Text style={{ color: 'red', marginBottom: 2 }}>
                                    {formikProps.errors.creditAmount}
                                </Text>
                                <Text>KREDI SAYISI:</Text>
                                <TextInput
                                    onChangeText={formikProps.handleChange("numberOfCredits")}
                                    maxLength={10}
                                    style={{ marginBottom: 10, width: 250, backgroundColor: '#cfcfcf' }}
                                //defaultValue='1'              
                                />
                                <Text style={{ color: 'red', marginBottom: 2 }}>
                                    {formikProps.errors.numberOfCredits}
                                </Text>
                                <Text style={{  marginBottom: 2 }}>
                                    Ev Durumu
                                </Text>
                                <Picker
                                    selectedValue={this.state.homeState}
                                    style={{ height: 50, width: 150 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ homeState: itemValue })
                                    }>
                                    <Picker.Item label="Ev Sahibi" value="1" />
                                    <Picker.Item label="Kiracı" value="0" />
                                </Picker>
                                <Text style={{  marginBottom: 2 }}>
                                    Telefon Durumu
                                </Text>
                                <Picker
                                    selectedValue={this.state.telephone}
                                    style={{ height: 50, width: 150 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ telephone: itemValue })
                                    }>
                                    <Picker.Item label="Var" value="1" />
                                    <Picker.Item label="Yok" value="0" />
                                </Picker>

                               
                            </View>
                           
                        </View>
                        
                        <TouchableOpacity
                                    style={styles.buttonStyleMenu}
                                    onPress={formikProps.handleSubmit}
                                >
                                    <Text>Kredi Hesapla</Text>
                                </TouchableOpacity>
                    </KeyboardAwareScrollView>
                )}
            </Formik>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 5,
        backgroundColor: 'blue',
    },
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
    },
    active: {
        borderColor: 'blue',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'blue',
        shadowRadius: 3,
        shadowOpacity: 1,
    },
    buttonStyleLogin:{
        backgroundColor: "#708090",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        padding: 10,
        margin: 100,
        flexDirection: "row",
      },
      buttonStyleMenu: {
        backgroundColor: "#708090",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        padding: 15,
        margin: 5,
        marginHorizontal:50,
       
        flexDirection: "row"
      },
    icon: {
        flex: 0,
        height: 48,
        width: 48,
        borderRadius: 48,
        marginBottom: 15,
        backgroundColor:'blue'
    },
    check: {
        position: 'absolute',
        right: -9,
        top: -9,
    }
})