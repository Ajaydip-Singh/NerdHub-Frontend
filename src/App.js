import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/video-react/dist/video-react.css'; // import css

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import AdminPanelScreen from './screens/AdminScreens/AdminPanelScreen/AdminPanelScreen';
import EventEditScreen from './screens/AdminScreens/EventEditScreen/EventEditScreen';
import EventsPageScreen from './screens/AdminScreens/EventsPageScreen/EventsPageScreen';
import ProductsListScreen from './screens/AdminScreens/ProductsListScreen/ProductsListScreen';
import AboutScreen from './screens/PublicScreens/AboutScreen/AboutScreen';
import ContactScreen from './screens/PublicScreens/ContactScreen/ContactScreen';
import HomeScreen from './screens/PublicScreens/HomeScreen/HomeScreen';
import GalleryScreen from './screens/PublicScreens/GalleryScreen/GalleryScreen';
import LoginScreen from './screens/PublicScreens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/PublicScreens/RegisterScreen/RegisterScreen';
import ProfileScreen from './screens/PublicScreens/ProfileScreen/ProfileScreen';
import EventsScreen from './screens/PublicScreens/EventsScreen/EventsScreen';
import HomePageScreen from './screens/AdminScreens/HomePageScreen/HomePageScreen';
import AboutPageScreen from './screens/AdminScreens/AboutPageScreen/AboutPageScreen';
import ContactPageScreen from './screens/AdminScreens/ContactPageScreen/ContactPageScreen';
import MembershipScreen from './screens/PublicScreens/MembershipScreen/MembershipScreen';
import ShopScreen from './screens/PublicScreens/ShopScreen/ShopScreen';
import ProductEditScreen from './screens/AdminScreens/ProductEditScreen/ProductEditScreen';
import ProductScreen from './screens/PublicScreens/ProductScreen/ProductScreen';

function App() {
  return (
    <Router>
      <Route path="/home" component={HomeScreen}></Route>
      <Route path="/events" component={EventsScreen}></Route>
      <Route path="/gallery" component={GalleryScreen}></Route>
      <Route path="/about" component={AboutScreen}></Route>
      <Route path="/contact" component={ContactScreen}></Route>
      <Route path="/membership" component={MembershipScreen}></Route>
      <Route path="/shop/products/:id" exact component={ProductScreen}></Route>
      <Route path="/shop" component={ShopScreen} exact></Route>
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
        path="/products-admin"
        component={ProductsListScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/products-admin/:id/edit"
        component={ProductEditScreen}
        exact
      ></AdminRoute>
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
      <AdminRoute
        path="/home-page-content-admin"
        component={HomePageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/about-page-content-admin"
        component={AboutPageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/contact-page-content-admin"
        component={ContactPageScreen}
        exact
      ></AdminRoute>
    </Router>
  );
}

export default App;
