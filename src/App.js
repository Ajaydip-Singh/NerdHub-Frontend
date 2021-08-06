import { BrowserRouter as Router, Route } from "react-router-dom";
import AboutScreen from "./screens/AboutScreen/AboutScreen";
import ContactScreen from "./screens/ContactScreen/ContactScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import "../node_modules/video-react/dist/video-react.css"; // import css

function App() {
  return (
    <Router>
      <Route path="/home" component={HomeScreen}></Route>
      <Route path="/about" component={AboutScreen}></Route>
      <Route path="/contact" component={ContactScreen}></Route>
    </Router>
  );
}

export default App;
