import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
      },
      imageStyle: {
        flex: 1,
        width: null,
        height:null
      },
      styleLogo: {
        marginTop:50,
        flex: 3,
      },
      inputContainerLogin: {
        flex: 3,
        justifyContent: "center",
      },
      inputStyleL: {
        backgroundColor: "#F8F8F8",
        padding: 5,
        margin: 15,
        borderBottomWidth: 2,
        borderColor: "#708090",
        fontFamily: 'Bahnschrift',
      },
      buttonContainerL: {
        flex:1,
        justifyContent: "center",
        textAlign:"center",
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
      buttonColorLogin: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Bahnschrift',
      },
      buttonRegisterLogin: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      bottomBosluk: {
        flex: 0.1
      },
      boslukTop:{
        flex: 0.1
      },
      registerColor:{
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'Bahnschrift',
      },
})