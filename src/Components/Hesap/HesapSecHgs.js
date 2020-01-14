import React, { Component } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { ListItem } from 'react-native-elements'
import DialogInput from 'react-native-dialog-input';


export default class HesapSecHgs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.navigation.state.params.token,
      hesaplar: [],
      selectedAccountNo: 0,
      isDialogVisible: false,
      isFetching:false,
      hgsNo:this.props.navigation.state.params.hgsNo,
    };
  }

  componentDidMount() {
    this.getAccs();
  }

  onRefresh = ()=>{
    this.setState({
      isFetching: true,
    });
    this.getAccs();
  }

  depositHgs = (balance) => {
    //alert("rcAc: +" + this.state.receiverBankAccountNo+ " cusno: " + this.state.customerNo+" selecAcount"+this.state.selectedAccountNo)
   // alert(typeof this.state.receiverBankAccountNo)
    console.log(this.state.token)
    fetch("http://207.154.196.92:5003/api/Account/deposit", {
        method: 'POST',
        body: JSON.stringify({
            "hgsNo": this.state.hgsNo,
            "balance": balance,
            "bankAccountNo": this.state.selectedAccountNo


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
            var hgsBalance = responseData['balance'];
            if (status == 'success') {
                alert("Para Yatırma İşlemi Başarılı! \n  HGS No: "+this.state.hgsNo+" HGS Bakiye: "+hgsBalance);
           
            }
            else
            {
                alert("İşlem başarısız oldu!");
            }


        })
        .catch((error) => {
           // alert(error);
        })

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
          this.depositHgs(amount);
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
      this.setState({
        isFetching: false,
      });
  };

  render() {
    return (
      <View>

        <FlatList
          data={this.state.hesaplar}
          refreshing={this.state.isFetching}
          onRefresh={() => this.onRefresh()}
          keyExtractor={(item) => item.no.toString()}
          renderItem={({ item }) => (
            <ListItem
              topDivider
              onPress={() =>
                this.setState({
                  isDialogVisible: true,
                  selectedAccountNo: item.no
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
          title={"HGS YE PARA YATIR"}
          message={"Parar Miktarını Giriniz"}
          hintInput={""}
          textInputProps={{ keyboardType: 'decimal-pad' }}
          submitInput={(inputText) => { this.withdraw(inputText) }}
          closeDialog={() => this.setState({ isDialogVisible: false })}>
        </DialogInput>
      </View>
    );
  }
}
