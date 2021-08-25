import { BrowserRouter as Router, Route } from 'react-router-dom';
import AboutScreen from './screens/AboutScreen/AboutScreen';
import ContactScreen from './screens/ContactScreen/ContactScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import '../node_modules/video-react/dist/video-react.css'; // import css
import GalleryScreen from './screens/GalleryScreen/GalleryScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import EventsScreen from './screens/EventsScreen/EventsScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import AdminPanelScreen from './screens/AdminScreens/AdminPanelScreen/AdminPanelScreen';
import EventEditScreen from './screens/AdminScreens/EventCreateScreen/EventEditScreen';
import EventsPageScreen from './screens/AdminScreens/EventsPageScreen/EventsPageScreen';

function App() {
  return (
    <Router>
      <Route path="/home" component={HomeScreen}></Route>
      <Route path="/events" component={EventsScreen}></Route>
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
      <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
      <AdminRoute path="/adminpanel" component={AdminPanelScreen}></AdminRoute>
      <AdminRoute
        path="/events-admin"
        component={EventsPageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/events-admin/:id/edit"
        component={EventEditScreen}
        exact
      ></AdminRoute>
    </Router>
  );
}

export default App;
