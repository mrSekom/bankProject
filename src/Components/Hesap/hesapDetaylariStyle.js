import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  detayView: {
    flex: .3,
    margin: 20,
    padding: 10,
  },
  hesapNoTop: {
    fontWeight: "bold",
    fontSize: 24,
    fontFamily: 'Bahnschrift',
  },
  adSoyad: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Bahnschrift'
  },
  satirView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20,
  },
  satir: {
    fontSize: 16,
    opacity: .7,
    fontFamily: 'Bahnschrift'
  },
  altCizgi: {
    backgroundColor: 'black',
    opacity: .3,
    height: 1,
    marginTop: 4,
  },
  buttonContainerHesapHareketleri: {
    marginTop: 260,
    flex: 0.4,
    justifyContent: "center",
  },
  hesapHareketleri: {
    backgroundColor: "#708090",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 12,
    margin: 6,
    flexDirection: "row",
    fontFamily: 'Bahnschrift'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  satirBilgi: {
    fontSize: 16,
    fontWeight: 'bold',
  },

})