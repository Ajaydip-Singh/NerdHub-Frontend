import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';

export default function PrivateRoute({ component: Component, ...rest }) {
  const login = useSelector((state) => state.userAuthentication);
  const { user } = login;

  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.isAdmin ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/home"></Redirect>
        )
      }
    ></Route>
  );
}
