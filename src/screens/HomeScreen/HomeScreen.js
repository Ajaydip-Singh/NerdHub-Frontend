import MediaQuery from "react-responsive";
import BottomNav from "../../components/BottomNav/BottomNav";
import Header from "../../components/Header/Header";

export default function HomeScreen() {
  return (
    <div>
      <Header home></Header>
      <section className="hero-section"></section>
      <MediaQuery maxWidth={800}>
        <BottomNav home></BottomNav>
      </MediaQuery>
    </div>
  );
}
