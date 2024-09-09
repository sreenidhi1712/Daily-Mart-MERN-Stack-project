import Maincontent from "../Components/Maincontent";
import { Routes, Route, Navigate } from "react-router-dom";
import Cart from "../Components/Cart";
import FavouriteItem from "../Components/FavouriteItem";
import FooterMenu from "../Components/FooterMenu";
import LoginPage from "../Components/LoginPage";
import RegistrationPage from "../Components/RegistrationPage";
import Protectedroute from "../Components/ProtectedRoute";
import { useContext, useEffect } from "react";
import { Context } from "../Components/Context/Context";
import IndividualCategory from "../Components/IndividualCategory";
import IndividualProduct from "../Components/IndividualProduct";
import ViewAllPage from "../Components/ViewAllPage";
import Orders from "../Components/Orders";

const withFooter = (Component) => {
  // eslint-disable-next-line react/display-name
  return (props) => (
    <div>
      <Component {...props} />
      <FooterMenu />
    </div>
  );
};

function Mainpage() {
  const { isLoggedIn, setIsLoggedIn } = useContext(Context);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [isLoggedIn, setIsLoggedIn]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              withFooter(Maincontent)()
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? <Navigate to="/" replace /> : <RegistrationPage />
          }
        />
        <Route element={<Protectedroute />}>
          <Route path="/cart" element={withFooter(Cart)()} />
          <Route path="/favourite" element={withFooter(FavouriteItem)()} />
          <Route path="/individualcategory/:category" element={withFooter(IndividualCategory)()} />
          <Route path="/individualProduct/:id" element={withFooter(IndividualProduct)()} />
          <Route path="/viewAll/:category" element={withFooter(ViewAllPage)()} />
          <Route path="/orders" element={withFooter(Orders)()} />
        </Route>
      </Routes>
    </div>
  );
}

export default Mainpage;
