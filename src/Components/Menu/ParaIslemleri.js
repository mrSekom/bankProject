import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../faturaHavaleVirmanStyle.js';
export default class ParaIslemleri extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token:this.props.navigation.state.params.token,
    };
  }

  render() {
  
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}></View>
          <View style={styles.header}></View>
          <View style={styles.body}>

            <View style={styles.buttonContainer}>
              <TouchableHighlight
                style={styles.buttonStyleHesap}>
                <Text style={styles.buttonColorMenu}>İŞLEMLER</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {this.props.navigation.navigate('HavaleAliciHesap',{token:this.state.token})}}>
                <Icon name="random" size={16} color="black" backgroundColor="#708090">
                <Text style={styles.buttonColor} >  HAVALE </Text>
                </Icon>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {this.props.navigation.navigate('VirmanAliciHesap',{ token: this.state.token })}}>
                <Icon name="retweet" size={16} color="black" backgroundColor="#708090">
                <Text style={styles.buttonColor} >  VİRMAN </Text>
                </Icon>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
