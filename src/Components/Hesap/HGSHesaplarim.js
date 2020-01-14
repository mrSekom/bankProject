import React, { Component } from 'react';
import { ListItem } from 'react-native-elements'
import DialogInput from 'react-native-dialog-input';
import styles from '../faturaHavaleVirmanStyle';
import { Text, View, TouchableOpacity, ScrollView, BackHandler, FlatList, AsyncStorage, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HGSHesaplarim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.navigation.state.params.token,
            hgsHesaplar: [],
            selectedAccountNo: 0,
            isDialogVisible: false,
            isFetching: false,
            tc:0,
        };
    }

    componentDidMount() {
       
        this.giveTc().then(()=>{ this.getAccs()});
    }

    onRefresh = () => {
        this.setState({
            isFetching: true,
        });
        this.getAccs();
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

    getAccs = () => {
        fetch(`http://207.154.196.92:5003/api/Account/find`, {
            method: 'POST',
            body: JSON.stringify({
                tcNo: this.state.tc,


            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `bearer ${this.state.token}`,
            },
        }).then(data => data.json())
            .then(data => {
                let hesaplar=(data.accounts);
                this.setState({ hgsHesaplar: hesaplar })
                
               
            })
            .catch(err => alert(err))
        this.setState({
            isFetching: false,
        });
    };
    getAccsinfo = (hgsNo) => {
        fetch(`http://207.154.196.92:5003/api/Account/${hgsNo}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `bearer ${this.state.token}`,
            },
        }).then(data => data.json())
            .then(data => {
                alert("balance: "+(data.balance))
               
            })
            .catch(err => alert(err))
        this.setState({
            isFetching: false,
        });
    };
  

 
    render() {
        let hesaplar = this.state.hgsHesaplar.map((hesap) => {
            return (
                <View style={styles.contContainer} >
                    <TouchableOpacity style={styles.buttonContainer}
                      onPress={()=>this.getAccsinfo(hesap.hgsNo)} >
                           
                        <Text style={styles.hesapNo}> HGS NO: {hesap.hgsNo}  </Text>
                       
                    </TouchableOpacity>
                </View>

            )

        })
        return (
            <View>
              
              
              {hesaplar}
            </View>
        );
    }
}
