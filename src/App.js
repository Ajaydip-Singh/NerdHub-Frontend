import { BrowserRouter as Router, Route } from 'react-router-dom';
import AboutScreen from './screens/AboutScreen/AboutScreen';
import ContactScreen from './screens/ContactScreen/ContactScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import '../node_modules/video-react/dist/video-react.css'; // import css
import GalleryScreen from './screens/GalleryScreen/GalleryScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen';

function App() {
  return (
    <Router>
      <Route path="/home" component={HomeScreen}></Route>
      <Route path="/gallery" component={GalleryScreen}></Route>
      <Route path="/about" component={AboutScreen}></Route>
      <Route path="/contact" component={ContactScreen}></Route>
      <Route
        path="/login/:userId/:confirmationCode"
        component={LoginScreen}
        exact
      ></Route>
      <Route path="/login" component={LoginScreen} exact></Route>
      <Route path="/register" component={RegisterScreen}></Route>
    </Router>
  );
}

export default App;
