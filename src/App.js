import NavigationCategory from './components/NavigationCategory';
import MainContentWrapper from './components/MainContentWrapper';
import SamsungProducts from "./components/SamsungProducts";
import IphoneProducts from "./components/IphoneProducts";
import AllProducts from './components/AllProducts';
import ProfileInfo from './components/ProfileInfo';
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/Store";
import LoginForm from './components/Login';
import { useState } from "react";
import SignUp from './components/SignUp';
import gotUserFromToken from './components/GotUserFromToken';
import AdminEditCategory from './components/AdminEditCategory';
import AdminMenu from './components/AdminMenu';
import AdminOrders from './components/AdminOrders';
import HomePage from './components/HomePage';
import AdminWelcome from './components/AdminWelcome';
function App() {
  const [token,setToken]=useState(localStorage.authToken)
  return (
    <Provider store={store}>
      {token ? (
        gotUserFromToken(token).sub.acl[2] === "admin" ? (
          <MainContentWrapper>
            <AdminMenu />
            <Routes>
              <Route path="/" element={<AdminWelcome />} />
              <Route path="/editCategories/*" element={<AdminEditCategory />} />
              <Route path="/editOrders/*" element={<AdminOrders />} />
              <Route path="/profile" element={<ProfileInfo />} />
            </Routes>
          </MainContentWrapper>
        ) : (
          <MainContentWrapper>
            <NavigationCategory />
            <Routes>
              <Route path="/*" element={<HomePage />} />
              <Route path="/all/*" element={<AllProducts />} />
              <Route path="/samsung/*" element={<SamsungProducts />} />
              <Route path="/iphone/*" element={<IphoneProducts />} />
              <Route path="/profile" element={<ProfileInfo />} />
            </Routes>
          </MainContentWrapper>
        )
      ) : (
        <MainContentWrapper>
          <NavigationCategory />
          <Routes>
            <Route path="/*" element={<HomePage />} />
            <Route path="/all/*" element={<AllProducts />} />
            <Route path="/samsung/*" element={<SamsungProducts />} />
            <Route path="/iphone/*" element={<IphoneProducts />} />
            <Route
              path="/profile"
              element={<LoginForm setToken={setToken} />}
            />
            <Route path="/signup/*" element={<SignUp />} />
          </Routes>
        </MainContentWrapper>
      )}
    </Provider>
  );
}

export default App;
