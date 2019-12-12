import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
      },
      hesapBilgiContainer: {
        flex: 17,
        backgroundColor: "white",
        padding: 5,
        margin: 10,
        borderWidth: 0.4,
        borderRadius: 5,
        borderColor: "#708090",
        fontFamily: 'Bahnschrift',
      },
      hesapNo: {
        fontWeight: "bold",
        fontSize: 16,
        fontFamily: 'Bahnschrift',
      },
      hesapText: {
        marginTop: 5,
        fontSize: 14,
        fontFamily: 'Bahnschrift',
      },
      buttonContainerHesaplarim: {
        marginTop: 15,
        justifyContent: "center",
        alignItems: 'center'
      },
      buttonStyleHesaplarim: {
        backgroundColor: "#708090",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        padding: 8,
        margin: 5,
        flexDirection: "row",
        width: '94%',
      },
      buttonColorMenu: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Bahnschrift',
        fontSize: 14
      },
      hesaplarView: {
        flex: 1,
        marginTop: 5,
      }
})