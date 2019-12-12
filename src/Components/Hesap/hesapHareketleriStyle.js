import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8'
    },
    hareketBilgi: {
        flex: .8,
        backgroundColor: "white",
        padding: 2,
        margin: 7,
        borderWidth: 0.7,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tarih: {
        flex: .2,
        backgroundColor: "white",
        padding: 2,
        margin: 7,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    cizgi: {
        backgroundColor: 'black',
        width: 1,
        height: '100%',
        opacity: .3,
    },
    gelenTutar: {
        borderColor: 'green',
        color: 'green',
    },
    gidenTutar: {
        borderColor: 'red',
        color: '#ff0000',
    },
    modal: {
        height: 225,
        width: 300,
        borderRadius: 5,
        borderColor: '#708090',
        borderWidth: 1.5,
        padding: 15
    },
    islemDetay: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Bahnschrift'
    },
    textInfo: {
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Bahnschrift'
    },
    textView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
    geriButton: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: .4,
        borderColor: '#708090',
        marginTop: 45,
        padding: 8,
        flexDirection: "row",
    },
    buttonContainer: {
        flex: 0.5,
        justifyContent: "center",
    },
    buttonText: {
        color: '#708090',
        fontSize: 14,
        fontFamily: 'Bahnschrift'
    },
    aliciGondericiStyle: {
        fontSize: 13,
        margin: 5,
        fontFamily: 'Bahnschrift'
    },
    tarihView: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    bilgiView: {
        flexDirection: 'column',
    },
    tutarStyle: {
        fontWeight: 'bold',
        fontSize: 17,
        fontFamily: 'Bahnschrift',
        margin: 5
    },
    islemStyle: {
        justifyContent: 'space-evenly'
    },
    tur: {
        fontSize: 13,
        fontStyle: 'italic',
        fontFamily: 'Bahnschrift',
        fontWeight: 'bold',
        marginLeft: 20
    },
    date: {
        fontSize: 17,
        fontStyle: 'italic'
    },
    dateDay: {
        fontSize: 21,
        fontWeight: 'bold',
        fontStyle: 'italic'
    }
})