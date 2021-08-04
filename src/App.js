import { BrowserRouter as Router, Route } from "react-router-dom";
import AboutScreen from "./screens/AboutScreen/AboutScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";

function App() {
  return (
    <Router>
      <Route path="/home" component={HomeScreen}></Route>;
      <Route path="/about" component={AboutScreen}></Route>;
    </Router>
  );
}

export default App;
