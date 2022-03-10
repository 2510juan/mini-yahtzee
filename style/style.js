import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    paddingTop: 30,
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  gameboardContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    marginTop: Constants.statusBarHeight,
    paddingTop: 30,
  },
  heading: {
    marginTop: 20,
    marginBottom: 40,
    textAlign: "center",
    fontSize: 40,
    color: "#04B0CA",
    fontWeight: "bold",
  },
  footer: {
    fontSize: 10,
    color: "#C5C5C5",
    textAlign: "center",
    marginTop: 90,
  },
  button: {
    width: '75%',
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#04B0CA",
    marginBottom: 50,
  },
  diceRow: {
    flexDirection: "row",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  selection: {
    flexDirection: "row",
  },
  scoreText: {
    fontSize: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 15,
    marginBottom: 50,
  },
  status: {
    fontSize: 20,
    textAlign: "center",
    height: 50,
  },
});