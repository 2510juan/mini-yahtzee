import { ScrollView } from 'react-native';
import Header from "./components/Header";
import styles from "./style/style";
import Footer from "./components/Footer";
import Gameboard from "./components/Gameboard";

export default function App() {
  return (
    <ScrollView style={styles.scrollView}>
      <Header />
      <Gameboard />
      <Footer />
    </ScrollView>
  );
}
