import React, { Component } from 'react';
import { View, Text,FlatList,Button ,Alert} from 'react-native';
import {ListItem} from 'react-native-elements'
import DialogInput from 'react-native-dialog-input';


export default class ParaYatir extends Component {
  constructor(props) {
    super(props);
    this.state = {
        token: this.props.navigation.state.params.token,
        hesaplar: [],
        selectedAccountNo:0,
        isDialogVisible:false
    };
  }

  componentDidMount() {
    this.getAccs();
  }

  depositMoney= (amount)=>{
    console.log(this.state.token)
     fetch("http://207.154.196.92:5002/api/BankAccount/deposit", {
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
    }) .then((response) => response.json())
    .then((responseData) => {
      //alert(JSON.stringify(responseData));
      var status = responseData['status'];
      if (status == 'success') {
        alert("Para Yatırıldı!");
        this.getAccs();
        this.setState({
          isDialogVisible:false
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

  render() {
    return (
      <View>
        <Text> ParaYatır </Text>
        <FlatList 
                    style={{ height: 300}}
                    data={this.state.hesaplar}
                    keyExtractor={(item) => item.no.toString()}
                    renderItem={({ item }) => (
                      <ListItem
                        topDivider
                        onPress={() =>    
                          this.setState({
                            isDialogVisible:true,
                            selectedAccountNo:item.no
                          })}
                        title={'Hesap No: ' + item.no}
                        subtitle={'Bakiye: ' + item.balance}
                        bottomDivider
                      >
                      </ListItem>
                    )}
                    nullable
                    /> 
                     <DialogInput isDialogVisible={this.state.isDialogVisible}
                    title={"Para Yatır"}
                    message={"Parar Miktarını Giriniz"}
                    hintInput={""}
                    textInputProps={{keyboardType:'decimal-pad'}}
                    submitInput={(inputText) => { this.depositMoney(inputText) }}
                    closeDialog={() => this.setState({isDialogVisible:false}) }>
          </DialogInput>
      </View>
    );
  }
}
